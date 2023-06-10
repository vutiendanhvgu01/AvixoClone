/*
  This is a page template for:
  - /patient/${patientId}/medical-record/referral/${referralId}/print
*/

import PrintMode from 'modules/medical-record/components/Referral/PrintMode';
import { REFERRAL_TYPE } from 'modules/medical-record/components/Referral/constants';
import { GetServerSideProps } from 'next';
import React from 'react';

interface PrintReferralPageProps {
  referralId?: string;
}

const EditAddCancelReferralPage: React.FC<PrintReferralPageProps> = ({ referralId = 'hsg' }) => {
  const referralType = REFERRAL_TYPE.AEUCC;
  return <PrintMode referralId={referralId} type={referralType} />;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const referralId = ctx.query.referralId as string;
  const pageProps = {} as PrintReferralPageProps;

  pageProps.referralId = referralId;

  return {
    props: {
      ...pageProps,
    },
  };
};

export default EditAddCancelReferralPage;
