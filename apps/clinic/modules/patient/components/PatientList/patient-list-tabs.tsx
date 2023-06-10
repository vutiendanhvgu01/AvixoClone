import { AvixoTabs } from 'share-components';
import PatientListTab from './patient-list-tab';
import { PatientListItem, PatientListTabsProps } from './patient-list-types';

const Tabs = (
  items: PatientListItem[],
): {
  label: string;
  component: React.ReactNode;
}[] => [
  { label: 'All List', component: <PatientListTab items={items} /> },
  { label: 'Shared List', component: <div>Tab Panel 2</div> },
  { label: 'Archived List', component: <div>Tab Panel 3</div> },
  { label: 'Deleted List', component: <div>Tab Panel 3</div> },
];

const PatientListTabs: React.FC<PatientListTabsProps> = props => {
  const { listItems } = props;
  return <AvixoTabs tabsData={Tabs(listItems || [])} />;
};

export default PatientListTabs;
