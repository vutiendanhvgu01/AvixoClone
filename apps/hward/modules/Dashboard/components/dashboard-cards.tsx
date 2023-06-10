import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { AppointmentActionIcon, NoteAddIcon, OngoingCasesIcon, PatientEnrolledIcon } from 'share-components';
import DashboardCard from './dashboard-card';

interface DashboardCardProps {
  appointmentsTotal?: number;
  casesOngoing?: number;
  casesCompleted?: number;
  patientCount?: number;
}

const DashboardCards = ({ appointmentsTotal, casesOngoing, casesCompleted, patientCount }: DashboardCardProps) => {
  const Container = styled(Box)(({ theme }) => ({
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    overflow: 'hidden',
    overflowX: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 24,
      paddingRight: 8,
      marginLeft: -24,
      marginRight: -24,
    },
  }));

  const dashboardData = [
    { title: 'Appointments', amount: appointmentsTotal, Icon: AppointmentActionIcon },
    { title: 'Active Cases', amount: casesOngoing, Icon: OngoingCasesIcon },
    { title: 'Completed Cases', amount: casesCompleted, Icon: NoteAddIcon },
    { title: 'Total Patients', amount: patientCount, Icon: PatientEnrolledIcon },
  ];
  return (
    <Container>
      {dashboardData?.map(el => (
        <DashboardCard key={el.title} {...el} />
      ))}
    </Container>
  );
};

export default DashboardCards;
