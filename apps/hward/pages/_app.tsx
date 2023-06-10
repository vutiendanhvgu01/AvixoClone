import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GetServerSidePropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { HwardLayout } from 'share-components';
import { getPageTitleFromUrl } from 'share-components/src/utils/pageUtils';
import createTheme from 'share-components/theme';
import '../styles/globals.css';
import DashboardLayout from 'modules/Dashboard/components/dashboard-layout';
import exceptLayoutRoutes from 'common/constants/exceptLayoutRoutes';
import { ROUTES } from 'share-components/src/constants';
import { temporaryRedirect } from 'utils/redirect';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FlagProvider } from '@unleash/nextjs';
import unleashConfig from 'common/constants/unleashConfig';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const isDashboardLayout = !exceptLayoutRoutes.includes(router.pathname);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <FlagProvider config={unleashConfig}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={createTheme()}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Head>
              <title>{getPageTitleFromUrl(router.asPath, 'hward')}</title>
            </Head>
            <Hydrate state={pageProps.dehydratedState}>
              {isDashboardLayout ? (
                <DashboardLayout>{getLayout(<Component {...pageProps} />)}</DashboardLayout>
              ) : (
                <HwardLayout>{getLayout(<Component {...pageProps} />)}</HwardLayout>
              )}
            </Hydrate>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </FlagProvider>
  );
}

App.getInitialProps = async ({ ctx }: Record<'ctx', GetServerSidePropsContext>) => {
  const { req, res } = ctx;
  const token = req.cookies.access_token;

  const isLoginPage = req?.url?.includes('/login');
  if (!token && !isLoginPage) {
    temporaryRedirect(res, ROUTES.LOGIN);
  }

  if (isLoginPage && token) {
    temporaryRedirect(res, ROUTES.HWARD_CASES);
  }

  return { data: {} };
};

export default App;
