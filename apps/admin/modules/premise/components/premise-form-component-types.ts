import { FormikErrors, FormikTouched } from 'formik';
import Premise from './premise-types';

export interface PremiseFormDetailProps {
  isEdit: boolean;
  header: string;
  onNext?: () => void;
  onBack?: () => void;
  onCancel?: () => void;
  handleChange: (event: any) => void;
  handleBlur?: (event: any) => void;
  touched: FormikTouched<Premise>;
  errors: FormikErrors<Premise>;
  values: Premise;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export interface PremiseFormPostValues {
  [key: string]: any;
  countryCode?: string | string[];
  phoneValue?: string | string[];
  email?: string | string[];
  postal?: string | string[];
  address?: string | string[];
  blockNo?: string | string[];
  unitNo?: string | string[];
  label?: string | string[];
}
