import { DefaultRecord } from 'share-components';

export interface MedicalNoteFormValue {
  generalNarrative: string;
  chiefComplaint: string;
  problemList?: string;
  patientId: number;
  isDraft: boolean;
}

export interface ConsultNoteType extends Partial<MedicalNoteFormValue>, DefaultRecord {
  impression: string;
  socialHistory: string;
  pastMedicalHistory: string;
  treatmentPlan: string;
  familyHistory: string;
}

export interface MedicalNoteType extends DefaultRecord {
  type?: string;
  isStarred?: boolean;
  isDraft: boolean;
  consultNotes: ConsultNoteType[];
  generalNarrative?: string;
}
