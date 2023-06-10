export interface QueueScheduledAppointmentTypes {
  id?: number | string;
  bookingSource: string;
  startDate: string;
  endDate: string;
  duration: string;

  // Patient information
  patientType: 'new' | 'existing';
  patientId: number | string;
  patientName: string;
  patientEmail: string;
  countryCode: number | string;
  phoneNumber: string;
  idType: number | string;
  idNumber: string;

  doctor: string;
  room: number | string;
  reason: string;
  detail: string;
  isSendNotification: boolean;
  sendVia: string | number;
  remiderType: string | number;
  status: string;
}

export interface QueueScheduledAppointmentListProps {
  appointments: QueueScheduledAppointmentTypes[];
}

export interface QueueScheduledAppointmentItemProps {
  appointment: QueueScheduledAppointmentTypes;
}
