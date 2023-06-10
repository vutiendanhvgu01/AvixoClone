import React, { FC, useCallback } from 'react';
import { Grid } from '@mui/material';
import { AvixoSearchBar, AvixoTable } from 'share-components';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import InvoicesListDateRangePicker from 'modules/invoice/components/InvoiceList/invoice-list-date-range-picker';
import CreditDebitNoteFilter from 'modules/invoice/components/CreditDebitNoteList/credit-debit-note-filter';
import { CREDIT_DEBIT_NOTE_LIST_TYPE } from 'modules/invoice/constants';
import CreditDebitNoteTableColumns from 'modules/invoice/components/CreditDebitNoteList/credit-debit-note-table-columns';
import { CreditNote } from 'modules/invoice/components/CreditDebitNote/credit-note-types';
import { DebitNote } from 'modules/invoice/components/CreditDebitNote/debit-note-types';
import { Invoice } from '../../types/invoice';

interface CreditDebitNoteListProps {
  itemNote: CreditNote[] | DebitNote[];
  type: 'credit' | 'debit';
}

const CreditDebitNoteListTab: FC<CreditDebitNoteListProps> = ({ itemNote, type }) => {
  const router = useRouter();

  const onRowClick = useCallback(
    (invoice: Invoice) => {
      router.push(PAGE_URLS.PATIENT_INVOICE_DETAILS(invoice.patient?.uuid || '', invoice.uuid));
    },
    [router],
  );

  return (
    <Box py={1}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <CreditDebitNoteFilter
                listStatus={
                  type === 'credit' ? CREDIT_DEBIT_NOTE_LIST_TYPE[0].list : CREDIT_DEBIT_NOTE_LIST_TYPE[1].list
                }
              />
            </Grid>
            <Grid item md={6}>
              <InvoicesListDateRangePicker onDateRangeSelected={() => {}} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <AvixoSearchBar placeholder="Type patient name here..." />
        </Grid>
      </Grid>
      <Box mx={-3} mt={-2}>
        <AvixoTable
          columns={CreditDebitNoteTableColumns}
          onRowClick={onRowClick}
          data={{ records: itemNote }}
          primaryKey="id"
          emptyText="No invoice have been created."
          mode="offline"
          hasCheckBoxHeader={false}
        />
      </Box>
    </Box>
  );
};

export default CreditDebitNoteListTab;
