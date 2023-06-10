import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { AvixoDisclaimerBar } from 'share-components';
import ScreeningEligibility from '../HealthPlanForm/screening-eligibility';
import VaccinationHistory from '../HealthPlanForm/vaccination-history';
import HealthGoalList from './health-goal-list';
import { HealthGoal, HealthPlanDetailProps } from './health-goal-types';
import HealthPlanCondition from './health-plan-condition';
import RecommendedNextVisit from './recommended-next-visit';

const mockData: HealthGoal[] = [
  {
    title: 'Title 1',
    subTitle: 'subTitle 1',
    goalContent: 'goal content 1',
    goalTime: 'goalTime 1',
    goalTarget: 'goalTarget',
  },
  {
    title: 'Title 1',
    subTitle: 'subTitle 1',
    goalContent: 'goal content 1',
    goalTime: 'goalTime 1',
    goalTarget: 'goalTarget',
  },
  {
    title: 'Title 1',
    subTitle: 'subTitle 1',
    goalContent: 'goal content 1',
    goalTime: 'goalTime 1',
    goalTarget: 'goalTarget',
  },
  {
    title: 'Title 1',
    subTitle: 'subTitle 1',
    goalContent: 'goal content 1',
    goalTime: 'goalTime 1',
    goalTarget: 'goalTarget',
  },
];

const HealthPlanDetails: React.FC<HealthPlanDetailProps> = ({ healthGoals = mockData, vaccinationHistory }) => (
  <Box sx={{ p: 4 }}>
    <AvixoDisclaimerBar content="This information below will be shared and viewable by your patient." />
    <ScreeningEligibility />
    <Box marginBottom={6}>
      <VaccinationHistory vaccinationHistory={vaccinationHistory} />
    </Box>
    <Box marginBottom={4}>
      <Typography variant="h6">Chronic Disease Management</Typography>
    </Box>
    <Divider />
    <Box paddingTop={3} paddingBottom={8}>
      <Box marginBottom={8}>
        <HealthPlanCondition conditions={['Diabetes Mellitus', 'Hypertension']} />
      </Box>
      <HealthGoalList healthGoals={healthGoals} />
    </Box>
    <RecommendedNextVisit
      title="Recommended Next Visit"
      date="November 2022"
      heading="Record of discussion"
      content="Record of discussion"
    />
  </Box>
);

export default HealthPlanDetails;
