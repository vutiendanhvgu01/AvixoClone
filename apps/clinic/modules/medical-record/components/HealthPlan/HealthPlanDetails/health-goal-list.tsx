import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import HeathGoalCard from './health-goal-card';
import { HealthGoal, HealthGoalListProps } from './health-goal-types';

const HealthGoalList: React.FC<HealthGoalListProps> = ({ healthGoals }) => (
  <Box paddingTop={4}>
    <Box paddingBottom={4}>
      <Typography variant="h6">Health Goal</Typography>
    </Box>
    <Grid container spacing={4}>
      {healthGoals.map((healthGoal: HealthGoal) => (
        <Grid xs={4} item key={healthGoal.goalTarget}>
          <HeathGoalCard {...healthGoal} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HealthGoalList;
