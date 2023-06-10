import { Email } from './EmailForm/email-form-type';

export interface AvixoEmailProps {
  initData?: Email[];
  isShowValidationError?: boolean;
  onChange?: (val: Email[]) => void;
}
