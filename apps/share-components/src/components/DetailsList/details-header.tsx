import * as React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DetailsHeaderProps } from './details-list-types';

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: '700',
  fontSize: '1.2rem',
}));

const DetailsHeader: React.FC<DetailsHeaderProps> = props => {
  const { title, children } = props;
  return (
    <>
      <Box sx={{ py: 2, px: 2, display: 'flex', flexDirection: 'row' }}>
        <Title>{title}</Title>
        <Box sx={{ flex: 1 }} />
        <Box>{children}</Box>
      </Box>
      <Divider />
    </>
  );
};

export default DetailsHeader;
