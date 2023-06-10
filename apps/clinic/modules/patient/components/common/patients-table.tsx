import { Grid, IconButton, Typography } from '@mui/material';
import { getPatientEmail, getPatientIdentity, getPatientPhoneNumber } from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { useRouter } from 'next/router';
import React, { ReactNode, useCallback } from 'react';
import { AvixoTable, FolderAdd, MoreIcon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate } from 'share-components/src/utils/formatUtils';

const columns = (onRowClick: (uuid: string) => void, onDelete: (uuid: string) => void) =>
  [
    {
      id: 'id',
      field: 'id',
      label: 'PATIENT ID',
      alignLabel: 'left',
    },
    {
      id: 'name',
      field: 'name',
      label: 'Name',
      alignLabel: 'left',
      customRender: patient => (
        <Typography component="div" onClick={() => onRowClick(patient.uuid)} sx={{ cursor: 'pointer' }}>
          <Typography fontWeight="500">{patient.fullName}</Typography>
          <Typography variant="body2">Active</Typography>
        </Typography>
      ),
    },
    {
      id: 'contact',
      field: 'contact',
      label: 'Contact',
      alignLabel: 'left',
      customRender: patient => (
        <div>
          <Typography fontWeight="500">{getPatientPhoneNumber(patient.phones)}</Typography>
          <Typography variant="body2">{getPatientEmail(patient.emails)}</Typography>
        </div>
      ),
    },
    {
      id: 'identity',
      field: 'identity',
      label: 'IDENTITY NO.',
      alignLabel: 'left',
      customRender: patient => getPatientIdentity(patient.identities)?.value,
    },
    {
      id: 'dob',
      field: 'dob',
      label: 'DOB',
      alignLabel: 'left',
      customRender: patient => formatDate(patient.birthDate, 'dd MMM yyyy'),
    },
    {
      id: 'notes',
      field: 'notes',
      label: 'IMPORTANT NOTES',
      alignLabel: 'left',
    },
    {
      id: 'actions',
      field: 'actions',
      label: 'ACTIONS',
      alignLabel: 'left',
      customRender: patient => (
        <Grid container spacing={2}>
          <Grid item>
            <IconButton>
              <FolderAdd />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => onDelete(patient.uuid)}>
              <TrashIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ] as AvixoTableColumnProps<Patient>[];

export interface PatientsTableProps {
  patients: Patient[];
  emptyText?: string | ReactNode;
}

const PatientsTable: React.FC<PatientsTableProps> = ({ patients, emptyText }) => {
  const router = useRouter();

  const onRowClick = useCallback(
    (uuid: string) => {
      router.push(PAGE_URLS.PATIENT_DASHBOARD(uuid));
    },
    [router],
  );

  const onDelete = useCallback(
    (uuid: string) => {
      router.push({
        pathname: router.pathname,
        query: { action: 'delete-patient', patientUUID: uuid, listId: router.query.listId },
      });
    },
    [router],
  );

  return (
    <AvixoTable
      columns={columns(onRowClick, onDelete)}
      data={{ records: patients || [] }}
      primaryKey="id"
      hasSelectedFn
      mode="offline"
      emptyText={emptyText}
      name="list-of-patients"
    />
  );
};

export default PatientsTable;
