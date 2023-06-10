import { Box, Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useCallback, useRef, useState } from 'react';
import { PlusIcon } from 'share-components';
import GoalComponent from './goalTypes/heath-goal-item';
import GoalProps, { GoalItem } from './health-goal-types';

const HealthyGoalSection: React.FC<GoalProps> = ({ healthyGoals, onChange, carePlan }) => {
  const [currentHealthyGoals, setCurrentHealthyGoals] = useState<GoalItem[]>(healthyGoals ?? []);
  const goalCounterRef = useRef(1);
  const handleAddNewGoal = useCallback(async () => {
    currentHealthyGoals.push({
      goalValue: 0,
      goalName: `Goal ${goalCounterRef.current}`,
      goalDetail: null,
    });
    setCurrentHealthyGoals([...currentHealthyGoals]);
    goalCounterRef.current += 1;
    onChange([...currentHealthyGoals]);
  }, [currentHealthyGoals, onChange]);

  return (
    <form method="POST">
      <Box
        sx={{
          padding: '32px 0',
        }}
      >
        <input type="text" hidden name="action" value="create-goal" />
        {carePlan?.id && <input type="text" hidden name="carePlanId" value={carePlan.id} />}
        {carePlan?.uuid && <input type="text" hidden name="carePlanUUID" value={carePlan.uuid} />}
        <Typography variant="h6" color="neutral.900">
          Health Goal
        </Typography>
        <Divider sx={{ margin: '32px -32px' }} />
        {currentHealthyGoals.map((goal: GoalItem, index: number) => {
          const key = `goal_${index}-${goal?.goalName}`;
          return (
            <GoalComponent
              key={key}
              goalValue={goal.goalValue}
              goalName={goal.goalName}
              goalDetail={goal.goalDetail}
              onChange={(value: GoalItem) => {
                currentHealthyGoals[index] = { ...value };
                setCurrentHealthyGoals([...currentHealthyGoals]);
                onChange([...currentHealthyGoals]);
              }}
              onRemove={() => {
                currentHealthyGoals.splice(index, 1);
                setCurrentHealthyGoals([...currentHealthyGoals]);
              }}
              indexGoal={index}
            />
          );
        })}
        {currentHealthyGoals.length > 0 && <Divider sx={{ margin: '32px -32px' }} />}

        <Button
          type="submit"
          size="small"
          variant="text"
          color="info"
          sx={{
            padding: 0,
            '&:hover': {
              background: 'none',
            },
          }}
          startIcon={<PlusIcon />}
          onClick={handleAddNewGoal}
        >
          Add goal
        </Button>
      </Box>
    </form>
  );
};

export default HealthyGoalSection;
