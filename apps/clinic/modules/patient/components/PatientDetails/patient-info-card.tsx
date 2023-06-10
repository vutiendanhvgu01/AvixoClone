import { Box, IconButton, Typography } from '@mui/material';
import { IDENTITY_ID_TYPE } from 'modules/patient/constants';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import { DetailGroup } from './patient-card-styles';
import PatientDetailCard from './PatientDetailsLayout/patient-detail-card';

export interface PatientInfoCardProps {
  patient: Patient;
}

const PatientInfoCardProps: React.FC<PatientInfoCardProps> = ({ patient }) => (
  <PatientDetailCard
    bg="#F9F9F9"
    title="Patient Information"
    bordered
    fullHeight
    action={
      <Link href={PAGE_URLS.PATIENT_EDIT(patient.uuid, 1)}>
        <IconButton>
          <Edit2Icon />
        </IconButton>
      </Link>
    }
  >
    <DetailGroup label="Patient ID" content={patient.id} />
    <DetailGroup label="Salutation" capitalize content={patient.salutation} />
    <DetailGroup label="Full Name" content={patient.fullName} />
    <DetailGroup label="Preferred Name" content={patient.preferredName} />
    <DetailGroup label="Date of Birth" content={formatDate(patient.birthDate, 'dd MMM yyyy')} />
    <DetailGroup label="Country of Birth" content={patient.placeOfBirth ? toTitleCase(patient.placeOfBirth) : ''} />
    <DetailGroup label="Country" content={patient.nationality ? toTitleCase(patient.nationality) : ''} />
    <DetailGroup label="Gender" content={toTitleCase(patient.gender)} />
    <DetailGroup
      label="Preferred Gender"
      content={patient.genderPreferred ? toTitleCase(patient.genderPreferred) : ''}
    />
    {patient.identities?.map((identity, index) => (
      <DetailGroup
        label="ID(S)"
        key={identity.id}
        rightColWidth="100%"
        content={
          <Box width="100%">
            <Typography>{IDENTITY_ID_TYPE[identity.idType]}</Typography>
            <Typography>{identity.idNumber}</Typography>
            <Typography color="grey">{identity.issuingCountry}</Typography>
            {index === 0 && patient.identities && patient.identities?.length > 1 && (
              <Typography color="chart.blue5">Primary</Typography>
            )}
          </Box>
        }
      />
    ))}
  </PatientDetailCard>
);
export default PatientInfoCardProps;
