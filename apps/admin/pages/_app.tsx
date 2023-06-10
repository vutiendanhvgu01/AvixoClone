import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AvixoOrganisationProps } from '@ShareComponents/AvixoSideBar/avixo-sidebar-types';
import exceptLayoutRoutes from 'common/constants/exceptLayoutRoutes';
import ADMIN_SIDEBAR_SECTIONS from 'common/constants/menu';
import { Organisation } from 'modules/organisation/components/organisation-types';
import OrganisationApiService from 'modules/organisation/services';
import PractitionerApiService from 'modules/practitioner/services';
import { GetServerSidePropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState, useCallback } from 'react';
import { AvixoDashboardLayout, AvixoLayout, AvixoSnackbar } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import { forceRedirectPage, getBreadcrumbsFromRouter, getPageTitleFromUrl } from 'share-components/src/utils/pageUtils';
import createTheme from 'share-components/theme';
import '../styles/globals.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  data: {
    userOrganisations: Organisation[];
  };
};

function App({ Component, pageProps, router, data }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const isDashboardLayout = !exceptLayoutRoutes.includes(router.pathname);
  const breadcrumbs = getBreadcrumbsFromRouter(router, { isParentOrganisation: pageProps.organisation?.isParent });
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(!!pageProps?.message);

  const handleSnackbar = useCallback(() => {
    setIsOpenSnackbar(!isOpenSnackbar);
  }, [isOpenSnackbar]);

  return (
    <ThemeProvider theme={createTheme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>{getPageTitleFromUrl(router.asPath)}</title>
        </Head>
        {isDashboardLayout ? (
          <AvixoDashboardLayout
            breadcrumbs={breadcrumbs}
            sidebarSection={ADMIN_SIDEBAR_SECTIONS}
            organisations={data?.userOrganisations as unknown as AvixoOrganisationProps[]}
            account={{ name: data?.userOrganisations[0]?.name, photo: data?.userOrganisations[0]?.logo || '' }}
          >
            {getLayout(<Component {...pageProps} />)}
          </AvixoDashboardLayout>
        ) : (
          <AvixoLayout>{getLayout(<Component {...pageProps} />)}</AvixoLayout>
        )}
        {!!pageProps?.message && (
          <AvixoSnackbar
            open={isOpenSnackbar}
            ContentProps={{
              message: (
                <div style={{ maxWidth: 300 }}>
                  <Typography sx={{ fontWeight: 700 }} variant="body2" component="span">
                    {pageProps?.titleMessage ?? ''}
                  </Typography>
                  <Typography sx={{ pl: '4px' }} variant="body2" component="span">
                    {pageProps?.message ?? ''}
                  </Typography>
                </div>
              ),
            }}
            showIconButton={false}
            autoHideDuration={2000}
            onClose={handleSnackbar}
          />
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

const getUserOrganisations = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;
  let userOrganisations = [];
  const practitionerService = new PractitionerApiService({}, ctx);
  const organisationService = new OrganisationApiService({}, ctx);
  if (req?.cookies?.account) {
    const {
      data: { practitionerOrganisations },
    } = await practitionerService.getPractitioner(req.cookies.account);
    let values = [];
    try {
      values = await Promise.all(
        practitionerOrganisations.map((org: any) => organisationService.getOrganizationDetails(org?.organisationId)),
      );
    } catch (e) {
      console.error('Error when getting user organisations', e);
    }
    userOrganisations = values.map((value: any) => value?.data);
  }
  return userOrganisations;
};

App.getInitialProps = async ({ ctx }: Record<'ctx', GetServerSidePropsContext>) => {
  const { req, res } = ctx;
  const token = req.cookies.access_token;
  const isLoginPage = req?.url?.includes(ROUTES.LOGIN);

  if (isLoginPage && token) {
    forceRedirectPage(res, ROUTES.ORGANISATION);
  }

  if (!token && !isLoginPage) {
    forceRedirectPage(res, ROUTES.LOGIN);
  }

  if (token) {
    const userOrganisations = await getUserOrganisations(ctx);
    return {
      data: {
        userOrganisations,
      },
    };
  }

  return {
    data: {},
  };
};

export default App;
