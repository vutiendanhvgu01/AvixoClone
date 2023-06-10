type Providers = {
  name: string;
  owner: boolean;
};

type User = {
  birthDate: string;
  name: string;
  gender: string;
  nric: string;
  ref: string;
};

export interface BaseAppointmentResponse {
  id: number;
  createdAt: string;
  scheduleStart: string;
  scheduleEnd: string;
  patientNote: string;
  clinicalNote: string;
  jarvisNote?: string;
  patientCondition?: string;
}

export type VisitAppointmentResponse = BaseAppointmentResponse & {
  type: 'Visit';
  specialty: 'General Practitioner' | 'Nurse';
};

export type AmbulanceAppointmentResponse = BaseAppointmentResponse & {
  type: 'Delivery';
  specialty: 'Ambulance';
};

export type MedicineDeliveryResponse = BaseAppointmentResponse & {
  type: 'Delivery';
  specialty: 'Rider';
};

export type AppointmentResponse = VisitAppointmentResponse | AmbulanceAppointmentResponse | MedicineDeliveryResponse;

export type ServiceAppointmentResponse = AppointmentResponse & {
  status: string;
  user: User;
  providers?: Providers[];
};

export type AppointmentsResponse = {
  appointmentTotal: number;
  services: ServiceAppointmentResponse[];
  drafts: ServiceAppointmentResponse[];
  nextPageAvailable: boolean;
};

export type AppointmentsRequest = {
  businessRef: string;
  country: string;
  search?: string;
  page?: number;
  perPage?: number;
};

export type EditAppointmentRequest = {
  country: string;
  id: number;
  type: string;
  specialty: string;
  scheduleStart: string;
  scheduleEnd?: string;
  patientNote?: string;
  patientCondition?: string;
  clinicalNote?: string;
  jarvisNote?: string;
  businessRef: string;
};
