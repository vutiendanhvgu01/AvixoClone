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
];

interface DaysPerWeekProps {
  value: number;
  onChange: (value: number | string) => void;
}

const DaysPerWeek: React.FC<DaysPerWeekProps> = ({ value, onChange }) => {
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
        <Select id="days-select-standard" value={value ?? 1} onChange={handleChange} sx={{ width: '100px' }}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" color="neutral.900">
        days per week
      </Typography>
    </>
  );
};

export default DaysPerWeek;
