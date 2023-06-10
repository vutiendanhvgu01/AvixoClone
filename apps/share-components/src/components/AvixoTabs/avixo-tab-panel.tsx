import * as React from 'react';
import Box from '@mui/material/Box';
import { AvixoTabPanelProps } from './avixo-tabs-types';

const TabPanel: React.FC<AvixoTabPanelProps> = props => {
  const { children, childrenSx, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`avixo-tabpanel-${index}`}
      aria-labelledby={`avixo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, ...childrenSx }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
