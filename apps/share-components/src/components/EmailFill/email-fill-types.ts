import { Email } from './EmailForm/email-form-type';

export interface EmailFillProps {
  initData?: Email[];
  isShowValidationError?: boolean;
  onChange?: (val: Email[]) => void;
}
