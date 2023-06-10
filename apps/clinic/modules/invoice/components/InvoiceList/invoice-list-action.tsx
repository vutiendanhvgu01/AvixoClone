import { Typography } from '@mui/material';
import { INVOICE_LIST_ACTIONS } from 'modules/invoice/constants';
import { useRouter } from 'next/router';
import { AvixoDrawerConfirm } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import AddInvoiceForm from '../AddInvoiceForm/add-invoice-form';
// import CreditNoteForm from '../CreditDebitNote/CreditNoteForm/credit-note-form';
import CreditDebitNoteForm from '../CreditDebitNote/CreditDebitNoteForm/credit-debit-note-form';

const InvoiceListAction: React.FC = () => {
  const router = useRouter();
  const { action } = router.query;

  const goToInvoiceListPage = () => {
    router.push(ROUTES.INVOICE);
  };

  switch (action) {
    case INVOICE_LIST_ACTIONS.ADD_INVOICE:
      return <AddInvoiceForm open onCancel={goToInvoiceListPage} />;

    case INVOICE_LIST_ACTIONS.ADD_CREDIT_NOTE:
      return <CreditDebitNoteForm open onCancel={goToInvoiceListPage} />;

    case INVOICE_LIST_ACTIONS.ADD_DEBIT_NOTE:
      return <CreditDebitNoteForm type="debit" open onCancel={goToInvoiceListPage} />;

    case INVOICE_LIST_ACTIONS.DELETE_INVOICE:
      // Note: Navigate to Deleted Invoice tab under Invoice menu to see invoices that has been deleted.
      return (
        <AvixoDrawerConfirm
          open
          title="Delete Invoice"
          confirmContent={
            <Typography variant="body2">
              This action cannot be undone. Are you sure you want to delete
              <br />
              <strong>INV-123232?</strong>
            </Typography>
          }
          inputProps={{
            label: 'Reason of deletion',
            defaultValues: '',
            name: 'reason',
            required: true,
          }}
          handleClose={goToInvoiceListPage}
        />
      );

    default:
      return null;
  }
};

export default InvoiceListAction;
