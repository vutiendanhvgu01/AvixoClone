import React, { FC } from 'react';
import { Drawer, styled, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AvixoDrawerProps } from './avixo-drawer-types';

const HeaderText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '24px',
}));

const HeaderBox = styled(Box)(() => ({
  height: '108px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  display: 'flex',
  margin: '0 20px',
}));

const CloseButton = styled(IconButton)`
  &:hover {
    background-color: transparent;
  }
`;

const AvixoDrawer: FC<AvixoDrawerProps> = ({ header, show, content, description, setShow }) => (
  <Drawer
    anchor="right"
    open={show}
    PaperProps={{
      sx: {
        width: '498px',
      },
    }}
  >
    <HeaderBox>
      <Box
        sx={{
          margin: '0 12px',
          width: '80%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderText>{header}</HeaderText>
      </Box>
      <CloseButton
        sx={{
          color: 'primary',
          width: '10%',
        }}
        aria-label="close"
        color="inherit"
        onClick={() => setShow(false)}
      >
        <CloseIcon fontSize="medium" />
      </CloseButton>
    </HeaderBox>
    <Box
      sx={{
        marginRight: '32px',
        marginLeft: '32px',
      }}
    >
      <Typography
        sx={{
          fontWeight: '400',
          fontSize: '14px',
          color: 'black.main',
        }}
      >
        {description}
      </Typography>
    </Box>
    <Box
      sx={{
        marginTop: '5%',
        maxHeight: '80%',
        overflowY: 'scroll',
      }}
    >
      {content}
    </Box>
  </Drawer>
);

export default AvixoDrawer;
