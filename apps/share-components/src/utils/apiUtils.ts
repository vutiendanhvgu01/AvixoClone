import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, ApiResponse } from 'share-components/src';

const PARSE_INTEGER_FIELDS = [
  'id',
  'sequence',
  'itemId',
  'duration',
  'packSize',
  'patientId',
  'visitId',
  'premiseId',
  'organisationId',
  'recordOwnerId',
  'prescribedBy',
  'authoredBy',
  'verifiedBy',
  'createdBy',
  'referralTypeId',
  'id',
  'quantity',
  'practitionerId',
  'caseId',
  'doseQuantity',
  'requestedBy',
  'reportedBy',
  //   add more ...
];

export const forwardRequest = async <T = any>(
  req: NextApiRequest,
  res: NextApiResponse,
  request: Promise<ApiResponse<T>>,
) => {
  try {
    const { data } = await request;
    res.status(200).json(data);
  } catch (error: any) {
    const { originError } = error as ApiError;
    res?.status(originError?.status ?? 500).json(originError?.response?.data);
  }
};

export const responseSuccess = (res: ApiResponse<any>, message = '', titleMessage = '') => ({
  message: message || res?.data?.message,
  status: res?.originResponse?.status,
  data: res?.data,
  titleMessage,
});

/* 
    Value input always get type string
    This function will parse all fields of payload which located in PARSE_INTEGER_FIELDS to Integer
*/
export const parsePayloadFieldsToInteger = (bodyPrescription: any): Record<string, any> => {
  const payload = bodyPrescription;

  // eslint-disable-next-line consistent-return
  PARSE_INTEGER_FIELDS.forEach((integerField: string | Record<string, any> | Array<any>) => {
    if (payload[integerField as string]) {
      payload[integerField as string] = parseInt(payload[integerField as string], 10);
    }
    if (Array.isArray(payload)) {
      return payload.map(v => parsePayloadFieldsToInteger(v));
    }
    if (typeof payload === 'object') {
      return Object.keys(payload).reduce(
        (result, key) => ({
          ...result,
          ...parsePayloadFieldsToInteger(payload[key]),
        }),
        {},
      );
    }
  });
  return payload;
};
