import { Stack, Typography, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { MonthsList } from 'share-components';

interface LifestyleGoalBMIProps {
  target: number;
  month: number;
  onChange: (target: number, month: number) => void;
}

const LifestyleGoalBMI: React.FC<LifestyleGoalBMIProps> = ({ target, month, onChange }) => {
  const [currentTarget, setCurrentTarget] = useState(target ?? 0);
  const [currentMonth, setCurrentMonth] = useState(month ?? 1);
  const [isDirty, setIsDirty] = useState(false);
  const handleChangeTatget = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTarget(+evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeMonth = useCallback((value: string | number) => {
    setCurrentMonth(+value);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (onChange && isDirty) {
      onChange(currentTarget, currentMonth);
      setIsDirty(false);
    }
  }, [currentMonth, currentTarget, isDirty, onChange]);

  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: '17px' }}>
      <Typography variant="body2" color="neutral.900">
        Reach or maintain your target body weight of
      </Typography>
      <TextField
        id="standard-number"
        value={currentTarget}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
        variant="standard"
        sx={{ width: '100px' }}
        onChange={handleChangeTatget}
      />
      <Typography variant="body2" color="neutral.900">
        kg in
      </Typography>
      <MonthsList value={currentMonth} onChange={handleChangeMonth} />
    </Stack>
  );
};

export default LifestyleGoalBMI;
