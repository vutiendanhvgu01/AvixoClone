import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { PlusOutlined } from 'share-components';
import { useRouter } from 'next/router';

export const Actions = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  '> button': {
    marginLeft: 16,
  },
}));

interface InvoiceItemsListActionsProps {
  onAddService: () => void;
}

const InvoiceItemsListActions: React.FC<InvoiceItemsListActionsProps> = ({
  onAddService,
}: InvoiceItemsListActionsProps) => {
  const router = useRouter();

  const goToAction = useCallback(
    (action: string) => {
      const { query } = router;
      router.push({ pathname: router.pathname, query: { ...query, action } });
    },
    [router],
  );

  return (
    <Actions>
      <Button color="neutral" onClick={() => onAddService()} startIcon={<PlusOutlined />}>
        New Service
      </Button>
      <Button color="neutral" startIcon={<PlusOutlined />} onClick={() => goToAction('add-medicine')}>
        New Medicine
      </Button>
      <Button color="neutral" startIcon={<PlusOutlined />} onClick={() => goToAction('add-package')}>
        New Package
      </Button>
    </Actions>
  );
};

export default InvoiceItemsListActions;
