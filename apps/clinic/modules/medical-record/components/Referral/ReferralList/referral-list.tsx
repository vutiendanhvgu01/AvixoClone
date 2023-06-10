import { Box, Button } from '@mui/material';
import { AvixoCard, AvixoTable, PlusOutlined } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import Link from 'next/link';
import type { Referral } from '../../../types/referral';

export interface ReferralListProps {
  referrals?: Referral[];
  patientUUID: string;
}

const columns = [
  {
    id: 'template',
    field: 'template',
    label: 'Template name',
    alignLabel: 'left',
    customRender: referral => (referral?.hsgInstitutionName ? '' : 'Default template'),
  },
  {
    id: 'id',
    field: 'id',
    label: 'Referral ID',
    alignLabel: 'left',
  },
  {
    id: 'hsgInstitutionName',
    field: 'hsgInstitutionName',
    label: 'Referred Institution',
    alignLabel: 'left',
    sort: true,
  },
  {
    id: 'specialty',
    field: 'specialty',
    label: 'Speciality/service',
    alignLabel: 'left',
    sort: true,
  },
  {
    id: 'referralType',
    field: 'referralType',
    label: 'Type of referral',
    alignLabel: 'left',
    sort: true,
    customRender: referral => (referral?.hsgInstitutionName ? referral.referralType?.name : ''),
  },

  {
    id: 'createdAt',
    field: 'createdAt',
    label: 'Referral date & Time',
    alignLabel: 'left',
    sort: true,
    customRender: referral => formatDate(referral.createdAt, "dd MMM, yyyy 'at' hh:mm a"),
  },
  {
    id: 'updatedAt',
    field: 'updatedAt',
    label: 'Last updated',
    alignLabel: 'left',
    sort: true,
    customRender: referral => formatDate(referral.updatedAt, "dd MMM, yyyy 'at' hh:mm a"),
  },
] as AvixoTableColumnProps<Referral>[];

const Actions = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  '& > a': {
    marginLeft: 16,
  },
}));

const ReferralList: React.FC<ReferralListProps> = ({ patientUUID, referrals = [] }) => {
  const router = useRouter();

  const goToReferalDetailsPage = useCallback(
    (referral: Referral) => {
      router.push(PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patientUUID, 'view', null, referral.id));
    },
    [router, patientUUID],
  );

  return (
    <AvixoCard
      title="Referral"
      action={
        <Actions>
          <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patientUUID, 'add', 'hsg')}>
            <Button startIcon={<PlusOutlined />} color="neutral">
              HSG Referral
            </Button>
          </Link>

          <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patientUUID, 'add', 'template')}>
            <Button startIcon={<PlusOutlined />} color="neutral">
              Select Template
            </Button>
          </Link>
        </Actions>
      }
    >
      <AvixoTable
        onRowClick={goToReferalDetailsPage}
        hasCheckBoxHeader={false}
        columns={columns}
        primaryKey="id"
        data={{ records: referrals }}
        mode="offline"
        hasPagination={false}
      />
    </AvixoCard>
  );
};

export default ReferralList;
