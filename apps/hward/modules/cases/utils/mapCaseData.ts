import censorNRIC from 'modules/patient/utils/censorNRIC';
import { formatDate } from 'share-components/src/utils/formatUtils';
import dayjs from 'dayjs';
import { CASE_STATUSES, CaseStatus, FormattedCase } from '../components/cases-types';
import { CaseResponse } from '../api/case-type';
import mapServiceData from './mapServiceData';

export interface MapCaseDataOptions {
  services: boolean;
}

export function mapStatus(status: string) {
  return CASE_STATUSES[status as keyof CaseStatus] ?? status;
}

function mapCaseData(thisCase: CaseResponse, options: MapCaseDataOptions = { services: false }): FormattedCase {
  const createdAt = dayjs(thisCase.createdAt);
  let lengthOfStay = dayjs().diff(createdAt, 'days');
  if (thisCase.status === 'discharged' && thisCase.dischargedAt) {
    lengthOfStay = dayjs(thisCase.dischargedAt).diff(createdAt, 'days');
  }
  if (lengthOfStay === 0) {
    lengthOfStay = 1;
  }

  const result: FormattedCase = {
    uuid: `C-${thisCase.id}`,
    ref: thisCase.ref,
    userRef: thisCase.user.ref,
    name: thisCase.user.name,
    age: dayjs().diff(thisCase.user.birthDate, 'years'),
    gender: thisCase.user.gender === 'M' ? 'Male' : 'Female',
    nric: censorNRIC(thisCase.user.nric),
    enrolmentDate: formatDate(thisCase.createdAt, 'dd MMM yyyy'),
    lengthOfStay,
    status: mapStatus(thisCase.status),
  };

  if (options.services) {
    result.services = mapServiceData(thisCase);
  }

  return result;
}

export default mapCaseData;
