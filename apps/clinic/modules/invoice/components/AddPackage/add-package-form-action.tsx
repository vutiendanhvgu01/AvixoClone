import { Button, Grid } from '@mui/material';
import React from 'react';
import { AddPackageFormActionProps } from './add-package-form-type';

const AddPackageFormAction: React.FC<AddPackageFormActionProps> = ({ onConfirm, onCancel }) => (
  <Grid container spacing={2} justifyContent="flex-end">
    <Grid item>
      <Button variant="text" onClick={onCancel}>
        Cancel
      </Button>
    </Grid>
    <Grid item>
      <Button onClick={onConfirm}>Add to invoice</Button>
    </Grid>
  </Grid>
);

export default AddPackageFormAction;
