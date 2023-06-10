import React from 'react';
import { MenuItem } from '@mui/material';
import { SelectMenuItemType } from '../PractitionerForm/practitioner-form-types';

const renderSelectMenuItem = (items: SelectMenuItemType[], keyPrefix?: string) =>
  items.map((item: SelectMenuItemType) => (
    <MenuItem key={`${keyPrefix}${item?.value}`} value={item?.value}>
      {item?.label}
    </MenuItem>
  ));

export default renderSelectMenuItem;
