import { Box, Divider, Stack } from '@mui/material';
import React, { useState } from 'react';
import { AnnotateToolbarProps } from '../avixo-image-annotate-types';
import ArrowAction from './arrow';
import ColorAction from './color-action';
import EraseAction from './eraser';
import OtherAction from './other-action';
import ResetAction from './reset-action';
import ShapeAction from './shape-action';
import Stroke from './stroke';
import TextAction from './text-action';
import AttachAction from './attach';
import ZoomInAction from './zoom-in-action';
import ZoomOutAction from './zoom-out-action';
import palette from '../Constants/palette';

const AnnotateToolbar: React.FC<AnnotateToolbarProps> = props => {
  const { canvas, imgUrl, state, handleState, setMod, mod } = props;
  const [currentColor, setCurrentColor] = useState(palette[0]);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '8px 8px 0 0', height: 56, padding: '8px 24px' }}
    >
      <Stroke canvas={canvas} currentColor={currentColor} />
      <TextAction canvas={canvas} handleState={handleState} currentColor={currentColor} />
      <ArrowAction canvas={canvas} />
      <ShapeAction canvas={canvas} handleState={handleState} currentColor={currentColor} />
      <EraseAction canvas={canvas} />
      <Divider orientation="vertical" flexItem sx={{ mx: '20px !important', borderColor: 'grey.300' }} />
      <ZoomInAction canvas={canvas} />
      <ZoomOutAction canvas={canvas} />
      <ResetAction canvas={canvas} />
      <Divider orientation="vertical" flexItem sx={{ ml: '20px !important', borderColor: 'grey.300' }} />
      <ColorAction
        canvas={canvas}
        handleState={handleState}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <AttachAction canvas={canvas} />
      <Box display="flex" flex={1} />
      <OtherAction canvas={canvas} imgUrl={imgUrl} state={state} setMod={setMod} mod={mod} />
    </Stack>
  );
};

export default AnnotateToolbar;
