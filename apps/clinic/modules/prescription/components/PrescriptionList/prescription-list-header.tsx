import React from 'react';
import { Box, Typography } from '@mui/material';

const PrescriptionListHeader = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
    <Typography variant="h4" sx={{ color: 'white' }}>
      Prescription List
    </Typography>
  </Box>
);

export default PrescriptionListHeader;
