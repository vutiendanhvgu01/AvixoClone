import { MenuItemProps, TextFieldProps, SelectProps } from '@mui/material';

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

export { PhaseAction, type PhaseType, type GroupInput, type SelectMenuItemType, type QualificationType };
