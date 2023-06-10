import type { Patient } from 'modules/patient/types/patient';
import React, { useCallback } from 'react';
import { AvixoCard, ProfileIcon } from 'share-components';
import { Box, Typography } from '@mui/material';
import { getPatientAddress, getPatientEmail, getPatientPhoneNumber } from 'modules/patient/services';
import { IDENTITY_ID_TYPE } from 'modules/patient/constants';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { DetailGroup } from './patient-card-styles';

export interface PatientSummaryCardProps {
  patient: Patient;
}

const PatientSummaryCard: React.FC<PatientSummaryCardProps> = ({ patient }) => {
  const router = useRouter();
  const goToPatientDetailPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_DETAILS(patient.uuid));
  }, [router, patient.uuid]);

  return (
    <AvixoCard
      onClick={goToPatientDetailPage}
      title="Patient Information"
      icon={<ProfileIcon viewBox="0 0 20 21" />}
      fullHeight
      sx={{ cursor: 'pointer' }}
    >
      <DetailGroup leftColWidth={33.33} label="Phone Number" content={getPatientPhoneNumber(patient.phones)} />
      <DetailGroup leftColWidth={33.33} label="Email Address" content={getPatientEmail(patient.emails)} />
      <DetailGroup
        leftColWidth={33.33}
        label="Address"
        content={patient.addresses?.map(address => (
          <Box key={address.id}>
            <Typography color="primary.main" variant="body1">
              {address.name}
            </Typography>
            <Typography color="neutral.900" variant="body1">
              {getPatientAddress(address)}
            </Typography>
          </Box>
        ))}
      />
      <DetailGroup
        leftColWidth={33.33}
        label="ID(S)"
        content={patient.identities?.map(identity => (
          <Box key={identity.id}>
            <Typography color="primary.main" variant="body1">
              {IDENTITY_ID_TYPE[identity.idType]}
            </Typography>
            <Typography color="neutral.900" variant="body1">
              {identity.idNumber}
            </Typography>
          </Box>
        ))}
      />
    </AvixoCard>
  );
};

export default PatientSummaryCard;
