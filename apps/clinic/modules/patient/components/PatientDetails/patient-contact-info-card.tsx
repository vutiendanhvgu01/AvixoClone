import { Box, IconButton, Stack, Typography } from '@mui/material';
import { getPatientAddress } from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { stringifyNumber } from 'share-components/src/utils/formatUtils';
import { DetailGroup } from './patient-card-styles';
import PatientDetailCard from './PatientDetailsLayout/patient-detail-card';

export interface PatientContactInfoCardProps {
  patient: Patient;
}

const PatientContactInfoCard: React.FC<PatientContactInfoCardProps> = ({ patient }) => (
  <PatientDetailCard
    bg="#F9F9F9"
    title="Patient's Contact"
    fullHeight
    bordered
    action={
      <Link href={PAGE_URLS.PATIENT_EDIT(patient.uuid, 2)}>
        <IconButton>
          <Edit2Icon />
        </IconButton>
      </Link>
    }
  >
    {patient.phones?.map(phone => (
      <DetailGroup
        key={phone.id}
        label="Phone Number"
        rightColWidth="100%"
        content={
          <Stack direction="row" justifyContent="space-between" width="100%" gap={3}>
            <Typography>{`+${phone.countryCode} ${phone.number}`}</Typography>
            {Array.isArray(patient.phones) && patient.phones.length > 1 && phone.preferred && (
              <Typography color="chart.blue5">Primary</Typography>
            )}
          </Stack>
        }
      />
    ))}
    {patient.emails?.map(email => (
      <DetailGroup
        key={email.id}
        rightColWidth="100%"
        label="Email Address"
        content={
          <Stack direction="column" justifyContent="space-between" width="100%">
            <Typography>{email.email}</Typography>
            {Array.isArray(patient.emails) && patient.emails?.length > 1 && email.preferred && (
              <Typography color="chart.blue5">Primary</Typography>
            )}
          </Stack>
        }
      />
    ))}
    {patient.addresses?.map((address, index) => (
      <DetailGroup
        label="Address"
        key={address.id}
        rightColWidth="100%"
        content={
          <Box>
            <Typography textTransform="capitalize">{`${stringifyNumber(index + 1)} Address`}</Typography>
            <Typography color="grey">{getPatientAddress(address, patient.nationality)}</Typography>
            {Array.isArray(patient.addresses) && patient.addresses?.length > 1 && address.isPrimary && (
              <Typography color="chart.blue5">Primary</Typography>
            )}
          </Box>
        }
      />
    ))}
  </PatientDetailCard>
);
export default PatientContactInfoCard;
