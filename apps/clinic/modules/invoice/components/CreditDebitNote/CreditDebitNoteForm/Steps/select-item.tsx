import { Box, Container, styled, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { invoiceItemsMockData } from 'modules/invoice/components/mockData';
import { FormBody } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { CreditDebitNoteFormValues } from '../credit-debit-note-form-types';
import IssuedItem from './issued-item-checkbox';

const SelectedInvoice = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  margin: '0 -32px',
  padding: '0 32px 12px',
}));

const CreditNoteSelectItem: React.FC = () => {
  const { values } = useFormikContext<CreditDebitNoteFormValues>();

  return (
    <FormBody>
      <Container sx={{ padding: '0 0 20px 0' }}>
        <Typography variant="h6" sx={{ mb: 3.5 }} color="black.dark">
          3. Select Item
        </Typography>
        <SelectedInvoice>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="black.main">
              {values.invoice?.invoiceNumber}
            </Typography>
            <Typography variant="body2" color="primary.main">
              {formatDate(values.invoice?.createdAt, 'dd MMM yyyy, hh:mm a')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="neutral.500">
              Total Payment
            </Typography>
            <Typography variant="subtitle2" color="neutral.500">
              {values.invoice?.total.currency}${values.invoice?.total.amount}
            </Typography>
          </Box>
        </SelectedInvoice>

        <Typography variant="overline" sx={{ pt: 3, pb: 4 }} component="div">
          Select Issued Item
        </Typography>

        {invoiceItemsMockData.map(item => (
          <IssuedItem key={item.id} item={item} />
        ))}
      </Container>
    </FormBody>
  );
};
export default CreditNoteSelectItem;
