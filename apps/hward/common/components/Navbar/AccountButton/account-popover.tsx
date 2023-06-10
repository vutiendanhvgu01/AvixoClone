import { Box, Popover } from '@mui/material';
import LogoutButton from '../LogoutButton';

export interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose: () => void;
  open: boolean;
}

const AccountPopover: React.FC<AccountPopoverProps> = props => {
  const { anchorEl, onClose, open, ...other } = props;

  return (
    <Popover
      aria-label="account-popover"
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box sx={{ my: 1 }}>
        <LogoutButton onClick={onClose} />
      </Box>
    </Popover>
  );
};

export default AccountPopover;
