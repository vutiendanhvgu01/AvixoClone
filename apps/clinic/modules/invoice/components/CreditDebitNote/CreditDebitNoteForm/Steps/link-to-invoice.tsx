import { Autocomplete, Container, FormControl, RadioGroup, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { invoicesMockData } from 'modules/invoice/components/mockData';
import { useCallback } from 'react';
import { AvixoPatientAutoComplete, FormBody } from 'share-components';
import { CreditDebitNoteFormValues } from '../credit-debit-note-form-types';
import InvoiceItemRadio from './invoice-item-radio';

const CreditNoteLinkToInvoice: React.FC = () => {
  const { values, getFieldProps, setFieldValue } = useFormikContext<CreditDebitNoteFormValues>();

  const onSelectInvoice = useCallback((_: React.ChangeEvent<HTMLInputElement>, invoiceId: string) => {
    const selectedInvoice = invoicesMockData.find(invoice => invoice.id.toString() === invoiceId);
    setFieldValue('invoice', selectedInvoice);
  }, []);

  return (
    <FormBody>
      <Container sx={{ padding: '0 0 20px 0' }}>
        <Typography variant="h6" sx={{ mb: 3.5 }} color="black.dark">
          2. Link to Invoice
        </Typography>
        {values.customerType?.value === 1 ? (
          <FormControl fullWidth>
            <AvixoPatientAutoComplete
              disableClearable
              options={[
                { label: 'Patient 1', value: '1', nric: 'S1234567D' },
                { label: 'Patient 2', value: '2', nric: 'S1236512H' },
              ]}
              disabled
              value={values.patient}
            />
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <Autocomplete
              disableClearable
              options={[
                { label: 'Cigna International Health Insurance', value: 1 },
                { label: 'Prudential Singapore', value: 2 },
              ]}
              value={values.insurance}
              disabled
              renderInput={params => (
                <TextField {...params} {...getFieldProps('insurance')} required disabled label="Select Insurance" />
              )}
            />
          </FormControl>
        )}
        <Typography variant="overline">Select Issued Invoice</Typography>
        <RadioGroup name="invoiceId" onChange={onSelectInvoice} value={values.invoice?.id?.toString()}>
          {invoicesMockData.map(invoice => (
            <InvoiceItemRadio key={invoice.id} invoice={invoice} />
          ))}
        </RadioGroup>
      </Container>
    </FormBody>
  );
};
export default CreditNoteLinkToInvoice;
