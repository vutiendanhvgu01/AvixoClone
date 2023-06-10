import { Avatar, Box, Chip, Typography } from '@mui/material';
import { INVOICE_STATUS_COLOR } from 'modules/invoice/constants';
import { Invoice, Money } from 'modules/invoice/types/invoice';
import { Edit2Icon, PrintIcon, TrashIcon } from 'share-components';
import { getFirstLetters } from 'share-components/src/utils/stringUtils';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { neutral } from 'share-components/theme/default-theme';

const getMoneyDisplay = (money: Money): string => {
  if (!money) return '';
  return `${money.currency}${Number(money.amount).toFixed(2).toString()}`;
};

const INVOICES_TABLE_COLUMNS: Array<AvixoTableColumnProps<Invoice>> = [
  {
    id: 'name',
    field: '',
    label: 'Name',
    alignLabel: 'left',
    customRender: invoice => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={invoice.patient?.middleName}
          src={invoice.patient?.fullName}
          sx={{ bgcolor: '#5D34C6' }}
          sizes="40"
        >
          <Typography
            variant="body1"
            component="span"
            sx={{
              fontSize: '11px',
            }}
          >
            {getFirstLetters(invoice.patient?.fullName)}
          </Typography>
        </Avatar>
        <Box
          sx={{
            paddingLeft: '8px',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: 'chart.blue5',
            }}
          >
            {invoice.patient?.fullName}
          </Typography>
          {/* Need data from the API */}
          <Typography variant="caption">Active</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 'billedDate',
    field: '',
    label: 'Billed Date',
    alignLabel: 'left',
    sort: true,
    customRender: ({ serviceDate }) => (
      <div>
        <Typography variant="subtitle2">{serviceDate ? formatDate(serviceDate, 'MM/dd/yyyy') : ''}</Typography>
        <Typography variant="caption">{serviceDate ? formatDate(serviceDate, 'HH:mm a') : ''}</Typography>
        <br />
      </div>
    ),
  },
  {
    id: 'invoiceNo',
    field: '',
    label: 'Invoice No.',
    alignLabel: 'left',
    customRender: ({ invoiceNumber }) => (
      <Typography
        variant="body2"
        sx={{
          color: 'chart.blue5',
          textDecoration: 'underline',
        }}
      >
        {invoiceNumber}
      </Typography>
    ),
  },
  {
    id: 'claims',
    field: 'source',
    label: 'Claims',
    alignLabel: 'left',
    // Need data from API
  },
  {
    id: 'claimStatus',
    field: '',
    label: 'Claim Status',
    alignLabel: 'left',
    // Need data from API
  },
  {
    id: 'sendStatus',
    field: '',
    label: 'Send Status',
    alignLabel: 'left',
    // Need data from API
    /* customRender: () => (
      <>
        <Typography variant="subtitle2"></Typography>
        <Typography variant="caption"></Typography>
      </>
    ), */
  },
  {
    id: 'subTotal',
    field: '',
    label: 'Sub Total',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.subTotal),
  },
  {
    id: 'discount',
    field: '',
    label: 'Discount',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.discountAmount),
  },
  {
    id: 'afterDiscount',
    field: '',
    label: 'After Discount',
    alignLabel: 'left',
    customRender: ({ subTotal, discountAmount }) =>
      getMoneyDisplay({ currency: subTotal.currency, amount: subTotal.amount - discountAmount.amount }),
  },
  {
    id: 'addGst',
    field: '',
    label: 'Add Gst',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.totalTax),
  },
  {
    id: 'grandTotal',
    field: '',
    label: 'Grand Total',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.total),
  },
  {
    id: 'amountPaid',
    field: '',
    label: 'Amount Paid',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.amountPaid),
  },
  {
    id: 'balance',
    field: '',
    label: 'Balance',
    alignLabel: 'left',
    customRender: value => getMoneyDisplay(value.amountCredited),
  },
  {
    id: 'payment',
    field: '',
    label: 'Payment',
    alignLabel: 'left',
    customRender: value => <Chip size="small" label={value.type} color={INVOICE_STATUS_COLOR[value.type]} />,
  },
  {
    id: 'action',
    field: 'action',
    label: 'Action',
    alignLabel: 'left',
    customRender: () => (
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          color: neutral[500],
          svg: {
            cursor: 'pointer',
          },
        }}
      >
        <Edit2Icon />
        <PrintIcon />
        <TrashIcon />
      </Box>
    ),
  },
];

export default INVOICES_TABLE_COLUMNS;
