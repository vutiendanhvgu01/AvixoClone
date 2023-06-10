import Premise from 'modules/premise/components/premise-types';
import { AvixoTabs } from 'share-components';
import { Organisation } from '../organisation-types';
import OrganisationDetails from './organisation-details';

export interface OrganisationDetailsTabsProps {
  activeTab?: number;
  organisation: Organisation;
  organisations?: Organisation[];
  premises?: Premise[];
}

const OrganisationDetailsTabs: React.FC<OrganisationDetailsTabsProps> = ({ activeTab = 0, organisation }) => (
  <AvixoTabs
    defaultActiveTab={activeTab}
    tabsData={[
      {
        label: 'Organisation Details',
        component: <OrganisationDetails organisation={organisation} />,
      },
    ]}
  />
);

export default OrganisationDetailsTabs;
