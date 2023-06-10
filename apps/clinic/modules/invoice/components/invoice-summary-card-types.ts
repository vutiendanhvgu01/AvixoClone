import { Patient } from 'modules/patient/types/patient';
import { DefaultRecord } from 'share-components';

export interface Money {
  currency: string;
  amount: number;
}
export interface Invoice extends DefaultRecord {
  uuid: string;
  status?: string;
  customerId?: number;
  visitId?: number;
  premiseId?: number;
  paymentStatus: 'Outstanding' | 'Paid';
  organisationId?: number;
  subtotal?: Money;
  total: Money;
  invoiceId: string;
  patient?: Patient;
}

interface InvoiceSummaryProps {
  invoices: Invoice[];
}

export default InvoiceSummaryProps;
