import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import LogoHward from 'hward/common/components/LogoHward';
import * as React from 'react';

const AuthWrapper = ({ children }: { children: React.ReactElement }) => {
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
        <Grid
          container
          item
          sm={12}
          md={6}
          sx={{
            direction: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ backgroundColor: '#F8F8F8', marginTop: matches ? 3 : 0 }}>
            <LogoHward />
          </Box>
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={6}
          sx={{
            marginTop: matches ? 2 : 0,
            direction: 'column',
            justifyContent: 'center',
            alignItems: matches ? 'flex-start' : 'center',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
export default AuthWrapper;
