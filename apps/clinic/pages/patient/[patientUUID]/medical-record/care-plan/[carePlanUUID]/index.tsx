import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import type { Patient } from 'modules/patient/types/patient';
import HealthPlanLayout from 'modules/medical-record/components/HealthPlan/HealthPlanDetails/HealthPlanDetailsLayout/health-plan-details-layout';
import HealthPlanDetails from 'modules/medical-record/components/HealthPlan/HealthPlanDetails/health-plan-details';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import CarePlanApiService from 'modules/medical-record/services/care-plan';
import { PageProps } from 'share-components';
import { CarePlan } from 'modules/medical-record/types/care-plan';
import { VaccinationHistory } from 'modules/medical-record/types/vaccination-history';

interface HealthPlanPageProps extends PageProps {
  patient: Patient;
  carePlan: CarePlan;
  vaccinationHistory: VaccinationHistory[];
}

const HealthPlanPage: React.FC<HealthPlanPageProps> = ({ patient, carePlan, vaccinationHistory }) => (
  <HealthPlanLayout patient={patient}>
    <HealthPlanDetails carePlan={carePlan} vaccinationHistory={vaccinationHistory} />
  </HealthPlanLayout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, carePlanUUID, action } = ctx.query;
  const pageProps = {} as HealthPlanPageProps;

  if (patientUUID && carePlanUUID) {
    try {
      const patientService = new PatientApiService({}, ctx);
      const scmsConnectorApiService = new SCMSConnectorApiService({}, ctx);
      const carePlanService = new CarePlanApiService({}, ctx);

      await Promise.allSettled([
        patientService
          .getPatientDetails(patientUUID as string)
          .then(({ data }) => {
            pageProps.patient = data;
          })
          .catch(() => ({
            notFound: true,
          })),
        scmsConnectorApiService
          .getVaccinationHistory()
          .then(({ data }) => {
            pageProps.vaccinationHistory = data;
          })
          .catch(() => ({
            notFound: true,
          })),
        carePlanService
          .getCarePlan(carePlanUUID as string)
          .then(({ data }) => {
            pageProps.carePlan = data;
          })
          .catch(() => ({
            notFound: true,
          })),
      ]);

      return {
        props: {
          ...pageProps,
          params: {
            action: action || '',
          },
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

export default HealthPlanPage;
