import { Box } from '@mui/material';
import { Formik } from 'formik';
import { Patient } from 'modules/patient/types/patient';
import { useRef } from 'react';
import PatientInformation from '../CareReportSection/patient-information';
import CareReport from '../care-report-types';
import GeneralFields from '../CareReportSection/general-fields';
import DiagnosisAndComplication from '../CareReportSection/diagnosis-and-complication';
import BMIComponent from '../CareReportSection/bmi-component';
import VaccinationDataGroup from '../CareReportSection/vaccination-data-group';
import SmokingDataGroup from '../CareReportSection/smoking-data-group';
import ReferralDataGroup from '../CareReportSection/referral-data-group';
import ScreenDataGroup from '../CareReportSection/screen-data-group';
import AncillaryDataGroup from '../CareReportSection/ancillary-data-group';
import MeasurementDataGroup from '../CareReportSection/measurement-data-group';

interface CareReportFormProps {
  initData?: CareReport;
  patient: Patient;
}

const CareReportForm: React.FC<CareReportFormProps> = ({ initData, patient }) => {
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit = () => {
    form.current?.submit();
  };

  return (
    <Formik
      initialValues={{
        ...initData,
        visitDate: null,
        healthPlan: null,
        dateOfFirstHealth: null,
        dateOfChronicConsult: null,
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <Box sx={{ paddingTop: '25px' }}>
          <PatientInformation patient={patient} />
          <GeneralFields />
          <DiagnosisAndComplication />
          <ScreenDataGroup />
          <BMIComponent />
          <SmokingDataGroup />
          <VaccinationDataGroup />
          <MeasurementDataGroup />
          <AncillaryDataGroup />
          <ReferralDataGroup />
        </Box>
      )}
    </Formik>
  );
};

export default CareReportForm;
