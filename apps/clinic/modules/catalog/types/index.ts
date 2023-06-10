import { DefaultRecord } from 'share-components';

export interface IPrice {
  amount: string;
  currency: string;
}

export interface Catalog extends DefaultRecord {
  name: string;
  shortName: string;
  genericName: string;
  brandName: string;
  category: string;
  description: string;
  type: string;
  packSize: number;
  unitOfMeasurement: string;
  useBatchListPrice: boolean;
  status: string;
  forensicCode: string;
  forensicClass: string;
  subsidyClass: string;
  isMedication: boolean;
  isVirtual: boolean;
  isFormulary: boolean;
  isOrderable: boolean;
  isStocked: boolean;
  schemeId: number;
  schemeName: string;
  inventoryId: number;
  warehouseId: number;
  premiseId: number;
  organisationId: number;
}

export interface AdministrationRoute {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  lastUpdatedDate: string;
}
