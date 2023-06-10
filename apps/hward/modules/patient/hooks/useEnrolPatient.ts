import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { CreatePatientErrorResponse, CreatePatientResponse } from '../api/patient-api-type';
import { PatientFormValues } from '../components/patient-types';

type PossibleResponse = CreatePatientResponse | CreatePatientErrorResponse;

const enrolPatient = async (values: PatientFormValues) => {
  const response = await fetch('/api/patients', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = (await response.json()) as PossibleResponse;

  return data;
};

/**
 *
 * @param location Determines which query to be invalidated
 * @returns useMutation fn
 */
const useEnrolPatient = (
  options: UseMutationOptions<PossibleResponse, CreatePatientErrorResponse, PatientFormValues>,
) => useMutation<PossibleResponse, CreatePatientErrorResponse, PatientFormValues>(enrolPatient, options);

export default useEnrolPatient;
