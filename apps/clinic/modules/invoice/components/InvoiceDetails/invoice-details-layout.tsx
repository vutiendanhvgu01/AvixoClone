import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { AvixoListHeader } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import InvoiceActionButtons from './invoice-action-buttons';
import { Invoice } from 'modules/invoice/types/invoice';
import { debitNoteMockData, invoicesMockData } from '../mockData';

export interface InvoiceDetailsLayoutProps {
  children?: ReactNode;
  patient: Patient;
  invoice: Invoice;
}

const invoice = invoicesMockData[0];
const debitNote = debitNoteMockData;

const InvoiceDetailsLayout: React.FC<InvoiceDetailsLayoutProps> = ({ children, patient, invoice }) => (
  <Box>
    <AvixoListHeader
      subTitle={patient.fullName}
      mainTitleComponent={
        <Typography variant="h4" color="white" sx={{ my: 0.5 }}>
          PS2212-00001
        </Typography>
      }
      detailTextComponent={
        <Box>
          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.5 }}>
            13/12/2022 - 02:29 PM
          </Typography>
        </Box>
      }
      buttonListComponent={<InvoiceActionButtons patient={patient} invoice={invoice} debitNote={debitNote} />}
      widthLeftBox="20%"
      widthRightBox="80%"
    />
    <Box sx={{ py: 1 }}>{children}</Box>
  </Box>
);

export default InvoiceDetailsLayout;
