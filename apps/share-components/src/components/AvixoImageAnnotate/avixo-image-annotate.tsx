import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import Script from 'next/script';
import AvixoImageAnnotateProps from './avixo-image-annotate-types';
import AnnotateToolbar from './AnnoatateToolbar/annotate-toolbar';

const AvixoImageAnnotate: React.FC<AvixoImageAnnotateProps> = props => {
  const { imgUrl } = props;
  const [imgCanvas, setImgCanvas] = useState<any>(null);
  const [canvasState, setCanvasState] = useState<string[]>([]);
  const [mod, setMod] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const handleState = (canvasObject: string) => {
    const prevState = [...canvasState];
    prevState.splice(mod, prevState.length - mod - 1);
    prevState.push(canvasObject);
    if (prevState.length > 10) prevState.shift();
    setCanvasState(prevState);
    setMod(prevState.length - 1);
  };

  useEffect(() => {
    if (!imgCanvas && loaded) {
      const canvas = new window.fabric.Canvas('canva', {
        width: 1000,
        height: 700,
      });
      window.fabric.Image.fromURL(imgUrl, img => {
        canvas.add(img);
      });
      setImgCanvas(canvas);
      handleState(JSON.stringify(canvas));
    }
    return () => {
      if (imgCanvas) imgCanvas.dispose();
    };
  }, [loaded, imgCanvas]);

  return (
    <>
      <Script src="/lib/fabric.min.js" id="fabric-js" onLoad={() => setLoaded(true)} />
      <Box>
        <Stack>
          <AnnotateToolbar
            canvas={imgCanvas}
            imgUrl={imgUrl}
            handleState={handleState}
            state={canvasState}
            setMod={setMod}
            mod={mod}
          />
        </Stack>
        <canvas id="canva" />
      </Box>
    </>
  );
};

export default AvixoImageAnnotate;
