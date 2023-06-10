import { DefaultRecord } from 'share-components';

export interface Activity {
  scheduledStart: string;
  generalNotes: string;
  scheduledEnd?: string;
  scheduledString?: string;
}

export interface CarePlan extends DefaultRecord {
  uuid: string;
  title?: string;
  description?: string;
  authorId?: number;
  visitId?: number;
  premiseId?: number;
  organisationId?: number;
  practitionerId?: number;
  careTeamId?: number;
  addresses?: string;
  goalId?: number;
  status: string;
  intent: string;
  patientId: number;
  activities?: Activity[];
}
