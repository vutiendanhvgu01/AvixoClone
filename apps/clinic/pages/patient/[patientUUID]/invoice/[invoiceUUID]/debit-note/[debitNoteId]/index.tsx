import { Button, Grid } from '@mui/material';
import AmountCard from 'modules/invoice/components/CreditDebitNote/CreditDebitAmount/amount-card';
import ItemList from 'modules/invoice/components/CreditDebitNote/ItemsList/items-list';
import Layout from 'modules/invoice/components/CreditDebitNote/Layout/credit-debit-note-layout';
import RemarkCard from 'modules/invoice/components/CreditDebitNote/Remark/remark-card';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import type { Invoice } from 'modules/invoice/types/invoice';
import { debitNoteMockData, invoicesMockData } from 'modules/invoice/components/mockData';
import { DebitNote } from 'modules/invoice/components/CreditDebitNote/debit-note-types';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { EditSquareIcon, OutlinedPrintIcon } from 'share-components';

interface DebitNotePageProps {
  patient: Patient;
  invoice: Invoice;
  debitNote: DebitNote;
  params: {
    action: string;
  };
}

const DebitNotePage: React.FC<DebitNotePageProps> = ({
  patient,
  invoice = invoicesMockData[0],
  debitNote = debitNoteMockData,
}) => (
  <Layout
    patient={patient}
    invoice={invoice}
    title={`DB-${debitNote.debitNoteId}`}
    actionButtons={
      <>
        <Link href={PAGE_URLS.PATIENT_INVOICE_DEBIT_NOTE(patient.uuid, invoice.uuid, debitNote.id, 'print')}>
          <Button startIcon={<OutlinedPrintIcon />} color="whiteLight">
            Print
          </Button>
        </Link>
        <Link href={PAGE_URLS.PATIENT_INVOICE_DEBIT_NOTE(patient.uuid, invoice.uuid, debitNote.id, 'add-edit-refund')}>
          <Button startIcon={<EditSquareIcon />} color="whiteLight">
            Add/Edit Refund
          </Button>
        </Link>
        <Button startIcon={<EditSquareIcon />}>Finalise Credit</Button>
      </>
    }
  >
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <ItemList items={[]} />
      </Grid>
      <Grid item md={6}>
        <RemarkCard />
      </Grid>
      <Grid item md={6}>
        <AmountCard />
      </Grid>
    </Grid>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, action } = ctx.query;
  const pageProps = {} as DebitNotePageProps;

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

export default DebitNotePage;
