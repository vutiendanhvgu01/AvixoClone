import { Box, Button, ButtonProps, Modal, Typography } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import mappedDischargeError, { dischargeErrorMessage } from 'modules/cases/utils/mapDischargeErrors';
import React, { useState } from 'react';
import { DischargedIcon } from 'share-components';

interface DischargeButtonProps {
  name: string;
  handleClick: () => void;
  status: string;
  sx?: ButtonProps['sx'];
  cannotDischarged?: dischargeErrorMessage | null;
}

const DischargeButton: React.FC<DischargeButtonProps> = ({ name, handleClick, status, sx, cannotDischarged }) => {
  const isMobile = useIsMobile('md');
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
    handleClick();
  };
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

  const title = cannotDischarged ? `Unable to discharge patient` : `Confirm to discharge ${name}`;
  const description = cannotDischarged
    ? mappedDischargeError(cannotDischarged)
    : 'Are you sure you want to discharge this patient?';

  return (
    <>
      <Button
        sx={{ mr: 2, textTransform: 'capitalize', ...sx }}
        data-testid="discharge-button"
        startIcon={<DischargedIcon />}
        variant={isMobile ? 'hward-outlined' : 'hward-ghost'}
        onClick={toggleOpen}
        disabled={status === 'Discharged'}
      >
        Discharge
      </Button>
      <Modal open={open} onClose={toggleOpen}>
        <Box sx={modalStyle}>
          <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          </Box>

          <Typography variant="subtitle2" alignSelf="center" mt="8px" color="black.main">
            {description}
          </Typography>
          <Box
            sx={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              mt: 4,
              justifyContent: cannotDischarged ? 'center' : 'space-between',
            }}
          >
            <Button variant="hward-outlined" sx={{ mr: 1, px: 5, flexGrow: 1 }} onClick={() => setOpen(false)}>
              {cannotDischarged ? 'Okay' : 'Back'}
            </Button>
            {!cannotDischarged ? (
              <Button sx={{ ml: 1, px: 4, flexGrow: 1 }} onClick={handleClose}>
                Discharge
              </Button>
            ) : null}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DischargeButton;
