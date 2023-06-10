import { DefaultRecord } from 'share-components';

export interface Immunisation extends DefaultRecord {
  uuid?: string;
  administeredProduct: string;
  status: 'completed' | 'entered-in-error' | 'not-done';
  statusReason: string;
  batchNo: string;
  site: string;
  route: string;
  doseQuantity: number;
  doseSeries?: string;
  manufacturer: string;
  orderedBy: number | null;
  administeredBy: string | null;
  reason: string | null;
  notes: string | null;
  name: string;
  dateOfAdministration?: string;
  requestedBy: number;
  expiryDate: string;
  dose?: number;
  givenBy?: string | null;
  givenDateTime?: Date;
  remarks?: string;
  nehr?: boolean;
  patientId: number;
  protocolDoseNumber: string | null;
  unitOfMeasurement: string | null;
}

export interface ImmunisationFormValues
  extends Omit<Immunisation, 'id' | 'doseQuantity' | 'requestedBy' | 'patientId'> {
  id?: number;
  doseQuantity: number | null;
  requestedBy: number | null;
  action?: string;
  patientId?: number | null;
}

export interface ImmunisationItemProps {
  immunisation: Immunisation;
}

export interface ImmunisationSummaryProps {
  immunisations?: Immunisation[];
}
