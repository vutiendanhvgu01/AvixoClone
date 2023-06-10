import AuthApiService from 'modules/auth/api/auth-api';
import { GetServerSideProps } from 'next';
import { removeCookieValue, removeToken } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import { temporaryRedirect } from 'utils/redirect';

export default function Logout() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  let redirectLogout = ROUTES.LOGIN;

  const token = req.cookies.access_token;
  if (token) {
    const authLoginService = new AuthApiService({ req, res });
    try {
      const { originResponse } = await authLoginService.logout();
      if (originResponse.status === 200) {
        removeToken({ req, res });
        removeCookieValue('organizationRef', { req, res });
        removeCookieValue('businessRef', { req, res });
        removeCookieValue('organizationTag', { req, res });
      }
    } catch (error) {
      redirectLogout = ROUTES.HWARD_CASES;
      if (query.previous && !Array.isArray(query.previous)) {
        redirectLogout = query.previous;
      }
    }
  }

  temporaryRedirect(res, redirectLogout);

  return {
    props: {}, // Will be passed to the page component as props
  };
};
