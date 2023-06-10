import { formatDate } from '@AvixoUtils/formatUtils';
import { getFirstLetters } from '@AvixoUtils/stringUtils';
import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { Dispense } from 'modules/dispense/types/dispense';
import { getPatientIdentity } from 'modules/patient/services';
import { OptionDefault } from 'modules/prescription/components/PrescriptionForm/types';
import { Instruction } from 'modules/prescription/types/instruction';
import { Item } from 'modules/prescription/types/item';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { AvixoSearchBar, AvixoTable, Edit2Icon, PrintIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { neutral } from 'share-components/theme/default-theme';

interface DispenseListProps {
  dispenses: Dispense[];
}

const tableColumns: Array<AvixoTableColumnProps<Dispense>> = [
  {
    id: 'id',
    field: 'id',
    label: 'Dispensing ID',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 180,
      },
    },
    sort: true,
    customRender: dispense => <Typography variant="subtitle2">{dispense.id}</Typography>,
  },
  {
    id: 'createdAt',
    field: 'createdAt',
    label: 'Created Date',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 150,
      },
    },
    sort: true,
    customRender: dispense => (
      <Box>
        <Typography variant="subtitle2">{formatDate(dispense?.createdAt, 'MM/dd/yyyy')}</Typography>
        <Typography variant="caption">{formatDate(dispense?.createdAt, 'HH:mm a')}</Typography>
      </Box>
    ),
  },
  {
    id: 'name',
    field: 'name',
    label: 'NAME',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 200,
      },
    },
    customRender: value => {
      const { patient } = value;
      return patient?.uuid ? (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Avatar alt={patient.fullName} src={patient.photo} sx={{ bgcolor: '#BB2795' }}>
            <Typography
              variant="body1"
              component="span"
              sx={{
                fontSize: '11px',
              }}
            >
              {getFirstLetters(patient.fullName)}
            </Typography>
          </Avatar>
          <Box
            sx={{
              paddingLeft: '8px',
            }}
          >
            <Link href={PAGE_URLS.PATIENT_DASHBOARD(patient.uuid)}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'chart.blue5',
                }}
              >
                {patient.fullName}
              </Typography>
            </Link>
            <Typography variant="caption">Active</Typography>
          </Box>
        </Box>
      ) : (
        '-'
      );
    },
  },
  {
    id: 'nric',
    field: 'nric',
    label: 'ID Number',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 180,
      },
    },
    customRender: value =>
      value.patient ? (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          {getPatientIdentity(value.patient.identities)?.value}
        </Typography>
      ) : (
        '-'
      ),
  },
  {
    id: 'items',
    field: 'items',
    label: 'Medicine',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 320,
      },
    },
    customRender: dispense =>
      dispense.items?.map((item: Item, index: number) => (
        <div key={`dispense-item-${item.id}`}>
          <Typography variant="subtitle2">{`${index + 1}.${item.name !== '' ? item.name : 'Not Medicine'}`}</Typography>
          <ul
            style={{
              color: '#6B7280',
            }}
          >
            {item.instructions?.map((instruction: Instruction) => (
              <li key={instruction.id}>
                <Typography variant="caption">{instruction.text}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )),
  },
  {
    id: 'uuid',
    field: 'uuid',
    label: 'Actions',
    sort: true,
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 100,
      },
    },
    alignLabel: 'left',
    customRender: dispense => (
      <Grid container spacing={3} color={neutral[500]} alignItems="center">
        {dispense.patient?.id && (
          <Grid item>
            <Link href={PAGE_URLS.PATIENT_DISPENSING_DETAIL(dispense.patient?.uuid, dispense.uuid)}>
              <Edit2Icon style={{ cursor: 'pointer' }} />
            </Link>
          </Grid>
        )}
        <Grid item>
          <PrintIcon sx={{ cursor: 'pointer' }} />
        </Grid>
        {/* don't remove here, because can change request */}
        {/* <TrashIcon sx={{ color: '#6B7280', cursor: 'pointer' }} /> */}
      </Grid>
    ),
  },
];
const mockDates: OptionDefault[] = [
  {
    label: 'Date 1',
    value: 'date1',
  },
  {
    label: 'Date 2',
    value: 'date2',
  },
];
const DispensesListTab: FC<DispenseListProps> = ({ dispenses }) => {
  const router = useRouter();

  return (
    <Box py={1}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">Select Date</InputLabel>
            <Select input={<OutlinedInput label="Select Date" />}>
              {mockDates.map((date: OptionDefault) => (
                <MenuItem key={date.value} value={date.value}>
                  {date.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={8}>
          <AvixoSearchBar placeholder="Search Patient..." sx={{ marginBottom: '32px', flex: '8' }} />
        </Grid>
      </Grid>
      <Box mx={-3}>
        <AvixoTable
          columns={tableColumns}
          data={{
            records: dispenses,
          }}
          primaryKey="id"
          emptyText="No Prescription have been created."
          mode="offline"
          hasCheckBoxHeader={false}
          onRowClick={(rowData: Dispense) => {
            if (rowData?.patient?.uuid) {
              router.push(PAGE_URLS.PATIENT_DISPENSING_DETAIL(rowData?.patient?.uuid, rowData.uuid));
            }
          }}
          hasPagination
        />
      </Box>
    </Box>
  );
};

export default DispensesListTab;
