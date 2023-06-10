import { IconButton } from '@mui/material';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { DetailGroup } from './patient-card-styles';
import PatientDetailCard from './PatientDetailsLayout/patient-detail-card';

export interface PatientOtherInfoCardProps {
  patient: Patient;
}

const PatientOtherInfoCard: React.FC<PatientOtherInfoCardProps> = ({ patient }) => (
  <PatientDetailCard
    bg="#F9F9F9"
    sx={{
      border: '1px solid #E6E8F0',
    }}
    title="Additional Information"
    bordered
    fullHeight
    action={
      <Link href={PAGE_URLS.PATIENT_EDIT(patient.uuid, 3)}>
        <IconButton>
          <Edit2Icon />
        </IconButton>
      </Link>
    }
  >
    <DetailGroup label="Religion" content={patient.religion} capitalize />
    <DetailGroup label="Race" content={patient.race} capitalize />
    <DetailGroup label="Occupations" content={patient.occupation} capitalize />
    <DetailGroup label="Company" content={patient.company} capitalize />
    <DetailGroup label="Marital Status" content={patient.maritalStatus} capitalize />
    <DetailGroup label="Residential Status" content={patient.residencyStatus} capitalize />
    <DetailGroup label="Important Notes" content={patient.notes} />
  </PatientDetailCard>
);

export default PatientOtherInfoCard;
