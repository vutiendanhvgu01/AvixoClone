import { Chip } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export interface FollowUpStatusProp {
  label: 'First Visit Completed' | 'New' | 'Contacted' | 'Cancelled';
}
const FollowUpStatus: React.FC<FollowUpStatusProp> = ({ label }) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let bg = theme.palette.info.alert.background;
  let color = theme.palette.info.main;
  // eslint-disable-next-line default-case
  switch (label) {
    case 'New':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bg = theme.palette.success.alert.background;
      color = theme.palette.success.main;
      break;
    case 'Cancelled':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      bg = theme.palette.error.alert.background;
      color = theme.palette.error.main;
      break;
    case 'Contacted':
      bg = '#ECEEFF';
      color = '#6E7AD8';
      break;
  }
  return <Chip label={label} sx={{ bgcolor: bg, color, ml: 1.5 }} size="small" />;
};

export default FollowUpStatus;
