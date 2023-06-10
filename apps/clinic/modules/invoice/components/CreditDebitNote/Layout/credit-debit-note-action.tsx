import { Typography } from '@mui/material';
import { CREDIT_DEBIT_NOTE_ACTIONS } from 'modules/invoice/constants';
import type { Patient } from 'modules/patient/types/patient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm } from 'share-components';

const RemarkForm = dynamic(() => import('../Remark/remark-form'), { ssr: false });
const CreditAmountGSTForm = dynamic(() => import('../CreditDebitAmount/gst-form'), { ssr: false });

interface CreditDeitNoteActionProps {
  patient: Patient;
}

const CreditDebitNoteAction: React.FC<CreditDeitNoteActionProps> = () => {
  const router = useRouter();
  const action = router.query.action?.toString() || '';

  const goToCreditNotePage = useCallback(() => {
    delete router.query.action;
    router.push({ pathname: router.pathname, query: { ...router.query } }, router.pathname, { scroll: false });
  }, [router]);

  switch (action) {
    case CREDIT_DEBIT_NOTE_ACTIONS.EDIT_REMARK:
      return <RemarkForm open onCancel={goToCreditNotePage} />;
    case CREDIT_DEBIT_NOTE_ACTIONS.DELETE_REFURN:
      return (
        <AvixoDrawerConfirm
          title="Delete Refund"
          confirmContent={
            <Typography variant="body2">
              This action cannot be undone. Are you sure you want to delete <br />
              <strong>Refund payment by Jarvis Credit Card for S$100.00?</strong>
            </Typography>
          }
          open
          handleClose={goToCreditNotePage}
          inputProps={{
            name: 'reason',
            label: 'Reason of deletion',
            required: true,
            defaultValues: '',
          }}
        />
      );
    case CREDIT_DEBIT_NOTE_ACTIONS.EDIT_GST_AMOUNT:
      return <CreditAmountGSTForm open onCancel={goToCreditNotePage} />;
    case CREDIT_DEBIT_NOTE_ACTIONS.DELETE_ITEM:
      return (
        <AvixoDrawerConfirm
          open
          handleClose={goToCreditNotePage}
          title="Delete Item"
          confirmContent={
            <Typography variant="body2">
              This action cannot be undone. Are you sure you want to delete <br />
              <strong>PROVERA 10 MG</strong>?
            </Typography>
          }
          inputProps={{
            name: 'invoice-item-delete-reason',
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
        />
      );

    default:
      return null;
  }
};

export default CreditDebitNoteAction;
