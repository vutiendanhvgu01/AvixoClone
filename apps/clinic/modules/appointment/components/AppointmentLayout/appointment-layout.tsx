import { Box, Button, Paper, styled, Typography } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { ListIcon, PlusOutlined } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

interface AppointmentLayoutProps {
  title?: string;
  actionButtons?: ReactNode;
  children?: ReactNode;
}

const Actions = styled(Box)(() => ({
  marginLeft: 'auto',
  '> a, > button': {
    marginLeft: 16,
  },
}));

const AppointmentLayout: React.FC<AppointmentLayoutProps> = ({ title = 'Appointment', children, actionButtons }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
      <Typography variant="h4" sx={{ color: 'white' }}>
        {title}
      </Typography>
      {actionButtons ? (
        <Actions>{actionButtons}</Actions>
      ) : (
        <Actions>
          <Link href={PAGE_URLS.APPOINTMENT_LIST()}>
            <Button color="whiteLight" startIcon={<ListIcon />}>
              Appointment List
            </Button>
          </Link>
          <Link href={PAGE_URLS.APPOINTMENT_ADD()}>
            <Button startIcon={<PlusOutlined />}>New Appointment</Button>
          </Link>
        </Actions>
      )}
    </Box>
    <Paper sx={{ py: 1, bgcolor: 'transparent' }}>{children}</Paper>
  </Box>
);

export default AppointmentLayout;
