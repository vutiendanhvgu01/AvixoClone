import { DefaultRecord } from 'share-components';

export interface Credential extends DefaultRecord {
  username: string;
  password: string;
  account: number;
  description: string;
  smsOTP: boolean;
  emailOTP: boolean;
  roles?: null;
}
