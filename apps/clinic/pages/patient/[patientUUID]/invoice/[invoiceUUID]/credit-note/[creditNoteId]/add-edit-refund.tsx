import { Button, Grid } from '@mui/material';
import ItemList from 'modules/invoice/components/CreditDebitNote/ItemsList/items-list';
import CreditNoteLayout from 'modules/invoice/components/CreditDebitNote/Layout/credit-debit-note-layout';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import type { Invoice } from 'modules/invoice/types/invoice';
import { creditNoteMockData, invoicesMockData } from 'modules/invoice/components/mockData';
import CreditAmountRefundForm from 'modules/invoice/components/CreditDebitNote/CreditDebitAmount/refund-form';
import { EditSquareIcon, OutlinedPrintIcon } from 'share-components';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import type { CreditNote } from 'modules/invoice/components/CreditDebitNote/credit-note-types';

interface AddEditRefundPageProps {
  patient: Patient;
  invoice: Invoice;
  creditNote: CreditNote;
  params: {
    action: string;
  };
}

const AddEditRefundPage: React.FC<AddEditRefundPageProps> = ({
  patient,
  invoice = invoicesMockData[0],
  creditNote = creditNoteMockData,
}) => (
  <CreditNoteLayout
    patient={patient}
    invoice={invoice}
    title={`CR-${creditNote.creditNoteId}`}
    actionButtons={
      <>
        <Link href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE(patient.uuid, invoice.uuid, creditNote.id, 'print')}>
          <Button startIcon={<OutlinedPrintIcon />} color="whiteLight">
            Print
          </Button>
        </Link>
        <Button startIcon={<EditSquareIcon />}>Submit Refund</Button>
      </>
    }
  >
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <ItemList items={[]} />
      </Grid>
      <Grid item lg={4}>
        {/* */}
      </Grid>
      <Grid item xs={12} lg={8}>
        <CreditAmountRefundForm initData={{ refunds: [] }} />
      </Grid>
    </Grid>
  </CreditNoteLayout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, action } = ctx.query;
  const pageProps = {} as AddEditRefundPageProps;

  if (patientUUID) {
    try {
      const patientService = new PatientApiService({}, ctx);
      const { data } = await patientService.getPatientDetails(patientUUID as string);
      pageProps.patient = data;

      return {
        props: {
          ...pageProps,
          params: {
            action: (action as string) || '',
          },
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

export default AddEditRefundPage;
