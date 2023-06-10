import React from 'react';
import { AvixoCard, Edit2Icon } from 'share-components';
import { Box, Chip, IconButton } from '@mui/material';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import type { Patient } from 'modules/patient/types/patient';
import Image from 'next/image';
import { DetailGroup } from './patient-card-styles';

export interface PatientEnrolCardProps {
  patient: Patient;
  data: {
    enrollmentStatus?: string;
    firstVisitClaimable?: boolean;
    followUpStatus?: string;
    email?: string;
    contactNumber?: string;
    cardType?: string;
    isEnrolled: boolean;
  };
}

const PatientEnrolCard: React.FC<PatientEnrolCardProps> = ({ data, patient }) => (
  <AvixoCard
    bg="#F9F9F9"
    title="HSG Enrolment"
    bordered
    fullHeight
    action={
      <Link href={PAGE_URLS.PATIENT_ENROL_HSG_EDIT(patient.uuid)} scroll={false}>
        <IconButton>
          <Edit2Icon />
        </IconButton>
      </Link>
    }
  >
    <DetailGroup
      label="Enrollment Status"
      content={<Chip size="small" color="successLight" label={data.enrollmentStatus} />}
    />
    <DetailGroup
      label="First Visit Claimable"
      content={<Chip size="small" color="success" label={data.firstVisitClaimable ? 'Yes' : 'No'} />}
    />
    <DetailGroup label="Follow Up Status" content={data.followUpStatus} />
    <DetailGroup label="Contact Number" content={data.contactNumber} />
    <DetailGroup label="Email" content={data.email} />
    <DetailGroup
      label="Card Type"
      content={
        <Box sx={{ img: { mr: 1, borderRadius: 0.5 } }}>
          <Image src="/imgs/chas.jpg" width={62} height={40} alt="" />
          <Image src="/imgs/pioneer.jpg" width={62} height={40} alt="" />
        </Box>
      }
    />
  </AvixoCard>
);

export default PatientEnrolCard;
