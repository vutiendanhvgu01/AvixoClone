import { FC, useCallback } from 'react';
import { Typography, TextField, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useFormikContext } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { CalendarIcon } from 'share-components';
import { PHASE_LABEL, PRACTITIONER_FORM } from '../../constants';
import { PractitionerFormValues } from '../../types/practitioner-form';
import renderSelectMenuItem from '../common/select-menu-item';

const PractitionerProfessionPhase: FC = () => {
  const { setFieldValue, values, getFieldProps } = useFormikContext<PractitionerFormValues>();

  const handleDateChange = useCallback(
    (value: Dayjs | null, fieldName: string) => {
      if (setFieldValue) {
        setFieldValue(fieldName, value);
      }
    },
    [setFieldValue],
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {PHASE_LABEL.profession}
      </Typography>
      <Box>
        <TextField label="Name" fullWidth {...getFieldProps('profession.name')} />
        <TextField fullWidth label="Category" {...getFieldProps('profession.category')}>
          {renderSelectMenuItem(
            PRACTITIONER_FORM.PROFESSION_CATEGOPRY_SELECT_OPTIONS,
            'practitioner-profession-category',
          )}
        </TextField>
        <TextField label="Type" fullWidth {...getFieldProps('profession.type')} />
        <TextField label="Code" fullWidth {...getFieldProps('profession.code')} />
        <Box display="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Valid From"
              renderInput={params => <TextField {...params} error={false} fullWidth sx={{ mr: 3 }} />}
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              {...getFieldProps('profession.validFrom')}
              onChange={value => handleDateChange(value, 'profession.validFrom')}
            />
            <DatePicker
              label="Valid To"
              renderInput={params => <TextField {...params} error={false} fullWidth />}
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              {...getFieldProps('profession.validTo')}
              onChange={value => handleDateChange(value, 'profession.validTo')}
            />
          </LocalizationProvider>
        </Box>
        <FormControlLabel
          control={<Checkbox checked={values.profession?.preferred} {...getFieldProps('profession.preferred')} />}
          label="Primary Profession"
        />
      </Box>
    </Box>
  );
};

export default PractitionerProfessionPhase;
