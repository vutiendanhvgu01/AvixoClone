import AuthApiService from 'modules/auth/api/auth-api';
import { GetServerSideProps } from 'next';
import { removeToken } from 'share-components';
import { ROUTES } from 'share-components/src/constants';

export default function Logout() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { res, req } = ctx;
  const authLoginService = new AuthApiService({ req, res });

  try {
    await authLoginService.logout();
  } catch (e) {
    /* access token is invalid  */
  }

  removeToken({ req, res });
  return {
    redirect: {
      destination: ROUTES.LOGIN,
    },
    props: {},
  };
};
