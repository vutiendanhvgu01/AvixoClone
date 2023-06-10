import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import type { Patient } from 'modules/patient/types/patient';
import HealthPlanLayout from 'modules/medical-record/components/HealthPlan/HealthPlanDetails/HealthPlanDetailsLayout/health-plan-details-layout';
import HealthPlanForm from 'modules/medical-record/components/HealthPlan/HealthPlanForm';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import CarePlanApiService, { formatCarePlanFormData } from 'modules/medical-record/services/care-plan';
import { CarePlan } from 'modules/medical-record/types/care-plan';
import { VaccinationHistory } from 'modules/medical-record/types/vaccination-history';
import { PageProps } from 'share-components';
import { handle, redirect } from 'next-runtime';
import { PAGE_URLS } from 'share-components/src/constants';
import { responseSuccess } from '@AvixoUtils/apiUtils';

interface HealthPlanPageProps extends PageProps {
  patient: Patient;
  carePlan: CarePlan;
  vaccinationHistory: VaccinationHistory[];
}

const EditHealthPlanPage: React.FC<HealthPlanPageProps> = ({ patient, vaccinationHistory, carePlan }) => (
  <HealthPlanLayout patient={patient} hideActionButtons>
    <HealthPlanForm vaccinationHistory={vaccinationHistory} initData={carePlan} />
  </HealthPlanLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, carePlanUUID } = ctx.query;
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
          props: pageProps,
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
  },

  async post(ctx) {
    const { patientUUID, carePlanUUID } = ctx.query;
    const pageProps = {} as HealthPlanPageProps;

    if (patientUUID && carePlanUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const carePlanService = new CarePlanApiService({}, ctx);
        const { data: patient } = await patientService.getPatientDetails(patientUUID as string);
        pageProps.patient = patient;
        const { body } = ctx.req;
        if (body?.uuid) {
          const carePlan = formatCarePlanFormData({ ...body, patientId: patient.id });
          await carePlanService.updateCarePlan(carePlanUUID as string, carePlan);
          return redirect(
            `${PAGE_URLS.PATIENT_MEDICAL_RECORD(
              patient.uuid,
            )}?message=has been successfully updated&titleMessage=Care plan`,
          );
        }

        if (body?.action === 'create-goal' && body?.carePlanId && body?.carePlanUUID) {
          const createGoal = await carePlanService.createCarePlanGoal(body?.carePlanId as string | number, {});
          const createGoalResponse = responseSuccess(createGoal);
          return redirect(
            `${PAGE_URLS.PATIENT_MEDICAL_RECORD_HEALTH_PLAN(patient.uuid, 'add')}?carePlanUUID=${
              body?.carePlanUUID
            }&message=${createGoalResponse?.message}`,
          );
        }
        return {
          props: {
            ...pageProps,
            params: ctx.query,
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
  },
});

export default EditHealthPlanPage;
