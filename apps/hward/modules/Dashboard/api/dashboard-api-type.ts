import { ApiResponse } from 'share-components';

interface DashboardStatsResponse {
  appointmentsTotal: number;
  casesOngoing: number;
  casesCompleted: number;
}

type GetStatsParams = { country: string; businessRef: string };

type GetStatsReturnType = Promise<ApiResponse<DashboardStatsResponse>>;

export { type DashboardStatsResponse, type GetStatsParams, type GetStatsReturnType };
