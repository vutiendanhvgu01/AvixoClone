import { Box } from '@mui/material';
import { Edit2Icon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { neutral } from 'share-components/theme/default-theme';

const CREDIT_NOTE_ITEM_LIST_COLUMNS: Array<AvixoTableColumnProps<any>> = [
  {
    id: 'id',
    field: '',
    label: 'No',
    alignLabel: 'left',
  },
  {
    id: 'name',
    field: 'name',
    label: 'Item Name',
    alignLabel: 'left',
  },
  {
    id: 'quantity',
    field: 'quantity',
    label: 'Quantity',
    alignLabel: 'left',
  },
  {
    id: 'price',
    field: 'price',
    label: 'Unit Price',
    alignLabel: 'left',
  },
  {
    id: 'id',
    field: '',
    label: 'Sub total',
    alignLabel: 'left',
  },
  {
    id: 'gst',
    field: 'gst',
    label: 'GST',
    alignLabel: 'left',
  },
  {
    id: 'id',
    field: '',
    label: 'Total',
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
          gap: 6,
        }}
      >
        <Edit2Icon style={{ color: neutral[500], cursor: 'pointer' }} />
        <TrashIcon style={{ color: neutral[500], cursor: 'pointer' }} />
      </Box>
    ),
  },
];

export default CREDIT_NOTE_ITEM_LIST_COLUMNS;
