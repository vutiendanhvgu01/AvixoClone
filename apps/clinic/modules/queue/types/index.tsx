import { Patient } from 'modules/patient/types/patient';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { Prescription } from 'modules/prescription/types/prescription';
import { DefaultRecord } from 'share-components';

type QueueStatus = 'Checked In' | 'Regis. Completed' | 'Consult Started' | 'Consult Ended' | 'Payment' | 'Checked Out';

interface Queue extends DefaultRecord {
  startTime: string;
  endTime?: string;
  status: QueueStatus;
  location?: {
    status?: string;
    content?: string;
  };
  patientId: number;
  patient?: Patient;
  practitioner: Practitioner;
  reason: string;
  comment?: string;
  invoice?: {
    content: string;
    status: 'outstanding' | 'paid';
  };
  prescription?: Partial<Prescription>;
  isNewPatient?: boolean;
  specialty?: string;
}

export type BasedOnType = 'practitioner' | 'speciality' | 'room';
export interface AssignedTo {
  base: string;
  name: string;
  iRecord?: number;
  practitioner?: Practitioner;
  basedOn?: BasedOnType;
}

export default Queue;
