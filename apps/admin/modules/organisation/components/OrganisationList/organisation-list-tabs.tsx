import PremiseList from 'modules/premise/components/premise-list';
import Premise from 'modules/premise/components/premise-types';
import { AvixoTabs } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import PractitionerList from 'modules/practitioner/components/PractitionerList/practitioner-list';
import { Practitioner } from 'modules/practitioner/types/practitioner';
import OrganisationsList from './organisation-list';
import { Organisation } from '../organisation-types';

export interface OrganisationTabsProps {
  activeTab?: number;
  parentOrganisations: Organisation[];
  organisations: Organisation[];
  premises: Premise[];
  practitioners: Practitioner[];
}

const OrganisationTabs: React.FC<OrganisationTabsProps> = ({
  activeTab,
  organisations = [],
  premises = [],
  parentOrganisations = [],
  practitioners = [],
}) => (
  <AvixoTabs
    defaultActiveTab={activeTab}
    tabsData={[
      {
        label: 'Parent Organisations',
        url: PAGE_URLS.ORGANISATION(),
        component: <OrganisationsList organisations={parentOrganisations} />,
      },
      {
        label: 'Organisations',
        url: `${PAGE_URLS.ORGANISATION('Organisation')}`,
        component: <OrganisationsList organisations={organisations} />,
      },
      {
        label: 'Premises',
        url: `${PAGE_URLS.ORGANISATION('Premise')}`,
        component: <PremiseList premises={premises} />,
      },
      {
        label: 'Practitioners',
        url: `${PAGE_URLS.ORGANISATION('Practitioner')}`,
        component: <PractitionerList practitioners={practitioners} />,
      },
    ]}
  />
);

export default OrganisationTabs;
