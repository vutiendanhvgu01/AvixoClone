import { Box } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import AvixoMenuButton from '../../AvixoMenuButton/menu-button';
import paletteOptions from '../Constants/palette';
import CustomTooltip from './toolTip';

interface StrokeProps {
  canvas: any;
  handleState: (canvasObject: string) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
}
const Stroke: React.FC<StrokeProps> = props => {
  const { canvas, handleState, currentColor, setCurrentColor } = props;
  const theme = useTheme();
  const [open, setopen] = useState(false);

  const handleColorChange = (color: string) => {
    if (!canvas) return;
    setCurrentColor(color);
    const el = canvas.getActiveObject();
    if (el) {
      el.set('fill', color);
      el.set('stroke', color);
      el.dirty = true;
      canvas.renderAll();
      canvas.isDrawingMode = false;
    }
    setopen(false);
    handleState(JSON.stringify(canvas));
  };
  return (
    <AvixoMenuButton
      ButtonProps={{
        startIcon: null,
        endIcon: null,
        sx: {
          width: 30,
          color: theme.palette.black.main,
          backgroundColor: 'transparent',
          ':hover': { backgroundColor: '#5048E50A' },
        },
      }}
      label={
        <CustomTooltip title="Select Colour">
          <Stack direction="row">
            <Box sx={{ backgroundColor: currentColor, borderRadius: '6px', width: 20, height: 20 }} />
          </Stack>
        </CustomTooltip>
      }
      AvixoMenuBaseProps={{
        open,
      }}
      onOpen={() => setopen(true)}
      onClose={() => setopen(false)}
    >
      <Box
        sx={{
          height: 20,
          display: 'inline-block',
          width: 200,
        }}
      >
        {paletteOptions.map(color => (
          <Box
            key={color}
            sx={{ display: 'inline-block', backgroundColor: color, height: 25, width: 25, ':hover': { opacity: 0.8 } }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </Box>
    </AvixoMenuButton>
  );
};

export default Stroke;
