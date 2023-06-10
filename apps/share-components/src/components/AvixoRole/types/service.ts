import { DefaultRecord } from 'share-components';

export interface Service extends DefaultRecord {
  description: string;
  parent_id?: null;
}
