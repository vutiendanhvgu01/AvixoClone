import organisationPageApiServer from 'common/service/organisation-page-api';
import OrganisationLayout from 'modules/organisation/components/common/organisation-layout';
import PractitionerApiService from 'modules/practitioner/services';
import type { Practitioner } from 'modules/practitioner/types/practitioner';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { AvixoTabs, PageProps } from 'share-components';
import { handle, redirect } from 'next-runtime';
import { capitaliseFirstCharacter } from 'share-components/src/utils/formatUtils';
import OrganisationApiService from 'modules/organisation/services';
import { Organisation } from 'modules/organisation/components/organisation-types';
import Premise from 'modules/premise/components/premise-types';
import { PAGE_URLS } from 'share-components/src/constants';
import PractitionerDetails from 'modules/practitioner/components/PractitionerDetails/practitioner-details';

const OrganisationAction = dynamic(() => import('modules/organisation/components/common/organisation-action'), {
  ssr: false,
});

interface PractitionerDetailsPageProps extends PageProps {
  practitioner: Practitioner;
  organisation: Organisation;
  premise: Premise;
}

const PractitionerDetailsPage: React.FC<PractitionerDetailsPageProps> = ({ practitioner, organisation, premise }) => {
  const practitionerAge = new Date().getFullYear() - new Date(practitioner?.birthDate || '').getFullYear();
  const subTitle = capitaliseFirstCharacter(`${practitioner?.gender}, ${practitionerAge} Years Old`) || '';

  return (
    <OrganisationLayout
      title={practitioner.name as string}
      subTitle={subTitle}
      practitionerStatus={practitioner.status}
    >
      <AvixoTabs
        tabsData={[
          {
            label: 'Practitioner Details',
            component: (
              <PractitionerDetails practitioner={practitioner} organisation={organisation} premise={premise} />
            ),
          },
        ]}
      />
      <OrganisationAction />
    </OrganisationLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { organisationId, practitionerId, titleMessage, message } = ctx.query;
    const pageProps = {} as PractitionerDetailsPageProps;

    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    if (organisationId && practitionerId) {
      try {
        const practitionerService = new PractitionerApiService({}, ctx);
        const organisationService = new OrganisationApiService({}, ctx);

        const { data } = await practitionerService.getPractitioner(practitionerId as string);
        pageProps.practitioner = data;

        const getPrimaryOrganisationId = pageProps.practitioner?.practitionerOrganisations?.[0]?.organisationId || '';
        const getPrimaryPremiseId = pageProps.practitioner?.practitionerPremises?.[0]?.premiseId || '';

        const [{ data: organisationData }, { data: premiseData }] = await Promise.all([
          organisationService.getOrganizationDetails(getPrimaryOrganisationId.toString()),
          organisationService.getPremiseDetails(getPrimaryPremiseId.toString()),
        ]);

        pageProps.organisation = organisationData;
        pageProps.premise = premiseData;

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
    const { organisationId = '', practitionerId = '', titleMessage } = ctx.query;
    const organisationPageApi = await organisationPageApiServer(ctx);
    return redirect(
      `${PAGE_URLS.ORGANISATION_PRACTITIONER_DETAILS(organisationId.toString(), practitionerId.toString())}?message=${
        organisationPageApi?.message
      }&titleMessage=${titleMessage ?? organisationPageApi?.titleMessage}`,
    );
  },
});

export default PractitionerDetailsPage;
