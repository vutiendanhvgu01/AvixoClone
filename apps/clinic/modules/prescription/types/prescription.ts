import { Patient } from 'modules/patient/types/patient';
import { DefaultRecord } from 'share-components';
import { Item } from './item';

type PrescriptionStatus =
  | 'active'
  | 'suspended'
  | 'cancelled'
  | 'completed'
  | 'entered-in-error'
  | 'discontinued'
  | 'draft'
  | 'unknown'
  | null;

export interface Prescription extends DefaultRecord {
  uuid: string;
  prescriptionId: string;
  name: string;
  patientId: number;
  status: PrescriptionStatus;
  statusReason?: string;
  isDraft?: boolean;
  category?: string;
  notes?: string;
  visitId?: number;
  premiseId?: number;
  organisationId?: number;
  recordOwnerId?: number;
  prescribedBy?: number;
  authoredBy?: number;
  authoredAt?: string;
  verifiedBy?: number;
  verifiedAt?: string;
  items: Item[];
  patient: Patient;
}
