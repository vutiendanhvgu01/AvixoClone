import { Box, Grid, GridProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthProxyService from 'modules/auth/service/proxy';
import Image from 'next/image';
import React, { useState } from 'react';
import { AuthPhase, AvixoAuthForgotEmailForm, AvixoAuthForm, AvixoTwoFAForm } from 'share-components';
import LogoMobile from 'share-components/assets/logo/logo-mobile.png';
import Logo from 'share-components/assets/logo/logo.png';
import TextImageMobile from 'share-components/assets/logo/text-mobile.png';
import TextImage from 'share-components/assets/logo/text.png';
import { AuthType } from 'share-components/src/components/AvixoAuthForm/types';

const METHOD_DEFAULT = 'sms';
const PHASE_DEFAULT: AuthPhase = 'login';

const gridAuthSection: Partial<GridProps> = {
  md: 6,
  lg: 6,
  xl: 6,
  sm: 12,
  container: true,
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  item: true,
};

const LogoComponent: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const AvixoLogo = matches ? LogoMobile : Logo;
  const AvixoText = matches ? TextImageMobile : TextImage;

  return (
    <Box
      className="avixo-logo"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image src={AvixoLogo} alt="logo" style={{ marginRight: 20 }} />
      <Image src={AvixoText} alt="name" style={{ marginBottom: 12 }} />
    </Box>
  );
};

const AuthComponent: React.FC<AuthType> = ({ isInvalid, requiresTwoFa, sessionId, resetPassword, ...props }) => {
  const [screen, setScreen] = useState<AuthPhase | ''>('');

  const handleRequestOtp = async () => {
    if (sessionId) {
      const authProxyService = AuthProxyService;
      await authProxyService.requestOtp(sessionId);
    }
  };

  const renderAuthForm = () => {
    switch (screen) {
      case 'login':
        return <AvixoAuthForm invalid={isInvalid} />;
      case 'resetPassword':
        return <AvixoAuthForgotEmailForm />;
      default:
        // if screen is empty, this is a fist time render.
        if (requiresTwoFa && sessionId) {
          return (
            <AvixoTwoFAForm
              handleRequestOtp={handleRequestOtp}
              sessionId={sessionId}
              method={METHOD_DEFAULT}
              onBack={() => setScreen(PHASE_DEFAULT)}
              {...props}
            />
          );
        }
        if (resetPassword) {
          return <AvixoAuthForgotEmailForm />;
        }
        return <AvixoAuthForm invalid={isInvalid} />;
    }
  };

  return (
    <Box
      component="div"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid {...gridAuthSection}>
          <LogoComponent />
        </Grid>
        <Grid {...gridAuthSection}>{renderAuthForm()}</Grid>
      </Grid>
    </Box>
  );
};

export default AuthComponent;
