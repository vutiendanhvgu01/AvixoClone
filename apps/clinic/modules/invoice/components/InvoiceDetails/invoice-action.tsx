import { useRouter } from 'next/router';
import { AvixoDrawerConfirm, AvixoFixedContainer } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import AddPackageForm from '../AddPackage/add-package-form';
import RefundForm from '../Refund/refund-form';
import { InvoiceActionProps } from './invoice-action-types';
import AddEditMedicineForm from './medicine-form';

const InvoiceAction: React.FC<InvoiceActionProps> = ({ action }) => {
  const router = useRouter();
  const { patientUUID, invoiceUUID } = router.query;

  const goToInvoiceDetailsPage = () => {
    if (patientUUID && invoiceUUID) {
      router.push(PAGE_URLS.PATIENT_INVOICE_DETAILS(patientUUID.toString(), invoiceUUID.toString()));
    }
  };

  switch (action) {
    case 'add-service':
      return (
        <AvixoFixedContainer title="Add Service" display onClose={goToInvoiceDetailsPage}>
          {/* Add service form */}
        </AvixoFixedContainer>
      );
    case 'add-refund':
      return <RefundForm open onCancel={goToInvoiceDetailsPage} />;
    case 'add-medicine':
      return <AddEditMedicineForm onCloseHandler={goToInvoiceDetailsPage} patientUUID={patientUUID as string} />;
    case 'add-package':
      return (
        <AvixoFixedContainer
          title="Add Package"
          display
          onClose={goToInvoiceDetailsPage}
          containerSx={{ width: '996px' }}
        >
          <AddPackageForm listPackage={[]} />
        </AvixoFixedContainer>
      );
    case 'add-payment':
      return (
        <AvixoFixedContainer title="Add Payment" display onClose={goToInvoiceDetailsPage}>
          {/* Add payment form */}
        </AvixoFixedContainer>
      );
    case 'edit-payment':
      return (
        <AvixoFixedContainer title="Edit Payment" display onClose={goToInvoiceDetailsPage}>
          {/* Edit payment form */}
        </AvixoFixedContainer>
      );
    case 'select-tier':
      return (
        <AvixoFixedContainer title="Tier" display onClose={goToInvoiceDetailsPage}>
          {/* Teir form */}
        </AvixoFixedContainer>
      );
    case 'delete-payment':
      return (
        <AvixoDrawerConfirm
          open
          handleClose={goToInvoiceDetailsPage}
          inputProps={{
            name: 'reason',
            label: 'Reason of deletion',
            required: true,
            defaultValues: '',
          }}
          title="Delete Payment?"
          confirmContentTitle="Are you sure want to delete RC2301-00045?"
          confirmContent="This action cannot be undone."
        />
      );
    case 'edit-payment-date':
      return (
        <AvixoFixedContainer title="Edit Payment Invoice" display onClose={goToInvoiceDetailsPage}>
          {/* Edit payment date form */}
        </AvixoFixedContainer>
      );
    case 'edit-total-payment-amount':
      return (
        <AvixoFixedContainer title="Edit Totals" display onClose={goToInvoiceDetailsPage}>
          {/* Edit amount form */}
        </AvixoFixedContainer>
      );
    case 'add-signature':
      return (
        <AvixoFixedContainer title="Signature" display onClose={goToInvoiceDetailsPage}>
          {/* Signature form */}
        </AvixoFixedContainer>
      );
    case 'add-remark':
      return (
        <AvixoFixedContainer title="Remarks" display onClose={goToInvoiceDetailsPage}>
          {/* Add remark form */}
        </AvixoFixedContainer>
      );
    case 'edit-invoice-date':
      return (
        <AvixoFixedContainer title="Edit Invoice Date" display onClose={goToInvoiceDetailsPage}>
          {/* Edit amount form */}
        </AvixoFixedContainer>
      );
    default:
      return null;
  }
};

export default InvoiceAction;
