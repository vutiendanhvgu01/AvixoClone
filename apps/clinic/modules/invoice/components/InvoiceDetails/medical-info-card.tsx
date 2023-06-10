import { AvixoCard } from 'share-components';
import { Box, Typography } from '@mui/material';
import MedicalInfoCardProps from './medical-info-card-types';

const MedicalInfoCard: React.FC<MedicalInfoCardProps> = ({ latestDiagnosis, mc }) => (
  <AvixoCard title="MEDICAL INFO" titleVariant="overline" sx={{ minHeight: 230, py: 2 }} fullHeight>
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption">Latest Diagnosis</Typography>
      <Typography variant="body2" color="neutral.900">
        {latestDiagnosis || '-'}
      </Typography>
    </Box>
    <Box>
      <Typography variant="caption">MC</Typography>
      <Typography variant="body2" color="neutral.900">
        {mc || '-'}
      </Typography>
    </Box>
  </AvixoCard>
);

export default MedicalInfoCard;
