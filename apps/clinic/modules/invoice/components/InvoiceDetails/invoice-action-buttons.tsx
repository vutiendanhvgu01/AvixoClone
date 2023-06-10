import { useState, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AvixoDrawerConfirm,
  ClockIcon,
  AvixoMenuButton,
  DollarSquareIcon,
  EmailIcon,
  OutlinedPrintIcon,
  TrashIcon,
  RefundIcon,
} from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { Patient } from 'modules/patient/types/patient';
import { Invoice } from 'modules/invoice/types/invoice';
import Link from 'next/link';
import { EMAIL_MENU, PRINT_MENU } from 'modules/invoice/constants';
import { DebitNote } from '../CreditDebitNote/debit-note-types';

export interface InvoiceActionButtonsProps {
  patient: Patient;
  invoice: Invoice;
  debitNote: DebitNote;
}

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button': {
    marginLeft: 16,
  },
}));

const InvoiceActionButtons: React.FC<InvoiceActionButtonsProps> = ({ patient, invoice }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(!openDeleteModal);
  }, [openDeleteModal]);

  return (
    <>
      <Actions>
        <Button color="whiteLight" startIcon={<DollarSquareIcon />}>
          Co-Payment
        </Button>
        <Button color="whiteLight" startIcon={<ClockIcon />}>
          History
        </Button>
        <Button color="whiteLight" startIcon={<RefundIcon />}>
          <Link href={`${PAGE_URLS.PATIENT_INVOICE_DETAILS(patient.uuid, invoice.uuid)}?action=add-refund`}>
            Refund
          </Link>
        </Button>
        <AvixoMenuButton
          ButtonProps={{
            startIcon: <OutlinedPrintIcon />,
            color: 'whiteLight',
          }}
          AvixoMenuBaseProps={{
            menuData: PRINT_MENU,
          }}
          label="Print"
        />
        <AvixoMenuButton
          ButtonProps={{
            startIcon: <EmailIcon />,
            color: 'whiteLight',
          }}
          AvixoMenuBaseProps={{
            menuData: EMAIL_MENU,
          }}
          label="Email"
        />
        <Button color="whiteLight" startIcon={<TrashIcon />} onClick={handleOpenDeleteModal}>
          Delete Invoice
        </Button>
        <Button startIcon={<DollarSquareIcon viewBox="0 0 20 20" />}>Finalise &amp; Submit Claim</Button>
      </Actions>
      <AvixoDrawerConfirm
        open={openDeleteModal}
        title="Delete Invoice"
        confirmContent={
          <>
            This action cannot be undone. Are you want to delete <br /> <b>{invoice?.invoiceNumber}</b>?
          </>
        }
        additionContent="Navigate to Deleted Invoice tab under Invoice menu to see invoices that has been deleted."
        action="delete-invoice"
        inputProps={{
          name: 'reason',
          label: 'Reason of deletion',
          required: true,
          defaultValues: '',
        }}
        footerProps={{
          confirmText: 'Yes, delete',
          confirmRestProps: {
            variant: 'contained',
          },
        }}
        handleClose={handleOpenDeleteModal}
      />
    </>
  );
};

export default InvoiceActionButtons;
