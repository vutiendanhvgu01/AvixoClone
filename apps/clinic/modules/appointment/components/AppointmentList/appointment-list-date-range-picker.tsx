import React from 'react';
import { FormControl, styled, TextField } from '@mui/material';
import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import subDays from 'date-fns/subDays';

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  fontSize: 16,
  '& fieldset': {
    borderColor: theme.palette.divider,
  },

  '& input': {
    fontSize: 16,
    fontWeight: 500,
  },
}));

interface AppointmentListDateRangePickerProps {
  onDateRangeSelected: (dateRange: DateRange<Date>) => void;
}

const AppointmentListDateRangePicker: React.FC<AppointmentListDateRangePickerProps> = ({ onDateRangeSelected }) => {
  const today = new Date();
  const [value, setValue] = React.useState<DateRange<Date>>([subDays(today, 3), today]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'Select Date', end: 'Select Date' }}>
      <FormControl fullWidth>
        <DateRangePicker
          label="Time Range"
          key="timeRange"
          value={value}
          onChange={newValue => {
            setValue(newValue);
            onDateRangeSelected(newValue);
          }}
          renderInput={({ inputProps, ...startProps }, endProps) => {
            const startValue = inputProps?.value;
            // eslint-disable-next-line no-param-reassign
            delete inputProps?.value;
            return (
              <StyledTextField
                {...startProps}
                inputProps={inputProps}
                value={`${startValue} - ${endProps.inputProps?.value}`}
                fullWidth
              />
            );
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default AppointmentListDateRangePicker;
