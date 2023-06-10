import { DefaultRecord } from 'share-components';

export interface Instruction extends DefaultRecord {
  text: string;
  itemId: string;
  additional?: string;
  doseUnit?: string;
  doseRateUnit?: string;
  timingFrequency?: string;
  maxDoseUnit?: string;
  maxDoseDuration?: string;
  maxDoseDurationUnit?: string;
  routeCode?: string;
  routeName?: string;
  methodCode?: string;
  methodName?: string;
  siteName?: string;
  siteCode?: string;
  dose?: number;
  doseRate?: number;
  maxDose?: number;
  duration?: number;
  sequence?: number;
  asNeeded?: boolean;
}
