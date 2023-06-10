import { FormControl, InputAdornment, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport from '../care-report-types';

const BMIComponent = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems = [
    {
      key: 'bmi-cal-date',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of BMI Calculation"
            renderInput={params => <TextField {...params} error={false} fullWidth sx={{ mr: 3 }} />}
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            {...getFieldProps(`bmiDate`)}
            onChange={value => setFieldValue?.('bmiDate', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'bmi',
      content: (
        <FormControl
          sx={{
            marginBottom: 0,
            width: '100%',
          }}
        >
          <TextField
            label="BMI"
            {...getFieldProps('bmi')}
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">kg/m2</InputAdornment>,
            }}
          />
        </FormControl>
      ),
    },
    {
      key: 'weight-taken-date',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Weight Taken"
            renderInput={params => <TextField {...params} error={false} fullWidth sx={{ mr: 3 }} />}
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            {...getFieldProps(`weightDate`)}
            onChange={value => setFieldValue?.('weightDate', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'weight',
      content: (
        <FormControl
          sx={{
            marginBottom: 0,
            width: '100%',
          }}
        >
          <TextField
            label="Weight"
            required
            {...getFieldProps('weight')}
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </FormControl>
      ),
    },
    {
      key: 'height',
      content: (
        <FormControl
          sx={{
            marginBottom: 0,
            width: '100%',
          }}
        >
          <TextField
            label="Height"
            required
            {...getFieldProps('height')}
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
          />
        </FormControl>
      ),
    },
    {
      key: 'waist-circumference',
      content: (
        <FormControl
          sx={{
            marginBottom: 0,
            width: '100%',
          }}
        >
          <TextField
            label="Waist Circumference"
            {...getFieldProps('waistCircumference')}
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </FormControl>
      ),
    },
  ];
  return (
    <MedicalSectionBox title="BMI Control Data Group">
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems.map(cardItem => (
            <MedicalSectionCardItem
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 3,
        }}
      />
    </MedicalSectionBox>
  );
};

export default BMIComponent;
