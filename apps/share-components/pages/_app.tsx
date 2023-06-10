import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '../theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={createTheme()}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
