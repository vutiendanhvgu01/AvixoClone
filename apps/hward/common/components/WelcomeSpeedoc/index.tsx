import { Box, Typography } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import ProfilePicture from '../ProfilePicture';

const WelcomeSpeedoc: React.FC = () => {
  const [organizationTag, setOrganizationTag] = useState('');

  useEffect(() => {
    const tag = getCookie('organizationTag') as string;
    setOrganizationTag(tag);
  }, []);

  const avatar =
    {
      NUHS: 'nuhs.png',
      NCCS: 'nccs.png',
      SGH: 'sgh.png',
      KTPH: 'ktph.png',
    }[organizationTag?.toUpperCase()] ?? 'speedoc-logo.png';

  return (
    <Box flexDirection="row" display="flex" alignItems="center">
      <ProfilePicture src={avatar} />
      <Box ml={2}>
        <Typography variant="h5" color="white" sx={{ color: 'white' }}>
          Welcome, {organizationTag}
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeSpeedoc;
