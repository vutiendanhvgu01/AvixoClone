import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import { FieldProps } from 'formik';
import { FC } from 'react';

interface CustomizedSelectForFormik extends FieldProps {
  selectLabel: string;
  options: Record<string, any>[];
  formControlProps?: FormControlProps;
  selectBaseProps?: SelectProps;
  onChange?: (name: string, value: string) => void;
  children?: React.ReactNode;
}
const CustomizedAutocompleteForFormik: FC<CustomizedSelectForFormik> = ({
  field,
  selectLabel,
  options,
  formControlProps,
  selectBaseProps,
  onChange,
  children,
}) => {
  const { name, value } = field;
  const handleChange = (e: SelectChangeEvent<any>) => {
    if (onChange) {
      onChange(name, e.target.value);
    }
  };

  return (
    <FormControl fullWidth {...formControlProps}>
      <InputLabel id="demo-simple-select-label">{selectLabel}</InputLabel>
      <Select
        name={name}
        value={value}
        label={selectLabel}
        {...selectBaseProps}
        inputProps={field}
        onChange={handleChange}
      >
        {children ||
          (options.length > 0 &&
            options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )))}
      </Select>
    </FormControl>
  );
};
export default CustomizedAutocompleteForFormik;
