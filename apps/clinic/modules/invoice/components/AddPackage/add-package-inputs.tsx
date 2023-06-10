import React, { useCallback, useState } from 'react';
import { Checkbox, Divider, FormControlLabel, Stack, TextField, TextFieldProps } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddPackageInputs: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const renderExpireDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} name="expiryDate" required />,
    [],
  );

  const handleChangeExpireDate = useCallback(
    (value: any) => {
      setDate(value);
    },
    [setDate],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TextField id="note" label="Note" variant="outlined" />
        <Divider />
        <FormControlLabel label="Package has an expiry date" control={<Checkbox />} />
        <DatePicker
          onChange={handleChangeExpireDate}
          renderInput={renderExpireDateInput}
          label="Expiry date"
          minDate={new Date()}
          value={date}
        />
        <Divider />
      </Stack>
    </LocalizationProvider>
  );
};

export default AddPackageInputs;
