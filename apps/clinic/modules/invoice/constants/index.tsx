import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const INVOICE_MS_URL = `${publicRuntimeConfig.INVOICE_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const INVOICE_STATUS_COLOR: { [key: string]: 'secondary' | 'error' } = {
  unpaid: 'error',
  paid: 'secondary',
};

export const INVOICE_LIST_CLAIM_STATUS_TYPES = ['Approved', 'Submitted', 'Pending'];
export const INVOICE_CLAIM_STATUS_COLOR: { [key: string]: 'secondary' | 'default' | 'warning' } = {
  approved: 'secondary',
  submitted: 'default',
  pending: 'warning',
};

export const INVOICE_LIST_ACTIONS = {
  ADD_INVOICE: 'add-invoice',
  ADD_CREDIT_NOTE: 'add-credit-note',
  ADD_DEBIT_NOTE: 'add-debit-note',
  DELETE_INVOICE: 'delete-invoice',
  ADD_REFUND: 'add-refund',
};

export const CREDIT_DEBIT_NOTE_ACTIONS = {
  EDIT_REMARK: 'edit-remark',
  DELETE_REFURN: 'delete-refund',
  EDIT_GST_AMOUNT: 'edit-gst-amount',
  DELETE_ITEM: 'delete-item',
};

export const PRINT_MENU = [
  {
    label: 'Short Label',
    value: 'short-label',
  },
  {
    label: 'Record Label',
    value: 'record-label',
  },
  {
    label: 'Case Note Label',
    value: 'case-note-label',
  },
];

export const EMAIL_MENU = [
  {
    label: 'Invoice',
    value: 'invoice',
  },
  {
    label: 'Receipt',
    value: 'receipt',
  },
];

export const CREDIT_DEBIT_NOTE_LIST_TYPE = [
  {
    type: 'credit',
    list: ['Credit Notes', 'Deleted Credit Notes'],
  },
  {
    type: 'debit',
    list: ['Debit Notes', 'Deleted Debit Notes'],
  },
];
