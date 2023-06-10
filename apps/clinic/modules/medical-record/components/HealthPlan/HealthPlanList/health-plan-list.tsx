import React, { FC, useCallback } from 'react';
import { Typography, Button } from '@mui/material';
import { AvixoCard, AvixoTable, PlusOutlined } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { useClinicContext } from 'contexts/clinic-context';
import type HealthPlanItemType from './health-plan-types';

interface HealthPlanListProps {
  items: HealthPlanItemType[];
}

const tableColumns: Array<AvixoTableColumnProps<HealthPlanItemType>> = [
  {
    id: 'id',
    field: 'id',
    label: 'No.',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 75,
      },
    },
  },
  {
    id: 'createdAt',
    field: 'createdAt',
    label: 'Created Date & Time',
    alignLabel: 'left',
    customRender: value => (
      <Typography variant="body1">{`${formatDate(value.createdAt, "dd MMMM yyyy 'at' hh:mm a")}`}</Typography>
    ),
  },
  {
    id: 'nextCheckin',
    field: 'nextCheckin',
    label: 'Next check in',
    alignLabel: 'left',
    customRender: value => {
      const nextCheckin = formatDate(value.nextCheckin, 'MMMM yyyy');
      return <Typography variant="body1">{`${nextCheckin || '-'}`}</Typography>;
    },
  },
  {
    id: 'clinic',
    field: 'clinic',
    label: 'Clinic',
    alignLabel: 'left',
  },
];

const HealthPlanList: FC<HealthPlanListProps> = ({ items }) => {
  const router = useRouter();
  const { patient } = useClinicContext();
  const { patientUUID } = router.query;

  const onRowClick = useCallback(
    (healthPlan: HealthPlanItemType) => {
      router.push(PAGE_URLS.PATIENT_MEDICAL_RECORD_HEALTH_PLAN(patientUUID?.toString() || '', 'view', healthPlan.uuid));
    },
    [patientUUID, router],
  );

  return (
    <AvixoCard
      title="HSG Health Plan"
      action={
        <form method="POST">
          <input type="hidden" name="action" value="create-care-plan" />
          <input type="hidden" name="patientId" value={patient?.id} />
          <Button startIcon={<PlusOutlined />} color="neutral" type="submit">
            New Health Plan
          </Button>
        </form>
      }
    >
      <AvixoTable
        columns={tableColumns}
        data={{ records: items }}
        primaryKey="id"
        emptyText="No health plan have been created."
        mode="offline"
        onRowClick={onRowClick}
        hasCheckBoxHeader={false}
        hasPagination={false}
      />
    </AvixoCard>
  );
};

export default HealthPlanList;
