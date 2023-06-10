import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const PRACTITIONER_API_URL = `${publicRuntimeConfig.PRACTITIONER_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const PRACTITIONER_LIST_ACTION = {
  ADD_PRACTITIONER: 'add-practitioner',
  DELETE_PRACTITIONER: 'delete-practitioner',
  UPDATE_PRACTITIONER: 'update-practitioner',
};

export const PRACTITIONER_ROLE_OPTIONS = [
  {
    label: 'Doctor',
    value: 'Doctor',
  },
  {
    label: 'System',
    value: 'System',
  },
  {
    label: 'Administrator',
    value: 'Administrator',
  },
  {
    label: 'Clinic Manager',
    value: 'Clinic Manager',
  },
];

export const PRACTITIONER_STARUS_OPTIONS = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'In Active',
    value: 'inactive',
  },
];

export const PHASE_LABEL = {
  detail: '1. Practitioner Information',
  contact: '2. Contact Information',
  profession: '3. Profession',
  qualification: '4. Qualification',
  role: '5. Role Configurations',
};

export const PRACTITIONER_GENDER_VALUE = {
  male: 'male',
  female: 'female',
  notKnown: 'not known',
  notApplicable: 'not applicable',
};

export const PRACTITIONER_STATUS_VALUE = {
  active: 'active',
  suspended: 'suspended',
  inactive: 'inactive',
};

// It will be implement to get from the BE later
export const PRACTITIONER_LANGUAGE_VALUE = {
  english: '1',
  vietnamese: '2',
};

export const PRACTITIONER_CATEGORY_VALUE = {
  physicians: 'physicians',
  pharmacists: 'pharmacists',
  nurse: 'nurse',
};

export const PRACTITIONER_TYPE_VALUE = {
  practiceLicense: 'practice-license',
  otherLicense: 'other-license',
  education: 'education',
  specialisation: 'specialisation',
  certification: 'certification',
  other: 'other',
};

export const PRACTITIONER_ISSUER_TYPE_VALUE = {
  organisation: 'organisation',
  professionalBody: 'professional-body',
  university: 'university',
};
