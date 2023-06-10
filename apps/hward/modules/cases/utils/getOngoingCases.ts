import { CasesResponse } from '../api/case-type';
import { CaseStatusKey } from '../components/cases-types';
import mapCaseData from './mapCaseData';

const getOngoingCases = (data: CasesResponse) => {
  const ongoingCases = data?.cases?.filter(c => (['onboarded', 'active'] as CaseStatusKey[]).includes(c.status));
  return ongoingCases?.map(thisCase => mapCaseData(thisCase));
};

export default getOngoingCases;
