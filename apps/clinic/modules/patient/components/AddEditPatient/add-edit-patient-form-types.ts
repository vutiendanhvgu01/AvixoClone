import { Patient } from 'modules/patient/types/patient';

interface AddPatientFormTypes {
  type: string;
  initData?: Patient;
  onCancel: () => void;
  initStep?: number;
}

interface AddPatientPhoneType {
  number: string;
  countryCode: number;
  preferred?: boolean;
}

interface AddPatientAddressType {
  name: string;
  floorNo: string;
  unitNo: string;
  line1: string;
  line2: string;
  postal: string;
  city: string;
  country: string;
  isPrimary?: boolean;
}

interface AddPatientEmailType {
  email: string;
  preferred?: boolean;
}

interface AddPatientIdentitiesType {
  idType: string;
  idNumber: string;
  issuingCountry: string;
  idSubType: string;
}

interface AddPatientContactType {
  email: AddPatientEmailType;
  fullName: string;
  address: AddPatientAddressType;
  relationship: string;
  phone: AddPatientPhoneType;
  gender: string;
  organisation: string;
  validFrom: string;
  validTo: string;
  isPrimary?: boolean;
}

interface AddPatientBasicValuesType {
  salutation: string;
  fullName: string;
  preferredName: string;
  birthDate: string;
  nationality: string;
  placeOfBirth: string;
  genderPreferred: string;
  gender: string;
  mrn: string;
  preferredSalutation: string;
  race: string;
  religion: string;
  deceased: boolean;
  deceasedOn: string;
  maritalStatus: string;
  isVip: boolean;
  premiseId: string;
  organisationId: string;
  company: string;
  occupation: string;
  referredBy: string;
  notes: string;
  marketingConsent: boolean;
  photo: string;
  residencyStatus: string;
  nextOfKin: string;
  relationship: string;
  type: string;
  severity: string;
  criticality: string;
  verification: string;
  clinicalStatus: string;
  drugName: string;
  drugBrand: string;
  manifestation: string;
  description: string;
  route: string;
  status: string;
  firstOccurence: string;
  lastOccurence: string;
  resolvedOn: string;
  relatedTo: string;
}

interface AddPatientInitialValuesType extends AddPatientBasicValuesType {
  identities: AddPatientIdentitiesType[];
  phones: AddPatientPhoneType[];
  emails: AddPatientEmailType[];
  addresses: AddPatientAddressType[];
  contact: AddPatientContactType[];
}

export type {
  AddPatientAddressType,
  AddPatientContactType,
  AddPatientEmailType,
  AddPatientIdentitiesType,
  AddPatientInitialValuesType,
  AddPatientPhoneType,
  AddPatientBasicValuesType,
};
export default AddPatientFormTypes;
