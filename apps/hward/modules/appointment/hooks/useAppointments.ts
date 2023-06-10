import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AppointmentsRequest } from 'modules/appointment/api/appointment-api-type';
import AppointmentProxy from 'modules/appointment/api/appointment-proxy';
import mapAppointments from 'modules/appointment/utils/mapAppointments';
import type { MapAppointments } from 'modules/appointment/utils/mapAppointments';

type TData = MapAppointments;

const useAppointments = (
  params: AppointmentsRequest,
  options: UseInfiniteQueryOptions<TData, unknown, TData> = {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    keepPreviousData: true,
  },
) => {
  const modifiedParams: AppointmentsRequest = { ...params };
  if (!modifiedParams.search) modifiedParams.search = undefined;

  return useInfiniteQuery({
    queryKey: ['appointments', modifiedParams],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await AppointmentProxy.getServices({ ...modifiedParams, page: pageParam });

      return mapAppointments(data);
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedAppointmentsCount = allPages.map(p => p.appointments.length).reduce((acc, cur) => acc + cur, 0);
      if (loadedAppointmentsCount < lastPage.appointmentTotal) {
        return allPages.length + 1;
      }

      return undefined;
    },
    ...options,
  });
};

export default useAppointments;
