import { Stack, Box, Typography, Divider, Button, LinearProgress, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import AddPatientInput from './add-edit-patient-input';
import AddPatientSelect from './add-edit-patient-select';
import CONSTANTS from './form-options';

interface PatientOthersFormProps {
  back: () => void;
  edit?: boolean;
}
type FormValues = AddPatientInitialValuesType;
const PatientOthersForm: React.FC<PatientOthersFormProps> = ({ back, edit }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  return (
    <Box>
      <LinearProgress value={60} variant="determinate" sx={{ mb: 4 }} />
      <Stack gap={2} pb={5}>
        <Typography variant="h6">3. Additional Info</Typography>
        <AddPatientSelect
          name="religion"
          label="Religion"
          options={CONSTANTS.religions}
          value={values.religion}
          onChange={e => setFieldValue('religion', e.target.value)}
        />
        <AddPatientSelect
          name="race"
          label="Race"
          options={CONSTANTS.races}
          value={values.race}
          onChange={e => setFieldValue('race', e.target.value)}
        />
        <AddPatientInput fullWidth name="occupation" label="Occupation" />
        <AddPatientInput fullWidth name="company" label="Company" />
        <AddPatientInput
          fullWidth
          name="maritalStatus"
          label="Marital Status"
          value={values.maritalStatus}
          onChange={e => setFieldValue('maritalStatus', e.target.value)}
        />
        <AddPatientInput
          fullWidth
          name="residencyStatus"
          label="Residential Status"
          value={values.residencyStatus}
          onChange={e => setFieldValue('residencyStatus', e.target.value)}
        />
        <TextField fullWidth multiline rows={3} name="notes" label="Important Notes" defaultValue={values.notes} />
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, alignItems: 'center' }}>
          <Typography variant="subtitle2">4. Other Contact(s)</Typography>
          <Box gap={2}>
            {!edit && (
              <Button variant="text" onClick={back}>
                Back
              </Button>
            )}
            <Button type="submit">{edit ? 'Save Changes' : 'Next'}</Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default PatientOthersForm;
