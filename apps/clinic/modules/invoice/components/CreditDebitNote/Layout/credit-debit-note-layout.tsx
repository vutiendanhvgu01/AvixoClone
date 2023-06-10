import React, { ReactNode } from 'react';
import { Typography, Box, styled, Chip } from '@mui/material';
import { AvixoListHeader } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import type { Invoice } from 'modules/invoice/types/invoice';
import { formatDate } from 'share-components/src/utils/formatUtils';
import dynamic from 'next/dynamic';

const CreditDebitNoteAction = dynamic(() => import('./credit-debit-note-action'), { ssr: false });

const Actions = styled(Box)(() => ({
  '> a, > button': {
    marginLeft: 16,
  },
}));

export interface CreditDebitNoteLayoutProps {
  children?: ReactNode;
  patient: Patient;
  invoice: Invoice;
  title: string;
  actionButtons?: ReactNode;
}

const CreditDebitNoteLayout: React.FC<CreditDebitNoteLayoutProps> = ({
  children,
  patient,
  invoice,
  title,
  actionButtons,
}) => (
  <>
    <Box>
      <AvixoListHeader
        subTitle={patient.fullName}
        mainTitleComponent={
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography variant="h4" color="white" sx={{ my: 0.5 }}>
              {title}
            </Typography>
            <Chip color="success" size="small" label="Credit Balance S$208.00" sx={{ ml: 1 }} />
          </Box>
        }
        detailTextComponent={
          <Box>
            <Typography variant="subtitle1" color="white">
              Invoice Ref:{' '}
              <Link
                href={PAGE_URLS.PATIENT_INVOICE_DETAILS(patient.uuid, invoice.uuid)}
                style={{ textDecoration: 'underline' }}
              >
                INV-{invoice.invoiceNumber}
              </Link>{' '}
              · {formatDate(invoice.createdAt, "dd/MM/yyyy '-' hh:mm a")}
            </Typography>
          </Box>
        }
        buttonListComponent={<Actions>{actionButtons}</Actions>}
      />
      <Box sx={{ py: 1 }}>{children}</Box>
    </Box>
    <CreditDebitNoteAction patient={patient} />
  </>
);
export default CreditDebitNoteLayout;
