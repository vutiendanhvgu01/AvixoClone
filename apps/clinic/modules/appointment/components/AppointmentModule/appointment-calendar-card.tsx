import { Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import React from 'react';

interface AppointmentCalendarCardProps {}

const AppointmentCalendarCard: React.FC<AppointmentCalendarCardProps> = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const onChangeDate = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };
  return (
    <Paper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker date={date} dayOfWeekFormatter={day => day} onChange={onChangeDate} />
      </LocalizationProvider>
    </Paper>
  );
};

export default AppointmentCalendarCard;
