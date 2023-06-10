import organisationPageApiServer from 'common/service/organisation-page-api';
import OrganisationLayout from 'modules/organisation/components/common/organisation-layout';
import OrganizationService from 'modules/organisation/services';
import PremiseDetails from 'modules/premise/components/premise-details';
import type Premise from 'modules/premise/components/premise-types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { AvixoTabs, PageProps } from 'share-components';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import { handle, redirect } from 'next-runtime';
import AvixoRole from '@ShareComponents/AvixoRole';
import { Organisation } from 'modules/organisation/components/organisation-types';

const OrganisationAction = dynamic(() => import('modules/organisation/components/common/organisation-action'), {
  ssr: false,
});

interface PremiseDetailsPageProps extends PageProps {
  premise: Premise;
  parentOrganisation?: Organisation;
  params: {
    action: string;
  };
}

// Demo only
const roles = [
  {
    id: 1,
    name: 'Doctor',
    setting: {
      patientList: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      patientGroup: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      prescription: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      dispense: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      invoice: {
        isEnabled: false,
        view: false,
        add: false,
        add_access_given: [],
        update: false,
        delete: false,
        delete_access_given: [],
      },
      payment: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      appointment: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      queue: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      medicalRecord: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      user: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      '2fa': {
        '2fa': '',
      },
    },
  },
];

const PremiseDetailsPage: React.FC<PremiseDetailsPageProps> = ({ premise, parentOrganisation }) => (
  <OrganisationLayout
    title={premise.name}
    premiseStatus={premise.status}
    subTitle="8 Kaki Bukit Ave 1, #04-06 Singapore 417941"
  >
    <AvixoTabs
      tabsData={[
        {
          label: 'Premise Details',
          component: <PremiseDetails premise={premise} parentOrganisation={parentOrganisation} />,
        },
        {
          label: 'Roles',
          component: <AvixoRole.RoleList roles={roles} isEditable isDeletable />,
        },
      ]}
    />
    <OrganisationAction premise={premise} />
  </OrganisationLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { organisationId, premiseId, action, titleMessage, message } = ctx.query;
    const pageProps = {} as PremiseDetailsPageProps;

    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    if (organisationId && premiseId) {
      try {
        const organizationService = new OrganizationService({}, ctx);
        const { data } = await organizationService.getPremiseDetails(premiseId as string);

        if (data?.parentOrganisationID) {
          const { data: parentOrganisationData } = await organizationService.getOrganizationDetails(
            data.parentOrganisationID,
          );

          pageProps.parentOrganisation = parentOrganisationData;
        }

        pageProps.premise = data;
        return {
          props: {
            ...pageProps,
            params: {
              action: (action as string) || '',
            },
          },
        };
      } catch {
        return {
          notFound: true,
        };
      }
    }
    return {
      notFound: true,
    };
  },
  async post(ctx) {
    const { titleMessage } = ctx.query;

    const organisationPageApi = await organisationPageApiServer(ctx);
    return redirect(
      `${ROUTES.ORGANISATION}?message=${organisationPageApi?.message}&titleMessage=${
        titleMessage ?? organisationPageApi?.titleMessage
      }`,
    );
  },
});

export default PremiseDetailsPage;
