import { DefaultRecord } from 'share-components';

export interface Cdlens extends DefaultRecord {
  diseaseName: string;
}

export interface SelectMenuItemType {
  label: string | number;
  value: string | number;
}

export type SetFieldValueType = (field: string, value: any) => void;

export interface CdlensFormValues extends Omit<Cdlens, 'id'> {
  id?: number;
  vaccinationStatus: string;
  confirmationMethod: string;
  followUpAction: string;
  dateOfDiagnosis: string;
  dateOfOnset: string;
  dateOfNotification: string;
}
