import React, { FC, useCallback } from 'react';
import { Button, Chip, Typography } from '@mui/material';
import { AvixoCard, AvixoTable, PlusOutlined } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import Link from 'next/link';
import { chart } from 'share-components/theme/default-theme';
import CareReport from '../care-report-types';

const tableColumns: Array<AvixoTableColumnProps> = [
  {
    id: 'reportId',
    field: 'reportId',
    label: 'Report ID.',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 160,
      },
    },
    customRender: value => <Typography color={chart.blue5}>{value.reportId}</Typography>,
  },
  {
    id: 'status',
    field: 'status',
    label: 'Status',
    alignLabel: 'left',
    customRender: value => <Chip label={value.status} color="successLight" />,
  },
  {
    id: 'createdAt',
    field: 'createdAt',
    label: 'Created Date',
    alignLabel: 'left',
    customRender: value => formatDate(value.createdAt, 'dd/MM/yyyy'),
  },
  {
    id: 'issueDate',
    field: 'issueDate',
    label: 'IssueD Date',
    alignLabel: 'left',
    customRender: value => formatDate(value.createdAt, 'dd/MM/yyyy'),
  },
  {
    id: 'submittedBy',
    field: 'submittedBy',
    label: 'Submitted by',
    alignLabel: 'left',
  },
];

export interface CareReportListProps {
  careReports: CareReport[];
}

const CareReportList: FC<CareReportListProps> = ({ careReports }) => {
  const router = useRouter();
  const { patientUUID } = router.query;

  const onRowClick = useCallback(
    (careReport: CareReport) => {
      router.push(PAGE_URLS.PATIENT_MEDICAL_RECORD_CARE_REPORT(patientUUID?.toString() || '', 'view', careReport.id));
    },
    [patientUUID, router],
  );

  return (
    <AvixoCard
      title="Care Report"
      action={
        <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_CARE_REPORT(patientUUID?.toString() || '', 'add')}>
          <Button startIcon={<PlusOutlined />} color="neutral">
            Care Report
          </Button>
        </Link>
      }
    >
      <AvixoTable
        columns={tableColumns}
        data={{ records: careReports }}
        primaryKey="id"
        emptyText="No Care Report have been created."
        mode="offline"
        onRowClick={onRowClick}
        hasCheckBoxHeader={false}
        hasPagination={false}
      />
    </AvixoCard>
  );
};

export default CareReportList;
