import type { ListItemProps } from '@mui/material';
import type { ReactNode } from 'react';

interface SidebarItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  chip?: ReactNode;
  depth: number;
  icon?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
  isCollapsed?: boolean;
  onChildrenClick?: () => void;
}

export default SidebarItemProps;
