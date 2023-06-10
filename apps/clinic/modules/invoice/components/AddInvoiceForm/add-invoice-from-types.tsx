import { Patient } from 'modules/patient/types/patient';

export interface AddInvoiceFormValues {
  id?: number;
  patient: Patient;
  insurance: { name: string; premiseId: number };
  category: { name: string; value: number };
}
