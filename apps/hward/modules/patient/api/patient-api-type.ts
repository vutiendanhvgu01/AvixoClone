import { AddressFull, Gender, PhoneNumber } from 'common/constants/types';
import { ApiResponse } from 'share-components';
import { CensoredNRIC } from '../utils/censorNRIC';

export interface PatientCountResponse {
  count: number;
}

export interface CreatePatientResponse {
  fullName: string;
  caseId: string;
  status: 200;
  nric: CensoredNRIC;
}

export interface CreatePatientErrorResponse {
  message: string;
  status: 400 | 500;
  cause?: 'patient' | 'case';
  patientId?: string;
}

export interface BaseAccount {
  active: boolean;
  id: string;
}

export interface SpeedocPatientAccount extends BaseAccount {
  type: 'speedoc-patient';
  meta: {
    name: string;
  };
}

export interface AvixoAccount extends BaseAccount {
  type: 'avixo';
  country: string;
  meta: {
    pcno: string;
    doctorIds?: number[];
  };
  id: string;
  url: string;
}

export interface JarvisAccount extends BaseAccount {
  type: 'jarvis';
  meta: {
    tag: string;
  };
}

export interface Organization {
  contacts: {
    emails: unknown[];
    phones: unknown[];
    addresses: unknown[];
  };
  createdAt: string;
  modifiedAt: string;
  _id: string;
  status: string;
  name: string;
  type: string;
  accounts: (AvixoAccount | JarvisAccount)[];
}

export interface HWardAccount extends BaseAccount {
  type: 'hward';
  country: string;
  organizationRef: Organization | string;
  meta: {
    taggedDate: string;
  };
}

export type Account = SpeedocPatientAccount | AvixoAccount | HWardAccount;

export interface Document {
  type: string;
  id: string;
  _id: string;
}

export interface Profile {
  fullName: string;
  birthdate: string;
  gender: Gender;
}

export interface Identification {
  phone: PhoneNumber & { fullNumber: string };
  email: string;
  documents: Document[];
}

export interface Contact {
  phones: (PhoneNumber & { _id: string })[];
  addresses: AddressFull[];
}

export interface PatientResponseProfile {
  _id: string;
  createdAt: string;
  modifiedAt: string;
  status: string;
  __v: number;
  accounts: Account[];
  profile: Profile;
  identification: Identification;
  contacts: Contact;
}

export interface PatientResponse {
  patient: PatientResponseProfile;
}

export interface PatientsResponse {
  patients: PatientResponseProfile[];
  nextPageAvailable: boolean;
  totalPatients: number;
}

export type GetPatientsParams = {
  organizationRef: string;
  search?: string;
  perPage?: number;
  page?: number;
};

export type GetPatientsReturnType = Promise<ApiResponse<PatientsResponse>>;

export type GetPatientCountParams = {
  organizationRef: string;
};

export type GetPatientCountReturnType = Promise<ApiResponse<PatientCountResponse>>;

export type GetPatientParams =
  | { organizationRef: string; patientUsmsRef: string }
  | { organizationRef: string; patientJarvisRef: string };

export type GetPatientReturnType = Promise<ApiResponse<PatientResponse>>;
