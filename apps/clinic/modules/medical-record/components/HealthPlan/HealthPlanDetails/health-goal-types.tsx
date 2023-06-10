import { CarePlan } from 'modules/medical-record/types/care-plan';
import { VaccinationHistory } from 'modules/medical-record/types/vaccination-history';

export interface HealthGoal {
  title: string;
  subTitle: string;
  goalContent: string;
  goalTarget: string;
  goalTime: string;
}

export interface HealthPlanDetailProps {
  carePlan: CarePlan;
  healthGoals?: HealthGoal[];
  vaccinationHistory: VaccinationHistory[];
}

export interface HealthGoalListProps {
  healthGoals: HealthGoal[];
}
