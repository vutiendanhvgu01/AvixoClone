import { FC, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
} from '@mui/material';
import { FormikProps } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { CalendarIcon } from 'share-components';
import { PHASE_LABEL, PRACTITIONER_CATEGORY_VALUE } from '../../constants';
import { SelectMenuItemType } from './practitioner-form-types';
import renderSelectMenuItem from '../common/select-menu-item';

const categorySelectItem: SelectMenuItemType[] = [
  {
    label: 'Physicians',
    value: PRACTITIONER_CATEGORY_VALUE.physicians,
  },
  {
    label: 'Pharmacists',
    value: PRACTITIONER_CATEGORY_VALUE.pharmacists,
  },
  {
    label: 'Nurse',
    value: PRACTITIONER_CATEGORY_VALUE.nurse,
  },
];

const PractitionerProfessionPhase: FC<{ formikProps: FormikProps<any> }> = ({ formikProps }) => {
  const { setFieldValue } = formikProps;

  const handleDateChange = useCallback(
    (value: Dayjs | null, fieldName: string) => {
      if (setFieldValue) {
        setFieldValue(fieldName, value);
      }
    },
    [setFieldValue],
  );

  return (
    <Grid sx={{ p: 4 }} container direction="column">
      <Grid item>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {PHASE_LABEL.profession}
        </Typography>
      </Grid>
      <Box>
        <Grid item>
          <TextField
            id="practitioner-profession--name"
            label="Name"
            variant="outlined"
            fullWidth
            {...formikProps.getFieldProps(`profession.name`)}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="practitioner-profession-category">Category</InputLabel>
            <Select
              labelId="practitioner-profession-category"
              label="Category"
              {...formikProps.getFieldProps(`profession.category`)}
            >
              {renderSelectMenuItem(categorySelectItem, `practitioner-profession-category`)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="practitioner-profession-type"
            label="Type"
            variant="outlined"
            fullWidth
            {...formikProps.getFieldProps(`profession.type`)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="practitioner-profession-code"
            label="Code"
            variant="outlined"
            fullWidth
            {...formikProps.getFieldProps(`profession.code`)}
          />
        </Grid>
        <Grid item display="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Valid From"
              renderInput={params => <TextField {...params} error={false} fullWidth sx={{ mr: 3 }} />}
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              {...formikProps.getFieldProps(`profession.validFrom`)}
              onChange={value => handleDateChange(value, `profession.validFrom`)}
            />
            <DatePicker
              label="Valid To"
              renderInput={params => <TextField {...params} error={false} fullWidth />}
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              {...formikProps.getFieldProps(`profession.validTo`)}
              onChange={value => handleDateChange(value, `profession.validTo`)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={formikProps.values.profession.isPrimary}
                {...formikProps.getFieldProps(`profession.isPrimary`)}
              />
            }
            label="Primary Profession"
          />
        </Grid>
      </Box>
    </Grid>
  );
};

export default PractitionerProfessionPhase;
