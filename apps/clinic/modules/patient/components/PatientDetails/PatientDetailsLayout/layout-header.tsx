import { styled } from '@mui/material/styles';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import { getAge, getPatientAllergiesText, getPatientIdentity, getPatientPhoneNumber } from 'modules/patient/services';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { ReactNode } from 'react';
import type { Patient } from '../../../types/patient';
import PatientActionButtons from './action-buttons';
import PatientEnrollStatus from '../../common/patient-enroll-status';

export interface PatientLayoutHeaderProps {
  allergies: Allergy[];
  patient: Patient;
  actionButtons?: ReactNode;
}

const StyledPatient = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const PatientPhoto = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `2px solid ${theme.palette.primary.contrastText}`,
  marginRight: 16,
}));

const PatientLayoutHeader: React.FC<PatientLayoutHeaderProps> = ({ patient, allergies, actionButtons }) => {
  const patientIdentity = getPatientIdentity(patient.identities);
  const patientPhoneNumber = getPatientPhoneNumber(patient.phones);
  const patientAge = getAge(patient.birthDate);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        pb: 3,
        justifyContent: 'space-between',
      }}
    >
      <StyledPatient>
        <PatientPhoto alt={patient.fullName} />
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="h5" color="white" data-cy="patient-fullname">
              {patient.fullName}
            </Typography>
            <Chip
              color="secondary"
              label="Outstanding Balance: S$0.00" // TODO - Update value from the API
              sx={{ ml: 1.5 }}
            />
          </Box>

          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.5 }} data-cy="patient-information">
            {patientIdentity ? `${patientIdentity.value} · ` : ''}
            {toTitleCase(patient.gender)}
            {patientAge ? `, ${patientAge}` : ''}
            {patientPhoneNumber ? ` · ${patientPhoneNumber}` : ''}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {allergies?.length > 0 && (
              <Chip
                sx={{ mr: 1 }}
                label={
                  <Link href={PAGE_URLS.PATIENT_ALLERGY(patient.uuid)} style={{ textDecoration: 'underline' }}>
                    {getPatientAllergiesText(allergies)}
                  </Link>
                }
                color="error"
              />
            )}
            <Typography variant="subtitle1" color="white">
              PMCARE {/* TODO - Update value from the API */}
            </Typography>
          </Box>
        </Box>
      </StyledPatient>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          width: '50%',
          mb: 0.5,
        }}
      >
        <Box>
          <Box sx={{ mb: 2, justifyContent: 'flex-end', display: 'flex' }}>
            <PatientEnrollStatus status="Enrolled" />
          </Box>
          {actionButtons || <PatientActionButtons />}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientLayoutHeader;
