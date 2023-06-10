import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import { handle } from 'next-runtime';
import CareReportForm from 'modules/medical-record/components/CareReport/CareReportForm/care-report-form';
import CareReportLayout from 'modules/medical-record/components/CareReport/CareReportLayout/care-report-layout';
import PatientApiService from 'modules/patient/services';
import CareReport from 'modules/medical-record/components/CareReport/care-report-types';
import CARE_REPORT_DEMO_ITEM from 'modules/medical-record/components/CareReport/mocks';

interface AddCareReportPageProps {
  patient: Patient;
  careReport: CareReport;
}

const AddCareReportPage: React.FC<AddCareReportPageProps> = ({ patient, careReport }) => (
  <CareReportLayout patient={patient} careReport={careReport} isEdit>
    <CareReportForm initData={careReport} patient={patient} />
  </CareReportLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const patientUUID = ctx.query.patientUUID as string;
    const patientService = new PatientApiService({}, ctx);
    const { data: patient } = await patientService.getPatientDetails(patientUUID);

    return {
      props: {
        patient,
        careReport: CARE_REPORT_DEMO_ITEM,
      },
    };
  },

  async post() {
    return {
      props: {},
    };
  },
});

export default AddCareReportPage;
