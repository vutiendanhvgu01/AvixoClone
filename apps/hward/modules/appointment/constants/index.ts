// eslint-disable-next-line import/prefer-default-export
export const SERVICES = ['Doctor House Call', 'Nurse House Call', 'Ambulance', 'Medication Delivery'] as const;
export type ServiceUnion = (typeof SERVICES)[number];

export const MAPPED_SERVICE_FIELDS: Record<string, ServiceUnion[]> = {
  orderRequest: ['Doctor House Call', 'Nurse House Call', 'Medication Delivery'],
  additionalComments: ['Doctor House Call', 'Nurse House Call', 'Ambulance'],
};
