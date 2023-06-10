import { useQuery } from '@tanstack/react-query';
import { GetPatientParams } from '../api/patient-api-type';
import mapPatientData from '../utils/mapPatientData';
import patientProxyService from '../api/patient-proxy';

type TData = typeof useQuery<ReturnType<typeof mapPatientData>>;
type UseQueryOptions = Parameters<TData>[2];
const usePatient = (
  params: GetPatientParams,
  options: UseQueryOptions = { refetchOnWindowFocus: false, refetchInterval: false, refetchOnMount: false },
) =>
  useQuery(
    ['patient', params],
    async () => {
      const {
        data: { patient },
      } = await patientProxyService.getPatient(params);
      return mapPatientData(patient);
    },
    options,
  );

export default usePatient;
