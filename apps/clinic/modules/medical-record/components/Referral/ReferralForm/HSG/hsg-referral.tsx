import type { Patient } from 'modules/patient/types/patient';
import { Chip, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import ReferralInformation from 'modules/medical-record/components/Referral/ReferralForm/HSG/referral-information';
import ClinicInformation from 'modules/medical-record/components/Referral/ReferralForm/HSG/clinic-information';
import PatientInformation from 'modules/medical-record/components/CareReport/CareReportSection/patient-information';
import type { Referral, ReferralAction } from 'modules/medical-record/types/referral';
import ReferralForm from './referral-form';

interface HSGReferralProps {
  patient: Patient;
  referral?: Referral;
  action?: ReferralAction;
  onReferralTypeChange?: (template: string) => void;
}

const HSGReferral: React.FC<HSGReferralProps> = ({ patient, referral, action, onReferralTypeChange }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingTop: '32px',
        background: 'white',
        borderRadius: '16px',
        paddingBottom: '32px',
      }}
    >
      <Chip
        label="Note: Please retain a copy of this clinical record in your CMS."
        sx={{
          marginLeft: '32px',
          color: theme.palette.chart?.blue5,
          background: `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), ${theme.palette.info.main}`,
        }}
      />
      <PatientInformation patient={patient} />
      <ClinicInformation />
      <ReferralInformation referral={referral} />
      {action !== 'view' && (
        <ReferralForm
          patient={patient}
          initData={referral}
          action={action}
          onReferralTypeChange={onReferralTypeChange}
        />
      )}
    </Box>
  );
};

export default HSGReferral;
