import { Invoice } from 'modules/invoice/types/invoice';
import { PatientOption } from 'share-components';

export interface CustomerType {
  label: string;
  value: number;
}

export interface CreditDebitNoteFormValues {
  type: 'credit' | 'debit';
  id?: number;
  patient?: PatientOption;
  insurance?: { label: string; value: number }; // Update later
  customerType?: CustomerType;
  invoice?: Invoice;
}
