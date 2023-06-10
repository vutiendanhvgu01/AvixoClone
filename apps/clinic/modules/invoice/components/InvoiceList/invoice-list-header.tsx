import React from 'react';
import { Box, Typography } from '@mui/material';
import InvoiceListActionButtons from './invoice-list-action-buttons';

const InvoiceListHeader = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
    <Typography variant="h4" sx={{ color: 'white' }}>
      Invoices List
    </Typography>
    <InvoiceListActionButtons />
  </Box>
);

export default InvoiceListHeader;
