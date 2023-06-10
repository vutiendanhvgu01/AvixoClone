import { AvixoTabs } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const Tabs = (patientUUID: string, totalAllergies: number, totalImmunisations: number) => [
  {
    label: 'Patient Details',
    url: PAGE_URLS.PATIENT_DETAILS(patientUUID),
  },
  {
    label: `Allergy${totalAllergies > 0 ? ` (${totalAllergies})` : ''}`,
    url: PAGE_URLS.PATIENT_ALLERGY(patientUUID),
  },
  {
    label: `Immunisations${totalImmunisations > 0 ? ` (${totalImmunisations})` : ''}`,
    url: PAGE_URLS.PATIENT_IMMUNISATION(patientUUID),
  },
];
export interface PatientDetailsTabsProps {
  patientUUID: string;
  activeTab?: number;
  totalAllergies: number;
  totalImmunisations: number;
}

const PatientDetailsTabs: React.FC<PatientDetailsTabsProps> = ({
  patientUUID,
  activeTab,
  totalAllergies,
  totalImmunisations,
}) => <AvixoTabs defaultActiveTab={activeTab} tabsData={Tabs(patientUUID, totalAllergies, totalImmunisations)} />;

export default PatientDetailsTabs;
