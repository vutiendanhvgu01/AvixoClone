import React, { useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, Slide, Typography } from '@mui/material';
import CloseIcon from '../AvixoIcons/close-icon';
import AvixoFixedContainerProps from './avixo-fixed-container-types';

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
  padding: '35.5px 72px 35.5px 32px',
  color: theme.palette.neutral?.[900],
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

const Close = styled(CloseIcon)(({ theme }) => ({
  position: 'absolute',
  top: 32,
  right: 18,
  cursor: 'pointer',
  width: 40,
  height: 40,
  [theme.breakpoints.up('lg')]: {
    right: 36,
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

export const Form = styled('form')(() => ({
  height: '100%',
}));

export const FormBody = styled(Container)(() => ({
  padding: '32px',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  height: 'calc(100% - 104px)',
  overflowY: 'auto',
  '*::-webkit-scrollbar': {
    width: '0.4em',
  },
  '*::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
}));

export const FormActions = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '24px 32px 32px',
  bgcolor: 'background.paper',
  borderTop: `1px solid ${theme.palette.divider}`,
  '> button': {
    marginLeft: 16,
  },
}));

const AvixoFixedContainer: React.FC<AvixoFixedContainerProps> = (props: AvixoFixedContainerProps) => {
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

            <Close
              sx={{
                fontSize: 32,
              }}
              onClick={onClose}
            />
          </TitleBox>
          {progress !== undefined && <LinearProgress variant="determinate" value={progress} {...linearProgressProps} />}
          <BodyBox sx={bodyContainerStyle}>{children}</BodyBox>
        </Container>
      </Slide>
    </>
  );
};

export default AvixoFixedContainer;
