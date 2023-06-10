import { AvixoCard } from 'share-components';
import { Box, Typography } from '@mui/material';
import PaymentInfoCardProps from './payment-info-card-types';

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({
  billTo,
  address,
  patientInsurance = 'No Insurance Panel',
}) => (
  <AvixoCard title="PAYMENT INFORMATION" titleVariant="overline" sx={{ minHeight: 230, py: 2 }} fullHeight>
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption">Bill to:</Typography>
      <Typography variant="body2" color="primary">
        {billTo}
      </Typography>
    </Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="neutral.900">
        {address}
      </Typography>
      <Typography variant="caption">#23-23</Typography>
    </Box>
    <Box>
      <Typography variant="body2" color="neutral.900">
        {patientInsurance}
      </Typography>
    </Box>
  </AvixoCard>
);

export default PaymentInfoCard;
