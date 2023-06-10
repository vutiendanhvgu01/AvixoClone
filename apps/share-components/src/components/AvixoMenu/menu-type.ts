import { MenuProps, MenuItemProps } from '@mui/material';
import { ReactNode } from 'react';

export interface MenuItemData extends MenuItemProps {
  label?: ReactNode;
  value?: string;
}

interface AvixoMenuProps extends Partial<Omit<MenuProps, 'open' | 'onChange'>> {
  open: MenuProps['open'];
  handleCloseMenu?: () => void;
  menuData?: MenuItemData[];
  children?: ReactNode;
  onChange?: (value: string) => void;
}

export default AvixoMenuProps;
