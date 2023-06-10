import QueueScheduledAppointmentList from 'modules/queue/components/QueueScheduleAppointment/queue-scheduled-appointment-list';
import { QueueScheduledAppointmentTypes } from 'modules/queue/components/QueueScheduleAppointment/queue-scheduled-appointment-types';
import { appointmentToday } from 'modules/queue/components/QueueScheduleAppointment/mock-data';
import { Box, Grid, IconButton, styled, TextField, useTheme } from '@mui/material';
import PractitionerApiService from 'modules/practitioner/services';
import AssignToContext from 'modules/queue/components/AssignPatientContext/assign-patient-to-context';
import QueueLayout from 'modules/queue/components/QueueLayout/queue-layout';
import QueueList from 'modules/queue/components/QueuList/queue-list';
import { ShowAssignedToContext } from 'modules/queue/context/assign-to-context';
import Queue from 'modules/queue/types';
import { GetServerSideProps } from 'next';
import React, { useCallback, useContext, useState } from 'react';
import { AngleUpIcon, AvixoSearchBar } from 'share-components';
import VisitApiService from 'modules/queue/services';
import PatientApiService from 'modules/patient/services';

const RoundButton = styled(IconButton)(() => ({
  width: '32px',
  height: '32px',
  borderRadius: '16px',
  background: 'white',
  border: '3px solid #F3F3F3',
}));

const APPOINTMENT_CARD_WIDTH = 3;

interface QueuePageProps {
  appointments: QueueScheduledAppointmentTypes[];
  practitioners: [];
  queues: Queue[];
}

const QueuePage: React.FC<QueuePageProps> = ({ practitioners, appointments, queues }) => {
  const theme = useTheme();
  const [showList, setShowList] = useState<boolean>(true);
  const { basedOn } = useContext(ShowAssignedToContext);

  const expandToggle = useCallback(() => {
    setShowList(!showList);
  }, [showList]);

  return (
    <AssignToContext practitioners={practitioners}>
      <QueueLayout title="Queue List">
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {showList && (
              <Grid item xs={APPOINTMENT_CARD_WIDTH}>
                <QueueScheduledAppointmentList appointments={appointments} />
              </Grid>
            )}
            <Grid item xs={showList ? 12 - APPOINTMENT_CARD_WIDTH : 12} sx={{ paddingLeft: '32px' }}>
              <Box
                sx={{
                  padding: '32px 32px 8px 32px',
                  background: 'white',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      select
                      label="Category Filter"
                      name="category-filter"
                      data-cy="category-filter"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField fullWidth select label="Room / Status" name="room-status" data-cy="room-status" />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField fullWidth select label="Practitioner" name="practitioner" data-cy="practitioner" />
                  </Grid>
                  <Grid item xs={6}>
                    <AvixoSearchBar placeholder="Search patient..." defaultValue="" />
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <RoundButton
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '-15px',
                    zIndex: 10,
                    rotate: showList ? '-90deg' : '90deg',
                    background: showList ? theme.palette.chart?.blue4 : 'white',
                    color: showList ? 'white' : 'black',
                  }}
                  onClick={expandToggle}
                >
                  <AngleUpIcon />
                </RoundButton>
                <QueueList basedOn={basedOn} queues={queues} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </QueueLayout>
    </AssignToContext>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  let pageProps = {} as QueuePageProps;
  const dataTypes = ['practitioners', 'queues'];

  const appointments: readonly QueueScheduledAppointmentTypes[] = appointmentToday;
  const practitionerService = new PractitionerApiService({}, ctx);
  const visitService = new VisitApiService({}, ctx);

  await Promise.allSettled([practitionerService.getPractitionersList(), visitService.getList()]).then(values => {
    values.forEach(({ value }: any, index) => {
      pageProps = {
        ...pageProps,
        [dataTypes[index]]: value?.data || [],
      };
    });
  });

  /* Get Patient Details */
  if (pageProps.queues.length > 0) {
    const patientService = new PatientApiService({}, ctx);
    const patientIds = [...new Set(pageProps.queues.map((queue: Queue) => queue.patientId))];
    const patientsData = await Promise.all(
      patientIds.map(patientId => patientService.getPatientDetails(patientId?.toString() || '', 'id').catch(e => e)),
    );
    const patientMap = new Map();
    patientsData
      .filter(item => !(item instanceof Error))
      .forEach(patientData => {
        const patient = patientData?.data;
        patientMap.set(patient.id, patient);
      });
    pageProps.queues.forEach((queue: Queue, index: number) => {
      pageProps.queues[index].patient = patientMap.get(queue.patientId);
    });
    pageProps.queues = pageProps.queues.filter((queue: Queue) => queue.patient);
  }

  return {
    props: {
      ...pageProps,
      appointments,
    },
  };
};

export default QueuePage;
