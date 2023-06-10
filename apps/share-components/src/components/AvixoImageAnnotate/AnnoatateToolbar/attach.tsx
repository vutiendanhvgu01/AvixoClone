import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import React from 'react';
import { getDocument } from 'pdfjs-dist';
import AttachIcon from '../Icons/attach';
import CustomTooltip from './toolTip';

interface AttachActionProps {
  canvas: any;
}

const acceptedImageTypes = ['image/png', 'image/jpeg'];

const AttachAction: React.FC<AttachActionProps> = props => {
  const { canvas } = props;
  const theme = useTheme();

  const handleAttach = async (e: any) => {
    const file = e.target.files[0];
    if (file && acceptedImageTypes.includes(file.type)) {
      const fileURL = URL.createObjectURL(file);
      window.fabric.Image.fromURL(fileURL, img => {
        canvas.add(img);
      });
    } else if (file.type === 'application/pdf') {
      const pdfURL = URL.createObjectURL(file);
      const pdf = await getDocument(pdfURL).promise;
      Array.from({ length: pdf.numPages }, (v, i) => i).forEach((el, index) => {
        pdf.getPage(index + 1).then(page => {
          const viewport = page.getViewport({ scale: 1 });
          const canva = document.createElement('canvas');
          canva.height = viewport.height;
          canva.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport,
          };
          const rendertask = page.render(renderContext);
          rendertask.promise.then(() => {
            canvas.add(new window.fabric.Image(canva));
          });
        });
      });
    }
  };

  return (
    <Box
      sx={{
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
      <CustomTooltip title="Add Attachment">
        <Button component="label" variant="text">
          <AttachIcon />
          <input type="file" hidden onChange={handleAttach} />
        </Button>
      </CustomTooltip>
    </Box>
  );
};

export default AttachAction;
