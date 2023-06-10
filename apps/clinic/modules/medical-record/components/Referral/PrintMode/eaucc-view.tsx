import React from 'react';
import ReferralInternalBox from '../common/referral-internal-box';
import { renderComponents } from './routine-view';
import MedicalSectionCard from '../../common/medical-section-card';

const patientInformation = [
  {
    title: 'Full Name',
    content: 'Patient Zero One',
  },
  {
    title: 'Identification Type',
    content: 'NRIC',
  },
  {
    title: 'NRIC/FIN/Passport No:',
    content: 'S6500001B',
  },
  {
    title: 'Nationality',
    content: 'Singaporean',
  },
  {
    title: 'Date of Birth',
    content: '12 May 1968 (54 years)',
  },
  {
    title: 'Race',
    content: 'Chinese',
  },
  {
    title: 'Gender',
    content: 'Female',
  },
  {
    title: 'Contact Email',
    content: 'patientzero@gmail.com',
  },
  {
    title: 'Contact Number',
    content: '90000000',
  },
];

const clinicianInformation = [
  {
    title: 'Full Name',
    content: 'Patient Zero One',
  },
  {
    title: 'MCR',
    content: 'M00000F',
  },
  {
    title: 'Clinic Name',
    content: 'Medical Centre Zero',
  },
  {
    title: 'Clinic HCI',
    content: '9123456',
  },
  {
    title: 'Clinic Contact No.',
    content: '60000000',
  },
  {
    title: 'Clinic Email',
    content: 'contact@medicalcentrezero.sg',
  },
  {
    title: 'Clinic Address',
    content: 'Clementi Ave 0, #00-00 Block 000, Singapore 120000',
  },
  {
    title: 'Clinic Type',
    content: 'CHAS',
  },
];

const referralInformation = {
  content: [
    {
      title: 'Referral Date & Time',
      content: '20 Jan 2023 at 13:00 AM',
    },
    {
      title: 'Type of Referral',
      content: 'Routine',
    },
    {
      title: 'Enrollment Status',
      content: 'Non-Enrolled',
    },
    {
      title: 'Referred Institution',
      content: 'Tan Tock Seng Hospital',
    },
    {
      title: 'Speciality/Service',
      content: 'Endocrinology',
    },
  ],
  footer: [
    {
      title: 'Diagnosis:',
      content: 'Possible multiple fracture on femur.',
    },
    {
      title: 'Reasons for Referral:',
      content: 'Requires specialist and urgent attention',
    },
    {
      title: 'Medical History:',
      content: 'No prior injury',
    },
    {
      title: 'Drug Allergies:',
      content: 'Paracetamol',
    },
  ],
};

const AEUCCView: React.FC = () => (
  <>
    <ReferralInternalBox
      title="Patient Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(patientInformation),
          }}
        />
      }
    />
    <ReferralInternalBox
      title="Clinician Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(clinicianInformation),
          }}
        />
      }
    />
    <ReferralInternalBox
      title="Referral Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(referralInformation.content),
          }}
          footer={{
            components: renderComponents(referralInformation.footer),
          }}
        />
      }
    />
  </>
);

export default AEUCCView;
