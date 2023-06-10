import { styled } from '@mui/material/styles';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React from 'react';
import StatusChip from 'common/components/StatusChip/StatusChip';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { Appointment } from 'modules/appointment/components/appointment-types';
import mapAppointmentStatus from 'modules/appointment/utils/mapAppointmentStatus';
import mapAppointmentType from 'modules/appointment/utils/mapAppointmentType';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '0px',
  padding: '16px 24px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: 'auto',
  background: 'white',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:active': {
    background: '#37415114',
  },
}));
const CardHeading = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
const CardBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: 8,
}));
const CardFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 8,
}));

const AppointmentCard: React.FC<{ appointment: Appointment; onClickRow: (appointment: Appointment) => void }> = ({
  appointment,
  onClickRow,
}) => {
  const { user, type, uuid, status, date, specialty } = appointment;

  return (
    <StyledCard data-testid="appointmentCard">
      <CardActionArea onClick={() => onClickRow(appointment)}>
        <CardHeading>
          <Typography variant="body2" color="neutral.500">
            {uuid}
          </Typography>
          <StatusChip status={mapAppointmentStatus(status)} />
        </CardHeading>
        <CardBody>
          <Typography variant="subtitle2" color="neutral.900">
            {user?.name}
          </Typography>
          <Typography variant="caption">{`${user?.nric} • ${user?.age} years old, ${user?.gender}`}</Typography>
        </CardBody>
        <CardFooter>
          <Typography variant="subtitle2">{mapAppointmentType({ service: type, specialty })}</Typography>
          <Typography variant="subtitle2" component="span" color="neutral.900">
            {formatDate(date, 'dd MMM yyyy - HH:mm')}
          </Typography>
        </CardFooter>
      </CardActionArea>
    </StyledCard>
  );
};

export default AppointmentCard;
