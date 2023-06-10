import { Menu, MenuItem, styled } from '@mui/material';
import * as React from 'react';
import AvixoMenuProps, { MenuItemData } from './menu-type';

const AvixoMenuCustom = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    marginTop: 8,
    minWidth: 200,
  },
}));

const AvixoMenuItem = styled(MenuItem)(() => ({
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: '-0.02em',
  paddingTop: 8,
  paddingBottom: 8,
  textTransform: 'capitalize',
}));

const AvixoMenu: React.FC<AvixoMenuProps> = ({
  open,
  menuData,
  children,
  anchorEl,
  onClose,
  handleCloseMenu,
  onChange,
  ...restMenuProps
}) => {
  const handleClickItem = React.useCallback(
    (menuItem: MenuItemData, value?: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (handleCloseMenu) {
        handleCloseMenu();
      }

      if (menuItem?.onClick) {
        menuItem.onClick(event);
      }
      if (onChange && value) {
        onChange(value);
      }
    },
    [handleCloseMenu, onChange],
  );

  return (
    <AvixoMenuCustom id="avixo-menu" open={open} anchorEl={anchorEl} onClose={onClose} {...restMenuProps}>
      {!children &&
        menuData &&
        menuData.map((menuItem: MenuItemData) => (
          <AvixoMenuItem
            key={`menu_${menuItem.value}_${menuItem.id}`}
            disableRipple
            {...menuItem}
            onClick={handleClickItem(menuItem, menuItem?.value)}
          >
            {menuItem.label || ''}
          </AvixoMenuItem>
        ))}
      {children}
    </AvixoMenuCustom>
  );
};

export default AvixoMenu;
