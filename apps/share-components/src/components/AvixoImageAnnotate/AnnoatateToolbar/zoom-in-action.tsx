import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ControlPointRounded } from '@mui/icons-material';
import { useState } from 'react';
import CustomTooltip from './toolTip';

interface ZoomInActionProps {
  canvas: any;
}
const ZoomInAction: React.FC<ZoomInActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();
  const [zoomIn, setZoomIn] = useState(false);

  const handleZoomIn = () => {
    if (!zoomIn) {
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
      setZoomIn(true);
    } else {
      canvas.on('mouse:wheel', null);
      setZoomIn(false);
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
        <ControlPointRounded onClick={handleZoomIn} />
      </CustomTooltip>
    </Box>
  );
};

export default ZoomInAction;
