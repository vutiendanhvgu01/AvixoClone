import { DefaultRecord } from 'share-components';
import { InventoryValues } from '../components/PrescriptionForm/types';
import { Instruction } from './instruction';

export interface Item extends DefaultRecord, Partial<InventoryValues> {
  [key: string]: any;
  id: number;
  prescriptionId: number;
  name: string;
  code: string;
  shortName?: string;
  genericName?: string;
  brandName?: string;
  description?: string;
  packSize?: number;
  unitOfMeasurement?: string;
  quantity?: number;
  notes?: string;
  allowSubstitution?: boolean;
  instructions?: Instruction[];
}
