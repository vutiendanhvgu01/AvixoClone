import { JarvisAppointmentStatus } from 'modules/appointment/components/appointment-types';
import { PatientResponseProfile } from 'modules/patient/api/patient-api-type';

export interface ServiceResponse {
  id: number;
  type: string;
  specialty: string;
  scheduleStart: string;
  scheduleEnd: string;
  status: JarvisAppointmentStatus;
  providers: [];
  records?: { type: string; data: { symptoms: string[] }[] }[];
  patientNote?: string;
  clinicalNote?: string;
  patientCondition?: string;
  jarvisNote?: string;
  patient?: PatientResponseProfile;
}
