import { StackProps, SxProps, Theme, TypographyProps } from '@mui/material';
import { AmountInputProps } from 'share-components/src/components/AmountInput/amount-input-types';
import { CurrencySelectProps } from 'share-components/src/components/CurrencySelect/currency-select-types';
import { TaxRateInputProps } from 'share-components/src/components/TaxRateInput/tax-rate-input-types';

export interface FinanceInformationProps {
  sx?: SxProps<Theme>;
  label?: string;
  labelProps?: Partial<TypographyProps>;
  formProps?: Partial<StackProps>;
  amountInputProps?: AmountInputProps & { column?: number };
  taxInputProps?: TaxRateInputProps & { column?: number };
  currencySelectProps?: CurrencySelectProps & { column?: number };
}
