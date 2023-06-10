import { DefaultRecord } from 'share-components';

export interface BaseObject {
  id: string | number;
  name: string;
}

export default interface Service extends DefaultRecord {
  type: string | number;
  item: string | number;
  clinicPrice: string;
  costPrice: string | number;
  description: string;
  discount: number;
  discountType: '%' | 'S$';
  discountRemark: string;
  quantity: number;
  isRedeem: boolean;
}
