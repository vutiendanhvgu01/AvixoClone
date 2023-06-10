import { Autocomplete, AutocompleteProps, Avatar, Box, Stack, TextField, Typography } from '@mui/material';
import { FieldInputProps } from 'formik';
import { FC } from 'react';
import { getFirstLetters } from '../../utils/stringUtils';
import AvixoAutoComplete from '../AvixoAutoComplete/avixo-autocomplete';

export interface PatientOption {
  [key: string]: any;
  label: string;
  value: string;
  nric: string;
}
interface AvixoPatientAutoCompleteProps extends Partial<AutocompleteProps<any, boolean, any, any>> {
  error?: boolean;
  helperText?: string | boolean;
  inputProps?: FieldInputProps<any>;
  baseUrl?: string;
}

const AvixoPatientAutoComplete: FC<AvixoPatientAutoCompleteProps> = ({
  error = false,
  helperText,
  inputProps,
  baseUrl,
  ...restProps
}) => {
  const url = baseUrl && `${baseUrl}/api/patient/list`;
  return (
    <AvixoAutoComplete
      url={url}
      fullWidth
      getOptionLabel={option => option && option?.fullName}
      disablePortal
      disableClearable
      renderInput={params => (
        <TextField required {...params} {...inputProps} label="Select Patient" error={error} helperText={helperText} />
      )}
      renderOption={(props: Record<string, any>, option: Record<string, any>) => (
        <li {...props}>
          <Stack flexDirection="row" justifyContent="space-around">
            <Avatar
              sx={{
                bgcolor: 'primary.main',
              }}
            >
              {getFirstLetters(option.fullName)}
            </Avatar>
            <Box ml={2}>
              <Typography variant="body1">{option?.label}</Typography>
              <Typography variant="body2">{`ID: ${option?.value} - ${option?.nric}`}</Typography>
            </Box>
          </Stack>
        </li>
      )}
      {...restProps}
    />
  );
};

export default AvixoPatientAutoComplete;
