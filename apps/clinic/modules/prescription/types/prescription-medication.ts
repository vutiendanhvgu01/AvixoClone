import { DefaultRecord } from 'share-components';

type DISPENSED = 'FULLY_DISPENSED' | 'PARTIALLY_DISPENSED' | 'NOT_DISPENSED';

interface Frequency {
  sortDesc: string;
  detail?: string;
  moreDetail?: string;
}

interface Duration {
  from: Date;
  to: Date;
}

export interface PrescriptionMedication extends DefaultRecord {
  medicationId: number;
  name: string;
  totalQty: number;
  unit: string;
  duration: Duration;
  dosageQty: number;
  frequency: Frequency;
  additional: string;
  routeOfAdministration: string;
  dispensed: DISPENSED;
  prescibedQty?: number;
  dispensedQty?: number;
  balancedQty?: number;
  precaution?: string;
  dispensedDate?: Date;
  dispensedBy?: string;
}
