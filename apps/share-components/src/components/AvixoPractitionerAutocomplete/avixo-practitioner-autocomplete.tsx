import { AutocompleteProps, TextField } from '@mui/material';
import { FieldInputProps } from 'formik';
import { FC } from 'react';
import AvixoAutoComplete from '../AvixoAutoComplete/avixo-autocomplete';

interface AvixoPractitionerAutoCompleteProps extends Partial<AutocompleteProps<any, boolean, any, any>> {
  error?: boolean;
  helperText?: string | boolean;
  inputProps?: FieldInputProps<any>;
  baseUrl?: string;
}

const AvixoPractitionerAutoComplete: FC<AvixoPractitionerAutoCompleteProps> = ({
  error = false,
  helperText,
  inputProps,
  baseUrl,
  ...restProps
}) => {
  const url = baseUrl && `${baseUrl}/api/practitioner/list`;
  return (
    <AvixoAutoComplete
      id="practitioner-select"
      url={url}
      fullWidth
      disablePortal
      disableClearable
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => <TextField required {...params} {...inputProps} error={error} helperText={helperText} />}
      {...restProps}
    />
  );
};

export default AvixoPractitionerAutoComplete;
