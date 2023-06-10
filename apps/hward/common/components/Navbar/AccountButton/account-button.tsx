import { LogoutIcon } from 'share-components';
import { Box, Button, styled } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import AccountPopover from './account-popover';

const AvatarBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
}));

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = useCallback(() => setOpenPopover(true), []);
  const handleClosePopover = useCallback(() => setOpenPopover(false), []);

  return (
    <>
      <AvatarBox aria-label="account-button" onClick={handleOpenPopover} ref={anchorRef} data-cy="profile-avatar">
        <Button
          onClick={handleOpenPopover}
          sx={{
            justifyContent: 'flex-end',
            paddingRight: 0,
            width: 36,
            height: 36,
            fontSize: 14,
            backgroundColor: 'transparent',
            ':hover': { backgroundColor: 'transparent' },
          }}
        >
          <LogoutIcon
            sx={{
              path: {
                stroke: 'white',
              },
            }}
          />
        </Button>
      </AvatarBox>
      <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  );
};

export default AccountButton;
