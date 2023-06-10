/* eslint-disable import/prefer-default-export */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const APPOINTMENT_API_URL = `${publicRuntimeConfig.APPOINTMENT_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const APPOINTMENT_ACTION = {
  DELETE_APPOINTMENT: 'delete-appointment',
  ADD_APPOINTMENT: 'add-appointment',
  EDIT_APPOINTMENT: 'edit-appointment',
  EDIT_APPOINTMENT_CALENDAR: 'edit-appointment-calendar',
  ADD_BLACKOUT: 'add-blackout',
  EDIT_BLACKOUT: 'add-blackout',
  ADVANCED_SEARCH: 'advanced-search',
  ADD_NOTICE: 'add-notice',
  EDIT_NOTICE: 'edit-notice',
  DELETE_NOTICE: 'delete-notice',
};

export const PRACTITIONER_TYPE = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const APPOINTMENT_LIST_DOCTORS = [
  'All Doctors',
  'Dr. John Doe',
  'Dr. Jane Doe',
  'Dr. John Smith',
  'Dr. Jane Smith',
];
export const APPOINTMENT_LIST_STATUSES = ['Selected All', 'Confirmed', 'Cancelled', 'Rescheduled', 'No Show'];
