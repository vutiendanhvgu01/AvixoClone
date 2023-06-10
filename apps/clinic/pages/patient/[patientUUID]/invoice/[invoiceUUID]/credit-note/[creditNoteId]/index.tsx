import { Grid } from '@mui/material';
import CreditAmountCard from 'modules/invoice/components/CreditDebitNote/CreditDebitAmount/amount-card';
import ItemList from 'modules/invoice/components/CreditDebitNote/ItemsList/items-list';
import Layout from 'modules/invoice/components/CreditDebitNote/Layout/credit-debit-note-layout';
import RemarkCard from 'modules/invoice/components/CreditDebitNote/Remark/remark-card';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import type { Invoice } from 'modules/invoice/types/invoice';
import { creditNoteMockData, invoicesMockData } from 'modules/invoice/components/mockData';
import { CreditNote } from 'modules/invoice/components/CreditDebitNote/credit-note-types';

interface CreditNotePageProps {
  patient: Patient;
  invoice: Invoice;
  creditNote: CreditNote;
  params: {
    action: string;
  };
}

const CreditNotePage: React.FC<CreditNotePageProps> = ({
  patient,
  invoice = invoicesMockData[0],
  creditNote = creditNoteMockData,
}) => (
  <Layout patient={patient} invoice={invoice} title={`CR-${creditNote.creditNoteId}`}>
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <ItemList items={[]} />
      </Grid>
      <Grid item md={6}>
        <RemarkCard />
      </Grid>
      <Grid item md={6}>
        <CreditAmountCard />
      </Grid>
    </Grid>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, action } = ctx.query;
  const pageProps = {} as CreditNotePageProps;

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

export default CreditNotePage;
