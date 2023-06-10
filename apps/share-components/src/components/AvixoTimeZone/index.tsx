import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';
import { TextField, FormControl, MenuItem, Grid } from '@mui/material';
import { Errors } from './time-zone-type';
import TimeZoneSchema from './time-zone-schema';
import TIME_ZONES, { TimeZone } from './time-zone';

interface AvixoTimeZoneProps {
  label?: string;
  onChange: (timeZoneObj: any) => void;
  timeZone?: number;
}

const getTimeZone = (id: number | undefined) => TIME_ZONES.find((timezone: TimeZone) => timezone.id === id);

const AvixoTimeZone = (props: AvixoTimeZoneProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const { label, onChange, timeZone } = props;
  const [values, setValues] = useState<any>(getTimeZone(timeZone));
  const [touched, setTouched] = useState<any>({});

  useEffect(() => {
    TimeZoneSchema.validate(values, { abortEarly: false })
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

  const onLocalValueChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const timeZoneObj = getTimeZone(parseInt(value, 10));
      onChange({
        id: timeZoneObj?.id,
        code: timeZoneObj?.abbr,
        name: timeZoneObj?.text,
        offset: `${timeZoneObj?.offset}`,
      });
      setValues(timeZoneObj);
    },
    [onChange],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            select
            label={label ?? 'Name'}
            name="timeZoneName"
            data-cy="time-zone-name"
            value={values?.id}
            helperText={touched?.dayOfWeek && errors.dayOfWeek}
            onChange={onLocalValueChange}
            onBlur={handleBlur}
          >
            {TIME_ZONES.map((item: TimeZone) => (
              <MenuItem key={`time_zone_${item.id}`} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField disabled label="Code" name="timeZoneCode" data-cy="time-zone-code" value={values?.abbr || ''} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            label="Offset"
            name="timeZoneOffset"
            data-cy="time-zone-offset"
            value={values?.offset || ''}
            disabled
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AvixoTimeZone;
