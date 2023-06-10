import React, { FC } from 'react';
import { Box, Typography, styled, Grid, IconButton } from '@mui/material';
import { AvixoTable, Edit2Icon, PrintIcon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { Item } from 'modules/prescription/types/item';
import { Instruction } from 'modules/prescription/types/instruction';
import { Patient } from 'modules/patient/types/patient';
import { Dispense } from 'modules/dispense/types/dispense';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';

interface PrescriptionMedicationsTableProps {
  prescriptions: Item[];
  emptyText?: string;
  patient: Patient;
  dispense: Dispense;
}

const LOCAL_DATE_FORMAT = 'dd/MM/yyyy';

// comment -> for using later
// const DISPENSED_STATUS_MAP: {
//   [key: string]: {
//     label: string;
//     color: 'success' | 'warning' | 'error';
//   };
// } = {
//   FULLY_DISPENSED: {
//     label: 'Fully Dispensed',
//     color: 'success',
//   },
//   PARTIALLY_DISPENSED: {
//     label: 'Partially Dispensed',
//     color: 'warning',
//   },
//   NOT_DISPENSED: {
//     label: 'Not Dispensed',
//     color: 'error',
//   },
// };

const FixedBox = styled(Box)(() => ({
  height: '76px',
  margin: '6px 0',
  overflow: 'hidden',
}));

const tableColumns = (patient: Patient, dispense: Dispense): Array<AvixoTableColumnProps<Item>> => [
  {
    id: 'name',
    field: 'name',
    label: 'Item',
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
    id: 'prescibedQty',
    field: 'prescibedQty',
    label: 'Prescibed Qty',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 120,
        verticalAlign: 'top',
      },
    },
    sort: true,
    customRender: value => (
      <Typography variant="body1">
        {value.quantity} {value.unitOfMeasurement}
      </Typography>
    ),
  },
  {
    id: 'dispensedQty',
    field: 'dispensedQty',
    label: 'Dispensed Qty',
    alignLabel: 'left',
    sort: true,
  },
  {
    id: 'balancedQty',
    field: 'balancedQty',
    label: 'Balanced Qty',
    alignLabel: 'left',
    sort: true,
  },
  {
    id: 'duration',
    field: 'duration',
    label: 'Duration',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 120,
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
        width: 120,
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
        minWidth: 360,
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
    field: 'additional',
    label: 'Indication',
    sort: true,
    alignLabel: 'left',
    customRender: value =>
      value.instructions?.map((instruction: Instruction) => (
        <FixedBox key={`indication_${instruction.id}`}>
          <Typography variant="subtitle2">{instruction.additional}</Typography>
        </FixedBox>
      )),
  },
  {
    id: 'precaution',
    field: 'precaution',
    label: 'Precaution',
    sort: true,
    alignLabel: 'left',
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
    id: 'dispensedDate',
    field: 'dispensedDate',
    label: 'Dispensed Date',
    sort: true,
    alignLabel: 'left',
  },
  {
    id: 'dispensedBy',
    field: 'dispensedBy',
    label: 'Dispensed By',
    sort: true,
    alignLabel: 'left',
  },
  {
    id: 'dispensed',
    field: 'dispensed',
    label: 'Dispensed',
    sort: true,
    alignLabel: 'left',
    customRender: () => <div />,
  },
  {
    id: 'medicationId',
    field: 'medicationId',
    label: 'Actions',
    sort: true,
    alignLabel: 'left',
    customRender: item => (
      <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
        <Grid item>
          <Link
            href={`${PAGE_URLS.PATIENT_DISPENSING_DETAIL(patient.uuid, dispense.uuid, 'edit-item')}&itemId=${item.ID}`}
          >
            <IconButton disabled={!dispense.isDraft}>
              <Edit2Icon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Link
            href={`${PAGE_URLS.PATIENT_DISPENSING_DETAIL(patient.uuid, dispense.uuid, 'delete-item')}&itemId=${
              item.ID
            }`}
          >
            <IconButton disabled={!dispense.isDraft}>
              <TrashIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <IconButton>
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
    ),
  },
];

const PrescriptionMedicationsTable: FC<PrescriptionMedicationsTableProps> = ({
  prescriptions,
  emptyText,
  patient,
  dispense,
}) => (
  <Box sx={{ mx: -3 }}>
    <AvixoTable
      columns={tableColumns(patient, dispense)}
      data={{ records: prescriptions }}
      primaryKey="id"
      emptyText={emptyText ?? 'No Prescription have been created.'}
      mode="offline"
      hasCheckBoxHeader={false}
      orderByField="id"
    />
  </Box>
);

export default PrescriptionMedicationsTable;
