import React, { FC, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';

export interface DetailGroupProps {
  label: string;
  content: ReactNode | string;
  leftColWidth?: number; // percent
  rightColWidth?: number | string;
  capitalize?: boolean;
}

export const DetailGroup: FC<DetailGroupProps> = props => {
  const { label, content, leftColWidth = 50, rightColWidth, capitalize } = props;
  return (
    <Stack direction="row" spacing={2} py={1.25} borderColor="divider" fontSize={14} fontWeight="500">
      <Typography flex={`0 0 ${leftColWidth}%`} color="neutral.500" sx={{ pr: 2 }}>
        {label}
      </Typography>
      <Box
        sx={{ ml: '0 !important', textTransform: capitalize ? 'capitalize' : 'unset' }}
        data-cy={label}
        width={rightColWidth || 'unset'}
      >
        {content || '-'}
      </Box>
    </Stack>
  );
};
