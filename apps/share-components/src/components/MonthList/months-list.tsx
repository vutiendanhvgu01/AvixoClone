import { FormControl, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
];

interface MonthsListProps {
  value: number;
  onChange: (value: number | string) => void;
  disabled?: boolean;
}

const MonthsList: React.FC<MonthsListProps> = ({ value, onChange, disabled }) => {
  const handleChange = useCallback(
    (evt: SelectChangeEvent<number>) => {
      if (onChange) {
        onChange(evt.target.value);
      }
    },
    [onChange],
  );
  return (
    <>
      <FormControl variant="standard" sx={{ m: 1 }}>
        <Select
          id="month-select-standard"
          value={value ?? 1}
          onChange={handleChange}
          sx={{ width: '100px' }}
          disabled={disabled}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" color="neutral.900">
        month(s)
      </Typography>
    </>
  );
};

export default MonthsList;
