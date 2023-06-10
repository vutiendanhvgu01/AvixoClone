import { Box, Grid, Paper, styled } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import React from 'react';

interface ColumnsLayoutProps {
  renderLeft?: () => React.ReactElement;
  renderCenter?: () => React.ReactElement;
  renderRight?: () => React.ReactElement;
  children?: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<ColumnsLayoutProps> = ({ renderLeft, renderCenter, renderRight, children }) => {
  const leftContent = renderLeft?.();
  const centerContent = renderCenter?.();
  const rightContent = renderRight?.();
  const isMobile = useIsMobile();
  const ContainerLayout = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    minHeight: '91vh',
  }));

  const maxHeight = isMobile ? '100%' : 'calc(100vh - 78px)';

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    height: '100%',
    maxHeight,
    [theme.breakpoints.down('md')]: { padding: '16px 16px' },
  }));

  return (
    <ContainerLayout>
      <Grid
        container
        spacing={isMobile ? 3 : 4}
        mt={isMobile ? 0 : 2}
        flex={1}
        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
        maxHeight={maxHeight}
      >
        <Grid item flex={{ md: 1, lg: 5 }} maxHeight={maxHeight}>
          <Item>{leftContent}</Item>
        </Grid>
        <Grid item flex={{ md: 1, lg: 8 }} maxHeight={maxHeight}>
          <Item>{centerContent}</Item>
        </Grid>
        <Grid item flex={{ md: 1, lg: 5 }} pb={isMobile ? 8 : 0} maxHeight={maxHeight}>
          <Item>{rightContent}</Item>
        </Grid>
      </Grid>
    </ContainerLayout>
  );
};

export default Layout;
