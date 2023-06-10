import { formatISO } from 'date-fns';
import AppointmentApiService from 'modules/appointment/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const appointmentPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const appointmentApiService = new AppointmentApiService({}, ctx);

  try {
    switch (action) {
      case 'add-appointment': {
        const modelData = {
          ...restBody,
          // BE is required appointmentId, so we will hard code at here
          appointmentId: 'appointment-friendly-id',
          startTime: formatISO(new Date(restBody.startTime)),
        };
        const createAppointment = await appointmentApiService.createAppointment(parsePayloadFieldsToInteger(modelData));
        return responseSuccess(createAppointment, `has been successfully added`, `new appointment`);
      }
      case 'edit-appointment': {
        if (restBody?.id) {
          const modelData = {
            ...restBody,
            // BE is required appointmentId, so we will hard code at here
            appointmentId: 'appointment-friendly-id',
            startTime: formatISO(new Date(restBody.startTime)),
          };

          const updateAppointment = await appointmentApiService.updateAppointment(
            restBody?.id,
            parsePayloadFieldsToInteger(modelData),
          );
          return responseSuccess(updateAppointment, `Your changes have been successfully saved.`);
        }
        break;
      }
      case 'delete-appointment': {
        if (restBody?.id) {
          const deleteAppointment = await appointmentApiService.deleteAppointment(restBody?.id);

          return responseSuccess(
            deleteAppointment,
            ` appointment has been successfully deleted.`,
            encodeURI(`${restBody?.patientName}’s`),
          );
        }
        break;
      }
      default:
        break;
    }
  } catch (error: any) {
    console.log(error);
    return {
      message: error?.message,
      titleMessage: 'Failed',
      status: error?.originError?.response?.status,
    };
  }
  return {
    message: '',
    status: '',
    data: null,
  };
};
export default appointmentPageApiServer;
