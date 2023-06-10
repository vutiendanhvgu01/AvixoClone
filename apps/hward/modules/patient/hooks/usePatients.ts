import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import patientProxyService from '../api/patient-proxy';
import { GetPatientsParams } from '../api/patient-api-type';
import mapPatientsData, { FormattedPatientData } from '../utils/mapPatientsData';

type TData = {
  patients: FormattedPatientData[];
  nextPageAvailable: boolean;
  totalPatients: number;
};

const usePatients = (
  params: Omit<GetPatientsParams, 'page'>,
  options: UseInfiniteQueryOptions<TData, unknown, TData> = {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    keepPreviousData: true,
  },
) => {
  const modifiedParams: GetPatientsParams = { ...params };
  if (!modifiedParams.search) modifiedParams.search = undefined;

  return useInfiniteQuery({
    queryKey: ['patients', params],
    queryFn: async ({ pageParam = 1 }) => {
      const {
        data: { patients: _patients, nextPageAvailable, totalPatients },
      } = await patientProxyService.getPatients({
        ...params,
        page: pageParam,
      });

      return {
        patients: mapPatientsData(_patients),
        nextPageAvailable,
        totalPatients,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nextPageAvailable) {
        return allPages.length + 1;
      }

      return undefined;
    },
    ...options,
  });
};

export default usePatients;
