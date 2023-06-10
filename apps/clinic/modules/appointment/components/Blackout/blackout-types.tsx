import { DefaultRecord } from 'share-components';

export interface Blackout extends DefaultRecord {
  title: string;
}
export interface BlackoutFormValues extends Omit<Blackout, 'id'> {
  id?: number;
}
