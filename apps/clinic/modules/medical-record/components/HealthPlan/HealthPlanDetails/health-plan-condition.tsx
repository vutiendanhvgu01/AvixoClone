import { Chip, Stack, Typography } from '@mui/material';
import React from 'react';

interface HealthPlanConditionProps {
  conditions: string[];
}

const HealthPlanCondition: React.FC<HealthPlanConditionProps> = ({ conditions }) => (
  <Stack spacing={1}>
    <Typography variant="overline">CONDITION(S):</Typography>
    <Stack spacing={1} direction="row">
      {conditions.map((condition: string) => (
        <Chip
          key={condition}
          label={condition}
          sx={{
            backgroundColor: 'primary.main',
            color: '#FFFFFF',
          }}
        />
      ))}
    </Stack>
  </Stack>
);

export default HealthPlanCondition;
