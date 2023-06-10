import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';
import { AvixoLayout, AvixoDashboardLayout, AvixoSnackbar } from 'share-components';
import createTheme from 'share-components/theme';
import Head from 'next/head';
import {
  getBreadcrumbsFromRouter,
  getPageTitleFromUrl,
  forceRedirectPage,
  filterMenuByModules,
  getModuleStrings,
  getPermissionsFromString,
} from 'share-components/src/utils/pageUtils';
import { ReactElement, ReactNode, useState, useCallback } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import exceptLayoutRoutes from 'common/constants/exceptLayoutRoutes';
import CLINIC_SIDEBAR_SECTIONS from 'common/constants/menu';
import { Typography } from '@mui/material';
import { ROUTES } from 'share-components/src/constants';
import PractitionerApiService from 'modules/practitioner/services';
import OrganisationApiService from 'modules/organisation/services';
import { ClinicProvider } from 'contexts/clinic-context';
import { Organisation } from 'modules/organisation/types/organisation-types';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { AvixoOrganisationProps } from '@ShareComponents/AvixoSideBar/avixo-sidebar-types';
import AuthApiService from 'modules/auth/api/auth-api';

export type TopBoxLayoutResult = {
  topBox: ReactElement;
  height: number; // in px
};

export type TopBoxLayout = {
  getTopBox?: (props: any) => TopBoxLayoutResult | null;
};

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> &
  TopBoxLayout & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  data: {
    organisations: Organisation[];
    practitioners: Practitioner[];
    permissions: string[];
    modules: string[];
  };
};

const getUserRelatedInformation = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;
  let organisations = [];
  let practitioners = [];
  let modules = [];
  const practitionerService = new PractitionerApiService({}, ctx);
  const organisationService = new OrganisationApiService({}, ctx);
  if (req?.cookies?.account) {
    const {
      data: { practitionerOrganisations },
    } = await practitionerService.getPatientPractitioner(req.cookies.account);
    let practitionerOrganisationsData = [];
    try {
      practitionerOrganisationsData = await Promise.all(
        practitionerOrganisations.map(async (org: { organisationId: number; practitionerId: number }) => {
          const [organisation, practitioner] = await Promise.all([
            organisationService.getOrganizationDetails(org.organisationId),
            practitionerService.getPatientPractitioner(org.practitionerId),
          ]);
          return [organisation.data, practitioner.data];
        }),
      );
    } catch (e) {
      console.error('Error when getting user organisations', e);
    }
    organisations = practitionerOrganisationsData.map((practitionerOrganisation: any) => practitionerOrganisation[0]);
    practitioners = practitionerOrganisationsData.map((practitionerOrganisation: any) => practitionerOrganisation[1]);

    const authService = new AuthApiService(ctx);
    const { data: moduleData } = await authService.getModuleList();
    modules = moduleData;
  }
  return { organisations, practitioners, modules };
};

function App({ Component, pageProps, router, data }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const isDashboardLayout = !exceptLayoutRoutes.includes(router.pathname);
  const breadcrumbs = getBreadcrumbsFromRouter(router);
  const { getTopBox } = Component;
  const topBoxRes = getTopBox ? getTopBox(pageProps) : null;
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(!!pageProps?.message);

  const handleSnackbar = useCallback(() => {
    setIsOpenSnackbar(!isOpenSnackbar);
  }, [isOpenSnackbar]);

  return (
    <ThemeProvider theme={createTheme()}>
      <Head>
        <title>{getPageTitleFromUrl(router.asPath)}</title>
      </Head>
      {topBoxRes?.topBox}
      {isDashboardLayout ? (
        <ClinicProvider
          initData={{
            organisations: data?.organisations || [],
            practitioners: data?.practitioners || [],
            permissions: data?.permissions || [],
            patient: pageProps?.patient || null,
          }}
        >
          <AvixoDashboardLayout
            withTopbar={!!topBoxRes}
            breadcrumbs={breadcrumbs}
            extraMainHeight={topBoxRes?.height || 0}
            sidebarSection={filterMenuByModules(CLINIC_SIDEBAR_SECTIONS, data?.modules)}
            organisations={data.organisations as unknown as AvixoOrganisationProps[]}
            account={data?.practitioners[0]}
          >
            {getLayout(<Component {...pageProps} />)}
          </AvixoDashboardLayout>
        </ClinicProvider>
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
                  {pageProps.titleMessage ?? ''}
                </Typography>
                <Typography sx={{ pl: '4px' }} variant="body2" component="span">
                  {pageProps.message ?? ''}
                </Typography>
              </div>
            ),
          }}
          showIconButton={false}
          autoHideDuration={2000}
          onClose={handleSnackbar}
        />
      )}
    </ThemeProvider>
  );
}

App.getInitialProps = async ({ ctx }: Record<'ctx', GetServerSidePropsContext>) => {
  const { req, res } = ctx;
  const token = req?.cookies?.access_token;
  const isLoginPage = req?.url?.includes(ROUTES.LOGIN);
  let permissions: string[] = [];

  if (!token && !isLoginPage) {
    forceRedirectPage(res, ROUTES.LOGIN);
  }

  if (isLoginPage && token) {
    forceRedirectPage(res, ROUTES.PATIENT_MANAGEMENT);
  }

  if (token) {
    const data = jwtDecode(token) as any;
    if (data) {
      permissions = Array.from(
        new Set(
          data?.acls?.reduce((result: string[], item: string) => {
            const listPermission = getPermissionsFromString(item);
            return [...result, ...listPermission];
          }, []),
        ),
      );
    }

    const { organisations, practitioners, modules } = await getUserRelatedInformation(ctx);
    return {
      data: {
        organisations,
        practitioners,
        permissions,
        modules: getModuleStrings(modules),
      },
    };
  }
  return {
    data: {
      organisations: [],
      practitioners: [],
      permissions: [],
      patients: [],
      modules: [],
    },
  };
};

export default App;
