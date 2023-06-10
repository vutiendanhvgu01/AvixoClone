import { FormControl, TextField, StandardTextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import { AddPatientBasicValuesType } from './add-edit-patient-form-types';
import ErrorText from './error-text';

type FormValues = AddPatientBasicValuesType;
type FormValueKeys = keyof FormValues;

interface AddPatientInputProps extends StandardTextFieldProps {
  name: FormValueKeys;
}

const AddPatientInput: React.FC<AddPatientInputProps> = props => {
  const { name } = props;
  const { touched, errors, values, setFieldValue } = useFormikContext<FormValues>();
  return (
    <FormControl sx={{ height: 58, display: 'grid', mb: 1 }}>
      <TextField {...props} value={values[name]} onChange={e => setFieldValue(name, e.target.value)} />
      <ErrorText>{errors[name] && touched[name] && errors[name]}</ErrorText>
    </FormControl>
  );
};
export default AddPatientInput;
