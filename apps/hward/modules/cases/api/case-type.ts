import { Gender } from 'common/constants/types';
import { ServiceResponse } from './service-type';
import { type CaseStatusKey } from '../components/cases-types';

export type CaseResponse = {
  id: number;
  ref: string;
  status: CaseStatusKey;
  createdAt: string;
  dischargedAt?: string;
  user: {
    ref: string;
    name: string;
    nric: string;
    gender: Gender;
    birthDate: string;
  };
  services?: ServiceResponse[];
  drafts?: ServiceResponse[];
};

export interface CasesResponse {
  cases: CaseResponse[];
  total: number;
}

export type PatientCasesResponse = Pick<CaseResponse, 'id' | 'ref' | 'status' | 'createdAt'> & {
  dischargedAt?: string;
};
