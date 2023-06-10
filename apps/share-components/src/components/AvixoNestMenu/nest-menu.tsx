import { MenuItem, Typography } from '@mui/material';
import { NestedMenuItemProps } from 'mui-nested-menu';
import * as React from 'react';
import AvixoMenuButton from '../AvixoMenuButton/menu-button';
import MenuButtonProps from '../AvixoMenuButton/menu-button-type';

export interface AvixoNestMenuProps extends Partial<NestedMenuItemProps> {
  actionLabel?: string;
  menuButtonPropsBase?: MenuButtonProps;
  /**
   * MenuItem and NestedMenuItem
   */
  children?: React.ReactNode;
}

const AvixoNestMenuCustom: React.FC<AvixoNestMenuProps> = ({
  menuButtonPropsBase,
  actionLabel = 'Action',
  children,
}) => (
  <AvixoMenuButton {...menuButtonPropsBase}>
    <MenuItem>
      <Typography variant="overline">{actionLabel}</Typography>
    </MenuItem>
    {children}
  </AvixoMenuButton>
);

export default AvixoNestMenuCustom;
