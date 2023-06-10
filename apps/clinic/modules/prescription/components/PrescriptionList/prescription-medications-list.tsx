import { Box, styled, Typography } from '@mui/material';
import { Patient } from 'modules/patient/types/patient';
import { Prescription } from 'modules/prescription/types/prescription';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { AvixoTable, Edit2Icon, PrintIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { neutral } from 'share-components/theme/default-theme';
import { Instruction } from '../../types/instruction';
import { Item } from '../../types/item';

const LOCAL_DATE_FORMAT = 'dd/MM/yyyy';

interface PrescriptionMedicationsListProps {
  prescriptionMedications: Item[];
  patient: Patient;
  prescription: Prescription;
}

const FixedBox = styled(Box)(() => ({
  height: '76px',
  margin: '6px 0',
  overflow: 'hidden',
}));

const tableColumns = (
  handleClickItem: (itemId: number, action: 'edit' | 'delete') => void,
): Array<AvixoTableColumnProps<Item>> => [
  {
    id: 'name',
    field: 'name',
    label: 'Drug',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 260,
        verticalAlign: 'top',
      },
    },
    sort: true,
  },
  {
    id: 'totalQty',
    field: 'totalQty',
    label: 'Prescribed',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 120,
        verticalAlign: 'top',
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`total-qty-${instruction.id}`}>
          <Typography variant="subtitle2">
            {instruction.maxDose} {value.maxDoseDurationUnit || 'Tab/s'}
          </Typography>
        </FixedBox>
      )),
  },
  {
    id: 'duration',
    field: 'duration',
    label: 'Duration',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 190,
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`duration_${instruction.id}`}>
          <Typography variant="body1">{`${instruction.duration} ${
            instruction.maxDoseDurationUnit || 'Day/s'
          }`}</Typography>
          {instruction.validFrom && instruction.validTo && (
            <Typography variant="caption">
              {`${formatDate(instruction.validFrom, LOCAL_DATE_FORMAT)} - ${formatDate(
                instruction.validTo,
                LOCAL_DATE_FORMAT,
              )}`}
            </Typography>
          )}
        </FixedBox>
      )),
  },
  {
    id: 'dosageQty',
    field: 'dosageQty',
    label: 'Dosage Qty',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 140,
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`dosageQty_${instruction.id}`}>
          <Typography variant="body1">{`${instruction.dose} ${instruction.doseUnit || 'Tab/s'}`}</Typography>
        </FixedBox>
      )),
  },
  {
    id: 'frequency',
    field: 'frequency',
    label: 'Frequency',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 160,
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`frequency_${instruction.id}`}>
          <Typography variant="subtitle2">{instruction.timingFrequency}</Typography>
        </FixedBox>
      )),
  },
  {
    id: 'indication',
    field: 'indication',
    label: 'Indication',
    sort: true,
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 180,
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`indication_${instruction.id}`}>
          <Typography variant="subtitle2">{instruction.additional}</Typography>
        </FixedBox>
      )),
  },
  {
    id: 'routeOfAdministration',
    field: 'routeOfAdministration',
    label: 'Route OF ADMINISTRATION',
    sort: true,
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 230,
      },
    },
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`routeOfAdministration_${instruction.id}`}>
          <Typography variant="body1">{instruction.routeName}</Typography>
        </FixedBox>
      )),
  },
  {
    id: 'dispensed',
    field: 'dispensed',
    label: 'Dispensed',
    sort: true,
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 160,
      },
    },
    customRender: () => <div />,
  },
  {
    id: 'medicationId',
    field: 'medicationId',
    label: 'Actions',
    sort: true,
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 160,
      },
    },
    customRender: values => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          color: neutral[500],
          svg: {
            cursor: 'pointer',
          },
        }}
      >
        {/* Check dispense status to enable/disable buttons */}
        <Edit2Icon
          onClick={() => {
            if (handleClickItem) {
              handleClickItem(values.id, 'edit');
            }
          }}
        />
        <PrintIcon />
      </Box>
    ),
  },
];

const PrescriptionMedicationsList: FC<PrescriptionMedicationsListProps> = ({
  prescriptionMedications,
  patient,
  prescription,
}) => {
  const router = useRouter();

  const handleClickItem = (itemId: number, action: 'edit' | 'delete') => {
    router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL_ITEM(patient.uuid, prescription.uuid, itemId, action));
  };

  return (
    <Box sx={{ mx: -3 }}>
      <AvixoTable
        columns={tableColumns(handleClickItem)}
        data={{ records: prescriptionMedications }}
        primaryKey="id"
        emptyText="No Prescription Medications have been created."
        mode="offline"
        hasCheckBoxHeader={false}
        orderByField="id"
      />
    </Box>
  );
};

export default PrescriptionMedicationsList;
