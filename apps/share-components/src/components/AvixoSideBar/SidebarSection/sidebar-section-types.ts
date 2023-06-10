import type { ReactNode } from 'react';
import type { ListProps } from '@mui/material';

interface Item {
  path?: string;
  icon?: ReactNode;
  chip?: ReactNode;
  info?: ReactNode;
  children?: Item[];
  title: string;
  isCollapsed?: boolean;
  onChildrenClick?: () => void;
}

interface SidebarSectionProps extends ListProps {
  items: Item[];
  title: string;
  isCollapsed?: boolean;
  onChildrenClick?: () => void;
}

export type { SidebarSectionProps, Item };
