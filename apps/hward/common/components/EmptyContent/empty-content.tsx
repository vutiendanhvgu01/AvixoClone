import { Box, Typography } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';

const EmptyContent = ({ text = 'Coming Soon' }: { text?: string }) => {
  const isMobile = useIsMobile();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant={isMobile ? 'subtitle2' : 'h6'} sx={{ color: formatHexToRGBA('#374151', 0.48) }} p={3}>
        {text}
      </Typography>
    </Box>
  );
};

export default EmptyContent;
