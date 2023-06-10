import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'white',
  p: '38px',
  borderRadius: '16px',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
};

interface HwardModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  closeText: string;
}

const HwardModal: React.FC<HwardModalProps> = ({ open, title, subtitle = '', onClose, closeText }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </Box>

      {subtitle && (
        <Typography variant="subtitle2" align="center" mt="24px" color="black.main">
          {subtitle}
        </Typography>
      )}
      <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', mt: 3 }}>
        <Button variant="hward-outlined" fullWidth sx={{ mr: 1 }} onClick={onClose}>
          {closeText}
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default HwardModal;
