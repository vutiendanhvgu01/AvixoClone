export interface OptionDefault {
  [key: string]: any;
  label: string;
  value: string;
}

export interface InstructionTypes {
  id?: string | number;
  routeName: string | null;
  dose: number | null;
  duration: number | null;
  text: string | null;
  additional: string | null;
  timingFrequency: string | null;
  total: number | null;
  maxDose: number | null;
  validFrom?: Date | null;
  validTo?: Date | null;
}

export interface InventoryValues {
  [key: string]: any;
  name: string | null;
  drugGroup: OptionDefault | null;
  quantity: number | null;
  dose: string;
}

export interface PrescriptionValues {
  [key: string]: any;
  patientId?: number | null;
  addFromName: string | null;
  inventory?: InventoryValues;
  instructions?: InstructionTypes[];
}

export type AddFromTypes = OptionDefault;
export type DrugGroupTypes = OptionDefault;
export type FrequencyTypes = OptionDefault;

export interface DrugTypes extends OptionDefault {
  raw?: {
    stockBalance: number;
  };
}

export type PrescriptionFormAction =
  | 'create-prescription'
  | 'update-prescription'
  | 'create-dispense-item'
  | 'update-dispense-item';

export interface GroupOption {
  status: 'bad' | 'good';
  data: OptionDefault[];
}
