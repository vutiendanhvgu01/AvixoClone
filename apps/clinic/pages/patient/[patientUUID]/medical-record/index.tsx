import { Grid } from '@mui/material';
import patientMedicalPageApiServer from 'common/service/patient-medical-page-api';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import AllergyApiService from 'modules/allergy/services';
import DispenseApiService from 'modules/dispense/services';
import { Dispense } from 'modules/dispense/types/dispense';
import MedicalRecordActionButtons from 'modules/medical-record/components/action-buttons';
import DispensePatientRecordHistory from 'modules/medical-record/components/DispensePatientRecordHistory/dispense-patient-record-history';
import HealthPlanList from 'modules/medical-record/components/HealthPlan/HealthPlanList/health-plan-list';
import MedicalCertificateList from 'modules/medical-record/components/MedicalCertificate/medical-certificate-list';
import ReferralList from 'modules/medical-record/components/Referral/ReferralList/referral-list';
import { MEDICAL_RECORD_ACTIONS } from 'modules/medical-record/constants/medical-certificate';
import CarePlanApiService from 'modules/medical-record/services/care-plan';
import { Activity, CarePlan } from 'modules/medical-record/types/care-plan';
import type { MedicalCertificate } from 'modules/medical-record/types/medical-certificate';
import { Organisation } from 'modules/organisation/types/organisation-types';
import OrganisationApiService from 'modules/organisation/services';
import PatientDetailsLayout from 'modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-layout';
import PatientRecords from 'modules/patient/components/PatientRecords';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import dynamic from 'next/dynamic';
import React from 'react';
import { getAlertMessage } from 'share-components';
import { PAGE_URLS, SUCCESS_STATUSES } from 'share-components/src/constants';
import type HealthPlanItemType from 'modules/medical-record/components/HealthPlan/HealthPlanList/health-plan-types';
import MedicalCertificateApiService from 'modules/medical-record/services/medical-certificate';
import MedicalCertPageApiServer from 'common/service/medical-cert-page-api';
import { Referral } from 'modules/medical-record/types/referral';
import ReferralApiService from 'modules/medical-record/services/referral';
import CaseNoteApiService from 'modules/medical-record/services/case-note';
import type { MedicalNoteType } from 'modules/medical-record/types/medical-note';
import CareReportList from 'modules/medical-record/components/CareReport/CareReportList/care-report-list';
import CARE_REPORT_DEMO_ITEM from 'modules/medical-record/components/CareReport/mocks';
import { Catalog } from 'modules/catalog/types';
import CatalogApiService from 'modules/catalog/service';

const MedicalRecordAction = dynamic(() => import('modules/medical-record/components/medical-record-action'), {
  ssr: false,
});

interface MedicalRecordProps {
  patient: Patient;
  allergies: Allergy[];
  carePlans: HealthPlanItemType[];
  dispenses: Dispense[];
  referrals: Referral[];
  selectedMedicalCert?: MedicalCertificate;
  medicalCertificates: MedicalCertificate[];
  medicalNotes?: MedicalNoteType[];
  products: Catalog[];
}

const getNearestNextCheckIn = (items: Activity[] | undefined) => {
  const today = new Date();
  const validDates = items?.filter(item => new Date(item.scheduledStart) > today).map(item => item.scheduledStart);
  if (validDates && validDates.length > 0) {
    return validDates.reduce((a: string, b: string) => (a > b ? b : a), validDates[0]);
  }
  return null;
};

const convertToLocalHealthPlan = (
  index: number,
  carePlan: CarePlan,
  organisations: (Organisation | null)[],
): HealthPlanItemType => {
  const organisation = organisations.find(org => org?.id === carePlan.organisationId);
  const nextCheckin = getNearestNextCheckIn(carePlan?.activities);
  return {
    id: index + 1,
    uuid: carePlan.uuid,
    createdAt: carePlan.createdAt || '',
    nextCheckin: nextCheckin || '',
    clinic: organisation?.name || '-',
  };
};

