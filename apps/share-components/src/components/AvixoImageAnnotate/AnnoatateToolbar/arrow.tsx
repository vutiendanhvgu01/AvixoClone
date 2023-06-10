import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import ArrowIcon from '../Icons/arrow';

interface ArrowActionProps {
  canvas: any;
}
const ArrowAction: React.FC<ArrowActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();

  const onTransform = () => {
    canvas.isDrawingMode = false;
  };
  return (
    <Box
      sx={{
        width: 40,
        color: theme.palette.black.main,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
          backgroundColor: '#5048E50A',
        },
      }}
    >
      <ArrowIcon onClick={onTransform} />
    </Box>
  );
};

export default ArrowAction;
