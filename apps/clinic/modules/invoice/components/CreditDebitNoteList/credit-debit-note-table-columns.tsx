import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { Box } from '@mui/material';
import { DebitNote } from 'modules/invoice/components/CreditDebitNote/debit-note-types';
import { CreditNote } from 'modules/invoice/components/CreditDebitNote/credit-note-types';
import { neutral } from 'share-components/theme/default-theme';
import { Edit2Icon, PrintIcon, TrashIcon } from 'share-components';
import MoneyAddIcon from 'share-components/src/components/AvixoIcons/money-add';

const CreditDebitNoteTableColumns: Array<AvixoTableColumnProps<DebitNote | CreditNote>> = [
  {
    id: 'name',
    field: '',
    label: 'Name',
    alignLabel: 'left',
  },
  {
    id: 'subTotal',
    field: '',
    label: 'Sub Total',
    alignLabel: 'left',
  },
  {
    id: 'gst',
    field: '',
    label: 'GST',
    alignLabel: 'left',
  },
  {
    id: 'total',
    field: '',
    label: 'TOTAL',
    alignLabel: 'left',
  },
  {
    id: 'applied',
    field: '',
    label: 'Applied',
    alignLabel: 'left',
  },
  {
    id: 'balance',
    field: '',
    label: 'Balance',
    alignLabel: 'left',
  },
  {
    id: 'remark',
    field: '',
    label: 'Remark',
    alignLabel: 'left',
  },
  {
    id: 'refundMethod',
    field: '',
    label: 'Refund Method',
    alignLabel: 'left',
  },
  {
    id: 'action',
    field: '',
    label: 'Action',
    alignLabel: 'left',
    customRender: () => (
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          color: neutral[500],
          svg: {
            cursor: 'pointer',
          },
        }}
      >
        <Edit2Icon />
        <MoneyAddIcon />
        <PrintIcon />
        <TrashIcon />
      </Box>
    ),
  },
];

export default CreditDebitNoteTableColumns;
