import { Address } from './AddressForm/address-form-type';

export interface AddressFillProps {
  initData?: Address[];
  isShowValidationError?: boolean;
  onChange?: (val: Address[]) => void;
}
