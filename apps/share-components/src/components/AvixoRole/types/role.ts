import DefaultRecord from '../../../types/default-record';
import { Permission } from './permission';

export interface SettingField {
  label: string;
  value?: string;
  name: string;
  type: string;
  checked?: boolean;
}

interface SettingFieldGroup {
  [key: string]: any;
}

export interface Role extends DefaultRecord {
  name: string;
  description?: string;
  organisationID?: number;
  premiseID?: number;
  permissions?: Permission[] | null;
  credentials?: Credential[] | null;
  setting: {
    [key: string]: SettingFieldGroup;
  };
}

export interface RoleFormValues extends Omit<Role, 'id'> {
  id?: number;
}
