import { Stack, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import { DaysPerWeek } from 'share-components';

interface ActivityGoalExerciseProps {
  value: number;
  onChange: (value: number) => void;
}

const ActivityGoalExercise: React.FC<ActivityGoalExerciseProps> = ({ value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value ?? 1);
  const handleChange = useCallback(
    (_value: string | number) => {
      setCurrentValue(+_value);
      onChange(+_value);
    },
    [onChange],
  );
  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: '17px' }}>
      <Typography variant="body2" color="neutral.900">
        Engage in exercise
      </Typography>
      <DaysPerWeek value={currentValue} onChange={handleChange} />
    </Stack>
  );
};

export default ActivityGoalExercise;
