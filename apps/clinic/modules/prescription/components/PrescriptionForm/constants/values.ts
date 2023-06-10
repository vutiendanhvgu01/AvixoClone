import { InventoryValues, InstructionTypes } from '../types';

export const defaultInstructions: InstructionTypes = {
  routeName: null,
  dose: null,
  timingFrequency: null,
  duration: null,
  total: null,
  additional: null,
  text: null,
  validFrom: new Date(),
  validTo: new Date(),
  maxDose: 0,
};
export const initialInventoryValues: InventoryValues = {
  name: null,
  drugGroup: null,
  quantity: null,
  dose: 'step',
};
// please more modify
export const ADD_FROM_FIELDS = ['inventory', 'dispensing-history'];
