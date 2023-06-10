import { FormControlLabel, Radio, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Invoice } from 'modules/invoice/types/invoice';
import { formatDate } from 'share-components/src/utils/formatUtils';

const InvoiceItem = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  padding: '16px 32px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'block',
  margin: '0 -32px',
}));

const InvoiceItemInfo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

interface InvoiceItemRadioProps {
  invoice: Invoice;
}

const InvoiceItemRadio: React.FC<InvoiceItemRadioProps> = ({ invoice }) => (
  <InvoiceItem component="label">
    <InvoiceItemInfo>
      <FormControlLabel value={invoice.id} control={<Radio />} label={invoice.invoiceNumber} />
      <Typography variant="body2" fontWeight="500" color="neutral.500">
        {formatDate(invoice.createdAt, 'dd MMM yyyy, hh:mm a')}
      </Typography>
    </InvoiceItemInfo>
    <InvoiceItemInfo>
      <Typography variant="body2" color="neutral.500">
        Total Payment
      </Typography>
      <Typography variant="subtitle2" color="secondary.main">
        {invoice.total.currency}${invoice.total.amount}
      </Typography>
    </InvoiceItemInfo>
  </InvoiceItem>
);

export default InvoiceItemRadio;
