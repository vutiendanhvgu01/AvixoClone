/*
  This is a page template for:
  - /patient/${patientId}/medical-record/referral/${referralId}
  - /patient/${patientId}/medical-record/referral/${referralId}?action=edit
*/

import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import PatientApiService from 'modules/patient/services';
import ReferralLayout from 'modules/medical-record/components/Referral/common/referral-layout';
import HSGReferral from 'modules/medical-record/components/Referral/ReferralForm/HSG/hsg-referral';
import type { Referral, ReferralAction } from 'modules/medical-record/types/referral';
import TemplateReferralForm from 'modules/medical-record/components/Referral/ReferralForm/Template/template-referral-form';
import { REFERRAL_ACTION, TEMPLATE_NAME } from 'modules/medical-record/constants/referral';
import { useState } from 'react';
import { handle, redirect } from 'next-runtime';
import patientReferralPageApiServer from 'common/service/patient-referral-page-api';
import { PAGE_URLS } from 'share-components/src/constants';
import ReferralApiService from 'modules/medical-record/services/referral';
import { toTitleCase } from 'share-components/src/utils/stringUtils';

interface ViewEditReferralPageProps {
  referralId?: string;
  action?: ReferralAction;
  patient: Patient;
  referral: Referral;
}

const ViewEditReferralPage: React.FC<ViewEditReferralPageProps> = ({ action, patient, referral }) => {
  const [referralType, setReferralType] = useState(
    referral.hsgInstitutionCode ? `${toTitleCase(referral.referralType?.name as string)} Referral` : TEMPLATE_NAME,
  );

  const onReferralTypeChange = (val: string) => {
    setReferralType(`${val} Referral`);
  };

  return (
    <ReferralLayout
      title={referral.hsgInstitutionCode ? referralType : TEMPLATE_NAME}
      patient={patient}
      referral={referral}
      action={action}
    >
      {referral.hsgInstitutionCode ? (
        <HSGReferral
          patient={patient}
          action={action}
          referral={referral}
          onReferralTypeChange={onReferralTypeChange}
        />
      ) : (
        <TemplateReferralForm initData={referral} patient={patient} action={action} />
      )}
    </ReferralLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const patientUUID = ctx.query.patientUUID as string;
    const referralId = ctx.query.referralId as string;
    const action = ctx.query.action || REFERRAL_ACTION.VIEW;
    const pageProps = {} as ViewEditReferralPageProps;

    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const referralApiService = new ReferralApiService({}, ctx);
        const [patient, referral] = await Promise.all([
          patientService.getPatientDetails(patientUUID),
          referralApiService.getReferralDetails(referralId),
        ]);
        pageProps.patient = patient.data;
        pageProps.referral = referral.data;

        return {
          props: {
            ...pageProps,
            action,
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

  async post(ctx) {
    const patientUUID = ctx.query.patientUUID as string;
    const response = await patientReferralPageApiServer(ctx);
    return redirect(
      `${PAGE_URLS.PATIENT_MEDICAL_RECORD(patientUUID)}?message=${response?.message}&titleMessage=${
        response?.titleMessage
      }`,
    );
  },
});

export default ViewEditReferralPage;
