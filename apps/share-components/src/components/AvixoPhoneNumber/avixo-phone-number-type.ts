import { PhoneNumber } from './PhoneNumberForm/phone-number-form-type';

export interface AvixoPhoneNumberProps {
  initData?: PhoneNumber[];
  isShowValidationError?: boolean;
  onChange?: (val: PhoneNumber[]) => void;
}
