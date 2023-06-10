import { AvixoTable, Edit2Icon, TrashIcon } from 'share-components';
import { Grid } from '@mui/material';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Box } from '@mui/system';
import type { InvoiceItem } from './items-list-types';

const columns: AvixoTableColumnProps<InvoiceItem>[] = [
  {
    id: 'code',
    field: 'code',
    label: 'CODE',
    alignLabel: 'left',
  },
  {
    id: 'name',
    field: 'name',
    label: 'ITEM NAME',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <b>{value.name}</b>
        <br />
        <span>{value.type}</span>
      </div>
    ),
  },
  {
    id: 'quantity',
    field: 'quantity',
    label: 'QTY ISSUED',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>{value.quantity}</span>
      </div>
    ),
  },
  {
    id: 'cost',
    field: 'cost',
    label: 'COST',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>
          {value.lineAmount.currency}
          {value.lineAmount.amount}
        </span>
      </div>
    ),
  },
  {
    id: 'discount',
    field: 'discount',
    label: 'DISCOUNT',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>
          {value.discountAmount.currency}
          {value.discountAmount.amount}
        </span>
      </div>
    ),
  },
  {
    id: 'total',
    field: 'total',
    label: 'SUB TOTAL',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>
          {value.lineTotal.currency}
          {value.lineTotal.amount}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    field: 'actions',
    label: 'ACTIONS',
    alignLabel: 'left',
    tableCellBaseProps: {
      width: 140,
    },
    customRender: () => (
      <Grid container spacing={2}>
        <Grid item>
          <LocalPrintshopOutlinedIcon />
        </Grid>
        <Grid item>
          <TrashIcon />
        </Grid>
        <Grid item>
          <Edit2Icon />
        </Grid>
      </Grid>
    ),
  },
];

export interface InvoiceItemsListTabProp {
  records: InvoiceItem[];
}

const InvoiceItemsListTab: React.FC<InvoiceItemsListTabProp> = ({ records }) => (
  <Box sx={{ mx: -2 }}>
    <AvixoTable hasCheckBoxHeader={false} columns={columns} data={{ records }} mode="offline" />
  </Box>
);

export default InvoiceItemsListTab;
