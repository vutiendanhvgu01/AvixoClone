import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dispense } from 'modules/dispense/types/dispense';
import { DISPENSE_DETAILS_ACTION } from 'modules/dispense/constants';
import { useRouter } from 'next/router';
import React, { useRef, useCallback } from 'react';
import {
  PlusOutlined,
  ClockIcon,
  OutlinedPrintIcon,
  DollarSquareIcon,
  ClipboardTickIcon,
  TrashOutlineIcon,
} from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';

export interface DispenseActionProps {
  dispense: Dispense;
  onHistoryClick?: () => void;
  onFinaliseClick?: () => void;
}

const FinaliseButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette?.chart?.blue5,
}));

const InvoicingButton = styled(Button)(() => ({
  backgroundColor: '#482393',
}));

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button': {
    marginLeft: 16,
  },
  '> form': {
    marginLeft: 16,
  },
}));

const DispenseDetailsActionButtons = (props: DispenseActionProps) => {
  const colorDisable = '#806EA8';
  const backgroundDisable = '#C1AFE8';
  const { dispense, onHistoryClick, onFinaliseClick } = props;
  const router = useRouter();
  const patientUUID = router.query.patientUUID as string;
  const dispenseUUID = router.query.dispenseUUID as string;

  const formRef = useRef<HTMLFormElement | null>(null);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleFinalise = useCallback(() => {
    if (onFinaliseClick) {
      onFinaliseClick();
    }
  }, [onFinaliseClick]);

  const goToDispenseAction = useCallback(
    (action: string) => {
      router.push(PAGE_URLS.PATIENT_DISPENSING_DETAIL(patientUUID, dispenseUUID, action));
    },
    [router, dispenseUUID, patientUUID],
  );

  const isFinalised = useCallback(() => !dispense?.isDraft, [dispense]);
  return (
    <Actions>
      <Button
        color="whiteLight"
        startIcon={<TrashOutlineIcon />}
        sx={{
          '&.Mui-disabled': {
            backgroundColor: 'whiteLight.main',
            color: formatHexToRGBA('#FFFFFF', 0.5),
          },
        }}
        onClick={() => goToDispenseAction(DISPENSE_DETAILS_ACTION.DELETE_DISPENSE)}
      >
        Delete Dispense
      </Button>
      <Button
        color="whiteLight"
        startIcon={<PlusOutlined />}
        disabled={isFinalised()}
        sx={{
          '&.Mui-disabled': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.5)',
          },
        }}
        onClick={() => goToDispenseAction(DISPENSE_DETAILS_ACTION.ADD_ITEM)}
      >
        Add Item
      </Button>

      <Button color="whiteLight" startIcon={<ClockIcon />} onClick={onHistoryClick}>
        History
      </Button>
      <Button color="whiteLight" startIcon={<OutlinedPrintIcon />}>
        Print
      </Button>
      <FinaliseButton
        startIcon={<ClipboardTickIcon />}
        disabled={isFinalised()}
        sx={{
          '&.Mui-disabled': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.5)',
          },
        }}
        onClick={() => handleFinalise()}
      >
        {isFinalised() ? 'Finalised' : 'Finalise'}
      </FinaliseButton>
      <form
        ref={formRef}
        method="post"
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <InvoicingButton
          startIcon={<DollarSquareIcon />}
          disabled={!isFinalised()}
          sx={{
            '&.Mui-disabled': {
              background: backgroundDisable,
              color: colorDisable,
            },
          }}
          type="submit"
        >
          Start Invoicing
        </InvoicingButton>
        <input type="text" hidden name="action" value="start-invoicing" />
        <input type="text" hidden name="dispenseUUID" value={dispenseUUID} />
      </form>
    </Actions>
  );
};

export default DispenseDetailsActionButtons;
