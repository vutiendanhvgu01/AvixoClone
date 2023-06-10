import { Box, IconButton, Stack, Typography } from '@mui/material';
import { getPatientAddress } from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { formatDate, stringifyNumber } from 'share-components/src/utils/formatUtils';
import { DetailGroup } from './patient-card-styles';
import PatientDetailCard from './PatientDetailsLayout/patient-detail-card';

export interface PatientOtherContactCardProps {
  patient: Patient;
}
const DATE_FORMAT = 'dd MMMM, yyyy';
const PatientOtherContactCard: React.FC<PatientOtherContactCardProps> = ({ patient }) => (
  <PatientDetailCard
    bg="#F9F9F9"
    sx={{
      border: '1px solid #E6E8F0',
    }}
    title="Other Contact(s)"
    bordered
    fullHeight
    action={
      <Link href={PAGE_URLS.PATIENT_EDIT(patient.uuid, 4)}>
        <IconButton>
          <Edit2Icon />
        </IconButton>
      </Link>
    }
  >
    {patient.contact?.map((contact, index) => {
      const validity = `${formatDate(contact.validFrom, DATE_FORMAT)} - ${formatDate(contact.validTo, DATE_FORMAT)}`;
      return (
        <Box key={contact.id}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" pr={2}>
            <Typography textTransform="uppercase" variant="overline">{`${stringifyNumber(
              index + 1,
            )} Contact`}</Typography>
            {Array.isArray(patient.contact) && patient.contact.length > 1 && contact.isPrimary && (
              <Typography color="chart.blue5">Primary</Typography>
            )}
          </Stack>
          <DetailGroup
            rightColWidth="100%"
            label="Name"
            content={
              <Stack direction="row" justifyContent="space-between" width="100%" gap={3}>
                <Typography textTransform="capitalize">{contact.fullName}</Typography>
              </Stack>
            }
          />
          <DetailGroup label="Gender" content={contact.gender} capitalize />
          <DetailGroup label="Email Address" content={contact.email.email} />
          <DetailGroup label="Relationship" content={contact.relationship} capitalize />
          <DetailGroup label="Phone Number" content={`${contact.phone.countryCode} ${contact.phone.number}`} />
          <DetailGroup
            label="Address"
            content={
              contact.address.postal ? <Typography color="grey">{getPatientAddress(contact.address)}</Typography> : '-'
            }
          />
          <DetailGroup label="Validity" content={validity} />
        </Box>
      );
    })}
  </PatientDetailCard>
);

export default PatientOtherContactCard;
