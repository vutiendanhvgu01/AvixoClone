import AuthComponent from 'modules/auth/Auth';
import { parseBody } from 'next/dist/server/api-utils/node';
import { GetServerSideProps } from 'next';
import AuthApiService from 'modules/auth/api/auth-api';
import { FC } from 'react';
import { removeToken, setCookieValue, setToken } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import DoctorApiService from 'modules/doctor/api/doctor-api';

interface LoginProps {
  isInvalid: boolean;
}

const Login: FC<LoginProps> = ({ isInvalid }) => <AuthComponent isInvalid={isInvalid} />;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let isInvalid = false;
  if (req.method === 'POST') {
    const body = await parseBody(req, '1mb');
    const authLoginService = new AuthApiService();
    try {
      const { username, password } = body;
      const { data } = await authLoginService.login({
        username,
        password,
      });
      setToken(data.access_token, { req, res });

      const authLoginService2 = new AuthApiService({ req, res });
      const { data: me } = await authLoginService2.me();

      const doctorApiService = new DoctorApiService();
      const {
        data: { hward: doctor },
      } = await doctorApiService.getDoctor({ avixoId: me.doctor });
      const businessRef = doctor.accounts.find(acc => acc.type === 'jarvis')?.id as string;
      const avixoTag = doctor.accounts.find(acc => acc.type === 'avixo')?.meta?.tag as string;

      setToken(data.access_token, { req, res });
      setCookieValue('businessRef', businessRef, { req, res });
      // eslint-disable-next-line no-underscore-dangle
      setCookieValue('organizationRef', doctor?._id, { req, res });
      setCookieValue('organizationTag', avixoTag, { req, res });

      if (data) {
        return {
          redirect: {
            destination: ROUTES.HWARD_CASES,
            permanent: false,
          },
        };
      }
    } catch (error) {
      removeToken({ req, res });
      isInvalid = true;
    }
  }

  return {
    props: { isInvalid },
  };
};
export default Login;
