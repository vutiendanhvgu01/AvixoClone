import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import { handle } from 'next-runtime';
import CareReportForm from 'modules/medical-record/components/CareReport/CareReportForm/care-report-form';
import CareReportLayout from 'modules/medical-record/components/CareReport/CareReportLayout/care-report-layout';
import PatientApiService from 'modules/patient/services';

interface AddCareReportPageProps {
  patient: Patient;
}

const AddCareReportPage: React.FC<AddCareReportPageProps> = ({ patient }) => (
  <CareReportLayout patient={patient}>
    <CareReportForm patient={patient} />
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
