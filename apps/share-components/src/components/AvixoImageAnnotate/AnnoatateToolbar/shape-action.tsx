import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  ChangeHistoryRounded,
  CircleOutlined,
  CropSquareRounded,
  ExpandMoreRounded,
  HorizontalRuleRounded,
  NorthEastRounded,
} from '@mui/icons-material';
import AvixoMenuButton from '../../AvixoMenuButton/menu-button';

interface ShapeProps {
  label: string;
  icon: React.ReactNode;
  value: string;
}
const shapes: ShapeProps[] = [
  {
    label: 'Rectangle',
    icon: <CropSquareRounded sx={{ fontSize: 25, strokeWidth: 5 }} />,
    value: 'rectangle',
  },
  {
    label: 'Lines',
    icon: <HorizontalRuleRounded sx={{ transform: 'rotate(-45deg)', fontSize: 25, strokeWidth: 5 }} />,
    value: 'lines',
  },
  { label: 'Arrow', icon: <NorthEastRounded sx={{ fontSize: 25, strokeWidth: 5 }} />, value: 'arrow' },
  { label: 'Elipse', icon: <CircleOutlined sx={{ fontSize: 25, strokeWidth: 5 }} />, value: 'elipse' },
  { label: 'Polygon', icon: <ChangeHistoryRounded sx={{ fontSize: 25, strokeWidth: 5 }} />, value: 'polygon' },
];
const shapeOptions = (onMenuItemClick: (val: ShapeProps) => void) =>
  shapes.map(shape => ({
    label: (
      <Stack
        direction="row"
        spacing={1}
        key={shape.value}
        sx={{
          height: 35,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          color: '#111827',
        }}
      >
        {shape.icon}
        <Typography variant="body1">{shape.label}</Typography>
      </Stack>
    ),
    value: shape.value,
    onClick: () => onMenuItemClick(shape),
  }));
interface ShapeActionProps {
  canvas: any;
  handleState: (canvasObject: string) => void;
  currentColor: string;
}
const ShapeAction: React.FC<ShapeActionProps> = props => {
  const { canvas, handleState, currentColor } = props;
  const theme = useTheme();
  const [currentIcon, setCurrentIcon] = useState(shapes[0].icon);

  const handleChangeShape = (value: ShapeProps) => {
    if (!canvas) return;
    setCurrentIcon(value.icon);
    const selectedShape = value.value;
    let shapeObject = null;
    switch (selectedShape) {
      case 'rectangle':
        shapeObject = new window.fabric.Rect({
          width: 100,
          height: 100,
          fill: currentColor,
        });
        break;
      case 'lines':
        shapeObject = new window.fabric.Line([50, 100, 200, 100], {
          stroke: currentColor,
        });
        break;
      case 'arrow':
        shapeObject = new window.fabric.Path('M3.41 2H16V0H1a1 1 0 0 0-1 1v16h2V3.41l28.29 28.3 1.41-1.41z', {
          fill: currentColor,
        });
        break;
      case 'elipse':
        shapeObject = new window.fabric.Circle({
          radius: 100,
          fill: currentColor,
        });
        break;
      case 'polygon':
        shapeObject = new window.fabric.Triangle({
          width: 100,
          height: 100,
          fill: currentColor,
        });
        break;
      default:
        break;
    }
    if (shapeObject) {
      canvas.add(shapeObject);
      canvas.isDrawingMode = false;
      handleState(JSON.stringify(canvas));
    }
  };
  return (
    <AvixoMenuButton
      ButtonProps={{
        startIcon: null,
        endIcon: null,
        sx: {
          color: theme.palette.black.main,
          backgroundColor: 'transparent',
          ':hover': { backgroundColor: '#5048E50A' },
          padding: 0,
        },
      }}
      label={
        <>
          {currentIcon} <ExpandMoreRounded />
        </>
      }
      AvixoMenuBaseProps={{
        menuData: shapeOptions(handleChangeShape),
      }}
    />
  );
};

export default ShapeAction;
