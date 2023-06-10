import PrescriptionApiService from 'modules/prescription/service';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import PatientApiService from 'modules/patient/services';
import InvoiceApiService from 'modules/invoice/services';
import { SUCCESS_STATUSES } from 'share-components/src/constants';
import { parsePayloadFieldsToInteger } from 'share-components';
import DispenseApiService from 'modules/dispense/services';
import { InstructionTypes, PrescriptionValues } from 'modules/prescription/components/PrescriptionForm/types';
import { omit } from 'lodash';
import { DISPENSE_DETAILS_ACTION } from 'modules/dispense/constants';
import NEHRConnectorApiService from 'modules/nehr-connector/services';

const patientDispensePageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
  patientUUID: string,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, dispenseUUID, ...restBody } = body;
  const patientService = new PatientApiService({}, ctx);
  const dispenseService = new DispenseApiService({}, ctx);

  try {
    switch (action) {
      // this action to start invoice
      case 'start-invoicing': {
        const patient = (await patientService.getPatientDetails(patientUUID.toString())).data;

        const prescriptionService = new PrescriptionApiService({}, ctx);
        const prescription = (await prescriptionService.getPrescriptionDetail(dispenseUUID, 'uuid')).data;

        const invoiceService = new InvoiceApiService({}, ctx);
        const response = await invoiceService.createNewPatientInvoice({
          patientId: patient.id,
          premiseId: prescription.premiseId,
        });
        if (SUCCESS_STATUSES.includes(response.originResponse.status)) {
          return responseSuccess(response, 'have been successfully start invoice', 'start invoice');
        }
        return responseSuccess(response);
      }
      case 'create-dispense-item': {
        const { data: dispense } = await dispenseService.getDispenseDetail(dispenseUUID, 'uuid');
        if (dispense) {
          const { addFromName, ...dispensePayload } = restBody;
          let payload: Record<string, any> = {};

          // create an item
          const addFromPayloadPayload: Record<string, any> = dispensePayload;
          payload = parsePayloadFieldsToInteger({
            uuid: dispenseUUID,
            ...addFromPayloadPayload[addFromName],
            instructions: addFromPayloadPayload?.instructions,
          });
          const createItemRes = await dispenseService.createDispenseItem(dispense.id, payload);
          return responseSuccess(createItemRes, undefined, 'New Item');
        }
        return {
          notFound: true,
        };
      }

      case 'delete-dispense-item': {
        const deleteDispenseItem = await dispenseService.deleteDispenseItem(restBody.dispenseId, restBody.id);
        return responseSuccess(deleteDispenseItem, 'successfully deleted', restBody.nameItem ?? '');
      }

      case 'update-dispense-item': {
        const { addFromName, dispenseId, itemId, deleteInstructions, ...payloadPrescription } = restBody;
        let payload: Record<string, any> = {};

        const addFromPayloadPayload: Record<string, any> = payloadPrescription;
        payload = parsePayloadFieldsToInteger({
          ...addFromPayloadPayload[addFromName],
          instructions: addFromPayloadPayload?.instructions,
        });

        const updateItemRes = await dispenseService.updateDispenseItem(
          dispenseId,
          itemId,
          payload as PrescriptionValues,
        );

        // update instruction
        if (Array.isArray(payload?.instructions) && payload?.instructions.length > 0) {
          await Promise.allSettled(
            payload?.instructions
              .filter((instruction: InstructionTypes) => !!instruction?.id)
              .map((editInstruction: InstructionTypes & { id: string | number }) =>
                dispenseService.updateInstruction(
                  dispenseId,
                  itemId,
                  editInstruction.id,
                  omit(editInstruction, ['id']) as InstructionTypes,
                ),
              ),
          );
        }
        // delete instruction
        if (Array.isArray(deleteInstructions) && deleteInstructions.length > 0) {
          await Promise.allSettled(
            deleteInstructions.map((instructionId: number | string) =>
              dispenseService.deleteInstruction(dispenseId, itemId, instructionId),
            ),
          );
        }
        return responseSuccess(updateItemRes, 'Changes have been successfully saved');
      }

      case DISPENSE_DETAILS_ACTION.DELETE_DISPENSE: {
        const dispenseId = restBody.id;
        const deleteRes = await dispenseService.deleteDispense(dispenseId);
        const nehrService = new NEHRConnectorApiService({}, ctx);
        nehrService.deleteRelatedDispense(dispenseId).catch(e => {
          console.error('Error when calling nehr service for dispense deletation', e);
        });
        return responseSuccess(deleteRes);
      }
      default:
        break;
    }
  } catch (error: any) {
    return {
      message: error?.message,
      status: error?.originError?.response?.status,
    };
  }

  return {
    message: '',
    status: '',
    data: null,
  };
};
export default patientDispensePageApiServer;
