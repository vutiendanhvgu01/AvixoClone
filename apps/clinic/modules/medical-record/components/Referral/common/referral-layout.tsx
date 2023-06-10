import React, { ReactNode } from 'react';
import { Typography, Box, Button, styled, Chip } from '@mui/material';
import { AvixoListHeader, PlusOutlined, OutlinedPrintIcon, EditSquareIcon } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import { formatDate, formatHexToRGBA } from 'share-components/src/utils/formatUtils';
import type { Referral } from 'modules/medical-record/types/referral';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import PatientEnrollStatus from 'modules/patient/components/common/patient-enroll-status';

interface ReferralLayoutProps {
  patient: Patient;
  children?: ReactNode;
  referral?: Referral;
  action?: string;
  title?: string;
}

const Actions = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: 16,
  a: {
    marginLeft: 16,
  },
}));

const ReferralLayout: React.FC<ReferralLayoutProps> = ({ children, patient, referral, action, title }) => (
  <Box>
    <AvixoListHeader
      subTitle={patient.fullName}
      mainTitleComponent={
        <Box sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}>
          <Typography variant="h4" color="white">
            {title}
          </Typography>
          {referral && (
            <Chip
              size="small"
              label={`ID: ${referral?.id}`}
              sx={{ ml: 1, background: formatHexToRGBA('#ffffff', 0.2) }}
            />
          )}
        </Box>
      }
      detailTextComponent={
        <Typography variant="subtitle1" color="white" sx={{ opacity: 0.5 }}>
          {formatDate(referral?.createdAt || new Date().toDateString(), "dd/MM/yyyy 'at' hh:mm a")}
        </Typography>
      }
      buttonListComponent={
        referral ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <PatientEnrollStatus status="Enrolled" />
            {/* NOTE: PatientEnrollStatus is dynamic, need to replace it once doing api intergration */}
            <Actions>
              {action !== 'edit' && (
                <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patient.uuid, 'edit', null, referral.id)}>
                  <Button color="whiteLight" startIcon={<EditSquareIcon />}>
                    Edit
                  </Button>
                </Link>
              )}
              <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patient.uuid, 'print', null, referral.id)}>
                <Button color="whiteLight" startIcon={<OutlinedPrintIcon />}>
                  Print
                </Button>
              </Link>
              {action !== 'edit' && (
                <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_REFERRAL(patient.uuid, 'add', 'hsg')}>
                  {/* NOTE: hsg value is dynamic, need to replace it once doing api intergration */}
                  <Button startIcon={<PlusOutlined />}>New Referral</Button>
                </Link>
              )}
            </Actions>
          </Box>
        ) : null
      }
    />
    <Box sx={{ py: 1 }}>{children}</Box>
  </Box>
);

export default ReferralLayout;
