import { useQuery } from '@tanstack/react-query';
import { GetPatientCountParams, PatientCountResponse } from 'modules/patient/api/patient-api-type';
import patientProxyService from 'modules/patient/api/patient-proxy';
import { DashboardStatsResponse, GetStatsParams } from '../api/dashboard-api-type';
import dashboardProxyService from '../api/dashboard-proxy';

type UseStateParams = {
  patientCountParams: GetPatientCountParams;
  statsParams: GetStatsParams;
};
type TData = DashboardStatsResponse & { patientCount: PatientCountResponse['count'] };
type UseQueryOptions = Parameters<typeof useQuery<TData>>[2];
const useStats = ({ patientCountParams, statsParams }: UseStateParams, options: UseQueryOptions = {}) =>
  useQuery(
    ['stats'],
    async () => {
      const promises = [
        patientProxyService.getPatientCount(patientCountParams),
        dashboardProxyService.getStats(statsParams),
      ] as const;
      const [
        {
          data: { count: patientCount },
        },
        {
          data: { appointmentsTotal, casesCompleted, casesOngoing },
        },
      ] = await Promise.all(promises);

      return {
        patientCount,
        appointmentsTotal,
        casesOngoing,
        casesCompleted,
      };
    },
    options,
  );

export default useStats;
