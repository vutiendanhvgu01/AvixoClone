import { BaseInteface, PrimaryIndentify } from '../../../utils/interfaceUtils';

export type Qualification = BaseInteface &
  PrimaryIndentify & {
    code: string;
    type: 'practice-license' | 'other-license' | 'education' | 'specialisation' | 'certification' | 'other';
    issuerType: 'organisation' | 'professional-body' | 'university';
    issuerName: string;
    issuingCountry: string;
    validFrom: string;
    validTo: string;
  };

export type Errors = { [key: string]: string };

export interface QualificationFormProps {
  qualification?: Qualification;
  index: number;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string | boolean, index: number) => void;
}
