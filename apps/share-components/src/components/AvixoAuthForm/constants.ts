// eslint-disable-next-line import/prefer-default-export
export const REGEX_PASSWORDS = [
  {
    pattern: /[a-z]+/,
    message: 'At least 1 lower case letter',
    validated: false,
  },

  {
    pattern: /[A-Z]+/,
    message: 'At least 1 upper case letter',
    validated: false,
  },
  {
    pattern: /[@$!%*#?&]+/,
    message: 'At least 1 special character',
    validated: false,
  },
  {
    pattern: /\d+/,
    message: 'At least 1 numeric character',
    validated: false,
  },
  {
    pattern: /[a-zA-Z0-9]{12}/,
    message: 'At least 12 alphanumeric characters',
    validated: false,
  },
];

export const COUNTRY_CODE_DEFAULT = '56';
