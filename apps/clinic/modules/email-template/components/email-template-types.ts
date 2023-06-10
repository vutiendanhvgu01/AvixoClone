import { DefaultRecord } from 'share-components';

export type EmailTemplateType = 'invoice' | 'medical_certificate' | 'medical_record' | 'receipt' | 'referral';

export type EmailTemplateStatus = 'active' | 'inactive';

export type Recipient = {
  email: string;
};

export type EmailTemplateFormValues = {
  id?: number;
  uuid?: string;
  name: string;
  type: EmailTemplateType;
  to?: Recipient[];
  cc?: Recipient[];
  bcc?: Recipient[];
  subject: string;
  content: string;
  htmlContent?: string;
};

export interface EmailTemplate extends DefaultRecord {
  uuid: string;
  type: EmailTemplateType;
  status: EmailTemplateStatus;
  default?: boolean;
  name: string;
  subject: string;
  content: string;
  htmlContent: string;
}

export const EMAIL_TEMPLATE_PARAMS = ['{DATE}', '{MC_NO}', '{PATIENT_NAME}', '{DIAGNOSES}', '{NRIC_TYPE}', '{NRIC}'];
