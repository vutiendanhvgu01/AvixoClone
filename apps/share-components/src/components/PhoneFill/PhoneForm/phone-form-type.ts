import { BaseInteface, PrimaryIndentify } from '../../../utils/interfaceUtils';

export type PhoneNumber = BaseInteface &
  PrimaryIndentify & {
    countryCode: string;
    phoneValue: string;
  };

export type Errors = { [key: string]: string };

export interface PhoneNumberFormProps {
  phoneNumber?: PhoneNumber;
  index: number;
  onRemove: (index: number) => void;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string | boolean, index: number) => void;
  phoneNumbers?: PhoneNumber[];
}
