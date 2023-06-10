import { Button } from '@mui/material';
import React from 'react';
import { BottomBox, CenterBox, FooterText, SaveUpdateButton } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

interface PremiseFormActionProps extends PremiseFormDetailProps {
  title?: string;
  btnSubmitText?: string;
}
const PremiseFormAction: React.FC<PremiseFormActionProps> = ({
  title,
  isEdit,
  onBack,
  onNext,
  onCancel,
  btnSubmitText,
}) =>
  !isEdit ? (
    <BottomBox
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <CenterBox
        sx={{
          width: '48%',
        }}
      >
        <FooterText
          sx={{
            color: 'neutral.500',
          }}
        >
          {title}
        </FooterText>
      </CenterBox>
      <CenterBox
        sx={{
          marginRight: '15px',
        }}
      >
        <Button
          variant="text"
          size="medium"
          onClick={() => {
            onBack?.();
          }}
        >
          Back
        </Button>
        <Button
          size="medium"
          type={btnSubmitText ? 'submit' : 'button'}
          sx={{ ml: 1 }}
          onClick={() => {
            onNext?.();
          }}
        >
          {btnSubmitText || 'Next'}
        </Button>
      </CenterBox>
    </BottomBox>
  ) : (
    <BottomBox
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          onCancel?.();
        }}
      >
        Cancel
      </Button>
      <SaveUpdateButton />
    </BottomBox>
  );

export default PremiseFormAction;
