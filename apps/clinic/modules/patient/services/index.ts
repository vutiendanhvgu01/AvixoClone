import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import isValid from 'date-fns/isValid';
import intervalToDuration from 'date-fns/intervalToDuration';
import { GetServerSidePropsContext } from 'next';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import { IDENTITY_ID_TYPE, PATIENT_MS_URL } from '../constants';
import { Patient, PatientAddress, PatientEmail, PatientIdentity, PatientPhone } from '../types/patient';
import { PatientListFormValues, PatientListItem } from '../components/PatientList/patient-list-types';

class PatientApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: PATIENT_MS_URL }, context);
  }

  getPatients(limitParam = 100): Promise<ApiResponse<Patient[]>> {
    return this.get(`/patient?${limitParam ? `limitParam=${limitParam}` : ''}`);
  }

  getPatientDetails(uuid: string | number, type?: 'id' | 'uuid'): Promise<ApiResponse<Patient>> {
    if (type === 'id') {
      return this.get(`/patient/${uuid}`);
    }
    return this.get(`/patient/uuid/${uuid}`);
  }

  getPatientLists(): Promise<ApiResponse<PatientListItem[]>> {
    return this.get('/patient/list/?limitParam=200');
  }

  getPatientListDetails(id: string | number): Promise<ApiResponse<PatientListItem>> {
    return this.get(`/patient/list/${id}`);
  }

  createPatientList(data: PatientListFormValues): Promise<ApiResponse> {
    return this.post('/patient/list/', data);
  }

  updatePatientList(id: string, data: PatientListFormValues): Promise<ApiResponse> {
    return this.put(`/patient/list/${id}`, data);
  }

  deletePatientList(id: string, data: any): Promise<ApiResponse> {
    return this.delete(`/patient/list/${id}/`, { data });
  }

  deletePatientFromList(id: string, patientUuid: string): Promise<ApiResponse> {
    return this.delete(`/patient/list/${id}/item`, { data: { patientUuid } });
  }

  addPatient(data: any): Promise<ApiResponse> {
    return this.post('/patient', data);
  }

  deletePatientByUuid(uuid: string): Promise<ApiResponse> {
    return this.delete(`/patient/uuid/${uuid}`);
  }

  updatePatientByUuid(uuid: string, data: any): Promise<ApiResponse> {
    return this.put(`/patient/uuid/${uuid}`, data);
  }
}

export default PatientApiService;

export const getAge = (dob?: string) => {
  if (!dob || !isValid(new Date(dob))) return '';
  const { years, months, days } = intervalToDuration({ start: new Date(dob), end: new Date() });
  if (years) {
    return years <= 20 ? `${years} Year(s) ${months} Month(s)` : `${years} Years Old`;
  }
  return `${months} Month(s) ${days} Day(s)`;
};

export const getPatientPhoneNumber = (phones?: PatientPhone[]) => {
  if (phones?.length) {
    const defaultPhoneNumber = phones[0];
    const preferredPhoneNumber = phones.find(it => it.preferred);
    if (preferredPhoneNumber) return `+${preferredPhoneNumber.countryCode} ${preferredPhoneNumber.number}`;
    return `+${defaultPhoneNumber.countryCode} ${defaultPhoneNumber.number}`;
  }

  return '';
};

export const getPatientEmail = (emails?: PatientEmail[]) => {
  if (emails?.length) {
    const defaultEmail = emails[0];
    const preferredEmail = emails.find(it => it.preferred);
    if (preferredEmail) return preferredEmail.email;
    return defaultEmail.email;
  }

  return '';
};

export const getPatientAddress = (address?: PatientAddress, country?: string) => {
  if (address) {
    const addressLine2 = address.line2 ? `, ${address.line2} ` : ' ';
    return `${address.line1}${addressLine2}, ${address.floorNo}, ${address.unitNo}, ${country || ''} ${address.postal}`;
  }

  return '';
};

export const getPatientIdentity = (identities?: PatientIdentity[]) => {
  if (identities?.length) {
    const identity = identities.find(it => it.idType === 'national-id') || identities[0];
    return {
      idType: IDENTITY_ID_TYPE[identity.idType],
      idNumber: identity.idNumber,
      value: `${IDENTITY_ID_TYPE[identity.idType]} ${identity.idNumber}`,
    };
  }

  return null;
};

export const getPatientAllergiesText = (allergies: Allergy[] = [], numberAllergies = 2) => {
  const data = allergies.slice(0, numberAllergies);
  if (data.length > 0) {
    return `${data.map(it => it.name).join(', ')}${allergies.length > numberAllergies ? '...' : ''}`;
  }

  return '';
};
