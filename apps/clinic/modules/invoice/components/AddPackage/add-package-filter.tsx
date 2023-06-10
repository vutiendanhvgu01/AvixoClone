import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { AddPackageFilterProps, PackageFilter } from './add-package-form-type';

const AddPackageFilter: React.FC<AddPackageFilterProps> = ({ onChangeFilter, packageNames, quantities }) => {
  const [filter, setFilter] = useState<PackageFilter>({
    packageName: '',
    quantity: '',
  });

  const handleChangePackageName = (event: SelectChangeEvent) => {
    setFilter((prev: PackageFilter) => ({
      ...prev,
      packageName: event.target.value as string,
    }));
  };

  const handleChangeQuantity = (event: SelectChangeEvent) => {
    setFilter((prev: PackageFilter) => ({
      ...prev,
      quantity: event.target.value as string,
    }));
  };

  return (
    <Box mx={4}>
      <Grid container spacing={3}>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="package-name-options">Package Name*</InputLabel>
            <Select
              labelId="package-name-options"
              id="package-name-options-select"
              label="Package Name"
              onChange={handleChangePackageName}
              value={filter.packageName}
            >
              {packageNames.map((packageName: string) => (
                <MenuItem key={packageName} value={packageName}>
                  {packageName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="quantity-options">Quantity*</InputLabel>
            <Select
              labelId="quantity-options"
              id="quantity-options-select"
              label="Quantity"
              onChange={handleChangeQuantity}
              value={filter.quantity}
            >
              {quantities.map((quantity: number) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddPackageFilter;
