import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GetServerSidePropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { HwardLayout } from 'share-components';
import { forceRedirectPage, getPageTitleFromUrl } from 'share-components/src/utils/pageUtils';
import createTheme from 'share-components/theme';
import '../styles/globals.css';
import { ROUTES } from 'share-components/src/constants';
import { isLoggedIn } from 'common/utils/cookies';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ThemeProvider theme={createTheme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>{getPageTitleFromUrl(router.asPath, 'report')}</title>
        </Head>
        <HwardLayout>{getLayout(<Component {...pageProps} />)}</HwardLayout>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

App.getInitialProps = async ({ ctx }: Record<'ctx', GetServerSidePropsContext>) => {
  const { req, res } = ctx;
  const loggedIn = isLoggedIn(ctx);

  const isLoginPage = req?.url?.includes('/login');
  if (!loggedIn && !isLoginPage) {
    forceRedirectPage(res, ROUTES.LOGIN);
  }

  if (isLoginPage && loggedIn) {
    forceRedirectPage(res, ROUTES.REPORT_VITAL);
  }

  return { data: {} };
};

export default App;
