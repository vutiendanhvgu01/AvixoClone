import {
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { CalendarIcon } from 'share-components';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import AddPatientInput from './add-edit-patient-input';
import AddPatientSelect from './add-edit-patient-select';

interface PatientAllergyFormProps {
  back: () => void;
}
type FormValues = AddPatientInitialValuesType;

const PatientAllergyForm: React.FC<PatientAllergyFormProps> = ({ back }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [status] = useState('no');
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <LinearProgress value={80} variant="determinate" sx={{ mb: 4 }} />
      <Typography variant="h6">4. Drug Allergy</Typography>
      <FormControl sx={{ py: 2 }} fullWidth>
        <FormLabel id="allergy-status" required>
          Status
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="allergy-status"
          name="status"
          defaultValue="no"
          sx={{ py: 2, justifyContent: 'space-between' }}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="unknown" control={<Radio />} label="Unknown" />
        </RadioGroup>
      </FormControl>
      {status === 'yes' ? (
        <Stack gap={2}>
          <AddPatientSelect fullWidth required name="type" label="Type" options={[]} />
          <AddPatientSelect fullWidth required name="severity" label="Severity" options={[]} />
          <AddPatientSelect fullWidth required name="criticality" label="Criticality" options={[]} />
          <AddPatientSelect fullWidth required name="verification" label="Verification" options={[]} />
          <AddPatientSelect fullWidth required name="clinicalStatus" label="Clinical Status" options={[]} />
          <AddPatientInput fullWidth name="drugName" label="Drug Name" required />
          <AddPatientInput fullWidth name="drugBrand" label="Drug Brand" required />
          <AddPatientInput fullWidth name="manifestation" label="Manifestation" />
          <AddPatientInput fullWidth name="description" label="Manifestation" />
          <AddPatientInput fullWidth name="route" label="Route of Exposure" />
          <DatePicker
            label="First Occurence"
            inputFormat="MM/dd/yyyy"
            value={values.firstOccurence}
            onChange={val => setFieldValue('firstOccurence', val)}
            components={{ OpenPickerIcon: CalendarIcon }}
            renderInput={params => <TextField {...params} required />}
          />
          <DatePicker
            label="Last Occurence"
            inputFormat="MM/dd/yyyy"
            value={values.lastOccurence}
            onChange={val => setFieldValue('lastOccurence', val)}
            components={{ OpenPickerIcon: CalendarIcon }}
            renderInput={params => <TextField {...params} required />}
          />
          <DatePicker
            label="Resolved On"
            inputFormat="MM/dd/yyyy"
            value={values.resolvedOn}
            onChange={val => setFieldValue('resolvedOn', val)}
            components={{ OpenPickerIcon: CalendarIcon }}
            renderInput={params => <TextField {...params} required />}
          />
          <Divider />
        </Stack>
      ) : (
        <Box display="flex" flex={1} />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 3, alignItems: 'center' }}>
        <Box gap={2}>
          <Button variant="text" onClick={back}>
            Back
          </Button>
          <Button type="submit">Save Update</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default PatientAllergyForm;
