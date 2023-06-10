const nationalIdSingapore = [
  { label: 'Fin/Work Permit/SAF 11B', value: 'fin-work permit-saf11b' },
  { label: 'Singapore Birth Certificate', value: 'singapore-birth-certificate' },
  { label: 'Singapore Blue Identification Card', value: 'singapore-blue-identification-card' },
  { label: 'Singapore Citizenship Certificate', value: 'singapore-citizenship-certificate' },
  { label: 'Singapore Pink Identification Card', value: 'singapore-pink-identification-card' },
  { label: 'Singapore Special Pass', value: 'singapore-special-pass' },
];

const otherSingapore = [{ label: 'Singapore Exit Permit', value: 'singapore-exit-permit' }];

const passportSingapore = [{ label: 'Singapore International Passport', value: 'singapore-international-passport' }];

const otherAnyCountry = [
  { label: 'Child Key', value: 'child-key' },
  { label: 'Death Registration No', value: 'death-registration-no' },
  { label: 'Foreign Document', value: 'foreign-document' },
  { label: 'Foreign Identity Document', value: 'foreign-identity-document' },
  { label: 'Foreign Travel Document', value: 'foreign-travel-document' },
  { label: 'Not Applicable/Nil', value: 'not-applicable' },
  { label: 'Seaman Book/Document', value: 'seaman-book-document' },
  { label: 'Truncated Document Number', value: 'truncated-document-number' },
];

const nationalIdMalaysia = [
  { label: 'Malaysian Birth Certificate', value: 'malaysian-birth-certificate' },
  { label: 'Malaysian Blue Identification Card', value: 'malaysian-blue-identification-card' },
  { label: 'Malaysian Citizenship Certificate', value: 'malaysian-citizenship-certificate' },
  { label: 'Malaysian Passport', value: 'malaysian-passport' },
  { label: 'Malaysian Red Identification Card', value: 'malaysian-red-identification-card' },
  { label: 'New Malaysian Blue Identification Card', value: 'new-malaysian-blue-identification-card' },
  { label: 'New Malaysian Red Identification Card', value: 'new-malaysian-red-identification-card' },
  { label: 'Non-Malaysian Birth Certificate', value: 'non-malaysian-birth-certificate' },
];

const SubTypeOptions = {
  'national-id': {
    SG: nationalIdSingapore,
    MY: nationalIdMalaysia,
    'any-country': [],
  },
  passport: {
    SG: passportSingapore,
    MY: [],
    'any-country': [],
  },
  other: {
    SG: otherSingapore,
    MY: otherAnyCountry,
    'any-country': otherAnyCountry,
  },
  'driver-license': {
    SG: [],
    MY: [],
    'any-country': [],
  },
};

export default SubTypeOptions;
