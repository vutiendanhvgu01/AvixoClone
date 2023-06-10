import { DefaultRecord } from 'share-components';

export interface MedicalNoteTemplate extends Omit<DefaultRecord, 'validFrom' | 'validTo'> {
  uuid: string;
  name: string;
  default: boolean;
  content: string;
}
