import { Stack, Typography, Button } from '@mui/material';
import { AutorenewRounded, UTurnLeftRounded } from '@mui/icons-material';

interface OtherActionProps {
  canvas: any;
  imgUrl: any;
  state: string[];
  setMod: (val: number) => void;
  mod: number;
}
const OtherAction: React.FC<OtherActionProps> = props => {
  const { canvas, imgUrl, state, setMod, mod } = props;

  const clearCanvas = () => {
    canvas.clear();
    window.fabric.Image.fromURL(imgUrl, img => {
      canvas.add(img);
    });
  };

  const undo = () => {
    if (mod > 0 && state.length > 1) {
      canvas.loadFromJSON(state[mod - 1]);
      setMod(mod - 1);
    }
  };
  const redo = () => {
    if (mod < state.length - 1) {
      canvas.loadFromJSON(state[mod + 1]);
      setMod(mod + 1);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        sx={{ backgroundColor: 'white', color: '#6B7280', p: 1, ':hover': { backgroundColor: '#fff' } }}
        onClick={undo}
      >
        <UTurnLeftRounded sx={{ transform: 'rotate(90deg)', mr: 1 }} />
        <Typography>Undo</Typography>
      </Button>
      <Button
        sx={{ backgroundColor: 'white', color: '#6B7280', p: 1, ':hover': { backgroundColor: '#fff' } }}
        onClick={redo}
      >
        <UTurnLeftRounded sx={{ transform: 'rotate(-90deg)', mr: 1 }} />
        <Typography>Redo</Typography>
      </Button>
      <Button
        sx={{ backgroundColor: 'white', color: '#6B7280', p: 1, ':hover': { backgroundColor: '#fff' } }}
        onClick={clearCanvas}
      >
        <AutorenewRounded sx={{ transform: 'rotate(90deg)', mr: 1 }} />
        <Typography>Clear</Typography>
      </Button>
    </Stack>
  );
};

export default OtherAction;
