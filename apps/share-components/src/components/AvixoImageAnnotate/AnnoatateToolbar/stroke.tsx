import { Box } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Theme } from '@mui/system';
import { ExpandMoreRounded } from '@mui/icons-material';
import PencilIcon from '../Icons/pencil';
import AvixoMenuButton from '../../AvixoMenuButton/menu-button';
import CustomTooltip from './toolTip';

const strokes = [2, 4, 6, 8, 10];
const strokeOptions = (onMenuItemClick: (val: number) => void, theme: Theme) =>
  strokes.map(stroke => ({
    label: (
      <Box
        key={stroke}
        sx={{
          height: 35,
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Box sx={{ backgroundColor: theme.palette.black.main, height: stroke, width: 70 }} />
      </Box>
    ),
    value: stroke.toString(),
    onClick: () => onMenuItemClick(stroke),
  }));
interface StrokeProps {
  canvas: any;
  currentColor: string;
}
const Stroke: React.FC<StrokeProps> = props => {
  const { canvas, currentColor } = props;
  const theme = useTheme();
  const handleChangeStroke = (value: number) => {
    if (!canvas) return;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = value;
    canvas.freeDrawingBrush.color = currentColor;
  };
  return (
    <AvixoMenuButton
      ButtonProps={{
        startIcon: null,
        endIcon: null,
        sx: {
          width: 70,
          color: theme.palette.black.main,
          backgroundColor: 'transparent',
          ':hover': { backgroundColor: '#5048E50A' },
        },
      }}
      label={
        <CustomTooltip title="Drawing">
          <Stack direction="row">
            <PencilIcon /> <ExpandMoreRounded />
          </Stack>
        </CustomTooltip>
      }
      AvixoMenuBaseProps={{
        menuData: strokeOptions(handleChangeStroke, theme),
      }}
    />
  );
};

export default Stroke;
