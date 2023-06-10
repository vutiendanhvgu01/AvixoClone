import { MenuItemProps, TextFieldProps, SelectProps } from '@mui/material';
import { Practitioner } from 'modules/practitioner/types/practitioner';

interface SelectMenuItemType {
  label: string | number;
  value: string | number;
}

interface GroupInput {
  textFieldBaseProps?: Partial<TextFieldProps>;
  selectBaseProps?: Partial<SelectProps>;
  menuData?: {
    [key: string]: any;
    label: string;
    value: string | number;
    menuItemProps?: MenuItemProps;
  }[];
  hasDropDown?: boolean;
  onRemove: () => void;
}

enum PhaseAction {
  BACK = 'back',
  NEXT = 'next',
}
type PhaseType = 'detail' | 'profession' | 'contact' | 'qualification' | 'role';

export interface StepsType {
  currentStep: PhaseType;
  nextStep: PhaseType | undefined;
  historySteps: Array<string>;
}

interface QualificationType {
  id?: number;
  type?: string;
  code?: string;
  issuerName?: string;
  issuerType?: string;
  issuerCountry?: string;
  validFrom?: string;
  validTo?: string;
}

interface PractitionerFormValues extends Omit<Practitioner, 'id'> {
  id?: number;
  language?: number;
  organisation?: number;
  premise?: number;
  phoneNumbers?: {
    phoneValue: string;
    countryCode: string;
    isPrimary: boolean;
  }[];
  avatar: string | null;
  nric?: string;
  enrole: string;
  qualificationPrimaryPosition?: number;
}

export {
  PhaseAction,
  type PhaseType,
  type GroupInput,
  type SelectMenuItemType,
  type QualificationType,
  type PractitionerFormValues,
};
