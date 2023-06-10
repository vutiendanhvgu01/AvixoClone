import { Stack, Box, Typography, Divider, Button, LinearProgress } from '@mui/material';
import { useFormikContext } from 'formik';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import PatientAddress from './patient-address';
import PatientEmail from './patientEmail';
import PatientPhone from './phone-input';

type FormValues = AddPatientInitialValuesType;

interface PatientContactFormProps {
  back: () => void;
  edit?: boolean;
}

const PatientDetailForm: React.FC<PatientContactFormProps> = ({ back, edit }) => {
  const { values } = useFormikContext<FormValues>();
  return (
    <Box>
      <LinearProgress value={40} variant="determinate" sx={{ mb: 4 }} />
      <Stack gap={2} pb={5}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          2. Contact Information
        </Typography>
        <PatientPhone phoneArray={values.phones} />
        <Divider />
        <PatientEmail emailArray={values.emails} />
        <Divider />
        <PatientAddress addressArray={values.addresses} />
      </Stack>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, alignItems: 'center' }}>
        <Stack>{!edit && <Typography variant="subtitle2">3. Additional Info</Typography>}</Stack>
        <Box gap={2}>
          {!edit && (
            <Button variant="text" onClick={back}>
              Back
            </Button>
          )}
          <Button type="submit">{edit ? 'Save Changes' : 'Next'}</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default PatientDetailForm;
