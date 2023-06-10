import { Box, Typography } from '@mui/material';
import React from 'react';

function EmptyComponent({ text = 'No records to show.' }: { text?: string }) {
  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'columns',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle2" color="neutral.500">
        {text}
      </Typography>
    </Box>
  );
}

export default EmptyComponent;
