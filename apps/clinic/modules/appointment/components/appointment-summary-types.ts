export interface AppointmentItem {
  uuid: string;
  dateFrom: string;
  dateTo: string;
  activity?: string;
  doctor?: string;
}

export interface AppointmentItemProps {
  /**
   * Title to show in the top of ther item list
   * @default 'upcoming'
   */
  title?: string;
  items?: AppointmentItem[];
  /**
   * To check is the item list for past appointment
   * @default false
   */
  isPast?: boolean;
}

export interface AppointmentSummaryProps {
  upcomingAppointment?: AppointmentItem[];
  pastAppointment?: AppointmentItem[];
}
