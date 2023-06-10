import { TextField, MenuItem, FormControl, Grid, TextFieldProps, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import QualificationFormSchema from './qualification-form-schema';
import { Errors, QualificationFormProps } from './qualification-form-type';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const typesSelectData: Record<string, string>[] = [
  {
    name: 'Practice License',
    id: 'practice-license',
  },
  {
    name: 'Other License',
    id: 'other-license',
  },
  {
    name: 'Education',
    id: 'education',
  },
  {
    name: 'Specialisation',
    id: 'specialisation',
  },
  {
    name: 'Certification',
    id: 'certification',
  },
  {
    name: 'Other',
    id: 'other',
  },
];

const issuerTypesSelectData: Record<string, string>[] = [
  {
    name: 'Organisation',
    id: 'organisation',
  },
  {
    name: 'Professional Body',
    id: 'professional-body',
  },
  {
    name: 'University',
    id: 'university',
  },
];

const QualificationForm = (props: QualificationFormProps) => {
  const { qualification, onChange, isShowValidationError, index } = props;
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
      QualificationFormSchema.validate(qualification, { abortEarly: false })
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
  }, [isShowValidationError, qualification]);

  const handleChange = useCallback(
    (event: any) => {
      onFieldChange(event);
    },
    [onFieldChange],
  );

  const renderValidFromInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField name="wrappedValidFrom" {...params} />,
    [],
  );

  const handleChangeValidFrom = useCallback(
    (value: Date | null) => {
      onChange('validFrom', value?.toISOString() ?? '', index);
    },
    [index, onChange],
  );

  const renderValidToInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField name="wrappedValidTo" {...params} />,
    [],
  );

  const handleChangeValidTo = useCallback(
    (value: Date | null) => {
      onChange('validTo', value?.toISOString() ?? '', index);
    },
    [index, onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControlComponent fullWidth>
        <TextField select label="Type" name="type" onChange={handleChange} defaultValue={qualification?.type}>
          {typesSelectData.map(type => (
            <MenuItem key={`type-item-${type.id}`} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <TextField defaultValue={qualification?.code} name="code" onChange={onFieldChange} label="Code" />
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <TextField
          defaultValue={qualification?.issuerName}
          name="issuerName"
          onChange={onFieldChange}
          label="Issuer Name"
        />
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <TextField
          select
          label="Issuer Type"
          name="issuerType"
          onChange={handleChange}
          defaultValue={qualification?.issuerType}
        >
          {issuerTypesSelectData.map(type => (
            <MenuItem key={`type-item-${type.id}`} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <TextField
          defaultValue={qualification?.issuingCountry}
          name="issuingCountry"
          onChange={onFieldChange}
          label="Issuing Country"
        />
      </FormControlComponent>
      <FormControlComponent fullWidth>
        <Grid container spacing={2}>
          <Grid item xs>
            <FormControlComponent fullWidth>
              <DatePicker
                label="Valid From"
                renderInput={renderValidFromInput}
                maxDate={new Date(qualification?.validTo ?? '')}
                onChange={handleChangeValidFrom}
                value={qualification?.validFrom}
              />
            </FormControlComponent>
          </Grid>
          <Grid item xs>
            <FormControlComponent fullWidth>
              <DatePicker
                label="Valid To"
                minDate={new Date(qualification?.validFrom ?? '')}
                renderInput={renderValidToInput}
                onChange={handleChangeValidTo}
                value={qualification?.validTo}
              />
            </FormControlComponent>
          </Grid>
        </Grid>
      </FormControlComponent>
      <FormControl
        fullWidth
        sx={{
          marginBottom: '30px !important',
        }}
      >
        <FormControlLabel
          control={<Checkbox name="isPrimary" onChange={handleChange} checked={qualification?.isPrimary} />}
          label="Mark as Primary "
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default QualificationForm;
