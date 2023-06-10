import React, { FC, useMemo } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { AvixoFixedContainer } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';

export interface ReferralDrawerConfirmProps {
  type: 'fast-track' | 'GPFirst' | 'routine' | 'A&E/UCC' | null;
  action: 'update' | 'cancel' | 'add' | null;
  patient: Patient;
  onCancel?: () => void;
  onConfirm?: () => void;
}
type ReferralConfirmContentProps = Omit<ReferralDrawerConfirmProps, 'patient'>;

const CONTENT_CONFIRM: Record<string, string> = {
  'A&E/UCC':
    'If 995 is activated, the patient will be sent to the nearest appropriate A&E based on SCDF conveyance protocols.',
  GPFirst:
    'Please select your partner A&E/UCC for GPFirst referral. If 995 is activated, the patient will be sent to the nearest appropriate A&E based on SCDF conveyance protocols.',
};

const ReasonInput: FC = () => (
  <FormControl
    variant="standard"
    required
    fullWidth
    sx={{
      marginTop: '20px',
    }}
  >
    <TextField
      id="component-simple"
      label="Reason for cancellation"
      inputProps={{
        sx: {
          height: '150px',
        },
      }}
    />
  </FormControl>
);

const ReferralAction: FC<ReferralConfirmContentProps> = ({ action, onCancel, onConfirm }) => {
  const submit = useMemo(() => {
    switch (action) {
      case 'update':
        return 'Yes, save';
      case 'cancel':
        return 'Yes, cancel';

      default:
        return 'Yes, create';
    }
  }, [action]);
  const cancel = useMemo(() => {
    switch (action) {
      case 'update':
        return 'Cancel';
      case 'cancel':
        return 'Back';

      default:
        return 'No';
    }
  }, [action]);
  return (
    <Box
      sx={{
        textAlign: 'end',
        p: 4,
        borderTop: '1px solid #E6E8F0',
      }}
    >
      <Button
        variant="text"
        sx={{
          mr: 1,
        }}
        onClick={onCancel}
      >
        {cancel}
      </Button>
      <Button onClick={onConfirm}>{submit}</Button>
    </Box>
  );
};

const ReferralConfirmContent: FC<ReferralConfirmContentProps> = ({ type, action }) => {
  switch (action) {
    case 'update':
    case 'cancel':
      return (
        <>
          <Typography variant="body2">Please provide reason for the changes.</Typography>
          <ReasonInput />
        </>
      );

    default:
      return type ? <Typography variant="body2">{CONTENT_CONFIRM[type]}</Typography> : null;
  }
};

const ReferralDrawerConfirm: FC<ReferralDrawerConfirmProps> = props => {
  const { action, onCancel, ...restProps } = props;

  const title = useMemo(() => {
    switch (action) {
      case 'update':
        return 'Update Referral?';
      case 'cancel':
        return 'Cancel Referral?';

      default:
        return 'Create Referral';
    }
  }, [action]);

  return (
    <AvixoFixedContainer display title={title} onClose={onCancel}>
      <Stack sx={{ height: '100%' }} justifyContent="space-between">
        <Box sx={{ p: 4, pt: 0 }}>
          <ReferralConfirmContent action={action} {...restProps} />
        </Box>
        <ReferralAction action={action} onCancel={onCancel} {...restProps} />
      </Stack>
    </AvixoFixedContainer>
  );
};

export default ReferralDrawerConfirm;
