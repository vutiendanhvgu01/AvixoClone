import { BaseInteface } from '../../utils/interfaceUtils';

export type TimeSlot = BaseInteface & {
  dayOfWeek?: string;
  slotType?: string;
  from?: string;
  to?: string;
};

export type Errors = { [key: string]: string };
