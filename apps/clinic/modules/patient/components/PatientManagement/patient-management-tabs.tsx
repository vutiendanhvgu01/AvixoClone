import type { Patient } from 'modules/patient/types/patient';
import { AvixoTabs } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import { PatientListItem } from '../PatientList/patient-list-types';
import PatientManagementTab from './patient-management-tab';

const Tabs = (patients: Patient[], patientList: PatientListItem[], selectedList: string, activeTab?: number) => [
  {
    label: 'All Patients',
    url: ROUTES.PATIENT_MANAGEMENT,
    component: (
      <PatientManagementTab
        patients={activeTab === 0 ? patients : []}
        patientList={patientList}
        selectedList={selectedList}
      />
    ),
  },
  {
    label: 'New Registered Patient',
    url: `${ROUTES.PATIENT_MANAGEMENT}?isNew=true`,
    component: (
      <PatientManagementTab
        patients={activeTab === 1 ? patients : []}
        patientList={patientList}
        selectedList={selectedList}
      />
    ),
  },
  {
    label: 'Deleted Patient',
    url: `${ROUTES.PATIENT_MANAGEMENT}?isDeleted=true`,
    component: (
      <PatientManagementTab
        patients={activeTab === 2 ? patients : []}
        patientList={patientList}
        selectedList={selectedList}
      />
    ),
  },
];
export interface PatientManagementTabsProps {
  patients: Patient[];
  patientList: PatientListItem[];
  selectedList: string;
  activeTab?: number;
}

const PatientManagementTabs: React.FC<PatientManagementTabsProps> = ({
  activeTab,
  patients,
  patientList,
  selectedList,
}) => <AvixoTabs defaultActiveTab={activeTab} tabsData={Tabs(patients, patientList, selectedList, activeTab)} />;

export default PatientManagementTabs;
