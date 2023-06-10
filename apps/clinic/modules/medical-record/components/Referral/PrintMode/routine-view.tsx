import React from 'react';
import ReferralInternalBox from '../common/referral-internal-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';

export const renderComponents = (items: { title: string; content: React.ReactNode }[]) =>
  items.map(({ title, content }) => <MedicalSectionCardItem key={title} title={title} content={content} />);

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
    title: 'NRIC',
    content: 'S6500001B',
  },
  {
    title: 'HCI',
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
    {
      title: 'Patient’s Card Type',
      content: 'CHAS Blue; Merdeka Generation',
    },
  ],
  footer: [
    {
      title: 'Is this referral to a named doctor / healthcare professional?',
      content: 'Named Doctor Zero',
    },
    {
      title: 'Is this referral related to a CHAS/SFL/VCDSS visit?',
      content: 'CHAS;SFL;VCDSS',
    },
    {
      title: 'Patient is requesting for:',
      content: 'Private Rate Referral',
    },
    {
      title: 'Diagnosis:',
      content: 'Possible multiple fracture on femur.',
    },
    {
      title: 'Reasons for Referral:',
      content: 'Requires specialist and urgent attention',
    },
    {
      title: 'Treatment / Management already provided by GP:',
      content: 'Bandage to stop bleeding.',
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

const RoutineView: React.FC = () => (
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

export default RoutineView;
