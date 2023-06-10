import { Stack, Typography, TextField, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { MonthsList } from 'share-components';
import { ChronicConditionGoalHyperlipidemiaLipidDisordersType } from '../health-goal-types';

interface ChronicConditionGoalHyperlipidemiaLipidDisordersProps {
  target: number;
  month: number;
  unit: string;
  onChange: (value: ChronicConditionGoalHyperlipidemiaLipidDisordersType) => void;
}

const ChronicConditionGoalHyperlipidemiaLipidDisorders: React.FC<
  ChronicConditionGoalHyperlipidemiaLipidDisordersProps
> = ({ target, unit, month, onChange }) => {
  const [currentTarget, setCurrentTarget] = useState(target ?? 0);
  const [currentUnit, setCurrentUnit] = useState(unit ?? '');
  const [currentMonth, setCurrentMonth] = useState(month ?? 1);
  const [isDirty, setIsDirty] = useState(false);
  const handleChangeTatget = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTarget(+evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeUnit = useCallback((evt: SelectChangeEvent<string>) => {
    setCurrentUnit(evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeMonth = useCallback((value: string | number) => {
    setCurrentMonth(+value);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (onChange && isDirty) {
      onChange({
        target: currentTarget,
        month: currentMonth,
        unit: currentUnit,
      });
      setIsDirty(false);
    }
  }, [currentMonth, currentTarget, currentUnit, isDirty, onChange]);

  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: '17px' }}>
      <Typography variant="body2" color="neutral.900">
        {'Reach or maintain your target LDL-C of <'}
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
      <FormControl variant="standard" sx={{ m: 1 }}>
        <Select id="unit-select-standard" value={currentUnit} onChange={handleChangeUnit} sx={{ width: '100px' }}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="mmol/L">mmol/L</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body2" color="neutral.900">
        in
      </Typography>
      <MonthsList value={currentMonth} onChange={handleChangeMonth} />
    </Stack>
  );
};

export default ChronicConditionGoalHyperlipidemiaLipidDisorders;
