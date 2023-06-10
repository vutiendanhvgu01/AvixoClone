import { BaseInteface } from '../../../utils/interfaceUtils';
import { TimeSlot } from '../../AvixoTimeSlot/time-slot-type';

export type Holiday = BaseInteface & {
  name: string;
  date: string;
  dayOfWeek: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  slotType: 'operating' | 'break';
  slotFrom: string;
  slotTo: string;
  timeslots?: TimeSlot[];
  description: string;
};

export type Errors = { [key: string]: string };

export interface HolidayFormProps {
  holiday?: Holiday;
  index: number;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string | boolean | null, index: number) => void;
}
