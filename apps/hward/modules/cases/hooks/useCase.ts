import { useQuery } from '@tanstack/react-query';
import { FormattedCase } from '../components/cases-types';
import { GetCaseParams } from '../services/shared';
import caseProxyService from '../services/proxy';
import mapCaseData, { MapCaseDataOptions } from '../utils/mapCaseData';

type UseQueryOptions = Parameters<typeof useQuery<FormattedCase>>[2];
type Params = GetCaseParams & { id: string };
const useCase = (
  params: Params,
  mapCaseDataOptions: MapCaseDataOptions = { services: false },
  options: UseQueryOptions = { refetchInterval: false },
) =>
  useQuery(
    ['case', params],
    async () => {
      const paramsWithoutId: Omit<Params, 'id'> = { businessRef: params.businessRef, country: params.country };
      const { data } = await caseProxyService.getCaseDetails(params.id, paramsWithoutId);
      return mapCaseData(data, mapCaseDataOptions);
    },
    options,
  );

export default useCase;