const MC_DEMO_ITEMS: MedicalCertificate[] = [
  {
    id: 1,
    mcId: 'MC2301-00004',
    createdAt: '2023/08/11 10:33:00',
    visitDate: '2023/08/11 10:33:00',
    issuedDate: '2023/08/11 10:33:00',
    startDate: '2023/08/11 10:33:00',
    endDate: '2023/08/11 10:33:00',
    description: 'Unfit For Duty',
    type: 'Outpatient',
  },
];

const MedicalRecord: React.FC<MedicalRecordProps> = ({
  patient,
  allergies,
  dispenses,
  carePlans,
  referrals,
  selectedMedicalCert,
  medicalCertificates,
  medicalNotes = [],
  products,
}) => (
  <PatientDetailsLayout
    patient={patient}
    allergies={allergies}
    withPatientDetailsTabs={false}
    actionButtons={<MedicalRecordActionButtons patientId={patient.id} />}
  >
    <Grid container spacing={4}>
      <Grid item lg={9}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PatientRecords patient={patient} medicalNotes={medicalNotes} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <DispensePatientRecordHistory dispenses={dispenses} medicalNotes={medicalNotes} />
      </Grid>
      <Grid item xs={12}>
        <ReferralList patientUUID={patient.uuid} referrals={referrals} />
      </Grid>
      <Grid item xs={12}>
        <HealthPlanList items={carePlans} />
      </Grid>
      <Grid item xs={12}>
        <MedicalCertificateList medicalCertificates={medicalCertificates} />
      </Grid>
      <Grid item xs={12}>
        <CareReportList careReports={[CARE_REPORT_DEMO_ITEM]} />
      </Grid>
    </Grid>
    <MedicalRecordAction patient={patient} medicalCert={selectedMedicalCert} products={products} />
  </PatientDetailsLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { action, mcId, patientUUID, message, titleMessage } = ctx.query;
    const dataTypes = ['allergies', 'referrals', 'products'];
    let pageProps = {} as MedicalRecordProps;

    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const allergyApiService = new AllergyApiService({}, ctx);
        const carePlanService = new CarePlanApiService({}, ctx);
        const dispenseService = new DispenseApiService({}, ctx);
        const mcApiService = new MedicalCertificateApiService({}, ctx);
        const catalogApiService = new CatalogApiService({}, ctx);

        if (action === MEDICAL_RECORD_ACTIONS.GET_MC) {
          const response = await mcApiService.getMedicalCertificates();
          pageProps.medicalCertificates = response?.data;
        }

        const referralService = new ReferralApiService({}, ctx);
        const caseNoteService = new CaseNoteApiService({}, ctx);

        const { data: patient } = await patientService.getPatientDetails(patientUUID as string);
        pageProps.patient = patient;

        const { data: carePlans } = await carePlanService.getCarePlans();
        const organisationIds = carePlans.map(plan => plan.organisationId).filter(item => !!item);
        let organisations: (Organisation | null)[] = [];
        if (organisationIds && organisationIds.length > 0) {
          const organisationService = new OrganisationApiService({}, ctx);
          organisations =
            (await Promise.allSettled(
              organisationIds.map(org => organisationService.getOrganizationDetails(org as number)),
            ).then(results =>
              results
                .map(result => {
                  if (result.status === 'fulfilled') {
                    return result.value.data;
                  }
                  return null;
                })
                .filter(item => !!item),
            )) || [];
        }
        pageProps.carePlans = carePlans.map((plan: CarePlan, index: number) =>
          convertToLocalHealthPlan(index, plan, organisations),
        );

        await Promise.allSettled([
          allergyApiService.getPatientAllergies(patient.id),
          referralService.getReferrallist({ patientId: patient.id }),
          catalogApiService.getListProducts(),
        ]).then(values => {
          values.forEach(({ value }: any, index) => {
            pageProps = {
              ...pageProps,
              [dataTypes[index]]: value?.data || [],
            };
          });
        });

        const { data: dispenseData } = await dispenseService.getDispenseListByTypeId('patientId', patient.id);
        const dispenseItems = await Promise.allSettled(
          dispenseData?.map(dispense => dispenseService.getDispenseItems(dispense?.id)),
        ).then(results =>
          results.map(result => (result.status === 'fulfilled' ? result.value.data : null)).filter(item => !!item),
        );
        pageProps.dispenses = dispenseData.map((dispense, index) => ({
          ...dispense,
          items: dispenseItems[index],
        }));

        const { data: caseNoteData } = await caseNoteService.getConsultNotesByPatientId(patient.id);

        if (caseNoteData) {
          pageProps.medicalNotes = caseNoteData;
        }

        // Edit / Delete / Email MC
        if (
          (action === MEDICAL_RECORD_ACTIONS.EDIT_MC ||
            action === MEDICAL_RECORD_ACTIONS.EMAIL_MC ||
            action === MEDICAL_RECORD_ACTIONS.DELETE_MC) &&
          mcId
        ) {
          // Call the API to get MC details
          [pageProps.selectedMedicalCert] = MC_DEMO_ITEMS;
        }

        return {
          props: {
            ...pageProps,
            ...getAlertMessage(message as string, titleMessage as string),
            params: ctx.query,
          },
        };
      } catch (e) {
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
    const { patientUUID } = ctx.query;
    const { action } = ctx.req.body;

    if (patientUUID) {
      const response = await patientMedicalPageApiServer(ctx);
      if (SUCCESS_STATUSES.includes(response?.status)) {
        const params = `message=${response?.message}&titleMessage=${response?.titleMessage || ''}`;

        switch (action) {
          case 'create-allergy':
            return redirect(`${PAGE_URLS.PATIENT_ALLERGY(patientUUID.toString())}?${params}`);
          case 'create-medical-note':
            return redirect(`${PAGE_URLS.PATIENT_MEDICAL_RECORD(patientUUID.toString())}?${params}`);
          case 'create-prescription':
            return redirect(
              `${PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID.toString(), response.data.uuid)}?${params}`,
            );
          case 'add-medical-certificate':
            return redirect(
              `${PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(patientUUID.toString(), 'add')}?${params}`,
            );
          case 'delete-medical-note':
            return redirect(`${PAGE_URLS.PATIENT_MEDICAL_RECORD(patientUUID.toString())}?${params}`);
          case 'create-care-plan':
            return redirect(
              `${PAGE_URLS.PATIENT_MEDICAL_RECORD_HEALTH_PLAN(
                patientUUID.toString(),
                'edit',
                response.data.uuid,
              )}?${params}`,
            );

          default:
            return redirect(ctx.resolvedUrl);
        }
      }
    }
    return redirect(ctx.resolvedUrl);
  },
  async put(ctx) {
    const { action } = ctx.req.body;
    const { patientUUID, mcID } = ctx.query;

    if (patientUUID && mcID) {
      const mcResponse = await MedicalCertPageApiServer(ctx);
      if (action === MEDICAL_RECORD_ACTIONS.EDIT_MC) {
        if (SUCCESS_STATUSES.includes(mcResponse?.status)) {
          return redirect(
            `${PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(
              patientUUID.toString(),
              'edit',
              mcID.toString(),
            )}?message=${mcResponse?.message}&titleMessage=${mcResponse?.titleMessage}`,
          );
        }
      }
    }
    return redirect(ctx.resolvedUrl);
  },
  async delete(ctx) {
    const { action } = ctx.req.body;
    const { patientUUID, mcID } = ctx.query;

    if (patientUUID && mcID) {
      const mcResponse = await MedicalCertPageApiServer(ctx);
      if (action === MEDICAL_RECORD_ACTIONS.DELETE_MC) {
        if (SUCCESS_STATUSES.includes(mcResponse?.status)) {
          return redirect(
            `${PAGE_URLS.PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE(
              patientUUID.toString(),
              'delete',
              mcID.toString(),
            )}?message=${mcResponse?.message}&titleMessage=${mcResponse?.titleMessage}`,
          );
        }
      }
    }
    return redirect(ctx.resolvedUrl);
  },
});

export default MedicalRecord;
