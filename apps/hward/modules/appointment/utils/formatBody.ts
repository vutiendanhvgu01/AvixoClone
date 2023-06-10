import dayjs from 'dayjs';
import { AppointmentFormValues } from '../components/appointment-types';
import { ServiceUnion } from '../constants';

/**
 * DOCTOR / NURSE
 * patientNote -> Mapped from Additional Comments
 * clinicalNote -> Mapped from Order Request field
 * patientCondition -> Empty string
 * jarvisNote -> Empty string
 *
 * MEDICINE DELIVERY
 * patientNote -> Empty string
 * clinicalNote -> Empty string
 * patientCondition -> Mapped from Order Request field
 * jarvisNote -> Empty string
 *
 * AMBULANCE
 * patientNote -> Empty string
 * clinicalNote -> Empty string
 * patientCondition -> Mapped from Additional Comments
 * jarvisNote -> Empty string
 */

type RequestedAddress = {
  alpha2: string;
  line1: string;
  title: string;
  unit: string;
  city: string;
  postCode: string | number;
  coordinates: {
    lat: number;
    lng: number;
  };
};
export type FormattedAppointmentBody = {
  country: string;
  businessRef: string;
  caseRef: string;
  patientRef: string;
  type: string;
  specialty: string;
  scheduleStart: string;
  requestedAddress: RequestedAddress;
};
export type FormattedVisitBody = FormattedAppointmentBody & {
  type: 'Visit';
  specialty: 'General Practitioner' | 'Nurse';
  patientNote: string;
  clinicalNote: string;
  patientCondition: '';
  jarvisNote: '';
};
export type FormattedMedicineDeliveryBody = Omit<FormattedAppointmentBody, 'requestedAddress'> & {
  type: 'Delivery';
  specialty: 'Rider';
  patientNote: '';
  clinicalNote: '';
  jarvisNote: string;
  destinationAddress: RequestedAddress;
};
export type FormattedAmbulanceBody = FormattedAppointmentBody & {
  type: 'Delivery';
  specialty: 'Ambulance';
  patientNote: '';
  clinicalNote: '';
  patientCondition: string;
  jarvisNote: '';
};

export type FormattedFinalBody = FormattedVisitBody | FormattedMedicineDeliveryBody | FormattedAmbulanceBody;

export default function formatBody(
  body: AppointmentFormValues['appointments'][number] & {
    service: ServiceUnion;
    businessRef: string;
    caseRef: string;
    patientRef: string;
    requestedAddress?: RequestedAddress;
  },
): FormattedFinalBody {
  const startDate = dayjs(body.startDate);
  const startTime = dayjs(body.startTime ?? undefined);
  const scheduleStart = dayjs(
    new Date(
      startDate.get('y'),
      startDate.get('month'),
      startDate.get('date'),
      startTime.get('h'),
      startTime.get('minute'),
      startTime.get('second'),
    ),
  );

  const shared = {
    country: 'SG',
    businessRef: body.businessRef,
    caseRef: body.caseRef,
    patientRef: body.patientRef,
    scheduleStart: scheduleStart.toISOString(),
    requestedAddress: body.requestedAddress,
  } as Partial<FormattedFinalBody>;
  let final = {} as FormattedFinalBody;
  if (['Doctor House Call', 'Nurse House Call'].includes(body.service)) {
    final = {
      ...shared,
      type: 'Visit',
      specialty: body.service === 'Doctor House Call' ? 'General Practitioner' : 'Nurse',
      patientNote: body.additionalComments,
      clinicalNote: body.orderRequest,
    } as FormattedVisitBody;
  } else if (body.service === 'Medication Delivery') {
    final = {
      ...shared,
      type: 'Delivery',
      specialty: 'Rider',
      patientNote: '',
      clinicalNote: '',
      jarvisNote: body.orderRequest,
    } as FormattedMedicineDeliveryBody;
  } else if (body.service === 'Ambulance') {
    final = {
      ...shared,
      type: 'Delivery',
      specialty: 'Ambulance',
      patientNote: '',
      clinicalNote: '',
      patientCondition: body.additionalComments,
      jarvisNote: '',
    } as FormattedAmbulanceBody;
  }

  return final;
}
