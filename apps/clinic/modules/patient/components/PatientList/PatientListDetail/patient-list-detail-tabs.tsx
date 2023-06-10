import { AvixoTabs } from 'share-components';
import { PatientListItem } from '../patient-list-types';
import PatientListDetailTab from './patient-list-detail-tab';

interface TabData {
  listData: PatientListItem;
}

const Tabs = (
  item: PatientListItem,
): {
  label: string;
  component: React.ReactNode;
}[] => [
  {
    label: 'Registered Patient',
    component: <PatientListDetailTab listData={item} />,
  },
  { label: 'Deleted Patient', component: <PatientListDetailTab /> },
];

const PatientListDetailTabs: React.FC<TabData> = ({ listData }) => <AvixoTabs tabsData={Tabs(listData)} />;

export default PatientListDetailTabs;
