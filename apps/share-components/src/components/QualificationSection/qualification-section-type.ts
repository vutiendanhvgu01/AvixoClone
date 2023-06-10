import { Qualification } from './QualificationForm/qualification-form-type';

export interface QualificationSectionProps {
  initData?: Qualification[];
  isShowValidationError?: boolean;
  onChange?: (val: Qualification[]) => void;
}
