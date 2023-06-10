import type { Patient } from 'modules/patient/types/patient';

export interface PatientEnrolFromValue {
  postalCode: string;
  block: string;
  streetName: string;
  level: string;
  unitNo: string;
}
export interface PatientInfoProps {
  patient: Patient;
  handleOnSubmit: (patient: PatientEnrolFromValue) => void;
  nric: string;
  followUpStatus: string;
  isUpdate: boolean;
  handleOnBack?: () => void;
  handleOnDeEnroll?: () => void;
}

export interface EnrollFormValues {
  nric: string;
  enrolled?: boolean;
  term_and_condition?: boolean;
}

export interface EnrollSectionProps {
  initData?: EnrollFormValues;
  onCancelBtnClick?: () => void;
  onSubmitBtnClick?: () => void;
  onDeEnrolBtnClick?: () => void;
}
