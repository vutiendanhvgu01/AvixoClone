import { Box, Grid } from '@mui/material';
import React from 'react';
import useIsMobile from 'common/hooks/useIsMobile';

interface DashboardHeaderProps {
  renderLeft: () => React.ReactElement;
  renderRight?: () => React.ReactElement | null;
  renderBottom?: () => React.ReactElement | null;
  children?: React.ReactNode | React.ReactNode[];
}

const Footer = ({ children }: { children: React.ReactNode }) => (
  <Box
    justifyContent="center"
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'white',
      borderTopColor: '#E6E8F0',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
    }}
    padding="16px 24px"
  >
    <Box display="flex" justifyContent="space-between">
      {children}
    </Box>
  </Box>
);

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ renderLeft, renderRight, renderBottom, children }) => {
  const ismobile = useIsMobile();
  const leftContent = renderLeft();
  const rightContent = renderRight?.();
  const bottomContent = renderBottom?.();
  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Grid item md={5} container direction="column" color="white" display="flex">
          {leftContent}
        </Grid>
        <Grid item md={7} justifyContent="flex-end" display="flex">
          {!ismobile && rightContent}
        </Grid>
      </Grid>
      {children}
      {ismobile && bottomContent && <Footer>{bottomContent}</Footer>}
    </>
  );
};

export default DashboardHeader;
