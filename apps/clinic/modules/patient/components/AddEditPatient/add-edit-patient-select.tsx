import { FormControl, MenuItem, TextField, StandardTextFieldProps, Divider } from '@mui/material';
import { useFormikContext } from 'formik';
import { AddPatientBasicValuesType } from './add-edit-patient-form-types';
import ErrorText from './error-text';

interface OptionProps {
  value: string;
  label: string;
  isDisabled?: boolean;
  isSeparator?: boolean;
}

function isCustomOption(option: any): option is OptionProps {
  return option.value;
}

type FormValues = AddPatientBasicValuesType;
type FormValueKeys = keyof FormValues;

interface AddPatientSelectProps extends StandardTextFieldProps {
  options: Array<OptionProps> | Array<string>;
  name: FormValueKeys;
  customError?: string;
}

const AddPatientSelect: React.FC<AddPatientSelectProps> = props => {
  const { options, name, customError } = props;
  const { touched, errors } = useFormikContext<FormValues>();

  const getOption = (option: OptionProps | string) => {
    if (isCustomOption(option)) {
      if (option?.isSeparator) {
        return <Divider sx={{ width: '100%' }} />;
      }
      return option?.label;
    }
    return option || 'Select';
  };

  const getValue = (option: OptionProps | string) => {
    if (isCustomOption(option)) {
      return option?.value;
    }
    return option?.split(' ').join('-').toLowerCase() || '';
  };

  return (
    <FormControl sx={{ minHeight: 58, display: 'grid' }}>
      <TextField select {...props} error={!!(errors[name] && touched[name])} sx={{ textTransform: 'capitalize' }}>
        {options.map(option => (
          <MenuItem
            key={isCustomOption(option) ? option.value : option}
            value={getValue(option)}
            sx={{ textTransform: 'capitalize' }}
            disabled={isCustomOption(option) && !!option.isDisabled}
          >
            {getOption(option)}
          </MenuItem>
        ))}
      </TextField>
      <ErrorText>{customError || (errors[name] && touched[name] && errors[name])}</ErrorText>
    </FormControl>
  );
};

export default AddPatientSelect;
