import { DefaultRecord } from 'share-components';

export type IdentityIdType = 'national-id' | 'driver-license' | 'passport' | 'other';

export interface PatientIdentity extends DefaultRecord {
  idType: IdentityIdType;
  idSubType?: string;
  idNumber?: string;
  type?: string;
  issuingCountry?: string;
  isPrimary?: boolean;
  isVerified?: boolean;
}

export type AddressPurpose = 'home' | 'work' | 'old' | 'not applicable';

export interface PatientAddress extends DefaultRecord {
  id: number;
  name: string;
  text: string;
  purpose: AddressPurpose;
  floorNo: string;
  unitNo: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postal: string;
  isPrimary?: boolean;
}

export interface PatientPhone extends DefaultRecord {
  id: number;
  number: string;
  countryCode: number;
  preferred: boolean;
  isoNumber: string;
  exitCode: number;
  areaCode: number;
  extension: number;
  type: string;
}

export interface PatientEmail extends DefaultRecord {
  id: number;
  email: string;
  type: string;
  preferred: boolean;
  verifiedAt: string;
}

export interface PatientContact extends DefaultRecord {
  id: number;
  fullName: string;
  gender: string;
  email: PatientEmail;
  relationship: string;
  phone: PatientPhone;
  address: PatientAddress;
  validFrom: string;
  validTo: string;
  isPrimary?: boolean;
}

export interface Patient extends DefaultRecord {
  uuid: string;
  fullName: string;
  mrn?: string;
  salutation?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
  preferredName?: string;
  nationality?: string;
  race?: string;
  religion?: string;
  placeOfBirth?: string;
  gender: 'male' | 'female' | 'not known' | 'not applicable';
  genderPreferred?: 'male' | 'female' | 'not known' | 'not applicable';
  deceased?: boolean;
  isVip?: boolean;
  identities?: PatientIdentity[];
  phones?: PatientPhone[];
  emails?: PatientEmail[];
  addresses?: PatientAddress[];
  contact?: PatientContact[];
  notes?: string;
  company?: string;
  occupation?: string;
  nric?: string;
  maritalStatus?: string;
  residencyStatus?: string;
  kin?: string;
  patientId: number;
  medicalRecordNumber: string;
  preferredSalutation: string;
  primaryOrganisationId: number;
  referredBy: string;
  organisationId: number;
  premiseId: number;
  photo?: string;
}
