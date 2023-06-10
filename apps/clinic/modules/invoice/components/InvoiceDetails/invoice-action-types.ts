export type InvoiceActionType =
  | 'add-service'
  | 'add-medicine'
  | 'add-package'
  | 'select-tier'
  | 'add-payment'
  | 'edit-payment'
  | 'delete-payment'
  | 'edit-payment-date'
  | 'add-signature'
  | 'add-remark'
  | 'edit-total-payment-amount'
  | 'edit-invoice-date'
  | 'add-refund'
  | '';

export interface InvoiceActionProps {
  action: InvoiceActionType;
}
