import organisationPageApiServer from 'common/service/organisation-page-api';
import OrganisationLayout from 'modules/organisation/components/common/organisation-layout';
import { Organisation } from 'modules/organisation/components/organisation-types';
import OrganisationDetailsTabs from 'modules/organisation/components/OrganisationDetails/organisation-details-tabs';
import OrganizationService from 'modules/organisation/services';
import Premise from 'modules/premise/components/premise-types';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import dynamic from 'next/dynamic';
import { PageProps } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const OrganisationAction = dynamic(() => import('modules/organisation/components/common/organisation-action'), {
  ssr: false,
});
interface ParentOrganisationPageProps extends PageProps {
  organisation: Organisation;
  organisations?: Organisation[];
  premises?: Premise[];
}

const ParentOrganisationDetailsPage: React.FC<ParentOrganisationPageProps> = ({ organisation }) => (
  <OrganisationLayout
    title={organisation.name}
    subTitle={organisation.companyName}
    image={organisation.logo}
    organisationStatus={organisation.status}
  >
    <OrganisationDetailsTabs organisation={organisation} />
    <OrganisationAction organisation={organisation} />
  </OrganisationLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { organisationId, titleMessage, message } = ctx.query;
    const pageProps = {} as ParentOrganisationPageProps;

    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    if (organisationId) {
      try {
        const organizationService = new OrganizationService({}, ctx);
        const { data } = await organizationService.getOrganizationDetails(Number(organisationId));
        pageProps.organisation = data;

        return {
          props: {
            ...pageProps,
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
    const { organisationId, titleMessage } = ctx.query;
    const { req } = ctx;
    const { body } = req;
    const { action } = body;
    const organisationPageApi = await organisationPageApiServer(ctx);
    if (action === 'delete-organisation' && organisationPageApi?.status === 200) {
      return redirect(PAGE_URLS.ORGANISATION());
    }
    return redirect(
      `${PAGE_URLS.ORGANISATION_DETAILS(String(organisationId))}?message=${organisationPageApi?.message}&titleMessage=${
        titleMessage ?? organisationPageApi?.titleMessage
      }`,
    );
  },
});

export default ParentOrganisationDetailsPage;
