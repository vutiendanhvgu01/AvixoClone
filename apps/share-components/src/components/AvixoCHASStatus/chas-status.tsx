import React, { FC } from 'react';
import { Chip, useTheme } from '@mui/material';
import AvixoCHASStatusProps from './chas-status-type';

const AvixoCHASStatus: FC<AvixoCHASStatusProps> = ({ size = 'medium', sx, ...rest }) => {
  const theme = useTheme();
  return (
    <Chip
      size={size}
      sx={{
        height: 22,
        '& .MuiChip-label': {
          color: 'white',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 22,
        },
        ...(rest.color === 'info' && { backgroundColor: theme.palette.chart?.blue4 || '#2096F3' }),
        ...sx,
      }}
      {...rest}
    />
  );
};

export default AvixoCHASStatus;
