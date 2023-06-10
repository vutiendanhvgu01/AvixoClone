import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import TabPanel from './avixo-tab-panel';
import { AvixoTabsProps, AvixoTabProps } from './avixo-tabs-types';

function a11yProps(i: AvixoTabProps) {
  return {
    id: `avixo-tab-${i.index}`,
    'aria-controls': `avixo-tabpanel-${i.index}`,
  };
}

const AvixoTabs: React.FC<AvixoTabsProps> = props => {
  const { tabsData, sxProps, defaultActiveTab, tabsProps, handleChangeTabs } = props;
  const [value, setValue] = React.useState(defaultActiveTab || 0);
  const { container, tabs, tab } = sxProps || {};

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      if (handleChangeTabs) {
        handleChangeTabs(newValue);
      }
      setValue(newValue);
    },
    [handleChangeTabs],
  );

  return (
    <Box sx={{ width: '100%', ...container }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} sx={tabs} {...tabsProps}>
          {tabsData.map((item, i) => (
            <Tab
              label={item.url ? <Link href={item.url}>{item.label}</Link> : item.label}
              {...a11yProps({ index: i })}
              key={`tabs${item.label}`}
              sx={tab}
              data-cy={item.label}
            />
          ))}
        </Tabs>
      </Box>
      {tabsData.map((item, i) =>
        item.component ? (
          <TabPanel value={value} index={i} key={`panel${item.label}`} childrenSx={item?.sx}>
            {item.component}
          </TabPanel>
        ) : null,
      )}
    </Box>
  );
};
export default AvixoTabs;
