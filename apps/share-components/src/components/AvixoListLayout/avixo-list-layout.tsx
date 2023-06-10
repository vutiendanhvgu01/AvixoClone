import React, { ReactNode } from 'react';
import { Box, Paper, styled, Typography } from '@mui/material';

interface AvixoListLayoutProps {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  actionButtons?: ReactNode;
}

const Actions = styled(Box)(() => ({
  marginLeft: 'auto',
  '> a, > button': {
    marginLeft: 16,
  },
}));

const AvixoListLayout: React.FC<AvixoListLayoutProps> = ({ title, subTitle, children, actionButtons }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
      <Box>
        <Typography variant="h4" sx={{ color: 'white' }}>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.5 }}>
            {subTitle}
          </Typography>
        )}
      </Box>
      <Actions>{actionButtons}</Actions>
    </Box>
    <Paper sx={{ py: 1 }}>{children}</Paper>
  </Box>
);

export default AvixoListLayout;
