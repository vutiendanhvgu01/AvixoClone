import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import PlusIcon from 'share-components/src/components/AvixoIcons/plus-icon';
import QueueScheduledAppointmentItem from './queue-scheduled-appointment-item';
import { QueueScheduledAppointmentListProps } from 'modules/queue/components/QueueScheduleAppointment/queue-scheduled-appointment-types';

const ContainerBox = styled(Box)(() => ({
  maxHeight: '98%',
  background: 'white',
  borderRadius: '16px',
  padding: '32px',
}));

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ActionIcon = styled(IconButton)(() => ({
  width: '20px',
  height: '20px',
  backgroundColor: '#6B7280',
  '&:hover': {
    backgroundColor: '#6B7280',
    opacity: 0.7,
  },
}));

const QueueScheduledAppointmentList: FC<QueueScheduledAppointmentListProps> = ({ appointments }) => {
  const iconColor = '#FFFFFF';
  return (
    <ContainerBox>
      <FlexBox>
        <Typography variant="h6">Today Appointment</Typography>
        <ActionIcon>
          <PlusIcon sx={{ fontSize: '20px', color: iconColor }} />
        </ActionIcon>
      </FlexBox>
      {appointments &&
        appointments.length > 0 &&
        appointments.map(appointment => (
          <QueueScheduledAppointmentItem key={`scheduled-appointment-${appointment?.id}`} appointment={appointment} />
        ))}
    </ContainerBox>
  );
};

export default QueueScheduledAppointmentList;
