import { Card, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { DeleteGoalIcon } from 'share-components';
import {
  GoalItem,
  LifestyleGoalBMIType,
  LifestyleGoalSmokingCessationType,
  ChronicConditionGoalDiabetesMellitusType,
  ChronicConditionGoalHypertensionType,
  ChronicConditionGoalHyperlipidemiaLipidDisordersType,
  ActivityGoalExerciseType,
  ActivityGoalProgrammeParticipationType,
  ActivityGoalActiveAgingCenterType,
} from '../health-goal-types';
import ActivityGoalActiveAgingCenter from './activity-goal-active-aging-center';
import ActivityGoalExercise from './activity-goal-exercise';
import ActivityGoalProgrammeParticipation from './activity-goal-programme-participation';
import ChronicConditionGoalDiabetesMellitus from './chronic-condition-goal-diabetes-mellitus';
import ChronicConditionGoalHyperlipidemiaLipidDisorders from './chronic-condition-goal-hyperlipidemia-lipid-disorders';
import ChronicConditionGoalHypertension from './chronic-condition-goal-hypertension';
import LifestyleGoalBMI from './life-style-goal-BMI';
import LifestyleGoalSmokingCessation from './life-style-goal-smoking-cessation';

interface GoalItemProps extends GoalItem {
  onChange: (value: GoalItem) => void;
  onRemove: () => void;
  indexGoal: number;
}

const GoalType = [
  {
    value: 1,
    key: 'goal_01',
    label: 'Lifestyle Goal - BMI',
  },
  {
    value: 2,
    key: 'goal_02',
    label: 'Lifestyle Goal - Smoking Cessation',
  },
  {
    value: 3,
    key: 'goal_03',
    label: 'Chronic Condition Goal - Diabetes Mellitus',
  },
  {
    value: 4,
    key: 'goal_04',
    label: 'Chronic Condition Goal - Hypertension',
  },
  {
    value: 5,
    key: 'goal_05',
    label: 'Chronic Condition Goal - Hyperlipidemia (Lipid Disorders)',
  },
  {
    value: 6,
    key: 'goal_06',
    label: 'Activity Goal - Exercise',
  },
  {
    value: 7,
    key: 'goal_07',
    label: 'Activity Goal - Programme Participation',
  },
  {
    value: 8,
    key: 'goal_08',
    label: 'Activity Goal - Active Aging Center',
  },
];

const GoalComponent: React.FC<GoalItemProps> = ({ goalValue, goalName, goalDetail, onChange, onRemove, indexGoal }) => {
  const [currentValue, setCurrentValue] = useState(goalValue ?? 0);

  useEffect(() => {
    if (goalValue > 0) {
      setCurrentValue(goalValue);
    }
  }, [goalValue]);

  const [currentDetail, setCurrentDetail] = useState<
    | LifestyleGoalBMIType
    | LifestyleGoalSmokingCessationType
    | ChronicConditionGoalDiabetesMellitusType
    | ChronicConditionGoalHypertensionType
    | ChronicConditionGoalHyperlipidemiaLipidDisordersType
    | ActivityGoalExerciseType
    | ActivityGoalProgrammeParticipationType
    | ActivityGoalActiveAgingCenterType
    | null
  >(goalDetail);
  const [isDirty, setIsDirty] = useState(false);

  const handleChangeType = useCallback((e: any) => {
    setCurrentValue(e.target.value);
    setIsDirty(true);
  }, []);

  const handleDelete = useCallback(() => onRemove(), [onRemove]);

  useEffect(() => {
    if (onChange && isDirty) {
      onChange({
        goalValue: currentValue,
        goalName,
        goalDetail: currentDetail,
      });
      setIsDirty(false);
    }
  }, [currentDetail, currentValue, goalName, isDirty, onChange]);

  const renderGoalDetail = useMemo(() => {
    switch (currentValue) {
      case 1: {
        const lifestyleGoalBMI: LifestyleGoalBMIType = currentDetail as LifestyleGoalBMIType;
        return (
          <LifestyleGoalBMI
            target={lifestyleGoalBMI?.target}
            month={lifestyleGoalBMI?.month}
            onChange={(target: number, month: number) => {
              setCurrentDetail({
                target,
                month,
              });
              setIsDirty(true);
            }}
          />
        );
      }
      case 2: {
        const lifestyleGoalSmokingCessation: LifestyleGoalSmokingCessationType =
          currentDetail as LifestyleGoalSmokingCessationType;
        return (
          <LifestyleGoalSmokingCessation
            value={lifestyleGoalSmokingCessation?.value}
            minDate={new Date()}
            onChange={(value: Date | null) => {
              setCurrentDetail({ value });
              setIsDirty(true);
            }}
          />
        );
      }
      case 3: {
        const chronicConditionGoalDiabetesMellitus: ChronicConditionGoalDiabetesMellitusType =
          currentDetail as ChronicConditionGoalDiabetesMellitusType;
        return (
          <ChronicConditionGoalDiabetesMellitus
            target={chronicConditionGoalDiabetesMellitus?.target}
            month={chronicConditionGoalDiabetesMellitus?.month}
            onChange={(target: number, month: number) => {
              setCurrentDetail({
                target,
                month,
              });
              setIsDirty(true);
            }}
          />
        );
      }
      case 4: {
        const chronicConditionGoalHypertension: ChronicConditionGoalHypertensionType =
          currentDetail as ChronicConditionGoalHypertensionType;
        return (
          <ChronicConditionGoalHypertension
            targetNumerator={chronicConditionGoalHypertension?.targetNumerator}
            targetDenominator={chronicConditionGoalHypertension?.targetDenominator}
            targetMonth={chronicConditionGoalHypertension?.targetMonth}
            isMonitorBlood={chronicConditionGoalHypertension?.isMonitorBlood}
            times={chronicConditionGoalHypertension?.times}
            timesPerMonth={chronicConditionGoalHypertension?.timesPerMonth}
            onChange={(value: ChronicConditionGoalHypertensionType) => {
              setCurrentDetail({ ...value });
              setIsDirty(true);
            }}
          />
        );
      }
      case 5: {
        const chronicConditionGoalHyperlipidemiaLipidDisorders: ChronicConditionGoalHyperlipidemiaLipidDisordersType =
          currentDetail as ChronicConditionGoalHyperlipidemiaLipidDisordersType;
        return (
          <ChronicConditionGoalHyperlipidemiaLipidDisorders
            target={chronicConditionGoalHyperlipidemiaLipidDisorders?.target}
            month={chronicConditionGoalHyperlipidemiaLipidDisorders?.month}
            unit={chronicConditionGoalHyperlipidemiaLipidDisorders?.unit}
            onChange={(value: ChronicConditionGoalHyperlipidemiaLipidDisordersType) => {
              setCurrentDetail({ ...value });
              setIsDirty(true);
            }}
          />
        );
      }
      case 6: {
        const activityGoalExercise: ActivityGoalExerciseType = currentDetail as ActivityGoalExerciseType;
        return (
          <ActivityGoalExercise
            value={activityGoalExercise?.value}
            onChange={(value: number) => {
              setCurrentDetail({
                value,
              });
              setIsDirty(true);
            }}
          />
        );
      }
      case 7: {
        const activityGoalProgrammeParticipation: ActivityGoalProgrammeParticipationType =
          currentDetail as ActivityGoalProgrammeParticipationType;
        return (
          <ActivityGoalProgrammeParticipation
            isCheckWeightManagement={activityGoalProgrammeParticipation?.isCheckWeightManagement}
            isCheckSmokingCessation={activityGoalProgrammeParticipation?.isCheckSmokingCessation}
            isCheckChronicDiseaseSpecific={activityGoalProgrammeParticipation?.isCheckChronicDiseaseSpecific}
            isCheckOthers={activityGoalProgrammeParticipation?.isCheckOthers}
            specifyDesc={activityGoalProgrammeParticipation?.specifyDesc}
            onChange={(value: ActivityGoalProgrammeParticipationType) => {
              setCurrentDetail({ ...value });
              setIsDirty(true);
            }}
          />
        );
      }
      case 8: {
        const activityGoalActiveAgingCenter: ActivityGoalActiveAgingCenterType =
          currentDetail as ActivityGoalActiveAgingCenterType;
        return (
          <ActivityGoalActiveAgingCenter
            isCheckPhysicalActivitiesSignUp={activityGoalActiveAgingCenter?.isCheckPhysicalActivitiesSignUp}
            isCheckMindAndSocial={activityGoalActiveAgingCenter?.isCheckMindAndSocial}
            isCheckVitalSignsMonitoring={activityGoalActiveAgingCenter?.isCheckVitalSignsMonitoring}
            isCheckOthers={activityGoalActiveAgingCenter?.isCheckOthers}
            specifyDesc={activityGoalActiveAgingCenter?.specifyDesc}
            onChange={(value: ActivityGoalActiveAgingCenterType) => {
              setCurrentDetail({ ...value });
              setIsDirty(true);
            }}
          />
        );
      }
      default:
        return (
          <Typography variant="body2" color="neutral.900">
            Please select your goal first.
          </Typography>
        );
    }
  }, [currentDetail, currentValue]);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: '32px',
        background: '#FBFBFB',
        border: '1px solid #E6E8F0',
        borderRadius: '16px',
        marginBottom: '32px',
      }}
    >
      <Typography variant="subtitle1" color="neutral.900" sx={{ position: 'relative' }}>
        {goalName}
        <DeleteGoalIcon
          sx={{
            position: 'absolute',
            right: 0,
            top: 3,
            cursor: 'pointer',
          }}
          onClick={handleDelete}
        />
      </Typography>
      <Grid
        container
        sx={{
          marginTop: '23px',
        }}
      >
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="goal-select-label">Goal*</InputLabel>
            <Select
              labelId="goal-select-label"
              id="goal-select"
              value={currentValue}
              label="Goal*"
              onChange={handleChangeType}
              name={`goals[${indexGoal}].goalId`}
            >
              {GoalType.map(type => (
                <MenuItem value={type.value} key={type.key}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 32px',
          }}
        />
        <Grid item xs={7}>
          {renderGoalDetail}
        </Grid>
      </Grid>
    </Card>
  );
};

export default GoalComponent;
