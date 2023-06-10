import React from 'react';
import { MenuItem } from '@mui/material';
import { SelectMenuItemType } from '../../types/practitioner-form';

const renderSelectMenuItem = (items: SelectMenuItemType[], keyPrefix?: string) =>
  items.map((item: SelectMenuItemType) => (
    <MenuItem key={`${keyPrefix}${item?.value}`} value={item?.value}>
      {item?.label}
    </MenuItem>
  ));

export default renderSelectMenuItem;
