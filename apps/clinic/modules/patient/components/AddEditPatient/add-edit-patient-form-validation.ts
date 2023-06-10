import yup from 'share-components/src/services/yup';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import { DefaultCountryCode } from './constant';

const PatientDetailValidation = yup.object().shape({
  fullName: yup.string().required('Name Required'),
  birthDate: yup.date().required('Date of Birth Required'),
  nationality: yup.string().required('Country Required'),
  gender: yup.string().required('Gender Required'),
  identities: yup.array().of(
    yup.object().shape({
      idType: yup.string().required('ID type Required'),
      idNumber: yup
        .string()
        .when(['idType', 'issuingCountry'], (idType, issuingCountry) =>
          idType === 'national-id' && issuingCountry === 'SG'
            ? yup.string().required('ID number Required').isValidNRIC()
            : yup.string().required('ID number Required'),
        ),
      issuingCountry: yup
        .string()
        .required('Nationality Required')
        .test('len', 'Nationality should be 2 Charachters long', val => val?.length === 2),
      idSubType: yup
        .string()
        .when(['idType', 'issuingCountry'], (idType, issuingCountry) =>
          (idType === 'national-id' && ['SG', 'MY'].includes(issuingCountry)) ||
          (idType === 'passport' && issuingCountry === 'SG') ||
          idType === 'other'
            ? yup.string().required('ID SubType Required')
            : yup.string(),
        ),
    }),
  ),
});

const PatientContactValidation = yup.object().shape({
  emails: yup.array(
    yup.object().shape({
      email: yup.string().email('Invalid email'),
    }),
  ),
  addresses: yup.array().of(
    yup.object().shape({
      city: yup.string().required('City Required'),
      country: yup.string().required('Country Required'),
      floorNo: yup.string().test('required-if-unitNo', 'Unit Level Required', function validatFloorNo(value) {
        return this.parent.unitNo !== undefined && this.parent.unitNo !== '' ? !!value : true;
      }),
      unitNo: yup.string().test('required-if-floorNo', 'Unit Number Required', function validateUnitNo(value) {
        return this.parent.floorNo !== undefined && this.parent.floorNo !== '' ? !!value : true;
      }),
      line1: yup.string().required('Address Line 1 Required'),
      line2: yup.string().required('Address Line 2 Required'),
      postal: yup
        .string()
        .min(6, 'Postal code must be 6 characters long')
        .max(6, 'Postal code must be 6 characters long')
        .required('Postal Required'),
    }),
  ),
  phones: yup.array().of(
    yup.object().shape({
      number: yup.string().min(8, 'Enter correct Number').required('Phone Required'),
      countryCode: yup.string().required('Required'),
    }),
  ),
});

const PatientOthersValidation = yup.object().shape({
  race: yup.string(),
  religion: yup.string(),
});
const PatientOtherContactsValidation = yup.object().shape({
  contact: yup.array().of(
    yup.object().shape({
      fullName: yup.string().required('Name Required'),
      email: yup.object().shape({
        email: yup.string().email('Invalid email').required('Email Required'),
      }),
      phone: yup.object().shape({
        number: yup.string().min(8, 'Enter correct Number').required('Phone Required'),
        countryCode: yup.string().required('Country Code Required'),
      }),
      relationship: yup.string().required('Relationship Required'),
      address: yup.object().shape({
        floorNo: yup.string().test('required-if-unitNo', 'Unit Level Required', function validatFloorNo(value) {
          return this.parent.unitNo !== undefined && this.parent.unitNo !== '' ? !!value : true;
        }),
        unitNo: yup.string().test('required-if-floorNo', 'Unit Number Required', function validateUnitNo(value) {
          return this.parent.floorNo !== undefined && this.parent.floorNo !== '' ? !!value : true;
        }),
        postal: yup
          .string()
          .min(6, 'Postal code must be 6 characters long')
          .max(6, 'Postal code must be 6 characters long'),
      }),
    }),
  ),
});
const PatientAllergyValidation = yup.object().shape({});

const AddPatientSchema = [
  PatientDetailValidation,
  PatientContactValidation,
  PatientOthersValidation,
  PatientOtherContactsValidation,
  PatientAllergyValidation,
];

export const ValidateAllergy = yup.object().shape({});

export const AddPatientInitialValues: AddPatientInitialValuesType = {
  salutation: '',
  fullName: '',
  preferredName: '',
  birthDate: '',
  placeOfBirth: '',
  genderPreferred: '',
  gender: '',
  nationality: 'singapore',
  identities: [{ idType: 'national-id', idNumber: '', issuingCountry: '', idSubType: '' }],
  mrn: '',
  preferredSalutation: '',
  race: '',
  religion: '',
  phones: [
    {
      number: '',
      countryCode: DefaultCountryCode,
      preferred: true,
    },
  ],
  emails: [
    {
      email: '',
      preferred: true,
    },
  ],
  addresses: [
    {
      name: '',
      floorNo: '',
      unitNo: '',
      line1: '',
      line2: '',
      postal: '',
      city: '',
      country: '',
      isPrimary: true,
    },
  ],
  contact: [],
  deceased: false,
  deceasedOn: '',
  maritalStatus: '',
  isVip: false,
  premiseId: '',
  organisationId: '',
  company: '',
  occupation: '',
  referredBy: '',
  notes: '',
  marketingConsent: false,
  photo: '',
  residencyStatus: '',
  nextOfKin: '',
  relationship: '',
  type: '',
  severity: '',
  criticality: '',
  verification: '',
  clinicalStatus: '',
  drugName: '',
  drugBrand: '',
  manifestation: '',
  description: '',
  route: '',
  firstOccurence: '',
  lastOccurence: '',
  resolvedOn: '',
  status: 'no',
  relatedTo: 'none',
};

export default AddPatientSchema;
