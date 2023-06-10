import { getFirstLetters } from '@AvixoUtils/stringUtils';
import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { getPatientIdentity } from 'modules/patient/services';
import { OptionDefault } from 'modules/prescription/components/PrescriptionForm/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { AvixoSearchBar, AvixoTable, Edit2Icon, PrintIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { neutral } from 'share-components/theme/default-theme';
import { Prescription } from '../../types/prescription';

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const tableColumns: Array<AvixoTableColumnProps<Prescription>> = [
  {
    id: 'prescriptionId',
    field: 'prescriptionId',
    label: 'Prescription ID',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 180,
      },
    },
    sort: true,
    customRender: value => <Typography variant="subtitle2">{value.prescriptionId}</Typography>,
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
        width: 220,
      },
    },
    sort: true,
    customRender: value => (
      <Box>
        <Typography variant="subtitle2">{formatDate(value?.createdAt, 'MM/dd/yyyy')}</Typography>
        <Typography variant="caption">{formatDate(value?.createdAt, 'pp')}</Typography>
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
    id: 'patientId',
    field: 'patientId',
    label: 'Patient Identity',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 180,
      },
    },
    customRender: ({ patient }) =>
      patient?.uuid ? (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          {getPatientIdentity(patient.identities)?.value}
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
      colSpan: 1,
      sx: {
        verticalAlign: 'top',
        pt: 4,
        width: 320,
      },
    },
    customRender: value =>
      value.items?.map((item, index) => (
        <div key={`dispense-item-${item.id}`}>
          <Typography variant="subtitle2">{`${index + 1}.${item.name !== '' ? item.name : 'Not Medicine'}`}</Typography>
          <ul
            style={{
              color: '#6B7280',
            }}
          >
            {item.instructions?.map(instruction => (
              <li key={`instruction-${instruction.id}`}>
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
      colSpan: 1,
      sx: {
        verticalAlign: 'top',
        width: 120,
        pt: 4,
      },
    },
    alignLabel: 'left',
    customRender: () => (
      <Grid container spacing={3} color={neutral[500]} alignItems="center">
        <Grid item>
          <Edit2Icon style={{ cursor: 'pointer' }} />
        </Grid>
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
const PrescriptionListTab: FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [dates, setDates] = React.useState<string | null>(null);
  const router = useRouter();
  return (
    <Box py={1}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">Select Date</InputLabel>
            <Select
              value={dates}
              onChange={e => setDates(e.target.value)}
              input={<OutlinedInput label="Select Date" />}
            >
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
          data={{ records: prescriptions }}
          primaryKey="id"
          emptyText="No Prescription have been created."
          mode="offline"
          hasCheckBoxHeader={false}
          onRowClick={(rowData: Prescription) => {
            router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(rowData?.patient?.uuid, rowData.uuid));
          }}
          hasPagination
        />
      </Box>
    </Box>
  );
};

export default PrescriptionListTab;
