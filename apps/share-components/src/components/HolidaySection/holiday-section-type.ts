import { Holiday } from './HolidayForm/holiday-form-type';

export interface HolidaySectionProps {
  initData?: Holiday[];
  isShowValidationError?: boolean;
  onChange?: (val: Holiday[]) => void;
}
