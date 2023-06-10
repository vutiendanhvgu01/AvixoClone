import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { AvixoCard, AvixoCardNoResult, BillIcon } from 'share-components';
import { INVOICE_STATUS_COLOR } from '../constants';
import InvoiceSummaryProps, { Invoice as InvoiceItemType } from './invoice-summary-card-types';

const Invoice = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: 16,
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
  width: '302px',
  maxWidth: 'calc(100% - 140px)',
});

const Title = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '4px',
  color: theme.palette.black.dark,
}));

const IdentityInvoice = styled(Typography)(() => ({
  marginLeft: 'auto',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '28px',
}));

const InvoiceStatus = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
}));

const InvoiceItem: React.FC<{ invoice: InvoiceItemType }> = ({ invoice }) => (
  <Invoice>
    <Info>
      <Title variant="h5">{`${invoice.total.currency}${invoice.total.amount}`}</Title>
      <InvoiceStatus color={INVOICE_STATUS_COLOR[invoice.paymentStatus]}>{invoice.paymentStatus}</InvoiceStatus>
    </Info>
    <IdentityInvoice variant="caption">{invoice.invoiceId}</IdentityInvoice>
  </Invoice>
);

const InvoiceSummaryCard: React.FC<InvoiceSummaryProps> = ({ invoices }) => (
  <AvixoCard title="Invoices" icon={<BillIcon />} fullHeight>
    {invoices?.length > 0 ? (
      <Box>
        {invoices.map(invoice => (
          <InvoiceItem key={invoice.uuid} invoice={invoice} />
        ))}
      </Box>
    ) : (
      <AvixoCardNoResult
        title="No invoices Recorded"
        message={
          <>
            Click to <span>add new Invoice</span>
          </>
        }
      />
    )}
  </AvixoCard>
);

export default InvoiceSummaryCard;
