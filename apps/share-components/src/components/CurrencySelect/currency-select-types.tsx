import { SelectInputProps } from '@mui/material/Select/SelectInput';

export interface Currency {
  id: string;
  name: string;
}
export interface CurrencySelectProps extends Partial<SelectInputProps> {
  inputLabel?: string;
  currencyData?: Record<string, string>[];
}
