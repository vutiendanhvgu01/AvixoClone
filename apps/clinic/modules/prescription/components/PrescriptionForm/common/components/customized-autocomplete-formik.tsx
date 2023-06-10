import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { FieldProps } from 'formik';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ADD_FROM_FIELDS, defaultInstructions, initialInventoryValues } from '../../constants/values';
import { OptionDefault } from '../../types';

interface CustomizedSelectForFormik extends FieldProps {
  children: React.ReactNode;
  autocompleteProps?: AutocompleteProps<OptionDefault, undefined, boolean, undefined>;
  selectLabel: string;
  options: OptionDefault[];
  onChange?: (name: string, value: Record<string, any>) => void;
  error?: boolean;
}
const CustomizedAutocompleteForFormik: FC<CustomizedSelectForFormik> = ({
  form,
  field,
  selectLabel,
  options,
  autocompleteProps,
  onChange,
  error = false,
}) => {
  const { name, value } = field;
  const textField = useRef<any>(null);
  const { setFieldValue, resetForm, values, setValues, isSubmitting } = form;

  useEffect(() => {
    if (isSubmitting && textField.current) {
      textField.current.remove();
    }
  }, [isSubmitting]);
  const handleChangeSelect = useCallback(
    (e: any, newValue: Record<string, any> | null): void => {
      if (onChange && newValue) {
        onChange(name, newValue);
      }

      if (newValue) {
        /**
         * handle for add from.
         */
        if (name === 'addFromName' && ADD_FROM_FIELDS.includes(newValue?.value)) {
          // select an add from prescription
          let fromPrescription: Record<string, any> = {};
          switch (newValue?.value) {
            case 'dispensing-history':
              // please more modify
              fromPrescription = {};
              break;
            case 'latest-prescription':
              // please more modify
              fromPrescription = {};
              break;
            default:
              fromPrescription = values?.inventory ? values?.inventory : initialInventoryValues;
          }
          const currentValues = values;
          currentValues[newValue?.value] = fromPrescription;

          setValues(currentValues);
          /**
           * end handle for add from.
           */

          // set up step 1
          if (!Array.isArray(values?.steps)) {
            setFieldValue('instructions', [defaultInstructions]);
          }
        }
        setFieldValue(name, newValue.value);
      } else if (values.addFromName === 'inventory' && values.inventory) {
        if (name === 'patient' || name === 'addFromName') {
          resetForm();
        }
        setFieldValue('inventory', { ...values.inventory, [name]: null });
      }
    },
    [name, setFieldValue, resetForm, onChange, values, setValues],
  );
  return (
    <Autocomplete
      fullWidth
      disablePortal
      options={options}
      onChange={handleChangeSelect}
      value={value}
      renderInput={params => (
        <>
          <TextField ref={textField} required {...params} {...field} label={selectLabel} error={error} />
          <input type="text" hidden name={name} value={value} />
        </>
      )}
      disableClearable
      {...autocompleteProps}
    />
  );
};
export default CustomizedAutocompleteForFormik;
