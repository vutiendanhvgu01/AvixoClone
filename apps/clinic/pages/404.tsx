import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Custom404() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
      <Typography variant="h4" sx={{ color: 'white' }}>
        404 - Page Not Found
      </Typography>
    </Box>
  );
}
