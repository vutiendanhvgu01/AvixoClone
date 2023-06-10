import { Box, Button, ListItemIcon, ListItemText, MenuItem, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LogoutIcon } from 'share-components';

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    onClick();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 341,
    bgcolor: 'white',
    p: '38px',
    borderRadius: '16px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  };

  const router = useRouter();
  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoutIcon sx={{ mr: '8px' }} />
            <Typography variant="h5" component="h2">
              Logout
            </Typography>
          </Box>

          <Typography variant="subtitle2" alignSelf="center" mt="24px" color="black.main">
            Are you sure want to logout?
          </Typography>
          <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button variant="hward-outlined" fullWidth sx={{ mr: 1 }} onClick={handleClose}>
              Back
            </Button>
            <Button data-testid="logoutConfrim" fullWidth sx={{ ml: 1 }} href={`/logout?previous=${router.asPath}`}>
              Log out
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LogoutButton;
