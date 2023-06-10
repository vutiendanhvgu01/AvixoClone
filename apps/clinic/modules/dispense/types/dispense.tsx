import { Patient } from 'modules/patient/types/patient';
import { Item } from 'modules/prescription/types/item';
import { DefaultRecord } from 'share-components';

export type Dispense = DefaultRecord & {
  uuid: string;
  dispenseId?: string;
  items?: Item[];
  status?:
    | 'preparation'
    | 'in-progress'
    | 'cancelled'
    | 'on-hold'
    | 'completed'
    | 'entered-in-error'
    | 'stopped'
    | 'declined'
    | null;
  category?: 'inpatient' | 'in-clinic' | 'own-home' | 'community' | 'discharge' | null;
  priority?: 'routine' | 'urgent' | 'asap' | 'stat' | null;
  statusReason?: string;
  patientId?: number;
  orderId?: number;
  requestedBy?: number;
  authoredBy?: number;
  verifiedBy?: number;
  visit?: string;
  patient?: Patient;
  isDraft?: boolean;
  prescriptionId?: number;
  premiseId?: number;
  prescribedBy?: number;
};
