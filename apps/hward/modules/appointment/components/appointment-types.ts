import Yup from 'share-components/src/services/yup';
import { SERVICES } from '../constants';

const services = SERVICES.concat([]);
export const AppointmentFormSchema = Yup.object({
  service: Yup.string().oneOf(services),
  numberOfAppointments: Yup.string().required().min(1),
  appointments: Yup.array()
    .of(
      Yup.object({
        startDate: Yup.date().required(),
        startTime: Yup.date().nullable(),
        orderRequest: Yup.string(),
        additionalComments: Yup.string(),
      }),
    )
    .required()
    .min(1),
});

export type AppointmentFormValues = Yup.InferType<typeof AppointmentFormSchema>;

export const EditAppointmentFormSchemas = Yup.object({
  startDate: Yup.date()
    .required()
    .test('is-before', 'Start date must be greater then or equal today', value => {
      const newDate = value ? new Date(value) : new Date();
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      newDate.setHours(0, 0, 0, 0);
      return newDate.getTime() >= today.getTime();
    }),
  startTime: Yup.date()
    .nullable()
    .test('is-before-time', 'Start time must be greater then now', value => {
      if (!value) return true;

      const newTime = new Date(value);
      const now = new Date();

      return newTime.getTime() > now.getTime();
    }),
  orderRequest: Yup.string(),
  additionalComments: Yup.string(),
});

export const DEFAULT_APPOINTMENT = {
  startDate: new Date(),
  startTime: null,
  orderRequest: '',
  additionalComments: '',
};
export const initialAppointmentFormData: AppointmentFormValues = {
  service: SERVICES[0],
  numberOfAppointments: '1',
  appointments: [DEFAULT_APPOINTMENT],
};

export type JarvisAppointmentStatus =
  | 'draft'
  | 'accepted'
  | 'assigned'
  | 'inTransit'
  | 'inProgress'
  | 'discharged'
  | 'visitStart'
  | 'visitEnd'
  | 'completed'
  | 'cancelled';

export type HwardAppointmentStatus = 'Received' | 'Assigned' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface Appointment {
  uuid: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: string;
  specialty: string;
  providers: {
    name: string;
    owner: boolean;
  }[];
  status: JarvisAppointmentStatus;
  orderRequest: string;
  notes: string;
  additionalComments: string;
  patientCondition: string;
  user?: {
    name: string;
    age: number;
    nric: string;
    gender: 'Male' | 'Female';
  };
}
