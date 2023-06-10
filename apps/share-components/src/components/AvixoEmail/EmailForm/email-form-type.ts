export type Email = {
  email: string;
  [key: string]: string;
};

export type Errors = { [key: string]: string };

export interface EmailFormProps {
  email?: Email;
  index: number;
  onRemove: (index: number) => void;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string, index: number) => void;
}
