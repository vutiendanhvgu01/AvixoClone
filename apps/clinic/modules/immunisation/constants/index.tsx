import getConfig from 'next/config';
import yup from '@AvixoServices/yup';

const { publicRuntimeConfig } = getConfig();
export const IMMUNISATION_API_URL = `${publicRuntimeConfig.IMMUNISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const IMMUNISATION_STATUS_TEXT = {
  completed: 'Given',
  'entered-in-error': 'Failed',
  'not-done': 'Not Administered',
};

export const IMMUNISATION_STATUS_COLOR: { [key: string]: 'secondary' | 'default' | 'warning' | 'error' } = {
  completed: 'secondary',
  'not-done': 'default',
  rejected: 'warning',
  'entered-in-error': 'error',
};

export const IMMUNISATION_FORM = {
  SITES: [
    { id: 0, name: 'Left Deltoid Muscle' },
    { id: 1, name: 'Right Deltoid Muscle' },
    { id: 2, name: 'Left Anterolateral Thigh' },
    { id: 3, name: 'Right Anterolateral Thigh' },
    { id: 4, name: 'Left Gluteal Region' },
    { id: 5, name: 'Right Gluteal Region' },
  ],
  STATUSES: [
    { value: 'completed', label: 'Completed' },
    { value: 'entered-in-error', label: 'Entered in error' },
    { value: 'not-done', label: 'Not done' },
  ],
  UOM: [
    { value: 'mg', label: 'mg' },
    { value: 'mL', label: 'mL' },
    { value: 'mcg', label: 'mcg' },
    { value: 'drop(s)', label: 'drop(s)' },
    { value: 'dose', label: 'dose' },
  ],
  SCHEMA: yup.object().shape({
    administeredProduct: yup.string().required('Required'),
    doseQuantity: yup.number().required('Required').min(0).nullable(),
    doseSeries: yup.string().max(50, 'Must be less than 50 characters'),
    site: yup.string().required('Required'),
    protocolDoseNumber: yup.string().required('Required').nullable(),
    route: yup.string(),
    batchNo: yup.string().required('Required').max(50, 'Must be less than 50 characters'),
    manufacturer: yup.string().nullable(),
    expiryDate: yup.date().nullable(),
    administeredBy: yup.string().required('Required').nullable(),
    unitOfMeasurement: yup.string().required('Required').nullable(),
    dateOfAdministration: yup
      .date()
      .required('Required')
      .max(new Date(), 'Date to be less than or equal to Today')
      .nullable(),
    requestedBy: yup.number().required('Required').nullable(),
    notes: yup.string().required('Required').max(500, 'Must be less than 500 characters'),
  }),
};
