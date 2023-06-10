import { Box, Typography } from '@mui/material';
import censorNRIC from 'modules/patient/utils/censorNRIC';
import React from 'react';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { Patient } from './types';

const Line = ({ header, value }: { header: string; value: string | number }) => (
  <Box key={value} display="flex" flexDirection="row" flex={1} mb={2}>
    <Typography variant="subtitle2" color="neutral.500" flex={1}>
      {header}
    </Typography>
    <Typography variant="subtitle2" color="black.main" flex={1}>
      {value}
    </Typography>
  </Box>
);

function PatientInformation({ patient }: { patient: Patient }) {
  const {
    caseId,
    enrolmentDate,
    fullName,
    gender,
    nric,
    dateOfBirth,
    contact,
    alternativeContact,
    address,
    unitNumber,
    postcode,
  } = patient;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {caseId && <Line header="Case ID" value={`C-${caseId}`} />}
      <Line header="Date of Enrolment " value={formatDate(enrolmentDate, 'dd MMM yyyy')} />
      <Line header="Full Name" value={fullName} />
      <Line header="Gender" value={gender} />
      <Line header="NRIC" value={censorNRIC(nric)} />
      <Line header="Date of Birth" value={dateOfBirth} />
      <Line header="Patient/Caregiver’s Contact" value={contact} />
      <Line header="Alternative Contact" value={alternativeContact} />
      <Line header="Address" value={address} />
      <Line header="Unit Number" value={unitNumber} />
      <Line header="Postal Code" value={postcode} />
    </Box>
  );
}

export default PatientInformation;
