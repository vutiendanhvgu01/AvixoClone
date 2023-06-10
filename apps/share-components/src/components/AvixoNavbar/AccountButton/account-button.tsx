import { Avatar, Box, ButtonBase, IconButton, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import AvixoDrawerConfirm from '../../AvixoDrawerComfirm/avixo-drawer-confirm';
import LogoutFilledIcon from '../../AvixoIcons/logout-filled-icon';
import { Account } from './account-type';

const getShortName = (name: string) => {
  if (!name) return '';
  const nameArray = name.split(' ');
  return `${nameArray[0][0].toUpperCase()}${nameArray[1]?.[0]?.toUpperCase() || ''}`;
};

const AvatarBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  marginLeft: 20,
  marginRight: 8,
}));

const ShortName = styled(Avatar)(() => ({
  border: '1px solid rgba(255, 255, 255, 0.5)',
  width: 36,
  height: 36,
  fontSize: 14,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
}));

const AccountInfo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const AccountName = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  marginRight: 16,
}));

interface AccountButtonProps {
  account: Account;
}

const AccountButton: React.FC<AccountButtonProps> = ({ account }) => {
  const [isShowConfirmation, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  const toggleConfirmation = useCallback(() => {
    setShowConfirm(!isShowConfirmation);
  }, [isShowConfirmation]);

  return (
    <>
      <AccountInfo>
        <AvatarBox component={ButtonBase}>
          <ShortName src={account.photo}>{getShortName(account.name)}</ShortName>
        </AvatarBox>
        <AccountName>{account.name}</AccountName>
        <IconButton
          data-cy="logout-button"
          onClick={toggleConfirmation}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <LogoutFilledIcon />
        </IconButton>
      </AccountInfo>
      <AvixoDrawerConfirm
        open={isShowConfirmation}
        handleClose={toggleConfirmation}
        title="Logout"
        confirmContent={
          <Typography variant="body2">
            Are you sure you want to logout? Make sure you have saved all your changes before logging out.
          </Typography>
        }
        footerProps={{
          confirmText: 'Proceed to Logout',
          onConfirmClick: () => router.push('/logout'),
          confirmRestProps: {
            'data-cy': 'logout-confirm',
          },
        }}
      />
    </>
  );
};

export default AccountButton;
