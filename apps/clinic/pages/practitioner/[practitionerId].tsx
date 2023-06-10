import practitionerPageApiServer from 'common/service/practitioner-page-api';
import PractitionerApiService from 'modules/practitioner/services';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { AvixoTabs, PageProps } from 'share-components';
import { handle, redirect } from 'next-runtime';
import { capitaliseFirstCharacter } from 'share-components/src/utils/formatUtils';
import OrganisationApiService from 'modules/organisation/services';
import { Organisation } from 'modules/organisation/types/organisation-types';
import Premise from 'modules/organisation/types/premise-types';
import { PAGE_URLS } from 'share-components/src/constants';
import PractitionerLayout from 'modules/practitioner/components/common/practitioner-layout';
import AuthApiService from 'modules/auth/service';
import { Role } from 'modules/auth/types';

const PractitionerAction = dynamic(() => import('modules/practitioner/components/practitioner-action'), {
  ssr: false,
});

const PractitionerDetails = dynamic(
  () => import('modules/practitioner/components/PractitionerDetails/practitioner-details'),
  {
    ssr: false,
  },
);

interface PractitionerDetailsPageProps extends PageProps {
  practitioner: Practitioner;
  organisation: Organisation;
  premise: Premise;
  credentialId?: number;
  roles?: Role[];
}

const PractitionerDetailsPage: React.FC<PractitionerDetailsPageProps> = ({
  practitioner,
  organisation,
  premise,
  roles,
  credentialId,
}) => {
  const subTitle = capitaliseFirstCharacter(
    `${practitioner?.gender}${
      practitioner?.birthDate
        ? `, ${new Date().getFullYear() - new Date(practitioner.birthDate).getFullYear()} Years Old`
        : ''
    }`,
  );

  return (
    <PractitionerLayout
      title={practitioner.name as string}
      subTitle={subTitle}
      practitionerStatus={practitioner?.status}
    >
      <AvixoTabs
        tabsData={[
          {
            label: 'Practitioner Details',
            component: (
              <PractitionerDetails
                practitioner={practitioner}
                organisation={organisation}
                premise={premise}
                roles={roles}
                credentialId={credentialId}
              />
            ),
          },
        ]}
      />
      <PractitionerAction />
    </PractitionerLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { practitionerId, titleMessage, message } = ctx.query;
    const pageProps = {} as PractitionerDetailsPageProps;

    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    if (practitionerId) {
      try {
        const practitionerService = new PractitionerApiService({}, ctx);
        const organisationService = new OrganisationApiService({}, ctx);
        const authService = new AuthApiService({}, ctx);

        const { data } = await practitionerService.getPatientPractitioner(practitionerId.toString());
        pageProps.practitioner = data as Practitioner;

        const getPrimaryOrganisationId = pageProps.practitioner?.practitionerOrganisations?.[0]?.organisationId ?? '';
        const getPrimaryPremiseId = pageProps.practitioner?.practitionerPremises?.[0]?.premiseId ?? '';

        const getCredentialPromise = await authService
          .getCredentialByPractitionerId(practitionerId.toString())
          .catch(err => console.log(err)); // to avoid throw page 404 notFound

        if (getCredentialPromise?.data) {
          const { data: roleData } = await authService.getRoleByCredentialId(getCredentialPromise?.data?.id.toString());
          pageProps.credentialId = getCredentialPromise?.data?.id;
          pageProps.roles = roleData;
        }

        const { data: organisationData } = await organisationService.getOrganizationDetails(
          getPrimaryOrganisationId.toString(),
        );
        pageProps.organisation = organisationData;

        const { data: premiseData } = await organisationService.getPremiseDetails(getPrimaryPremiseId.toString());
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
    const { practitionerId = '', titleMessage } = ctx.query;
    const organisationPageApi = await practitionerPageApiServer(ctx);

    return redirect(
      `${PAGE_URLS.PRACTITIONER_DETAIL(practitionerId.toString())}?message=${
        organisationPageApi?.message
      }&titleMessage=${titleMessage ?? organisationPageApi?.titleMessage}`,
    );
  },
});

export default PractitionerDetailsPage;
