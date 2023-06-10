import { Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { AvixoCard, AvixoCardNoResult, SecuritySafeIcon } from 'share-components';
import { IMMUNISATION_STATUS_COLOR } from '../constants';
import { ImmunisationItemProps, ImmunisationSummaryProps } from './immunisation-types';

const Immunisation = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: 24,
  paddingTop: 24,
  '&:first-child': {
    paddingTop: 0,
  },
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 12,
  },
}));

const Info = styled(Box)({
  marginRight: 24,
  maxWidth: 'calc(100% - 140px)',
});

const Title = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '4px',
  color: theme.palette.black.dark,
}));

const ImmunisationItem: React.FC<ImmunisationItemProps> = ({ immunisation }) => (
  <Immunisation>
    <Info>
      <Title variant="subtitle1">{immunisation.administeredProduct}</Title>
      <Typography variant="caption">
        {immunisation.batchNo} · {immunisation.manufacturer}
      </Typography>
    </Info>
    <Chip
      size="small"
      label={immunisation.status}
      color={IMMUNISATION_STATUS_COLOR[immunisation.status]}
      sx={{ marginLeft: 'auto' }}
    />
  </Immunisation>
);

const ImmunisationSummary: React.FC<ImmunisationSummaryProps> = ({ immunisations = [] }) => {
  const router = useRouter();
  const patientUUID = router.query.patientUUID?.toString() || '';

  return (
    <AvixoCard
      title="Immunisation"
      icon={<SecuritySafeIcon />}
      fullHeight
      onClick={() => router.push(PAGE_URLS.PATIENT_IMMUNISATION(patientUUID))}
      sx={{ cursor: 'pointer' }}
    >
      {immunisations?.length > 0 ? (
        <Box>
          {immunisations.map(immunisation => (
            <ImmunisationItem key={immunisation.uuid} immunisation={immunisation} />
          ))}
        </Box>
      ) : (
        <AvixoCardNoResult
          title="No Immunisation Recorded"
          message={
            <>
              Click to <span>add new Immunisation</span>
            </>
          }
        />
      )}
    </AvixoCard>
  );
};

export default ImmunisationSummary;
