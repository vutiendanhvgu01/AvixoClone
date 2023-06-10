import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';
import { TextField, FormControl, MenuItem, TextFieldProps, Grid } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { TimeSlot, Errors } from './time-slot-type';
import TimeSlotSchema from './time-slot-schema';

const DAY_OF_WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOT_TYPES = ['operating', 'break'];

interface AvixoTimeSlotProps {
  onChange: (fieldName: string, fieldValue: string | null) => void;
  timeSlot?: TimeSlot;
}

const AvixoTimeSlot = (props: AvixoTimeSlotProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const { onChange, timeSlot } = props;
  const [values, setValues] = useState<TimeSlot | null>(timeSlot || null);
  const [touched, setTouched] = useState<any>({});

  useEffect(() => {
    TimeSlotSchema.validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch(err => {
        const errorsData: Errors = {};
        err.inner.forEach(({ path, message }: any) => {
          errorsData[path] = message;
        });
        setErrors({ ...errorsData });
      });
  }, [values]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTouched({
        ...touched,
        [event.target.name]: true,
      });
    },
    [touched],
  );

  const renderDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps, fieldName: string) => (
      <TextField required name="wrappedStartTime" {...params} error={!!errors[fieldName]} />
    ),
    [errors],
  );

  const onLocalValueChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      onChange(name, value as string);
      setValues({
        ...values,
        [name]: value || '',
      });
    },
    [onChange, values],
  );

  const handleChangeGivenDate = useCallback(
    (fieldName: string, value: Date | null) => {
      onChange(fieldName, value?.toISOString() || null);
      setValues({
        ...values,
        [fieldName]: value?.toISOString() || '',
      });
    },
    [onChange, values],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            required
            select
            label="Day of Week"
            name="dayOfWeek"
            data-cy="day-of-week"
            value={values?.dayOfWeek}
            helperText={touched?.dayOfWeek && errors.dayOfWeek}
            onChange={onLocalValueChange}
            onBlur={handleBlur}
          >
            {DAY_OF_WEEKS.map(item => (
              <MenuItem key={`day_of_week_${item}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            required
            select
            label="Slot Type"
            name="slotType"
            data-cy="slot-type"
            value={values?.slotType}
            helperText={touched?.slotType && errors.slotType}
            onChange={onLocalValueChange}
            onBlur={handleBlur}
          >
            {SLOT_TYPES.map(item => (
              <MenuItem key={`slot_type${item}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TimePicker
            label="From"
            data-cy="from-time"
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => renderDateInput(params, 'fromTime')}
            onChange={(value: Date | null) => handleChangeGivenDate('fromTime', value)}
            value={values?.fromTime}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TimePicker
            label="To"
            data-cy="to-time"
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => renderDateInput(params, 'toTime')}
            onChange={(value: Date | null) => handleChangeGivenDate('toTime', value)}
            value={values?.toTime}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AvixoTimeSlot;
