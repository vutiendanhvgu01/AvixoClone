import { Grid, Box, Typography, Divider } from '@mui/material';
import Router from 'next/router';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { PatientListCardProps } from './patient-list-types';

const PatientListCard: React.FC<PatientListCardProps> = ({ item }) => {
  const { name, patients, description, updatedAt } = item;

  const viewItem = (id: number) => {
    Router.push(`/patient/list/${id}`);
  };

  return (
    <Grid item lg={4} md={4} sm={6}>
      <Box
        sx={{ px: 4, py: 3, background: '#FBFBFB', borderRadius: '10px', cursor: 'pointer' }}
        onClick={() => viewItem(item.id)}
      >
        <Typography variant="h6" color="primary.main">
          {name}
        </Typography>
        <Typography variant="caption" color="neutral.900">
          00231 - created by paul van dyk
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>{`${patients.length} Patients`}</Typography>
        <Typography variant="body2" color="neutral.900">
          {description}
        </Typography>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Typography variant="body2" color="neutral.500">
          Last Modified on {formatDate(updatedAt, 'dd MMM yyyy, hh:mm:ss')}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PatientListCard;
