import { DefaultRecord } from 'share-components';

export interface Credential extends DefaultRecord {
  username: string;
  account: number;
  description: string;
}

export interface Role extends DefaultRecord {
  name: string;
  description: string;
  organisationID: number;
  premiseID: number;
}
