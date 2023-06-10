export type PhoneNumber = {
  countryCode: string;
  number: string;
  [key: string]: string;
};

export type Errors = { [key: string]: string };

export interface PhoneNumberFormProps {
  phoneNumber?: PhoneNumber;
  index: number;
  onRemove: (index: number) => void;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string, index: number) => void;
}
