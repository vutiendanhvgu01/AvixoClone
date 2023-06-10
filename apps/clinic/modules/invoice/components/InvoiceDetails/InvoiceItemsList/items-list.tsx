import { AvixoCard, AvixoFixedContainer } from 'share-components';
import { Box } from '@mui/system';
import { useState } from 'react';
import type { InvoiceItemListProps } from './items-list-types';
import InvoiceItemsListActions from './items-list-actions';
import InvoiceItemsListTabs from './items-list-tabs';
import ServiceForm from '../InvoiceService/service-form';

const InvoiceItemsList: React.FC<InvoiceItemListProps> = ({ dataList }) => {
  const [open, setOpen] = useState(false);
  return (
    <AvixoCard title="Items List" action={<InvoiceItemsListActions onAddService={() => setOpen(true)} />}>
      <Box sx={{ mx: -4, mt: -3 }}>
        <InvoiceItemsListTabs records={dataList} />
      </Box>
      <AvixoFixedContainer
        display={open}
        title="Add Service"
        width="996px"
        closeOnOutside
        onClose={() => setOpen(false)}
      >
        <ServiceForm />
      </AvixoFixedContainer>
    </AvixoCard>
  );
};

export default InvoiceItemsList;
