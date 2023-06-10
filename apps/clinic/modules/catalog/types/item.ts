import { DefaultRecord, Price } from 'share-components';

export interface Item extends DefaultRecord {
  name: string;
  shortName?: string;
  genericName?: string;
  brandName: string;
  category: string;
  description: string;
  type: string;
  packSize: number;
  unitOfMeasurement: string;
  costPrice?: Price;
  listPrice?: Price;
  useBatchListPrice: boolean;
  status?: string;
  therapeuticClass?: string;
  forensicCode?: string;
  forensicClass?: string;
  subsidyClass?: string;
  isMedication?: boolean;
  isVirtual?: boolean;
  isFormulary?: boolean;
  isOrderable?: boolean;
  isStocked?: boolean;
  schemeId?: number;
  schemeName?: string;
  inventoryId?: number;
  warehouseId?: number;
  premiseId?: number;
  organisationId?: number;
  quantity?: number;
}
