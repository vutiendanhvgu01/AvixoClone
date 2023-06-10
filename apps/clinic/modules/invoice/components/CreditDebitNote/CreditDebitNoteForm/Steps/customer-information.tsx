import { Autocomplete, Container, FormControl, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { AvixoPatientAutoComplete, FormBody } from 'share-components';
import { CreditDebitNoteFormValues } from '../credit-debit-note-form-types';

const CreditNoteCustomerInformation: React.FC = () => {
  const { getFieldProps, setFieldValue, values, touched, errors } = useFormikContext<CreditDebitNoteFormValues>();

  return (
    <FormBody>
      <Container sx={{ padding: '0 0 20px 0' }}>
        <Typography variant="h6" sx={{ mb: 3.5 }} color="black.dark">
          1. Customer Information
        </Typography>
        <FormControl fullWidth>
          <Autocomplete
            disableClearable
            options={[
              { label: 'Patient', value: 1 },
              { label: 'Insurance', value: 2 },
            ]}
            value={values.customerType}
            onChange={(_, value) => setFieldValue('customerType', value)}
            renderInput={params => (
              <TextField
                {...params}
                required
                {...getFieldProps('customerType')}
                label="Select Customer"
                error={!!(touched.customerType && errors.customerType)}
                helperText={touched.customerType && errors.customerType}
              />
            )}
          />
        </FormControl>
        {values.customerType &&
          (values.customerType?.value === 1 ? (
            <FormControl fullWidth>
              <AvixoPatientAutoComplete
                options={[
                  { label: 'Patient 1', value: '1', nric: 'S1234567D' },
                  { label: 'Patient 2', value: '2', nric: 'S1236512H' },
                ]}
                onChange={(_, value) => setFieldValue('patient', value)}
                value={values.patient}
                inputProps={{ ...getFieldProps('patient') }}
                error={!!(touched.patient && errors.patient)}
                helperText={touched.patient && errors.patient}
              />
            </FormControl>
          ) : (
            <FormControl fullWidth>
              <Autocomplete
                disableClearable
                options={[
                  { label: 'Cigna International Health Insurance', value: 1 },
                  { label: 'Prudential Singapore', value: 2 },
                ]}
                value={values.insurance}
                onChange={(_, value) => setFieldValue('insurance', value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    required
                    label="Select Insurance"
                    {...getFieldProps('insurance')}
                    error={!!(touched.insurance && errors.insurance)}
                    helperText={touched.insurance && errors.insurance}
                  />
                )}
              />
            </FormControl>
          ))}
      </Container>
    </FormBody>
  );
};
export default CreditNoteCustomerInformation;
