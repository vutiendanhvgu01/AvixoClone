import { Typography, Box, Divider, styled } from '@mui/material';

interface ReferralInternalBoxProps {
  title: string;
  content: React.ReactNode;
}

const HeaderTitle = styled(Typography)(() => ({
  color: 'black.main',
  marginBottom: '32px',
  marginTop: '32px',
}));

const ReferralInternalBox: React.FC<ReferralInternalBoxProps> = ({ title, content }) => (
  <Box>
    <HeaderTitle variant="h6">{title}</HeaderTitle>
    <Divider />
    <Box
      sx={{
        my: '32px',
      }}
    >
      {content}
    </Box>
  </Box>
);

export default ReferralInternalBox;
