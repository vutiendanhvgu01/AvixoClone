import { PhoneNumber } from './PhoneForm/phone-form-type';

export interface PhoneNumberFillProps {
  initData?: PhoneNumber[];
  isShowValidationError?: boolean;
  onChange?: (val: PhoneNumber[]) => void;
}
