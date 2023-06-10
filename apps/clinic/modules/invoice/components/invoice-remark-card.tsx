import React, { useCallback, useState } from 'react';
import { AvixoCard, Edit2Icon } from 'share-components';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InvoiceRemarkForm from 'modules/invoice/components/InvoiceForm/invoice-remark';

export interface InvoiceRemarkCardProps {
  onEdit?: () => void;
  createdBy?: string;
  createdAt?: string;
}

const InvoiceRemarkDetail = styled(Paper)({
  ':hover': {
    background: 'rgba(80, 72, 229, 0.04)',
  },
});

const InvoiceRemarkCard: React.FC<InvoiceRemarkCardProps> = ({ createdAt, createdBy, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AvixoCard
        action={
          <Edit2Icon
            onClick={useCallback(() => {
              setIsOpen(true);
            }, [])}
          />
        }
        customTitle={<Typography variant="h6">Invoice Comment</Typography>}
        sx={{
          minHeight: 'auto',
        }}
      >
        <InvoiceRemarkDetail
          elevation={0}
          sx={{
            background: 'white',
            padding: 0,
          }}
        >
          <Typography variant="body2">There is no invoice comment</Typography>
        </InvoiceRemarkDetail>
      </AvixoCard>
      <InvoiceRemarkForm
        open={isOpen}
        onCancel={useCallback(() => {
          setIsOpen(false);
        }, [])}
      />
    </>
  );
};

export default InvoiceRemarkCard;
