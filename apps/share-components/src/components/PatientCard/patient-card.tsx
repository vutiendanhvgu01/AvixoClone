import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { PatientCardProps } from './patient-card-types';

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

const PatientCard: React.FC<PatientCardProps> = props => {
  const { fullname, nric, age, gender, uuid, enrolmentDate } = props;

  return (
    <Link href={`/patients/${uuid}`} passHref>
      <StyledCard data-testid="patientCard">
        <CardBody>
          <Typography variant="subtitle2" color="neutral.900">
            {fullname}
          </Typography>
          <Typography variant="caption">{`${nric} • ${age} years old, ${gender}`}</Typography>
        </CardBody>
        <CardFooter>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Typography variant="caption">Enrolment Date:</Typography>
            <Typography variant="subtitle2">{enrolmentDate}</Typography>
          </Box>
        </CardFooter>
      </StyledCard>
    </Link>
  );
};

export default PatientCard;
