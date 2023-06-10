import React, { FC } from 'react';
import AvixoBg2 from 'share-components/assets/background/rectangle-2.svg';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from 'common/components/Navbar/navbar';

const FIX_BACKGROUND_HEIGHT = 320;
const Background = styled(Box)(() => ({
  position: 'fixed',
  backgroundColor: '#F3F3F3',
  width: '100%',
  bottom: 0,
  left: 0,
}));
const Content = styled(Box)(({ theme }) => ({
  padding: '96px 32px 0px 32px',
  position: 'relative',
  minHeight: '100vh',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    padding: '88px 24px 32px 24px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: '113px 24px 32px 24px',
  },
}));

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<IProps> = props => {
  const { children } = props;

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(294.83deg, #CC3399 -8.26%, #7337B3 59.68%, #44179B 98.44%), url(${AvixoBg2.src})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'lighten',
        backgroundAttachment: 'fixed',
      }}
    >
      <Background
        sx={{
          height: `calc(100% - ${FIX_BACKGROUND_HEIGHT}px)`,
        }}
      />
      <Navbar />
      <Content>{children}</Content>
    </main>
  );
};
export default DashboardLayout;
