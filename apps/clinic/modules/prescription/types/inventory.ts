import { DefaultRecord, Price } from 'share-components';

export interface Batch extends DefaultRecord {
  uuid: string;
  itemId: number;
  quantityInitial: string;
  quantityCurrent: string;
  listPrice?: Price;
  costPrice?: Price;
  batchNo?: string;
  unitOfMeasurement?: string;
  expiryDate?: string;
}

export interface Item extends DefaultRecord {
  uuid: string;
  name: string;
  genericName: string;
  brandName: string;
  ingredient: string;
  category: string;
  expiryDate: string;
  batchNo: string;
  batches?: Batch[];
  packSize: number;
  unitOfMeasurement?: string;
  premiseId?: number;
  validFrom?: string;
  strength?: string;
  strengthUnit?: string;
  strengthRatio?: string;
}
