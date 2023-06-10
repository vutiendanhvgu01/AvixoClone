import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import { AvixoCard, AvixoTable, PlusOutlined } from 'share-components';
import CREDIT_NOTE_ITEM_LIST_COLUMNS from './items-list-table-columns';

interface CreditNoteItem {
  id: number;
}

interface CreditNoteItemListProps {
  items: CreditNoteItem[];
}

const CreditNoteItemList: React.FC<CreditNoteItemListProps> = ({ items }) => {
  const showEditCreditNoteItem = useCallback(() => {
    // Show Edit Credit Note Form
  }, []);

  return (
    <AvixoCard
      title="Items list"
      action={
        <Button color="neutral" startIcon={<PlusOutlined />}>
          Add Item
        </Button>
      }
    >
      <Box sx={{ mx: -3 }}>
        <AvixoTable
          data={{ records: items }}
          onRowClick={showEditCreditNoteItem}
          columns={CREDIT_NOTE_ITEM_LIST_COLUMNS}
          mode="offline"
          hasCheckBoxHeader={false}
        />
      </Box>
    </AvixoCard>
  );
};
export default CreditNoteItemList;
