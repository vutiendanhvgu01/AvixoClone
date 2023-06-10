/* eslint-disable react/require-default-props */
import { useState, useCallback, FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, Collapse, ListItem, useTheme } from '@mui/material';
import type SidebarItemProps from './sidebar-item-types';
import CollapseIcon from '../../AvixoIcons/collapsed-icon';

const SidebarItem: FC<SidebarItemProps> = props => {
  const theme = useTheme();
  const {
    active,
    children,
    chip,
    depth,
    icon,
    info,
    open: openProp,
    path,
    title,
    isCollapsed,
    onChildrenClick,
    ...other
  } = props;
  const [open, setOpen] = useState<boolean>(!!openProp);

  const handleToggle = useCallback(() => {
    if (children) {
      setOpen(prevOpen => (isCollapsed ? true : !prevOpen));
      if (isCollapsed && onChildrenClick) {
        onChildrenClick();
      }
    }
  }, [children, isCollapsed, onChildrenClick]);

  let paddingLeft = 24;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...other}
      >
        <Button
          endIcon={
            !isCollapsed && (
              <CollapseIcon
                style={{
                  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            )
          }
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          variant="text"
          sx={{
            fontWeight: 600,
            color: active ? 'primary.main' : 'neutral.500',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'primary.states.hoverBackground',
            },
            ...(active && {
              backgroundColor: 'rgba(80, 72, 229, 0.1)',
              color: 'primary.main',
              '& .MuiButton-startIcon path': {
                fill: theme.palette.primary.main,
              },
            }),
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        {!isCollapsed && (
          <Collapse in={open} sx={{ mt: 0.5 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ paddingLeft: '20px', marginRight: '-15px' }}>{children}</div>
              <div
                style={{
                  position: 'absolute',
                  left: `28px`,
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: theme.palette.neutral?.[200],
                }}
              />
            </div>
          </Collapse>
        )}
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <NextLink style={{ width: '100%' }} href={path as string}>
        <Button
          startIcon={icon}
          endIcon={chip}
          disableRipple
          variant="text"
          sx={{
            color: active ? 'primary.main' : 'neutral.500',
            fontSize: 14,
            borderRadius: 1,
            fontWeight: 600,
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(80, 72, 229, 0.1)',
              color: 'primary.main',
              '& .MuiButton-startIcon path': {
                fill: theme.palette.primary.main,
              },
            }),
            '&:hover': {
              backgroundColor: 'primary.states.hoverBackground',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
      </NextLink>
    </ListItem>
  );
};

export default SidebarItem;
