import * as React from 'react';
import { Box, Grid, GridProps, useMediaQuery } from '@mui/material';
import { AvixoAuthForm } from 'share-components';
import LogoHward from 'common/components/LogoHward';
import { useTheme } from '@mui/material/styles';

interface AuthComponentProps {
  isInvalid: boolean;
}

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

const AuthComponent: React.FC<AuthComponentProps> = ({ isInvalid }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="div"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid item {...gridAuthSection}>
          <Box sx={{ backgroundColor: '#F8F8F8', marginTop: matches ? 3 : 0 }}>
            <LogoHward />
          </Box>
        </Grid>
        <Grid item {...gridAuthSection} sx={{ marginTop: matches ? 2 : 0 }}>
          <AvixoAuthForm
            invalid={isInvalid}
            title={'Welcome to Avixo \nH-Ward Portal '}
            subtitle="Please login with your Avixo user ID to get started."
            contact="mailto:hward@speedoc.com"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthComponent;
