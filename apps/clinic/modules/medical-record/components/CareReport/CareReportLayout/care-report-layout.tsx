import { Button, Chip, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { AvixoListHeader, EditSquareIcon } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import PatientEnrollStatus from 'modules/patient/components/common/patient-enroll-status';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import CareReport from '../care-report-types';

export interface CareReportLayoutProps {
  children?: ReactNode;
  patient: Patient;
  careReport?: CareReport;
  isEdit?: boolean;
}

const CareReportLayout: React.FC<CareReportLayoutProps> = ({ patient, children, careReport, isEdit }) => (
  <Box>
    <AvixoListHeader
      subTitle={patient.fullName}
      mainTitleComponent={
        <Box sx={{ display: 'flex', alignItems: 'center', my: 0.5 }}>
          <Typography variant="h4" color="white">
            {careReport ? careReport.reportId : 'New Care Report'}
          </Typography>
          {careReport && <Chip label={careReport.status} color="success" sx={{ ml: 1 }} />}
        </Box>
      }
      detailTextComponent={
        careReport ? (
          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.5 }}>
            Created by: Dr. Fahir Khiard on 12/03/2023 at 12:03 PM
          </Typography>
        ) : (
          <div />
        )
      }
      buttonListComponent={
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <PatientEnrollStatus status="Enrolled" />
          {/* NOTE: PatientEnrollStatus is dynamic, need to replace it once doing api intergration */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            {careReport && !isEdit ? (
              <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD_CARE_REPORT(patient.uuid, 'edit', careReport.id)}>
                <Button startIcon={<EditSquareIcon />}>Edit</Button>
              </Link>
            ) : (
              <Button type="submit" startIcon={<EditSquareIcon />}>
                Submit
              </Button>
            )}
          </Box>
        </Box>
      }
    />
    <Paper sx={{ pb: 1 }}>{children}</Paper>
  </Box>
);

export default CareReportLayout;
