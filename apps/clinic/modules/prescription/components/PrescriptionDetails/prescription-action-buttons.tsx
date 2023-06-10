import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';
import { ActionFinaliseIcon, PlusOutlined, StartDispensingIcon, TrashOutlineIcon } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import type { Prescription } from 'modules/prescription/types/prescription';
import { Dispense } from 'modules/dispense/types/dispense';

interface PrescriptionActionButtonsProps {
  patient: Patient;
  prescription: Prescription;
  dispense?: Dispense;
}

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button': {
    marginLeft: 16,
  },
}));

const PrescriptionActionButtons: FC<PrescriptionActionButtonsProps> = ({ patient, prescription, dispense }) => {
  const router = useRouter();
  const theme = useTheme();
  const patientUUID = patient.uuid;

  const goToPrescriptionAction = useCallback(
    (action: string) => {
      router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID, prescription.uuid, action));
    },
    [router, prescription, patientUUID],
  );

  const goToDispensingPage = useCallback(() => {
    if (dispense) {
      router.push(PAGE_URLS.PATIENT_DISPENSING_DETAIL(patientUUID, dispense.uuid));
    }
  }, [router, dispense, patientUUID]);

  const isFinalState = useCallback(() => !prescription.isDraft, [prescription]);

  return (
    <Actions>
      <Button
        startIcon={<TrashOutlineIcon />}
        color="whiteLight"
        onClick={() => goToPrescriptionAction('delete-prescription')}
        sx={{
          '&.Mui-disabled': {
            backgroundColor: 'whiteLight.main',
            color: formatHexToRGBA('#FFFFFF', 0.5),
          },
        }}
      >
        Delete Prescription
      </Button>
      <Button
        startIcon={<PlusOutlined />}
        color="whiteLight"
        onClick={() => {
          router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL_ADD_ITEM(patient.uuid, prescription.uuid));
        }}
        sx={{
          '&.Mui-disabled': {
            backgroundColor: 'whiteLight.main',
            color: formatHexToRGBA('#FFFFFF', 0.5),
          },
        }}
        disabled={isFinalState()}
      >
        Add Item
      </Button>
      <Button
        startIcon={<ActionFinaliseIcon />}
        onClick={() => goToPrescriptionAction('finalise')}
        sx={{
          color: theme.palette.primary.contrastText,
          backgroundColor: 'chart.blue4',
          marginLeft: 2,
          '&.Mui-disabled': {
            backgroundColor: 'whiteLight.main',
            color: formatHexToRGBA('#FFFFFF', 0.5),
          },
        }}
        disabled={isFinalState()}
      >
        {isFinalState() ? 'Finalised' : 'Finalise'}
      </Button>
      <Button
        startIcon={
          <StartDispensingIcon
            sx={{
              transform: 'translateY(1px)',
            }}
          />
        }
        sx={{
          '&.Mui-disabled': {
            background: '#C1AFE8',
            color: '#806EA8',
          },
        }}
        onClick={goToDispensingPage}
        disabled={!isFinalState()}
      >
        Start Dispensing
      </Button>
    </Actions>
  );
};

export default PrescriptionActionButtons;
