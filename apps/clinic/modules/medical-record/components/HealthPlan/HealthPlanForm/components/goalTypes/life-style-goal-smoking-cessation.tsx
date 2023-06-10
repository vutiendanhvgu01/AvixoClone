import { Stack, FormControl, TextFieldProps, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCallback, useState } from 'react';

interface LifestyleGoalSmokingCessationProps {
  value: Date | null;
  minDate: Date | undefined;
  onChange: (value: Date | null) => void;
}

const LifestyleGoalSmokingCessation: React.FC<LifestyleGoalSmokingCessationProps> = ({ value, minDate, onChange }) => {
  const [currentValue, setCurrentValue] = useState<Date | null>(value ?? minDate ?? new Date());
  const handleChange = useCallback(
    (_value: Date | null) => {
      setCurrentValue(_value);
      onChange(_value);
    },
    [onChange],
  );
  return (
    <Stack direction="row" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl>
          <DatePicker
            label="Quit Smoking by"
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField {...params} name="quitSmokingBy" />
            )}
            minDate={minDate}
            onChange={handleChange}
            value={currentValue}
          />
        </FormControl>
      </LocalizationProvider>
    </Stack>
  );
};

export default LifestyleGoalSmokingCessation;
