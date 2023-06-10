import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { CalendarIcon, CloseIcon, UploadIcon } from 'share-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useDropzone } from 'react-dropzone';

interface UploadFileProps {
  onCancel: () => void;
}
type DatePickerValueType = string | null;
const UploadFile: React.FC<UploadFileProps> = ({ onCancel }) => {
  const [selectedDate, setSelectedDate] = useState<DatePickerValueType>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDateChange = (value: DatePickerValueType) => {
    setSelectedDate(value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            textTransform: 'uppercase',
          }}
        >
          Upload
        </Typography>
        <IconButton>
          <CloseIcon sx={{ color: 'neutral.500', fontSize: 16 }} onClick={onCancel} />
        </IconButton>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="file-type">File Type</InputLabel>
              <Select label="File Type" name="fileType" id="file-type">
                <MenuItem value="all">File (JPG,PNG,PDF)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-category">Select Category</InputLabel>
              <Select label="Select Category" name="category" id="select-category">
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <DatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                components={{ OpenPickerIcon: CalendarIcon }}
                renderInput={params => <TextField {...params} required />}
                onChange={handleDateChange}
                value={selectedDate}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ height: 232, background: 'rgba(80, 72, 229, 0.04)', padding: '16px' }}>
              <Box
                sx={{
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: 'neutral.400',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Box textAlign="center">
                  <UploadIcon />
                  <Typography variant="body2">Click to upload or drag the file</Typography>
                  <Typography variant="caption">PNG, JPG or PDF max. 5 Mb</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'right',
              }}
            >
              <Button
                size="medium"
                color="primary"
                variant="text"
                sx={{
                  ml: 2,
                  color: 'neutral.500',
                  '&:hover': {
                    backgroundColor: 'neutral.100',
                  },
                }}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                size="medium"
                sx={{
                  ml: 2,
                  color: 'neutral.500',
                  boxShadow: 'none',
                  backgroundColor: 'neutral.100',
                  '&:hover': {
                    backgroundColor: 'neutral.200',
                  },
                }}
              >
                Save to draft
              </Button>
              <Button size="medium" color="primary" type="submit" sx={{ ml: 2 }}>
                Save
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mb: 5 }}>
            <Divider />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};
export default UploadFile;
