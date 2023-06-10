import { Patient } from 'modules/patient/types/patient';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { DefaultRecord } from 'share-components';

export interface Appointment extends DefaultRecord {
  no?: number;
  title?: string;
  appointmentId?: string;
  organisationId?: number;
  practitionerId: number;
  premiseId?: number;
  startTime: string;
  endTime: string;
  caseId?: number;
  date?: string;
  reason?: string;
  doctor?: string;
  patientName?: string;
  patientId?: number;
  patientEmail?: string;
  isNonPatient?: boolean;
  phone?: string;
  visitReason?: {
    reason?: 'General' | 'CT Scan' | 'FU Consult' | 'General X-Ray' | 'Treatment';
    note?: string;
  };
  importantNote?: string;
  turnedUp?: boolean;
  comments?: string;
  status: 'planned' | 'confirmed' | 'actualised' | 'cancelled';
  patient: Patient | null;
  practitioner: Practitioner | null;
}

export interface AppointmentFormValues extends Partial<Appointment> {
  uuid?: string;
  // CaseId is booking source
  caseId: number;
  startTime: string;
  // Type is Duration
  type: string;

  // Patient information
  isNewPatient: boolean;
  patientType: 'new' | 'existing';
  patientId: number;
  patientName: string;
  patientEmail: string;
  countryCode: number | string;
  phoneNumber: string;
  idType: number | string;
  idNumber: string;

  // practitioner information
  practitionerId: number;
  practitionerName: string;
  practitionerType: string;

  // ServiceType is room
  serviceType: string;
  reason: string;
  isSendNotification: boolean;
  sendVia: string;
  remiderType: string;
  action: string;
  organisationId: number;
}
