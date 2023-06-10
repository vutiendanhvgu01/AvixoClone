import React from 'react';
import { Chip, Typography, Box } from '@mui/material';
import type { Patient } from 'modules/patient/types/patient';
import { capitaliseFirstCharacter, formatDate } from 'share-components/src/utils/formatUtils';
import { getPatientEmail, getPatientIdentity, getPatientPhoneNumber } from 'modules/patient/services';
import MedicalSectionCard from 'modules/medical-record/components/common/medical-section-card';
import MedicalSectionCardItem from 'modules/medical-record/components/common/medical-section-card-item';
import MedicalSectionBox from '../../common/medical-section-box';

interface PatientCardPropsType {
  patient: Patient;
}

const PatientInformation: React.FC<PatientCardPropsType> = props => {
  const { patient } = props;

  const getEnrolmentNode = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Chip label="Enrolled" />
      <Typography
        sx={{
          marginLeft: '10px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        12 Mar 2022
      </Typography>
    </Box>
  );

  const getFollowUpStatusNode = () => <Chip label="First Visit Completed" />;

  const getFirstVisitNode = () => <Chip label="No" />;

  const identity = getPatientIdentity(patient?.identities);

  return (
    <MedicalSectionBox title="Patient Information">
      <MedicalSectionCard
        content={{
          components: [
            <MedicalSectionCardItem key="nric" title="NRIC" content={identity?.idNumber} />,
            <MedicalSectionCardItem
              key="fullname"
              title="Full Name"
              content={capitaliseFirstCharacter(patient?.fullName)}
            />,
            <MedicalSectionCardItem key="race" title="Race" content={capitaliseFirstCharacter(patient?.race)} />,
            <MedicalSectionCardItem key="gender" title="Gender" content={capitaliseFirstCharacter(patient?.gender)} />,
            <MedicalSectionCardItem
              key="dateOfBirth"
              title="Date of Birth"
              content={formatDate(patient?.birthDate, 'dd/MM/yyyy')}
            />,
            <MedicalSectionCardItem
              key="contactNumber"
              title="Contact Number"
              content={getPatientPhoneNumber(patient?.phones)}
            />,
            <MedicalSectionCardItem
              key="contactEmail"
              title="Contact Email"
              content={getPatientEmail(patient?.emails)}
            />,
          ],
          columns: 4,
        }}
        footer={{
          components: [
            <MedicalSectionCardItem key="enrolment" title="Enrolment Status &amp; Date" content={getEnrolmentNode()} />,
            <MedicalSectionCardItem key="followUpStatus" title="Follow Up Status" content={getFollowUpStatusNode()} />,
            <MedicalSectionCardItem
              key="firstVisitClaimable"
              title="First Visit Claimable"
              content={getFirstVisitNode()}
            />,
            <MedicalSectionCardItem key="cardType" title="Card Type" content="S6500001B" />,
          ],
          columns: 4,
        }}
      />
    </MedicalSectionBox>
  );
};

export default PatientInformation;
