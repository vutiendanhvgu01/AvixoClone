import { CarePlan } from 'modules/medical-record/types/care-plan';

export interface LifestyleGoalBMIType {
  target: number;
  month: number;
}

export interface LifestyleGoalSmokingCessationType {
  value: Date | null;
}

export type ChronicConditionGoalDiabetesMellitusType = LifestyleGoalBMIType;

export interface ChronicConditionGoalHypertensionType {
  targetNumerator: number;
  targetDenominator: number;
  targetMonth: number;
  isMonitorBlood: boolean;
  times: number;
  timesPerMonth: number;
}

export interface ChronicConditionGoalHyperlipidemiaLipidDisordersType {
  target: number;
  month: number;
  unit: string;
}

export interface ActivityGoalExerciseType {
  value: number;
}

export interface ActivityGoalProgrammeParticipationType {
  isCheckWeightManagement: boolean;
  isCheckSmokingCessation: boolean;
  isCheckChronicDiseaseSpecific: boolean;
  isCheckOthers: boolean;
  specifyDesc: string;
}

export interface ActivityGoalActiveAgingCenterType {
  isCheckPhysicalActivitiesSignUp: boolean;
  isCheckMindAndSocial: boolean;
  isCheckVitalSignsMonitoring: boolean;
  isCheckOthers: boolean;
  specifyDesc: string;
}

export interface GoalItem {
  goalValue: string | number;
  goalName: string;
  goalDetail:
    | LifestyleGoalBMIType
    | LifestyleGoalSmokingCessationType
    | ChronicConditionGoalDiabetesMellitusType
    | ChronicConditionGoalHypertensionType
    | ChronicConditionGoalHyperlipidemiaLipidDisordersType
    | ActivityGoalExerciseType
    | ActivityGoalProgrammeParticipationType
    | ActivityGoalActiveAgingCenterType
    | null;
}

export default interface GoalProps {
  carePlan: CarePlan;
  healthyGoals?: GoalItem[];
  onChange: (healthyGoals: GoalItem[]) => void;
}
