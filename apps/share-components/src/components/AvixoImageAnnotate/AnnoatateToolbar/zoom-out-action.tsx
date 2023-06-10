import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useState } from 'react';
import { RemoveCircleOutlineRounded } from '@mui/icons-material';
import CustomTooltip from './toolTip';

interface ZoomOutActionProps {
  canvas: any;
}
const ZoomOutAction: React.FC<ZoomOutActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();

  const [zoomOut, setZoomOut] = useState(false);

  const handleZoomOut = () => {
    if (!zoomOut) {
      canvas.on('mouse:wheel', (opt: any) => {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 5) zoom = 5;
        if (zoom < 0.5) zoom = 0.5;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
      setZoomOut(true);
    } else {
      canvas.on('mouse:wheel', null);
      setZoomOut(false);
    }
  };
  return (
    <Box
      sx={{
        width: 30,
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
      <CustomTooltip title="Zoom out">
        <RemoveCircleOutlineRounded onClick={handleZoomOut} />
      </CustomTooltip>
    </Box>
  );
};

export default ZoomOutAction;
