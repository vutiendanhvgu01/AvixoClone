import { Stack, Box, Typography, Divider, Button, LinearProgress } from '@mui/material';
import { useFormikContext } from 'formik';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import PatientOtherContact from './patient-other-contact';

interface PatientOtherContactsFormProps {
  back: () => void;
  edit?: boolean;
}
type FormValues = AddPatientInitialValuesType;
const PatientOtherContactsForm: React.FC<PatientOtherContactsFormProps> = ({ back, edit }) => {
  const { values } = useFormikContext<FormValues>();

  return (
    <Box>
      <LinearProgress value={60} variant="determinate" sx={{ mb: 4 }} />
      <Stack gap={2} pb={5}>
        <Typography variant="h6">4. Other Contact(s)</Typography>
        <PatientOtherContact contactArray={values.contact} />
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, alignItems: 'center' }}>
          <Typography variant="subtitle2" />
          <Box gap={2}>
            {!edit && (
              <Button variant="text" onClick={back}>
                Back
              </Button>
            )}
            <Button type="submit">{edit ? 'Save Changes' : 'Add Patient'}</Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default PatientOtherContactsForm;
