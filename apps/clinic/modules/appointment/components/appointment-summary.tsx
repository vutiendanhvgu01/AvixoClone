import React, { useState, FC, useCallback } from 'react';
import { AvixoCard, AvixoCardNoResult, AppointmentIcon } from 'share-components';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppointmentAction from './appointment-summary-action';
import AppointmentSummaryItem from './appointment-summary-item';
import type { AppointmentSummaryProps } from './appointment-summary-types';

const BoxItem = styled(Box)({
  width: 445,
  display: 'flex',
});

const EmptyState: FC<{ cardNoResultTitle?: string }> = props => {
  const { cardNoResultTitle = '' } = props;
  return (
    <AvixoCardNoResult
      title={cardNoResultTitle}
      message={
        <>
          Click to <span>add new Appointment</span>
        </>
      }
    />
  );
};

const AppointmentSummary: FC<AppointmentSummaryProps> = props => {
  const { pastAppointment, upcomingAppointment } = props;
  const [dateRange, setDateRange] = useState<number>(1);

  const handleChangeDateRange = useCallback(
    (e: React.MouseEvent<HTMLElement>): void =>
      setDateRange(parseInt((e.currentTarget as HTMLInputElement).value || '0', 10)),
    [],
  );

  return (
    <AvixoCard
      title="Appointment"
      icon={<AppointmentIcon viewBox="0 0 20 20" />}
      action={<AppointmentAction label={dateRange} handleClick={handleChangeDateRange} />}
      fullHeight
    >
      <Box
        sx={{
          display: 'flex',
          width: 'auto',
          flex: 2,
        }}
      >
        <Typography component="div" sx={{ display: 'flex', width: '100%' }}>
          <BoxItem>
            {upcomingAppointment ? (
              <AppointmentSummaryItem items={upcomingAppointment} />
            ) : (
              <EmptyState cardNoResultTitle="No Upcoming Appointment" />
            )}
          </BoxItem>
          <BoxItem sx={{ marginLeft: 'auto' }}>
            {pastAppointment ? (
              <AppointmentSummaryItem items={pastAppointment} title="past" isPast />
            ) : (
              <EmptyState cardNoResultTitle="No Appointment Recorded" />
            )}
          </BoxItem>
        </Typography>
      </Box>
    </AvixoCard>
  );
};

export default AppointmentSummary;
