import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import { CachedRounded } from '@mui/icons-material';
import CustomTooltip from './toolTip';

interface ResetActionProps {
  canvas: any;
}
const ResetAction: React.FC<ResetActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();

  const handleReset = () => {
    const center = new window.fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(center, 1);
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
      <CustomTooltip title="Reset">
        <CachedRounded onClick={handleReset} />
      </CustomTooltip>
    </Box>
  );
};

export default ResetAction;
