import { useQuery } from '@tanstack/react-query';
import CaseApiService from '../services';
import { GetPatientCasesParams } from '../services/shared';
import caseProxyService from '../services/proxy';

type TData = typeof useQuery<Awaited<ReturnType<CaseApiService['getPatientCases']>>['data']>;
type UseQueryOptions = Parameters<TData>[2];
const usePatientCases = (
  params: GetPatientCasesParams,
  options: UseQueryOptions = { refetchInterval: false, refetchOnWindowFocus: false, refetchOnMount: true },
) =>
  useQuery(
    ['patientCases', params],
    async () => {
      const { data } = await caseProxyService.getPatientCases(params);
      return data;
    },
    options,
  );

export default usePatientCases;
