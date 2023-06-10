import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { CircularProgress, InputAdornment, Typography } from '@mui/material';
import VitalFormSchema, { initialVitalValues, VitalFormValues } from 'modules/vitals/components/vital-form-schema';
import InvalidPanelComponent from 'share-components/src/components/AvixoAuthForm/invalid-panel';
import React from 'react';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: 24,
  ':last-child': {
    marginBottom: 0,
  },
}));

interface VitalFormProps {
  formTitle: string;
  onSubmit: (arg: any) => Promise<void>;
  error?: string;
}

const VitalForm: React.FC<VitalFormProps> = ({ formTitle, onSubmit, error = '' }) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleFormSubmit = async (values: VitalFormValues) => {
    setErrorMessage('');
    const isOneFieldFilled = Object.keys(values).some(key => values[key as keyof VitalFormValues]);
    if (!isOneFieldFilled) {
      setErrorMessage('Need to fill at least 1 field');
    } else {
      await onSubmit(values);
    }
  };

  const formik = useFormik({
    initialValues: initialVitalValues,
    onSubmit: handleFormSubmit,
    validationSchema: VitalFormSchema,
    validateOnChange: false,
  });

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
        {formTitle}
      </Typography>
      <form method="POST" onSubmit={formik.handleSubmit} noValidate>
        <Stack sx={{ mt: 3 }}>
          <FormControlComponent>
            <TextField
              label="Weight"
              id="weight"
              type="number"
              helperText={formik.errors.weight}
              error={!!formik.errors.weight}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              {...formik.getFieldProps('weight')}
            />
          </FormControlComponent>
          <FormControlComponent>
            <TextField
              label="Height"
              id="height"
              type="number"
              helperText={formik.errors.height}
              error={!!formik.errors.height}
              InputProps={{
                endAdornment: <InputAdornment position="end">Cm</InputAdornment>,
              }}
              {...formik.getFieldProps('height')}
            />
          </FormControlComponent>
          <FormControlComponent>
            <TextField
              label="Body Temp"
              id="bodyTemp"
              type="number"
              helperText={formik.errors.bodyTemp}
              error={!!formik.errors.bodyTemp}
              InputProps={{
                endAdornment: <InputAdornment position="end">C°</InputAdornment>,
              }}
              {...formik.getFieldProps('bodyTemp')}
            />
          </FormControlComponent>
          <FormControlComponent>
            <TextField
              label="Pulse"
              id="pulse"
              type="number"
              helperText={formik.errors.pulse}
              error={!!formik.errors.pulse}
              InputProps={{
                endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
              }}
              {...formik.getFieldProps('pulse')}
            />
          </FormControlComponent>
          <FormControlComponent>
            <TextField
              label="SpO2"
              id="spo2"
              type="number"
              helperText={formik.errors.spo2}
              error={!!formik.errors.spo2}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              {...formik.getFieldProps('spo2')}
            />
          </FormControlComponent>
          <FormControlComponent>
            <TextField
              label="Blood Pressure"
              id="bloodPressure"
              helperText={formik.errors.bloodPressure}
              error={!!formik.errors.bloodPressure}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm Hg</InputAdornment>,
              }}
              {...formik.getFieldProps('bloodPressure')}
            />
          </FormControlComponent>
          {(errorMessage || error) && <InvalidPanelComponent message={errorMessage || error} />}
          <Button type="submit" data-testid="submit-btn" disabled={formik.isSubmitting} sx={{ padding: '16px 0px' }}>
            {formik.isSubmitting ? (
              <CircularProgress data-testid="submit-spinner" color="inherit" size={20} sx={{ mx: '33px' }} />
            ) : (
              'Submit'
            )}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default VitalForm;
