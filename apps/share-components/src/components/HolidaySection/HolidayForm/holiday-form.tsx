import { TextField, FormControl, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import HolidayFormSchema from './holiday-form-schema';
import { HolidayFormProps, Errors } from './holiday-form-type';
import AvixoTimeSlot from '../../AvixoTimeSlot';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const HolidayForm = (props: HolidayFormProps) => {
  const { holiday, onChange, isShowValidationError, index } = props;
  const [errors, setErrors] = useState<Errors>({});

  const onFieldChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = target || {};
      onChange(name, name === 'isPrimary' ? checked : value, index);
    },
    [index, onChange],
  );

  useEffect(() => {
    if (isShowValidationError) {
      HolidayFormSchema.validate(holiday, { abortEarly: false })
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
    }
  }, [isShowValidationError, holiday]);

  const renderDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField name="wrappedDate" {...params} />,
    [],
  );

  const handleChangeDate = useCallback(
    (value: Date | null) => {
      onChange('date', value?.toISOString() ?? '', index);
    },
    [index, onChange],
  );

  const onTimeSlotChange = useCallback(
    (fieldName: string, fieldValue: string | null) => {
      onChange(fieldName, fieldValue, index);
    },
    [index, onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControlComponent fullWidth>
        <TextField
          defaultValue={holiday?.name}
          required
          name="name"
          onChange={onFieldChange}
          label="Name"
          error={!!errors.name}
        />
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <DatePicker label="Date*" renderInput={renderDateInput} onChange={handleChangeDate} value={holiday?.date} />
      </FormControlComponent>
      <AvixoTimeSlot
        timeSlot={{
          dayOfWeek: holiday?.dayOfWeek,
          slotType: holiday?.slotType,
          fromTime: holiday?.slotFrom,
          toTime: holiday?.slotTo,
        }}
        onChange={onTimeSlotChange}
      />
      <FormControlComponent fullWidth>
        <TextField
          required
          defaultValue={holiday?.description}
          name="description"
          onChange={onFieldChange}
          label="Description"
          error={!!errors.description}
        />
      </FormControlComponent>
    </LocalizationProvider>
  );
};

export default HolidayForm;
