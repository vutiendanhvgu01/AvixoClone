import { Stack, Typography, TextField, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { MonthsList } from 'share-components';
import { ChronicConditionGoalHypertensionType } from '../health-goal-types';

interface ChronicConditionGoalHypertensionProps {
  targetNumerator: number;
  targetDenominator: number;
  targetMonth: number;
  isMonitorBlood: boolean;
  times: number;
  timesPerMonth: number;
  onChange: (value: ChronicConditionGoalHypertensionType) => void;
}

const ChronicConditionGoalHypertension: React.FC<ChronicConditionGoalHypertensionProps> = ({
  targetNumerator,
  targetDenominator,
  targetMonth,
  isMonitorBlood,
  times,
  timesPerMonth,
  onChange,
}) => {
  const [currentTargetNumerator, setCurrentTargetNumerator] = useState(targetNumerator ?? 0);
  const [currentTargetDenominator, setCurrentTargetDenominator] = useState(targetDenominator ?? 0);
  const [currentTargetMonth, setCurrentTargetMonth] = useState(targetMonth ?? 1);
  const [currentMonitorBlood, setCurrentMonitorBlood] = useState(isMonitorBlood ?? false);
  const [currentTimes, setCurrentTimes] = useState(times ?? 0);
  const [currentTimesPerMonth, setCurrentTimesPerMonth] = useState(timesPerMonth ?? 1);
  const [isDirty, setIsDirty] = useState(false);
  const handleChangeTatgetNumerator = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTargetNumerator(+evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeTatgetDenominator = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTargetDenominator(+evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeTargetMonth = useCallback((value: string | number) => {
    setCurrentTargetMonth(+value);
    setIsDirty(true);
  }, []);
  const handleChangeMonitor = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMonitorBlood(evt.target.checked);
    if (!evt.target.checked) {
      setCurrentTimes(0);
      setCurrentTimesPerMonth(1);
    }
    setIsDirty(true);
  }, []);
  const handleChangeTimes = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTimes(+evt.target.value);
    setIsDirty(true);
  }, []);
  const handleChangeTimesPerMonth = useCallback((value: string | number) => {
    setCurrentTimesPerMonth(+value);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (onChange && isDirty) {
      onChange({
        targetNumerator: currentTargetNumerator,
        targetDenominator: currentTargetDenominator,
        targetMonth: currentTargetMonth,
        isMonitorBlood: currentMonitorBlood,
        times: currentTimes,
        timesPerMonth: currentTimesPerMonth,
      });
      setIsDirty(false);
    }
  }, [
    currentMonitorBlood,
    currentTargetDenominator,
    currentTargetMonth,
    currentTargetNumerator,
    currentTimes,
    currentTimesPerMonth,
    isDirty,
    onChange,
  ]);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ marginTop: '17px' }}>
        <Typography variant="body2" color="neutral.900">
          Reach or maintain your target blood pressure of ≤
        </Typography>
        <TextField
          id="target-umerator"
          value={currentTargetNumerator}
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
          onChange={handleChangeTatgetNumerator}
        />
        <Typography variant="body2" color="neutral.900">
          /
        </Typography>
        <TextField
          id="target-umerator"
          value={currentTargetDenominator}
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
          onChange={handleChangeTatgetDenominator}
        />
        <Typography variant="body2" color="neutral.900">
          mmHg in
        </Typography>
        <MonthsList value={currentTargetMonth} onChange={handleChangeTargetMonth} />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ marginTop: '17px' }}>
        <FormControlLabel
          control={<Checkbox checked={currentMonitorBlood} onChange={handleChangeMonitor} />}
          label="Monitor your blood pressure"
        />
        <TextField
          id="target-umerator"
          value={currentTimes}
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
          onChange={handleChangeTimes}
          disabled={!currentMonitorBlood}
        />
        <Typography variant="body2" color="neutral.900">
          time(s) per
        </Typography>
        <MonthsList value={currentTimesPerMonth} onChange={handleChangeTimesPerMonth} disabled={!currentMonitorBlood} />
      </Stack>
      <Stack sx={{ width: '50%', marginTop: '17px' }} spacing={2}>
        <Alert severity="info" icon={false}>
          <Typography variant="subtitle1" color="info.main">
            If you are feeling unwell, please consult your doctor
          </Typography>
        </Alert>
      </Stack>
    </>
  );
};

export default ChronicConditionGoalHypertension;
