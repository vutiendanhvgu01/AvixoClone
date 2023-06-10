import React, { useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, Slide, Typography } from '@mui/material';
import { HwardCloseIcon } from 'share-components';
import HwardFixedContainerProps from './hward-fixed-container-types';

const Container = styled(Box)(() => ({
  position: 'fixed',
  height: '100%',
  right: 0,
  top: 0,
  backgroundColor: '#fff',
  zIndex: 1201,
}));

const TitleBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '35.5px 32px 35.5px 32px',
  color: theme.palette.neutral?.[900],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '19px 24px',
  },
}));

const BodyBox = styled(Box)(({ theme }) => ({
  height: 'calc(100% - 105px)',
  overflow: 'auto',
  [theme.breakpoints.down('md')]: {
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const BackDrop = styled(Box)(() => ({
  backgroundColor: 'grey',
  opacity: '0.2',
  zIndex: 1200,
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
}));

const HwardFixedContainer: React.FC<HwardFixedContainerProps> = (props: HwardFixedContainerProps) => {
  const {
    children,
    title,
    display,
    onClose,
    closeOnOutside,
    headerComponent,
    width,
    containerSx,
    progress,
    linearProgressProps,
    bodyContainerStyle = {},
  } = props;

  const handleClickOutSide = useCallback(() => {
    if (closeOnOutside) {
      // eslint-disable-next-line no-unused-expressions
      onClose && onClose();
    }
  }, [closeOnOutside, onClose]);

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [display]);

  return (
    <>
      <BackDrop
        onClick={handleClickOutSide}
        sx={{
          display: display ? 'block' : 'none',
        }}
      />
      <Slide direction="left" in={display} mountOnEnter unmountOnExit>
        <Container sx={{ width: width ?? '498px', ...containerSx }}>
          <TitleBox>
            {headerComponent ?? (
              <Typography variant="h5" component="h5">
                {title}
              </Typography>
            )}

            <HwardCloseIcon onClick={onClose} color="#6B7280" cursor="pointer" />
          </TitleBox>
          {progress !== undefined && <LinearProgress variant="determinate" value={progress} {...linearProgressProps} />}
          <BodyBox sx={bodyContainerStyle}>{children}</BodyBox>
        </Container>
      </Slide>
    </>
  );
};

export default HwardFixedContainer;
