import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import TextIcon from '../Icons/text';
import CustomTooltip from './toolTip';

interface TextActionProps {
  canvas: any;
  handleState: (canvasObject: string) => void;
  currentColor: string;
}
const TextAction: React.FC<TextActionProps> = props => {
  const { canvas, handleState, currentColor } = props;
  const theme = useTheme();

  const addText = () => {
    const text = new window.fabric.Textbox('Add Text', {
      fontFamily: 'Inter',
      editable: true,
      fill: currentColor,
    });
    canvas.isDrawingMode = false;
    canvas.add(text);
    handleState(JSON.stringify(canvas));
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
      <CustomTooltip title="Add Text">
        <TextIcon onClick={addText} />
      </CustomTooltip>
    </Box>
  );
};

export default TextAction;
