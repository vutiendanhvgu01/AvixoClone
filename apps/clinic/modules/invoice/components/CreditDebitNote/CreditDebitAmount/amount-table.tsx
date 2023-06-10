import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TrashIcon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const BoxContainer = styled(Box)(() => ({
  'h6, p': {
    marginBottom: 16,
  },
  'tr:last-child td': {
    borderBottom: 'none',
  },
}));

const AmountTable: React.FC = () => {
  const router = useRouter();
  const { patientUUID, invoiceUUID, creditNoteId } = router.query;

  return (
    <Box sx={{ mx: -3 }}>
      <TableContainer component={BoxContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference No.</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" color="neutral.500">
                  Subtotal
                </Typography>
                <Typography variant="subtitle2" color="neutral.500">
                  GST Amount
                </Typography>
                <Typography variant="subtitle2" color="neutral.500">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">$300.00</Typography>
                <Typography color="black">$24.00</Typography>
                <Typography color="black">$324.00</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>
                <Typography color="black">15/10/2023</Typography>
                <Typography color="black">15/10/2023</Typography>
                <Typography color="black">15/10/2023</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color="neutral.500">
                  Credit Applied to
                </Typography>
                <Typography variant="body2" color="chart.blue4" sx={{ textDecoration: 'underline' }}>
                  <Link href={PAGE_URLS.PATIENT_INVOICE_DETAILS('', '')}>INV-12312321</Link>
                </Typography>
                <Typography variant="body2">Refunded by Cash</Typography>
                <Typography variant="body2" sx={{ alignItems: 'center' }}>
                  Refunded by Jarvis Cr...{' '}
                  <Link
                    href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE(
                      patientUUID as string,
                      invoiceUUID as string,
                      creditNoteId as string,
                      'delete-refund',
                    )}
                    scroll={false}
                  >
                    <TrashIcon height={16} />
                  </Link>
                </Typography>
                <Typography variant="body2" color="neutral.500">
                  Total Amount Applied
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>&nbsp;</Typography>
                <Typography color="black">$100.00</Typography>
                <Typography color="black">$108.00</Typography>
                <Typography color="black">$100.00</Typography>
                <Typography color="black">$308.00</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2">Remaining Credit</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" color="black">
                  $0.00
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AmountTable;
