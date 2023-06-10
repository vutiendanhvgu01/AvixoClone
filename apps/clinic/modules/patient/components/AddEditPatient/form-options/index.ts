import defaultCountries from './country-options';
import maritalStatus from './marital-status-options';
import raceOptions from './race-options';
import relationshipOptions from './relationship-options';
import SubTypeOptions from './sub-type-options';

const salutations = [
  'Doctor',
  'Madam',
  'Master',
  'Miss',
  'Mr',
  'Mrs',
  'Ms',
  'Professor',
  'Reverend',
  'Sir',
  'The Venerable',
];

const genders = ['male', 'female', 'not known', 'not applicable'];
const idTypes = [
  { value: 'national-id', label: 'National ID' },
  { value: 'driver-license', label: 'Driver License' },
  { value: 'passport', label: 'Passport' },
  { value: 'other', label: 'Other' },
];
const countryCodes = [{ label: 'SG +65', value: 65 }];

const countries = defaultCountries.map(item => ({ ...item, value: item.label }));

const religions = ['Buddhist', 'Christian', 'Free Thinker', 'Hindu', 'Muslim', 'Others', 'Sikh', 'Taoist', 'Unknown'];

const residentialStatuses = ['rented', 'owner', 'lease'];
const races = raceOptions.map(el => ({
  label: el,
  value: el,
  ...(el === 'separator' && { isSeparator: true, isDisabled: true }),
}));

const CONSTANTS = {
  salutations,
  countries,
  genders,
  idTypes,
  countryCodes,
  maritalStatus,
  religions,
  races,
  residentialStatuses,
  issuingCountries: defaultCountries,
  relationships: relationshipOptions,
  subTypeOptions: SubTypeOptions,
};

export default CONSTANTS;
