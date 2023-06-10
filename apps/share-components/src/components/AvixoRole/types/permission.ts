import { DefaultRecord } from 'share-components';
import { Service } from './service';

export interface Permission extends DefaultRecord {
  scope: string;
  serviceID: number;
  description: string;
  Service: Service;
  organisationID: string;
  premiseID: string;
  practitionerID: string;
  resourceID: string;
  resource: string;
  action?: null;
}
