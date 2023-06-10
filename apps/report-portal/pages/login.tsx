import { GetServerSideProps } from 'next';
import * as React from 'react';
import PhoneAuthForm from 'share-components/src/components/PhoneAuthForm/phone-auth-form';
import AuthWrapper from 'common/components/auth-wrapper';
import OtpAuthForm from 'share-components/src/components/PhoneAuthForm/otp-auth-form';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'share-components/src/constants';
import { PhoneAuthFormTypes } from 'share-components/src/components/PhoneAuthForm/phone-auth-form.types';
import { getApiError } from 'common/utils/request';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = React.useState({ ext: 65, number: 0 });
  const [formError, setFormError] = React.useState('');
  const [isOtpRequested, setOtpRequested] = React.useState(false);
  const router = useRouter();

  const onFormSubmit = async (values: PhoneAuthFormTypes) => {
    setFormError('');
    try {
      const result = await fetch('/api/otp', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber: { ext: values.ext, number: values.phone } }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await result.json();
      if (data?.message === 'OTP sent') {
        setOtpRequested(true);
        setPhoneNumber({ ext: values.ext, number: values.phone });
      } else setFormError(getApiError(data));
    } catch (e: any) {
      setFormError(getApiError(e));
    }
  };

  const onChangeOtp = () => {
    if (formError) {
      setFormError('');
    }
  };

  const onSubmitOTP = async (value: string) => {
    setFormError('');
    try {
      const result = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, token: value }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await result.json();
      if (data?.pcno) {
        router.push(ROUTES.REPORT_VITAL);
      } else {
        setFormError(getApiError(data));
      }
    } catch (e: any) {
      setFormError(getApiError(e));
    }
  };
  return (
    <AuthWrapper>
      {isOtpRequested ? (
        <OtpAuthForm
          title="Verify your OTP"
          subtitle="Enter OTP code sent to you registered your phone number."
          onSubmit={onSubmitOTP}
          onChange={onChangeOtp}
          error={formError}
        />
      ) : (
        <PhoneAuthForm
          title="Welcome"
          subtitle="Please login with your phone number."
          onSubmit={onFormSubmit}
          error={formError}
        />
      )}
    </AuthWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});
export default Login;
