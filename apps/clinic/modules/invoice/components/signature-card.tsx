import React, { useCallback, useState } from 'react';
import { AvixoCard, Edit2Icon } from 'share-components';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SignatureForm from 'modules/invoice/components/InvoiceForm/signature-form';

export interface SignatureCardProps {
  onEdit?: () => void;
}

const SignatureDetail = styled(Paper)({
  ':hover': {
    background: 'rgba(80, 72, 229, 0.04)',
  },
});

const SignatureCard: React.FC<SignatureCardProps> = ({ onEdit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        customTitle={<Typography variant="h6">Signature</Typography>}
        sx={{
          minHeight: 'auto',
        }}
      >
        <SignatureDetail
          elevation={0}
          sx={{
            background: 'white',
            padding: 0,
          }}
        >
          <Typography variant="body2">There is no signature</Typography>
        </SignatureDetail>
      </AvixoCard>
      <SignatureForm
        open={isOpen}
        onCancel={useCallback(() => {
          setIsOpen(false);
        }, [])}
      />
    </>
  );
};

export default SignatureCard;
