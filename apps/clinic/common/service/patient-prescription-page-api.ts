import omit from 'lodash/omit';
import NEHRApiService from 'modules/nehr-connector/services';
import { PrescriptionValues, InstructionTypes } from 'modules/prescription/components/PrescriptionForm/types';
import PrescriptionApiService from 'modules/prescription/service';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const patientPrescriptionPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const prescriptionService = new PrescriptionApiService({}, ctx);

  try {
    switch (action) {
      // this action to create an prescription or an item in the prescription
      case 'create-prescription': {
        const { addFromName, prescriptionId, ...payloadPrescription } = restBody;
        let payload: Record<string, any> = {};

        // create an item
        const addFromPayloadPayload: Record<string, any> = payloadPrescription;
        if (prescriptionId) {
          payload = parsePayloadFieldsToInteger({
            ...addFromPayloadPayload[addFromName],
            instructions: addFromPayloadPayload?.instructions,
          });
          const createItemRes = await prescriptionService.createPrescriptionItem(
            prescriptionId,
            payload as PrescriptionValues,
          );
          return responseSuccess(createItemRes, undefined, 'New Item');
        }
        // create an prescription ( include one item)
        if (addFromPayloadPayload[addFromName]) {
          payload = {
            ...addFromPayloadPayload,
            items: [{ ...addFromPayloadPayload[addFromName], instructions: addFromPayloadPayload?.instructions }],
          };
          delete payload[addFromName];
          delete payload?.instructions;
        }

        const createPrescriptionRes = await prescriptionService.createPrescription(
          parsePayloadFieldsToInteger({ ...payload }) as PrescriptionValues,
        );
        return responseSuccess(createPrescriptionRes);
      }
      case 'delete-prescription': {
        const prescriptionId = restBody.id;
        const deletePrescriptionRes = await prescriptionService.deletePrescription(prescriptionId);
        const nehrService = new NEHRApiService({}, ctx);
        nehrService.deleteRelatedPrescription(prescriptionId).catch(e => {
          console.error('Error when calling nehr service for prescription deletation', e);
        });
        return responseSuccess(deletePrescriptionRes);
      }
      case 'delete-item-prescription': {
        const { prescriptionId, id } = restBody;
        const deleteItemPrescription = await prescriptionService.deleteItemPrescription(prescriptionId, id);
        const nehrService = new NEHRApiService({}, ctx);
        nehrService.deleteRelatedPrescriptionItem(prescriptionId, id).catch(e => {
          console.error("Error when calling nehr service for prescription's item deletation", e);
        });
        return responseSuccess(deleteItemPrescription, undefined, restBody.nameItem ?? '');
      }
      case 'update-prescription': {
        const { addFromName, prescriptionId, itemId, deleteInstructions, ...payloadPrescription } = restBody;
        let payload: Record<string, any> = {};

        const addFromPayloadPayload: Record<string, any> = payloadPrescription;
        payload = parsePayloadFieldsToInteger({
          ...addFromPayloadPayload[addFromName],
          instructions: addFromPayloadPayload?.instructions,
        });
        const updateItemRes = await prescriptionService.updatePrescriptionItem(
          prescriptionId,
          itemId,
          payload as PrescriptionValues,
        );
        // update instruction
        if (Array.isArray(payload?.instructions) && payload?.instructions.length > 0) {
          await Promise.allSettled(
            payload?.instructions
              .filter((instruction: InstructionTypes) => !!instruction?.id)
              .map((editInstruction: InstructionTypes & { id: string | number }) =>
                prescriptionService.updateInstruction(
                  prescriptionId,
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
              prescriptionService.deleteInstruction(prescriptionId, itemId, instructionId),
            ),
          );
        }
        return responseSuccess(updateItemRes, 'Changes have been successfully saved');
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
export default patientPrescriptionPageApiServer;
