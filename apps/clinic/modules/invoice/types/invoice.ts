import type { Patient } from 'modules/patient/types/patient';
import { DefaultRecord } from 'share-components';

export interface Money {
  currency: string;
  amount: number;
}
interface Invoice extends DefaultRecord {
  uuid: string;
  invoiceNumber: string;
  type: 'paid' | 'unpaid' | 'accrec';
  category?: any;
  segment?: any;
  subCategory?: any;
  origin?: any;
  source?: string;
  medium?: any;
  channel?: any;
  campaign?: any;
  status: 'approved' | 'submitted' | 'pending';
  billToSelf: boolean;
  payerId: number;
  patientId: number;
  patientUUID: string;
  policyId: number;
  lineTax: string;
  lineItems?: any;
  discountRate: string;
  discountType: string;
  discountAmount: Money;
  discountRemark?: any;
  subTotal: Money;
  totalTax: Money;
  total: Money;
  amountDue: Money;
  amountPaid: Money;
  amountCredited: Money;
  fullyPaidOn: string;
  templateId?: any;
  expectedPaymentDate: string;
  referenceNo: string;
  practitionerId?: any;
  premiseId?: any;
  organisationId?: any;
  visitId?: any;
  attributedTo?: any;
  managedBy?: any;
  authorisedBy?: any;
  serviceDate: string;
  issueDate: string;
  dueDate: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  patient?: Patient;
}

export interface InvoiceLink extends DefaultRecord {
  refersTo: number;
  linkType: string;
}

export interface InvoiceItem extends DefaultRecord {
  invoiceID: number;
  name: string;
  code: string;
  group: string;
  category: string;
  type: string;
  option: string;
  remarks: string;
  description?: string;
  quantity?: number;
  taxType: string;
  unitAmount?: Money;
  taxAmount?: Money;
  lineAmount?: Money;
  lineTotal?: Money;
  discountType?: string;
  discountRate?: string;
  discountAmount?: string;
  discountRemark?: string;
  accountCode?: string;
  isTrackedInventory?: boolean;
  links?: InvoiceLink[];
}

export type { Invoice };
