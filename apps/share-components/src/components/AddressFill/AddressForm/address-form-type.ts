import { BaseInteface, PrimaryIndentify } from '../../../utils/interfaceUtils';

/**
 * See new design: https://www.figma.com/file/2RNsbeNmnSnv4XO2UbjQ0E/Avixo-V2---Frontend?node-id=9660-482683&t=ZHNVMJkF9MYjdHi5-0
 * We don't support blockNo, label. So I will make them optional
 */
export type Address = BaseInteface &
  PrimaryIndentify & {
    postal: string;
    line1: string;
    line2: string;
    floorNo: string;
    unitNo: string;
    city: string;
    country: string;
    isPrimary?: boolean;
  };

export type Errors = { [key: string]: string };

export interface AddressFormProps {
  address?: Address;
  index: number;
  onRemove: (index: number) => void;
  isShowValidationError?: boolean;
  onChange: (fieldName: string, fieldValue: string | boolean, index: number) => void;
}
