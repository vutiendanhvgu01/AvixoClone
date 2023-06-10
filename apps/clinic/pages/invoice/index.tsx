/*
  This is a page template for:
  - /invoice
    queryParams: tab, action
*/

import { AvixoTabData, AvixoTabs } from 'share-components';
import { Box, Paper } from '@mui/material';
import InvoicesListTab from 'modules/invoice/components/InvoiceList/invoice-list-tab';
import type { Invoice } from 'modules/invoice/types/invoice';
import InvoiceListHeader from 'modules/invoice/components/InvoiceList/invoice-list-header';
import InvoiceApiService from 'modules/invoice/services';
import PatientApiService from 'modules/patient/services';

import dynamic from 'next/dynamic';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import { handle, redirect } from 'next-runtime';
import InvoicePageApi from 'common/service/invoice-page-api';
import CreditDebitNoteListTab from 'modules/invoice/components/CreditDebitNoteList/credit-debit-note-list-tab';

const InvoiceListAction = dynamic(() => import('modules/invoice/components/InvoiceList/invoice-list-action'), {
  ssr: false,
});

interface InvoicePageProps {
  invoices: Invoice[];
  activeTab: number;
}

const Tabs = (invoices: Invoice[]): AvixoTabData[] => [
  { label: 'All Invoices', url: PAGE_URLS.INVOICE(), component: <InvoicesListTab invoices={invoices} /> },
  {
    label: 'Detailed Summary',
    url: `${PAGE_URLS.INVOICE()}?tab=detailed-summary`,
    component: <div>Detailed Summary</div>,
  },
  { label: 'Quotation', url: PAGE_URLS.INVOICE('quotation'), component: <div>Quotation</div> },
  { label: 'Group Invoices', url: PAGE_URLS.INVOICE('group-invoice'), component: <div>Group Invoices</div> },
  { label: 'Packages', url: PAGE_URLS.INVOICE('packages'), component: <div>Packages</div> },
  {
    label: 'Credit Note',
    url: PAGE_URLS.INVOICE('credit-note'), // call API creditNote data into itemNote
    component: <CreditDebitNoteListTab itemNote={[]} type="credit" />,
  },
  {
    label: 'Debit Note',
    url: PAGE_URLS.INVOICE('debit-note'), // call API debitNote data into itemNote
    component: <CreditDebitNoteListTab itemNote={[]} type="debit" />,
  },
  {
    label: 'Deleted Invoices',
    url: PAGE_URLS.INVOICE('deleted-invoice'),
    component: <div>Deleted Invoices</div>,
  },
];

const InvoicePage: React.FC<InvoicePageProps> = ({ invoices, activeTab }) => (
  <Box>
    <InvoiceListHeader />
    <Paper sx={{ py: 1 }}>
      <AvixoTabs defaultActiveTab={activeTab} tabsData={Tabs(invoices)} />
    </Paper>
    <InvoiceListAction />
  </Box>
);

const TABS = ['', 'detailed-summary', 'quotation', 'group-invoice', 'packages', 'credit-note', 'debit-note'];

export const getServerSideProps = handle({
  async get(ctx) {
    const { tab, offset, limit } = ctx.query;
    const pageProps = {} as InvoicePageProps;
    const tabIndex = TABS.indexOf(tab as string);
    pageProps.activeTab = tabIndex > -1 ? tabIndex : 0;

    try {
      const invoiceApiService = new InvoiceApiService({}, ctx);

      const { data: invoices } = await invoiceApiService.getInvoices({
        offset,
        limit,
      });
      pageProps.invoices = invoices;
      if (invoices.length > 0) {
        const patientApiService = new PatientApiService({}, ctx);

        await Promise.all(
          invoices.map(async (invoice: Invoice, index: number) => {
            invoices[index].patient = (await patientApiService.getPatientDetails(invoice.patientId, 'id')).data;
          }),
        );
      }
      return {
        props: {
          ...pageProps,
        },
      };
    } catch {
      return {
        props: {
          ...pageProps,
          invoices: [],
        },
      };
    }
  },
  async post(ctx) {
    const response = await InvoicePageApi(ctx);
    let message = 'Fail to create';

    if (response?.status === 201) {
      message = 'has been successfully create invoice';
    }
    return redirect(`${ROUTES.INVOICE}?message=${message}&titleMessage=New Invoice`);
  },
});

export default InvoicePage;
