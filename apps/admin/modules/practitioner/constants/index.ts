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

export const PRACTITIONER_ROLE_VALUE = {
  sysAdmin: 'sys-admin',
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

export const PRACTITIONER_FORM = {
  GENDER_SELECT_OPTIONS: [
    {
      label: 'Male',
      value: PRACTITIONER_GENDER_VALUE.male,
    },
    {
      label: 'Female',
      value: PRACTITIONER_GENDER_VALUE.female,
    },
    {
      label: 'Not Known',
      value: PRACTITIONER_GENDER_VALUE.notKnown,
    },
    {
      label: 'Not Applicable',
      value: PRACTITIONER_GENDER_VALUE.notApplicable,
    },
  ],
  STATUS_SELECT_OPTIONS: [
    {
      label: 'Active',
      value: PRACTITIONER_STATUS_VALUE.active,
    },
    {
      label: 'Suspended',
      value: PRACTITIONER_STATUS_VALUE.suspended,
    },
    {
      label: 'In Active',
      value: PRACTITIONER_STATUS_VALUE.inactive,
    },
  ],
  LAGUAGE_SELECT_OPTIONS: [
    {
      label: 'English',
      value: PRACTITIONER_LANGUAGE_VALUE.english,
    },
    {
      label: 'Vietnamese',
      value: PRACTITIONER_LANGUAGE_VALUE.vietnamese,
    },
  ],
  PROFESSION_CATEGOPRY_SELECT_OPTIONS: [
    {
      label: 'Physicians',
      value: PRACTITIONER_CATEGORY_VALUE.physicians,
    },
    {
      label: 'Pharmacists',
      value: PRACTITIONER_CATEGORY_VALUE.pharmacists,
    },
    {
      label: 'Nurse',
      value: PRACTITIONER_CATEGORY_VALUE.nurse,
    },
  ],
  QUALIFICATION_TYPE_SELECT_OPTIONS: [
    {
      label: 'Practice License',
      value: PRACTITIONER_TYPE_VALUE.practiceLicense,
    },
    {
      label: 'Other License',
      value: PRACTITIONER_TYPE_VALUE.otherLicense,
    },
    {
      label: 'Education',
      value: PRACTITIONER_TYPE_VALUE.education,
    },
    {
      label: 'Specialisation',
      value: PRACTITIONER_TYPE_VALUE.specialisation,
    },
    {
      label: 'Certification',
      value: PRACTITIONER_TYPE_VALUE.certification,
    },
    {
      label: 'Other',
      value: PRACTITIONER_TYPE_VALUE.other,
    },
  ],
  QUALIFICATION_ISSUER_TYPE_SELECT_OPTIONS: [
    {
      label: 'Organisation',
      value: PRACTITIONER_ISSUER_TYPE_VALUE.organisation,
    },
    {
      label: 'Professional Body',
      value: PRACTITIONER_ISSUER_TYPE_VALUE.professionalBody,
    },
    {
      label: 'University',
      value: PRACTITIONER_ISSUER_TYPE_VALUE.university,
    },
  ],
};
