import { PrescriptionValues } from 'modules/prescription/components/PrescriptionForm/types';

export interface AddMedicineValues extends PrescriptionValues {
  clinicPrice: number;
  costPrice?: number | null;
  description?: string | null;
  discount: number;
  discountType: 'dollar' | 'percent';
  discountRemark: string;
  allValues: AddMedicineValues[];
}
