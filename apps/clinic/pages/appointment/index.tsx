import { Grid } from '@mui/material';
import appointmentPageApiServer from 'common/service/appointment-page-api';
import { uniq } from 'lodash';
import { Appointment } from 'modules/appointment/components/appointment-types';
import AppointmentCalendar from 'modules/appointment/components/AppointmentCalendar';
import AppointmentLayout from 'modules/appointment/components/AppointmentLayout/appointment-layout';
import AppointmentCalendarCard from 'modules/appointment/components/AppointmentModule/appointment-calendar-card';
import AppointmentNoticeBoard from 'modules/appointment/components/AppointmentNoticeBoard/appointment-notice-board';
import AppointmentApiService from 'modules/appointment/services';
import PatientApiService from 'modules/patient/services';
import { Patient } from 'modules/patient/types/patient';
import PractitionerApiService from 'modules/practitioner/services';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import dynamic from 'next/dynamic';
import { ApiResponse, getAlertMessage } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

interface AppointmentPageProps {
  appointmentList: Appointment[];
  appointment: Appointment;
}

const AppointmentAction = dynamic(
  () => import('../../modules/appointment/components/AppointmentLayout/appointment-action'),
  {
    ssr: false,
  },
);

const AppointmentPage: React.FC<AppointmentPageProps> = ({ appointmentList, appointment }) => (
  <AppointmentLayout>
    <Grid container spacing={4} flexWrap="nowrap">
      <Grid item md={4} lg={4} xl={3} maxWidth="fit-content !important">
        <Grid container>
          <Grid item>
            <AppointmentCalendarCard />
          </Grid>
          <Grid item sm={12}>
            <AppointmentNoticeBoard viewType="weekly" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={8} lg={8} xl={9} flexGrow={1} sx={{ paddingLeft: '0 !important', paddingTop: 4, ml: '32px' }}>
        <AppointmentCalendar appointmentList={appointmentList} />
      </Grid>
    </Grid>
    <AppointmentAction appointment={appointment} />
  </AppointmentLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { message, titleMessage } = ctx.query;

    try {
      const pageProps = {} as AppointmentPageProps;
      const patientService = new PatientApiService({}, ctx);
      const appointmentApiService = new AppointmentApiService({}, ctx);
      const practitionerApiService = new PractitionerApiService({}, ctx);
      const appointmentId = parseInt(ctx.query?.appointmentId as string, 10);
      if (appointmentId > 0) {
        const appointment: Appointment = (await appointmentApiService.getAppointment(appointmentId)).data;
        if (appointment?.patientId) {
          appointment.patient = (await patientService.getPatientDetails(appointment?.patientId, 'id')).data;
        }
        if (appointment?.practitionerId) {
          appointment.practitioner = (
            await practitionerApiService.getPatientPractitioner(appointment?.practitionerId)
          ).data;
        }
        pageProps.appointment = appointment;
      }
      const appointmentList = (await appointmentApiService.getPatientAppointments()).data;

      if (appointmentList.length) {
        let patientIds: number[] = [];
        let practitionerIds: number[] = [];
        appointmentList.forEach((appointmentObject: Appointment) => {
          if (appointmentObject.patientId) {
            patientIds = uniq([...patientIds, appointmentObject.patientId]);
            practitionerIds = uniq([...practitionerIds, appointmentObject.practitionerId]);
          }
        });

        const patientsData = await Promise.all(
          patientIds.map(patientId => patientService.getPatientDetails(patientId, 'id').catch(e => e)),
        ).then((results: ApiResponse<Patient>[]) => results.map(value => value.data));

        const practitionersData = await Promise.all(
          practitionerIds.map(practitionerId =>
            practitionerApiService.getPatientPractitioner(practitionerId).catch(e => e),
          ),
        ).then((results: ApiResponse<Practitioner>[]) => results.map(value => value.data));

        appointmentList.forEach((appointmentObject: Appointment, index: number) => {
          appointmentList[index].patient =
            patientsData.find((patient: Patient) => patient.id === appointmentObject.patientId) ?? null;
          appointmentList[index].practitioner =
            practitionersData.find(
              (practitioner: Practitioner) => practitioner.id === appointmentObject.practitionerId,
            ) ?? null;
        });
      }
      pageProps.appointmentList = appointmentList;

      return {
        props: {
          ...pageProps,
          ...getAlertMessage(message as string, titleMessage as string),
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  },

  async post(ctx) {
    const response = await appointmentPageApiServer(ctx);
    return redirect(`${PAGE_URLS.APPOINTMENT()}?message=${response?.message}&titleMessage=${response?.titleMessage}`);
  },
});

export default AppointmentPage;
