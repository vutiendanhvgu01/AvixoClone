import { Box, Button, Modal, Typography } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  openModal: boolean;
  closeModal: () => void;
  title: string;
  description: string | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ openModal, closeModal, title, description }) => {
  const isMobile = useIsMobile('sm');
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '95%' : 399,
    bgcolor: 'white',
    p: '38px',
    borderRadius: '16px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>

        <Typography variant="subtitle2" alignSelf="center" textAlign="center" mt="8px" color="black.main">
          {description}
        </Typography>

        <Button variant="hward-outlined" sx={{ mt: 4, mr: 1, px: 5, flexGrow: isMobile ? 1 : 0 }} onClick={closeModal}>
          Okay
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
