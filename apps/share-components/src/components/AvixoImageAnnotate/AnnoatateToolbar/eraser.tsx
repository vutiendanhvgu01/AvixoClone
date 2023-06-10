import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import EraseIcon from '../Icons/erase';
import CustomTooltip from './toolTip';

interface EraseActionProps {
  canvas: any;
}
const EraseAction: React.FC<EraseActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();
  const handleErase = () => {
    if (!canvas) return;
    canvas.freeDrawingBrush = new (window.fabric as any).EraserBrush(canvas);
    canvas.isDrawingMode = true;
  };
  return (
    <Box
      sx={{
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
      <CustomTooltip title="Erase">
        <EraseIcon onClick={handleErase} />
      </CustomTooltip>
    </Box>
  );
};

export default EraseAction;
