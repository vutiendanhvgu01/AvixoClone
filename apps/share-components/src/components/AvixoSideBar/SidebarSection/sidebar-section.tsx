import { FC } from 'react';
import { List, ListSubheader, Divider, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { useRouter } from 'next/router';
import SidebarItem from '../SidebarItem/sidebar-item';
import { SidebarSectionProps, Item } from './sidebar-section-types';

const SidebarSection: FC<SidebarSectionProps> = ({
  items: sidebarItems,
  title,
  isCollapsed,
  onChildrenClick,
  ...other
}) => {
  const router = useRouter();
  const path = router?.asPath || '';
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  const renderNavItems = (items: Item[], depth = 0) =>
    items.map(item => {
      const key = `${item.title}-${depth}`;
      const partialMatch = item.path ? path.includes(item.path) : false;
      const exactMatch = path.split('?')[0] === item.path; // We don't compare query params

      if (item.children) {
        return (
          <SidebarItem
            active={partialMatch}
            chip={item.chip}
            depth={depth}
            icon={item.icon}
            info={item.info}
            key={key}
            open={partialMatch}
            path={item.path}
            title={lgUp && isCollapsed ? '' : item.title}
            isCollapsed={isCollapsed}
            onChildrenClick={onChildrenClick}
          >
            {renderNavItems(item.children, depth + 1)}
          </SidebarItem>
        );
      }

      return (
        <SidebarItem
          active={exactMatch}
          chip={item.chip}
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          path={item.path}
          title={isCollapsed ? '' : item.title}
          isCollapsed={isCollapsed}
          onChildrenClick={onChildrenClick}
        />
      );
    });

  return (
    <List
      subheader={
        isCollapsed ? (
          <Divider
            variant="middle"
            sx={{
              mt: 2,
              mb: 5,
              ml: 2.5,
            }}
          />
        ) : (
          <ListSubheader
            disableGutters
            disableSticky
            sx={{
              color: 'neutral.500',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: '30px',
              ml: 2,
              mt: -3,
              opacity: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </ListSubheader>
        )
      }
      {...other}
    >
      {renderNavItems(sidebarItems)}
    </List>
  );
};

export default SidebarSection;
