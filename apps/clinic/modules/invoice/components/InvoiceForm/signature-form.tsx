import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { AvixoFixedContainer } from 'share-components';
import { Form, FormActions, FormBody } from './form-style';
import { getTouchPosition } from './GetTouchPosition';
import MouseOrTouchEvent from './MouseOrTouchEvent';
import ActionClearIcon from 'share-components/src/components/AvixoIcons/action-clear-icon';

interface SignatureFormProps {
  initData?: {
    isSignatureConsent: boolean;
  };
  open: boolean;
  onCancel?: () => void;
  width?: number;
  height?: number;
}

const SignatureForm: React.FC<SignatureFormProps> = props => {
  const { initData, open = false, onCancel } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      ...initData,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { isSubmitting, handleChange } = formik;
  const boxCanvasRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let isDrawing = false;

  const startDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = true;
    const context = event.currentTarget.getContext('2d')!;
    const point = getTouchPosition(event);
    context.beginPath();
    context.moveTo(...point);

    context.strokeStyle = '#333333';
    context.lineWidth = 2;
  };

  const continueDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    if (event.type === 'mousemove' && !isDrawing) {
      return;
    }
    const context = event.currentTarget.getContext('2d')!;
    const point = getTouchPosition(event);
    context.lineTo(...point);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(...point);
  };

  // Called when the user stops touching the canvas
  const endDrawing = (event: MouseOrTouchEvent<HTMLCanvasElement>) => {
    isDrawing = false;

    const context = event.currentTarget.getContext('2d')!;
    context.closePath();
  };

  const onResize = () => {
    // If no canvas, return
    if (!canvasRef.current) return;
    if (!boxCanvasRef.current) return;

    const canvas = canvasRef.current;
    const boxCanvas = boxCanvasRef.current;
    canvas.removeAttribute('width');
    canvas.removeAttribute('height');

    canvas.width = boxCanvas.offsetWidth;
    canvas.height = 389;

    const context = canvas.getContext('2d')!;
    context.lineJoin = 'round';
    context.lineCap = 'round';
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 389;
  }, [canvasRef.current]);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d')!;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return (
    <AvixoFixedContainer title="Signature" display={open} onClose={onCancel} progress={100}>
      <Form ref={form} method="POST" onSubmit={formik.handleSubmit} noValidate>
        <FormBody>
          <Container sx={{ padding: '0 0 20px 0' }}>
            <FormControlLabel
              control={<Checkbox name="isSignatureConsent" defaultChecked onChange={handleChange} />}
              label={<Typography variant={'body1'}>Signature Consent</Typography>}
            />
            <Typography variant={'subtitle1'}>
              I hereby acknowledge and agreeable on the charges on the tests, scans, medications, services,
              consultation, goods etc as mentioned above.
            </Typography>
            <FormControl fullWidth>
              <Box
                sx={{ position: 'relative', width: 400, height: 389, backgroundColor: '#F3F4F6', marginTop: '32px' }}
                ref={boxCanvasRef}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onTouchStart={startDrawing}
                  onMouseMove={continueDrawing}
                  onTouchMove={continueDrawing}
                  onMouseUp={endDrawing}
                  onTouchEnd={endDrawing}
                  width={400}
                  height={389}
                />
                <Box
                  className="controlpanel"
                  sx={{
                    position: 'absolute',
                    bottom: 5,
                    left: 10,
                    width: '100%',
                  }}
                >
                  <Tooltip title="Clear" placement={'right'}>
                    <IconButton onClick={clearCanvas}>
                      <ActionClearIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </FormControl>
          </Container>
        </FormBody>

        <FormActions>
          <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting} sx={{ ml: 2 }}>
            Add Signature
          </Button>
        </FormActions>
      </Form>
    </AvixoFixedContainer>
  );
};
SignatureForm.defaultProps = {
  width: 390,
  height: 390,
};
export default SignatureForm;
