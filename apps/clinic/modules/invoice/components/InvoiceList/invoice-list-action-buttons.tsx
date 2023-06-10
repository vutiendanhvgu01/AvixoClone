import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { INVOICE_LIST_ACTIONS } from 'modules/invoice/constants';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { PlusOutlined, DollarSquareIcon } from 'share-components';

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button, > a': {
    marginLeft: 16,
  },
}));

const InvoiceListActionButtons: React.FC = () => {
  const router = useRouter();

  const onButtonClick = useCallback(
    (action: string) => {
      router.push({ pathname: router.pathname, query: { ...router.query, action } }, undefined, { scroll: false });
    },
    [router],
  );

  return (
    <Actions>
      <Button
        color="whiteLight"
        startIcon={<PlusOutlined />}
        onClick={() => onButtonClick(INVOICE_LIST_ACTIONS.ADD_CREDIT_NOTE)}
      >
        New Credit Note
      </Button>
      <Button
        color="whiteLight"
        startIcon={<PlusOutlined />}
        onClick={() => onButtonClick(INVOICE_LIST_ACTIONS.ADD_DEBIT_NOTE)}
      >
        Debit Note
      </Button>
      <Button startIcon={<DollarSquareIcon />} onClick={() => onButtonClick(INVOICE_LIST_ACTIONS.ADD_INVOICE)}>
        Add New Invoice
      </Button>
    </Actions>
  );
};

export default InvoiceListActionButtons;
