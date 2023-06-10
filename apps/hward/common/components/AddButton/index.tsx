import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { PlusOutlined } from 'share-components';

interface AddButtonProps {
  fullWidth?: boolean;
  handleClick: () => void;
  title: string;
  testid: string;
  sx?: ButtonProps['sx'];
}

const AddButton: React.FC<AddButtonProps> = ({ fullWidth = false, handleClick, title, testid, sx }) => (
  <Button
    sx={sx}
    variant="hward-unstyled"
    data-testid={testid}
    startIcon={<PlusOutlined />}
    color="primary"
    fullWidth={fullWidth}
    onClick={handleClick}
  >
    {title}
  </Button>
);

export default AddButton;
