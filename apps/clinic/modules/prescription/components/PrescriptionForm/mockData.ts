import { AddFromTypes, DrugGroupTypes, DrugTypes, FrequencyTypes } from './types';

export const addFromData: AddFromTypes[] = [
  {
    label: 'Inventory',
    value: 'inventory',
  },
  {
    label: 'Dispensing History',
    value: 'dispensing-history',
  },
  {
    label: 'Latest Prescription',
    value: 'latest-prescription',
  },
  {
    label: 'New Item to Inventory',
    value: 'new-item-to-inventory',
  },
  {
    label: 'New Item outside Inventory',
    value: 'new-item-outside-inventory',
  },
];

export const drugGroupData: DrugGroupTypes[] = [
  {
    label: 'All',
    value: 'all',
  },
];

export const drugData: DrugTypes[] = [
  {
    label: 'Hexylresorcinol 2.4 mg Lozenge',
    value: '1',
    raw: {
      stockBalance: 20,
    },
  },
  {
    label: 'Diclofenac Tablet 50mg',
    value: '2',
    raw: {
      stockBalance: 200,
    },
  },
  {
    label: 'Cetirizine Hydrochloride 5mg/5ml Solution 75ml',
    value: '3',
    raw: {
      stockBalance: 0,
    },
  },
];

export const frequencyData: FrequencyTypes[] = [
  {
    label: '3 times daily',
    value: '3 times daily',
  },
  {
    label: 'every 8 hours',
    value: 'every 8 hours',
  },
];
