import { Grid } from '@mui/material';
import ImmunisationSummary from 'modules/immunisation/components/immunisation-summary';
import ImmunisationApiService from 'modules/immunisation/services';
import AppointmentApiService from 'modules/appointment/services';
import AllergyApiService from 'modules/allergy/services';
import InvoiceApiService from 'modules/invoice/services';
import PatientApiService from 'modules/patient/services';
import AppointmentSummary from 'modules/appointment/components/appointment-summary';
import InvoiceSummary from 'modules/invoice/components/invoice-summary-card';
import PatientDetailsLayout from 'modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-layout';
import PatientSummaryCard from 'modules/patient/components/PatientDetails/patient-summary-card';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import type { Immunisation } from 'modules/immunisation/components/immunisation-types';
import type { AppointmentSummaryProps } from 'modules/appointment/components/appointment-summary-types';
import type { Invoice } from 'modules/invoice/components/invoice-summary-card-types';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import { parseBody } from 'next/dist/server/api-utils/node';
import PrescriptionApiService from 'modules/prescription/service';
import AddInvoiceForm from 'modules/invoice/components/AddInvoiceForm/add-invoice-form';
import AppointmentForm from 'modules/appointment/components/appointment-form';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import PractitionerApiService from 'modules/practitioner/services';
import CatalogApiService from 'modules/catalog/service';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { Catalog } from 'modules/catalog/types';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import jwtDecode from 'jwt-decode';

const PatientDetailsAction = dynamic(
  () => import('modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-action'),
  { ssr: false },
);

const AllergiesSummary = dynamic(() => import('modules/allergy/components/allergy-summary'), { ssr: false });

interface PatientImmunisationPageProps {
  patient: Patient;
  immunisations: Immunisation[];
  allergies: Allergy[];
  appointments: Pick<AppointmentSummaryProps, 'upcomingAppointment' | 'pastAppointment'>;
  invoices: Invoice[];
  practitioners: Practitioner[];
  products: Catalog[];
  params: { action: string };
}

// always get maximum 3 items
const SIZE_SUMMARY_ITEMS = 3;
const PatientDashboardPage: React.FC<PatientImmunisationPageProps> = ({
  immunisations = [],
  allergies = [],
  appointments,
  invoices = [],
  patient,
  products,
  params: { action },
}) => {
  const router = useRouter();
  const goToDashboard = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_DASHBOARD(patient.uuid));
  }, [patient.uuid, router]);

  return (
    <PatientDetailsLayout patient={patient} allergies={allergies} withPatientDetailsTabs={false}>
      <Grid container spacing={4}>
        <Grid item xl={4} lg={6} md={6} sm={12}>
          <PatientSummaryCard patient={patient} />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12}>
          <AllergiesSummary patientAllergies={allergies} />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12}>
          <ImmunisationSummary immunisations={immunisations} />
        </Grid>
        <Grid item xl={8} lg={12} md={12} sm={12}>
          <AppointmentSummary
            pastAppointment={appointments?.pastAppointment || []}
            upcomingAppointment={appointments?.upcomingAppointment || []}
          />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12}>
          <InvoiceSummary invoices={invoices} />
        </Grid>
      </Grid>
      <PatientDetailsAction products={products} patient={patient} />
      {action === 'add-invoice' && <AddInvoiceForm open onCancel={goToDashboard} />}
      {action === 'add-appointment' && <AppointmentForm open onCancel={goToDashboard} />}
    </PatientDetailsLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, action } = ctx.query;
  const token = ctx?.req?.cookies?.access_token;
  const dataTypes = [
    'immunisations',
    'allergies',
    'appointments',
    'invoices',
    'practitioners',
    'listItems',
    'products',
  ];
  const shortListDataTypes = ['immunisations', 'allergies', 'invoices', 'products'];
  let pageProps = {} as PatientImmunisationPageProps;

  if (patientUUID && token) {
    try {
      const dataJWT = jwtDecode(token) as any;
      const patientService = new PatientApiService({}, ctx);
      const allergyApiService = new AllergyApiService({}, ctx);
      const appointmentApiService = new AppointmentApiService({}, ctx);
      const invoiceApiService = new InvoiceApiService({}, ctx);
      const immunisationApiService = new ImmunisationApiService({}, ctx);
      const prescriptionService = new PrescriptionApiService({}, ctx);
      const practitionerService = new PractitionerApiService({}, ctx);
      const catalogService = new CatalogApiService({}, ctx);
      const nehrService = new NEHRConnectorApiService({}, ctx);

      const { data } = await patientService.getPatientDetails(patientUUID.toString());
      pageProps.patient = data;

      await Promise.allSettled([
        immunisationApiService.getPatientImmunisation({ patientId: data.id }),
        allergyApiService.getPatientAllergies(data.id),
        appointmentApiService.getPatientAppointments({ patientId: data.id, organisationId: dataJWT.orgid }),
        invoiceApiService.getPatientInvoices({ patientId: data.id }),
        practitionerService.getPractitionersList(),
        catalogService.getListProducts(),
      ]).then(values => {
        values.forEach(({ value }: any, index) => {
          pageProps = {
            ...pageProps,
            [dataTypes[index]]:
              (shortListDataTypes.includes(dataTypes[index])
                ? value?.data?.slice(0, SIZE_SUMMARY_ITEMS)
                : value?.data) || [],
          };
        });
      });

      if (action === 'add-prescription') {
        const { data: newPrescription } = await prescriptionService.createPrescription({
          patientId: data.id,
          isDraft: true,
        });
        const { data: prescriptionData } = await prescriptionService.getPrescriptionDetail(newPrescription.id, 'id');
        return {
          redirect: {
            permanent: false,
            destination: PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(
              patientUUID.toString(),
              prescriptionData.uuid.toString(),
            ),
          },
        };
      }

      if (action === 'delete' && ctx.req.method === 'POST') {
        await patientService.deletePatientByUuid(patientUUID.toString());
        await nehrService.deletedRelatedPatientNEHR(data.id);
        return {
          redirect: {
            permanent: false,
            destination: ROUTES.PATIENT_MANAGEMENT,
          },
        };
      }
      if (action === 'edit' && ctx.req.method === 'POST') {
        const body = await parseBody(ctx.req, '1mb');
        const payload = {
          ...body,
          id: data.id,
          birthDate: new Date(body.birthDate).toISOString(),
          identities: JSON.parse(body.identities),
          phones: JSON.parse(body.phones),
          emails: JSON.parse(body.emails),
          addresses: JSON.parse(body.addresses),
          contact: JSON.parse(body.contact),
        };
        await patientService.updatePatientByUuid(patientUUID.toString(), payload);
        await nehrService.submitUpdatedPatientToNEHR(data.id);
        return {
          redirect: {
            permanent: false,
            destination: PAGE_URLS.PATIENT_DASHBOARD(patientUUID.toString()),
          },
        };
      }
      return {
        props: {
          ...pageProps,
          params: {
            action: action || '',
          },
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

export default PatientDashboardPage;
