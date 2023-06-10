/*
  This is a page template for:
  - /patient/${patientId}/medical-record/referral/add?type=hsg
  - /patient/${patientId}/medical-record/referral/add
*/

import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import PatientApiService from 'modules/patient/services';
import ReferralLayout from 'modules/medical-record/components/Referral/common/referral-layout';
import HSGReferralForm from 'modules/medical-record/components/Referral/ReferralForm/HSG/hsg-referral';
import TemplateReferralForm from 'modules/medical-record/components/Referral/ReferralForm/Template/template-referral-form';
import { useState } from 'react';
import { handle, redirect } from 'next-runtime';
import patientReferralPageApiServer from 'common/service/patient-referral-page-api';
import { PAGE_URLS } from 'share-components/src/constants';
import { REFERRAL_TITLE, REFERRAL_ACTION } from 'modules/medical-record/constants/referral';

interface AddReferralPageProps {
  patient: Patient;
  type?: string;
}

const AddReferralPage: React.FC<AddReferralPageProps> = ({ type = 'template', patient }) => {
  const [referralType, setReferralType] = useState(REFERRAL_TITLE);

  const onReferralTypeChange = (val: string) => {
    setReferralType(`${val} Referral`);
  };

  return (
    <ReferralLayout patient={patient} title={referralType}>
      {type === 'hsg' ? (
        <HSGReferralForm onReferralTypeChange={onReferralTypeChange} patient={patient} action={REFERRAL_ACTION.ADD} />
      ) : (
        <TemplateReferralForm patient={patient} action={REFERRAL_ACTION.ADD} />
      )}
    </ReferralLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const patientUUID = ctx.query.patientUUID?.toString();
    const type = ctx.query.type?.toString();
    const pageProps = {} as AddReferralPageProps;

    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const { data } = await patientService.getPatientDetails(patientUUID);
        pageProps.patient = data;
        pageProps.type = type;

        return {
          props: {
            ...pageProps,
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

export default AddReferralPage;
