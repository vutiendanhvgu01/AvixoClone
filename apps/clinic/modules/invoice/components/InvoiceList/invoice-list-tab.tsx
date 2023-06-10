import React, { FC, useCallback } from 'react';
import { Grid } from '@mui/material';
import { AvixoSearchBar, AvixoTable } from 'share-components';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { Invoice } from '../../types/invoice';
import InvoicesListForm from './invoice-list-filter';
import InvoicesListDateRangePicker from './invoice-list-date-range-picker';
import INVOICES_TABLE_COLUMNS from './invoices-table-columns';

interface InvoicesListProps {
  invoices: Invoice[];
}

const InvoicesListTab: FC<InvoicesListProps> = ({ invoices }) => {
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
              <InvoicesListDateRangePicker onDateRangeSelected={() => {}} />
            </Grid>
            <Grid item md={6}>
              <InvoicesListForm onFilterSelected={() => {}} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <AvixoSearchBar placeholder="Type patient name here..." />
        </Grid>
      </Grid>
      <Box mx={-3} mt={-2}>
        <AvixoTable
          columns={INVOICES_TABLE_COLUMNS}
          onRowClick={onRowClick}
          data={{ records: invoices }}
          primaryKey="id"
          emptyText="No invoice have been created."
          mode="offline"
          hasCheckBoxHeader={false}
        />
      </Box>
    </Box>
  );
};

export default InvoicesListTab;
