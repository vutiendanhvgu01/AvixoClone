import { Divider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface PatientInformationBoxProps {
  title: string;
  children: React.ReactNode;
}

const HeaderTitle = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: '600',
  color: 'black.main',
  margin: '32px',
}));

const MedicalSectionBox: React.FC<PatientInformationBoxProps> = ({ title, children }) => (
  <Box>
    <HeaderTitle>{title}</HeaderTitle>
    <Box
      sx={{
        margin: 4,
      }}
    >
      {children}
    </Box>
    <Divider />
  </Box>
);

export default MedicalSectionBox;
