import { Avatar, styled } from '@mui/material';

const ProfilePicture = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  [theme.breakpoints.down('sm')]: {
    width: 48,
    height: 48,
  },
}));

export default ProfilePicture;
