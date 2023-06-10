import { DefaultRecord } from 'share-components';

export interface PatientListItem extends DefaultRecord {
  name: string;
  description: string;
  type: string;
  category: string;
  isPrimaryList: boolean;
  premiseId: number;
  practitonerId: number;
  organisationId: number;
  createdBy: number;
  recordOwnerId: number;
  patients: Array<any>;
  id: number;
  uuid: string;
}

export interface PatientListCardProps {
  item: PatientListItem;
}

export interface PatientListTabsProps {
  listItems?: PatientListItem[];
}

export interface PatientListTabProps {
  item: PatientListItem;
}

export interface PatientListFormValues {
  id?: number;
  name: string;
  description: string;
}
