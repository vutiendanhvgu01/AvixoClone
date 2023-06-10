import { DefaultRecord } from 'share-components';

export interface Notice extends DefaultRecord {
  title: string;
}
export interface NoticeFormValues extends Omit<Notice, 'id'> {
  id?: number;
}

export interface InitialValues {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  comments: string;
}
