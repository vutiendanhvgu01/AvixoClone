import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import LogoutButton from './LogoutButton';

interface INavbarDrawerProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}
const NavbarDrawer: React.FC<INavbarDrawerProps> = ({ handleDrawerToggle, mobileOpen }) => {
  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <Box>
        <Box display="flex" justifyContent="flex-end" mt={2} mr={2} onClick={handleDrawerToggle}>
          <CloseIcon fontSize="medium" />
        </Box>
        <Box mt={2} pl={2}>
          <LogoutButton onClick={handleDrawerToggle} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Typography color="textSecondary" variant="body2">
          © Copyright 2023, AVIXO.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      aria-label="drawer"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 285 },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default NavbarDrawer;
