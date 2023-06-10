import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenericResponse } from 'common/constants/types';
import { ApiResponse } from 'share-components';
import appointmentProxyService from '../api/appointment-proxy';
import { AppointmentFormValues } from '../components/appointment-types';

type UseCreateAppointmentOptions = UseMutationOptions<
  ApiResponse<GenericResponse>,
  GenericResponse,
  AppointmentFormValues,
  unknown
>;

const createAppointment = async (caseRef: string, body: AppointmentFormValues) =>
  appointmentProxyService.createDraftService(caseRef, body);

function useCreateAppointment(caseRef: string, options: UseCreateAppointmentOptions) {
  return useMutation(async variables => createAppointment(caseRef, variables), options);
}

export default useCreateAppointment;
