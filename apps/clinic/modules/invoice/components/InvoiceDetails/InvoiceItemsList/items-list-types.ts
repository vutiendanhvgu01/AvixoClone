interface Currency {
  amount: string;
  currency: string;
}

export interface InvoiceItem {
  code: string;
  name: string;
  type: string;
  quantity: string;
  lineAmount: Currency;
  lineTotal: Currency;
  discountAmount: Currency;
}

export interface InvoiceItemListProps {
  dataList: InvoiceItem[];
}
