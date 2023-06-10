import { Patient } from 'modules/patient/types/patient';

interface AddPatientToListProps {
  patients: Patient[];
  allPatientsList: Patient[];
}
interface AddPatientToListInitialValues {
  selectedPatients: Array<string>;
}
interface AddPatientToListFormProps {
  initialValues: AddPatientToListInitialValues;
  patientsList: Patient[];
}

export type { AddPatientToListFormProps };
export default AddPatientToListProps;
