import { AvixoTabs } from 'share-components';
import InvoiceItemsListTab from './items-list-tab';
import type { InvoiceItem } from './items-list-types';

interface TabData {
  records: InvoiceItem[];
}

const Tabs = (
  records: InvoiceItem[],
): {
  label: string;
  component: React.ReactNode;
}[] => [
  {
    label: 'Invoicing',
    component: <InvoiceItemsListTab records={records} />,
  },
  {
    label: 'Dispensing',
    component: <InvoiceItemsListTab records={records} />,
  },
];

const InvoiceItemsListTabs: React.FC<TabData> = ({ records }) => <AvixoTabs tabsData={Tabs(records)} />;

export default InvoiceItemsListTabs;
