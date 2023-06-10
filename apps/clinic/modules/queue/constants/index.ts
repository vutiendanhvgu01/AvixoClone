import getConfig from 'next/config';
import { MenuNestItemData } from 'share-components';
import { BasedOnType } from '../types';

const { publicRuntimeConfig } = getConfig();

export const VISIT_MS_URL = `${publicRuntimeConfig.VISIT_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const QUEUE_ACTION = {
  ADD_PATIENT_TO_QUEUE: 'add-patient-to-queue',
  ADD_APPOINTMENT: 'add-appointment',
  ADD_NOTICE: 'add-notice',
  EDIT_NOTICE: 'edit-notice',
};
export const QUEUE_STATUS_COLOR: Record<string, string> = {
  'Checked In': '#B020F3',
  'Regis. Completed': 'chart.blue4',
  'Consult Started': 'chart.yellow5',
  'Consult Ended': 'error.main',
  Payment: 'success.main',
  'Checked Out': 'neutral.500',
};
export const QUEUE_STATUS = [
  {
    label: 'Checked In',
    value: 'Checked In',
  },
  {
    label: 'Regis. Completed',
    value: 'Regis. Completed',
  },
  {
    label: 'Consult Started',
    value: 'Consult Started',
  },
  {
    label: 'Consult Ended',
    value: 'Consult Ended',
  },
  {
    label: 'Payment',
    value: 'Payment',
  },
  {
    label: 'Checked Out',
    value: 'Checked Out',
  },
];

export const QUEUE_ACTIONS_MENU: MenuNestItemData[] = [
  {
    label: 'Undo Queue Entry',
  },
  {
    label: 'View Invoice',
  },
  {
    label: 'Add Vital Charting',
  },
  {
    label: 'Add Medical Record',
  },
  {
    label: 'Add Medical Certificate',
  },
  {
    label: 'Add Prescriptions',
  },
  {
    label: 'Print',
    items: [
      {
        label: 'Print Invoice',
      },
      {
        label: 'Print Summary Invoice',
      },
      {
        label: 'Print Short Invoice',
      },
      {
        label: 'Print Drug Label',
      },
      {
        label: 'Print Prescription',
      },
      {
        label: 'Print Prescription Label',
      },
      {
        label: 'Print MC',
      },
      {
        label: 'Print Record Label',
      },
      {
        label: 'Print Case Note Label',
      },
    ],
  },
];

export const BASED_ON: Record<BasedOnType, BasedOnType> = {
  speciality: 'speciality',
  room: 'room',
  practitioner: 'practitioner',
};

export const specialityOptions = ['General Medicine', 'Orthopaedic', 'Obstetric and Gynaecology', 'Urology'];
export const roomOptions = ['Consultation', 'Treatment Room', 'X-ray Room', 'Ultrasound Room'];
