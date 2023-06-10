import { Avatar, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { getPatientEmail, getPatientIdentity, getPatientPhoneNumber } from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { useRouter } from 'next/router';
import React, { ReactNode, useCallback, useState } from 'react';
import { AvixoTable, CalendarIcon } from 'share-components';
import QueueIcon from '@AvixoIcons/queue-icon';
import ReceiptIcon from '@AvixoIcons/receipt-icon';
import PaymentIcon from '@AvixoIcons/payment-icon';
import MCIcon from '@AvixoIcons/mc-icon';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { getFirstLetters } from 'share-components/src/utils/stringUtils';
import Link from 'next/link';
import PatientManagementAction from './patient-management-action';

const columns = (setPatientAction: (data: { patient: Patient | null; action: string }) => void) =>
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={patient.fullName} sx={{ bgcolor: '#5D34C6' }}>
            {getFirstLetters(patient.fullName)}
          </Avatar>
          <Box sx={{ ml: 1.5 }}>
            <Typography fontWeight="500">{patient.fullName}</Typography>
            <Typography variant="body2" color="neutral.500">
              Active
            </Typography>
          </Box>
        </Box>
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
          <Typography variant="body2" color="neutral.500">
            {getPatientEmail(patient.emails)}
          </Typography>
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
          <Grid item alignContent="center">
            <form method="POST">
              <input type="hidden" name="action" value="create-prescription" />
              <input type="hidden" name="isDraft" value="true" />
              <input type="hidden" name="patientId" value={patient.id} />
              <input type="hidden" name="patientUUID" value={patient.uuid} />
              <Tooltip title="Add prescription">
                <IconButton type="submit">
                  <ReceiptIcon />
                </IconButton>
              </Tooltip>
            </form>
          </Grid>
          <Grid item>
            <Tooltip title="Add to queue">
              <IconButton onClick={() => setPatientAction({ patient, action: 'add-to-queue' })}>
                <QueueIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add appointment">
              <IconButton onClick={() => setPatientAction({ patient, action: 'add-appointment' })}>
                <CalendarIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD(patient.uuid)}>
              <Tooltip title="View Medical Record">
                <IconButton>
                  <MCIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Tooltip title="Add Invoice">
              <IconButton onClick={() => setPatientAction({ patient, action: 'add-invoice' })}>
                <PaymentIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    },
  ] as AvixoTableColumnProps<Patient>[];

export interface PatientManagementTableProps {
  patients: Patient[];
  emptyText?: string | ReactNode;
}

const PatientManagementTable: React.FC<PatientManagementTableProps> = ({ patients, emptyText }) => {
  const router = useRouter();
  const [patientAction, setPatientAction] = useState<{ action: string; patient: Patient | null }>({
    patient: null,
    action: '',
  });

  const onRowClick = useCallback(
    (patient: Patient) => {
      router.push(PAGE_URLS.PATIENT_DASHBOARD(patient.uuid));
    },
    [router],
  );

  const resetPatientAction = useCallback(() => {
    setPatientAction({ patient: null, action: '' });
  }, []);

  return (
    <>
      {patientAction.patient && (
        <PatientManagementAction
          action={patientAction.action}
          patient={patientAction.patient}
          onCancel={resetPatientAction}
        />
      )}
      <AvixoTable
        columns={columns(setPatientAction)}
        data={{ records: patients || [] }}
        primaryKey="id"
        hasSelectedFn
        mode="offline"
        onRowClick={onRowClick}
        emptyText={emptyText}
        name="list-of-patients"
        hasPagination
      />
    </>
  );
};

export default PatientManagementTable;
