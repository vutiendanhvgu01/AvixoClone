import { InfiniteData } from '@tanstack/react-query';
import { PaginationOptions } from 'common/constants/paginationOptions';
import { Appointment } from 'modules/appointment/components/appointment-types';
import { CensoredNRIC } from 'modules/patient/utils/censorNRIC';

export const CASE_STATUSES = {
  onboarded: 'Onboarded',
  active: 'Active',
  discharged: 'Discharged',
  unknown: 'Unknown',
};

export type CaseStatus = typeof CASE_STATUSES;

export type CaseStatusKey = keyof CaseStatus;

export interface FormattedCase {
  uuid: `C-${string}`;
  ref: string;
  userRef: string;
  name: string;
  age: number;
  gender: string;
  nric: CensoredNRIC;
  enrolmentDate: string;
  lengthOfStay: number;
  status: CaseStatus[keyof CaseStatus];
  services?: Appointment[];
}
export interface DataProps {
  data: FormattedCase[];

  loading?: boolean;
}

export interface CasesTableProps {
  isFetching: boolean;
  casesList: InfiniteData<{ cases: FormattedCase[]; total: number }> | undefined;
  paginationOptions: PaginationOptions;
  onPageChange: (page: number) => void;
  onPageSizeChange: (perPage: number) => any;
}
