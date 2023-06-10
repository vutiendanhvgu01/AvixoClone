import { ReactNode } from 'react';
import { DefaultRecord } from 'share-components';

export default interface CareReport extends DefaultRecord {
  status: string;
  reportId?: string;
  issuedDate?: string;
  submittedBy?: string;
}

export interface CardItem {
  key: string;
  title?: string;
  content: ReactNode;
}
