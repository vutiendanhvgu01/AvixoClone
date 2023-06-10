import { IconButtonProps } from '@mui/material';
import { BaseInteface, PrimaryIndentify } from '../../../utils/interfaceUtils';

export type Email = BaseInteface &
  PrimaryIndentify & {
    email: string;
  };

export type Errors = { [key: string]: string };

export interface EmailFormProps {
  email?: Email;
  index: number;
  onRemove: (index: number) => void;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string | boolean, index: number) => void;
  deleteButtonProps?: Partial<IconButtonProps>;
  allowCheckMarkAsPrimary?: boolean;
}
