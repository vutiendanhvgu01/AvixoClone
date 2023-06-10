import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { FormattedCase } from '../components/cases-types';
import caseProxyService from '../services/proxy';
import { GetCasesParams } from '../services/shared';
import getOngoingCases from '../utils/getOngoingCases';

type TData = {
  cases: FormattedCase[];
  total: number;
};

const useCases = (
  params: Omit<GetCasesParams, 'page'>,
  options: UseInfiniteQueryOptions<TData, unknown, TData> = {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    keepPreviousData: true,
  },
) => {
  const modifiedParams: GetCasesParams = { ...params };
  if (!modifiedParams.search) modifiedParams.search = undefined;

  return useInfiniteQuery({
    queryKey: ['cases', modifiedParams],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await caseProxyService.getCases({ ...modifiedParams, page: pageParam });

      return {
        cases: getOngoingCases(data),
        total: data.total,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedCasesCount = allPages.map(p => p.cases.length).reduce((acc, cur) => acc + cur, 0);
      if (loadedCasesCount < lastPage.total) {
        return allPages.length + 1;
      }

      return undefined;
    },
    ...options,
  });
};

export default useCases;
