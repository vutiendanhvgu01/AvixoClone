import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';

import { CaseCardProps } from './case-card-types';
import PatientStatus from '../PatientStatus/patient-status';

export const formattedDate = (date: string) => moment(new Date(date)).format('DD MMM yy');
export const displayDays = (days: number) => `${days} ${days > 1 ? 'days' : 'day'}`;

const CaseCard: React.FC<CaseCardProps> = props => {
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

  const {
    case: { uuid, status, name, nric, age, gender, enrolmentDate, lengthOfStay },
  } = props;

  return (
    <StyledCard data-testid={`test-${uuid}`}>
      <CardHeading>
        <Typography variant="body2" color="neutral.500">
          {uuid}
        </Typography>
        <PatientStatus label={status} />
      </CardHeading>
      <CardBody>
        <Typography variant="subtitle2" color="neutral.900">
          {name}
        </Typography>
        <Typography variant="caption">{`${nric} • ${age} years old, ${gender}`}</Typography>
      </CardBody>
      <CardFooter>
        <Box>
          <Typography variant="caption">Enrolment date: </Typography>
          <Typography variant="subtitle2" component="span" color="neutral.900">
            {enrolmentDate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">Length of stay: </Typography>
          <Typography variant="subtitle2" component="span" color="neutral.900">
            {displayDays(lengthOfStay)}
          </Typography>
        </Box>
      </CardFooter>
    </StyledCard>
  );
};

export default CaseCard;
