import { Box, Typography } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';

interface PanelHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const PanelHeader = ({ icon, title }: PanelHeaderProps) => {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center' }}
      mb={isMobile ? 0 : 4}
      padding={isMobile ? 0 : '24px 24px 0px 24px'}
    >
      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{icon}</Box>
      <Typography variant="subtitle1" color="black.main">
        {title}
      </Typography>
    </Box>
  );
};

export default PanelHeader;
