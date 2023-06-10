import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { AvixoCard, AvixoTable, PrintIcon, PlusOutlined, Edit2Icon, EmailIcon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { useRouter } from 'next/router';
import { chart, neutral } from 'share-components/theme/default-theme';
import type { MedicalCertificate } from '../../types/medical-certificate';

interface MedicalCertificateListProps {
  medicalCertificates?: MedicalCertificate[];
}

const columns = (patientUUID: string) =>
  [
    {
      id: 'mcId',
      field: 'mcId',
      label: 'MC NO.',
      alignLabel: 'left',
      customRender: value => <Typography color={chart.blue5}>{value.mcId}</Typography>,
    },
    {
      id: 'createdAt',
      field: 'createdAt',
      label: 'Created',
      alignLabel: 'left',
      customRender: value => formatDate(value.createdAt, 'dd/MM/yyyy'),
    },
    {
      id: 'visitDate',
      field: 'visitDate',
      label: 'Visit Date',
      alignLabel: 'left',
      customRender: value => formatDate(value.visitDate, 'dd/MM/yyyy'),
    },
    {
      id: 'issuedDate',
      field: 'issuedDate',
      label: 'Issued Date',
      alignLabel: 'left',
      customRender: value => formatDate(value.issuedDate, 'dd/MM/yyyy'),
    },
    {
      id: 'startDate',
      field: 'startDate',
      label: 'Start Date',
      alignLabel: 'left',
      customRender: value => formatDate(value.startDate, 'dd/MM/yyyy'),
    },
    {
      id: 'endDate',
      field: 'endDate',
      label: 'End Date',
      alignLabel: 'left',
      customRender: value => formatDate(value.endDate, 'dd/MM/yyyy'),
    },
    {
      id: 'description',
      field: 'description',
      label: 'Description',
      alignLabel: 'left',
    },
    {
      id: 'type',
      field: 'type',
      label: 'Type',
      alignLabel: 'left',
    },
    {
      id: 'actions',
      field: 'actions',
      label: 'ACTIONS',
      alignLabel: 'left',
      customRender: item => (
        <Grid container spacing={3} color={neutral[500]} alignItems="center">
          <Grid item>
            <Link
              href={PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID, 'edit', item.id)}
              scroll={false}
            >
              <Edit2Icon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID, 'print', item.id)}
              target="_blank"
            >
              <PrintIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID, 'email', item.id)}
              scroll={false}
            >
              <EmailIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID, 'delete', item.id)}
              scroll={false}
            >
              <TrashIcon />
            </Link>
          </Grid>
        </Grid>
      ),
    },
  ] as AvixoTableColumnProps<MedicalCertificate>[];

const Actions = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  '& > button': {
    marginLeft: 16,
  },
}));

const MedicalCertificateList: React.FC<MedicalCertificateListProps> = ({ medicalCertificates = [] }) => {
  const router = useRouter();
  const patientUUID = router.query.patientUUID as string;

  return (
    <AvixoCard
      title="Medical Certificate"
      action={
        <Actions>
          <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID, 'add')} scroll={false}>
            <Button startIcon={<PlusOutlined />} color="neutral">
              New MC
            </Button>
          </Link>
        </Actions>
      }
    >
      <AvixoTable
        hasCheckBoxHeader={false}
        columns={columns(patientUUID)}
        data={{ records: medicalCertificates }}
        mode="offline"
      />
    </AvixoCard>
  );
};

export default MedicalCertificateList;
