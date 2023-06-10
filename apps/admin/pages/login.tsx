import AuthComponent from 'modules/auth/Auth';
import AuthApiService from 'modules/auth/api/auth-api';
import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node';
import { FC } from 'react';
import { removeCookieValue, setCookieValue, setToken } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import { COUNTRY_CODE_DEFAULT } from 'share-components/src/components/AvixoAuthForm/constants';

interface LoginProps {
  isInvalid: boolean;
  isInvalidOTP: boolean;
  sessionId: string | null;
  contact: string;
  requiresTwoFa: boolean | null;
  resetPassword: boolean | null;
}

const Login: FC<LoginProps> = props => <AuthComponent {...props} />;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let isInvalid = false;
  let isInvalidOTP = false;
  let requiresTwoFa = null;
  let sessionIdFa = null;
  let contact = '';
  let accessToken = '';

  if (req.method === 'POST') {
    const body = await parseBody(req, '1mb');
    const authLoginService = new AuthApiService();
    try {
      const { username, password, action, otp, sessionId } = body;

      // login
      if (action === 'login') {
        const { data: login } = await authLoginService.login({
          username,
          password,
        });
        accessToken = login.access_token ?? '';
        requiresTwoFa = login.requires_2fa ?? null;
        sessionIdFa = login.sessionId ?? null;
      }
      // verify-otp
      if (action === 'verify-otp' && otp) {
        try {
          const { data } = await authLoginService.verifyOtp(otp, sessionId);
          if (data.access_token) {
            accessToken = data.access_token;
            removeCookieValue('sessionId', { res, req });
          }
        } catch (error) {
          if (sessionId) {
            isInvalidOTP = true;
            sessionIdFa = sessionId;
            requiresTwoFa = !!sessionIdFa;
          }
        }
      }

      // request-otp
      if (sessionIdFa && requiresTwoFa && !isInvalidOTP) {
        const { data: requestOtp } = await authLoginService.requestOtp(sessionIdFa);

        if (requestOtp.number) {
          contact = `+${requestOtp.countryCode ?? COUNTRY_CODE_DEFAULT} ${requestOtp.number}`;
        } else {
          contact = requestOtp.email;
        }
      }

      // login success
      if (accessToken !== '') {
        setToken(accessToken, { req, res });
        const { data: credentialData } = await authLoginService.getCredential(accessToken);
        const { account } = credentialData;
        setCookieValue('account', account, { req, res });

        return {
          redirect: {
            destination: ROUTES.ORGANISATION,
            permanent: false,
          },
        };
      }
    } catch (error) {
      // we maybe get some error, don't remove console here
      console.log('login fail =>', error);
      isInvalid = true;
    }
  }

  return {
    props: { isInvalid, requiresTwoFa, sessionId: sessionIdFa, contact, isInvalidOTP },
  };
};
export default Login;
