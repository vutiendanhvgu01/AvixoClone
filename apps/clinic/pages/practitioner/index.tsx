import { Button } from '@mui/material';
import PractitionerList from 'modules/practitioner/components/practitioner-list';
import { PRACTITIONER_LIST_ACTION } from 'modules/practitioner/constants';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AvixoListLayout, AvixoTabs, PlusOutlined, PageProps } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { handle, redirect } from 'next-runtime';
import PractitionerApiService from 'modules/practitioner/services';
import Practitioner, {
  PractitionerPremise,
  PractitionerOrganisation,
} from 'modules/practitioner/types/practitioner-types';
import OrganisationApiService from 'modules/organisation/services';
import Premise from 'modules/organisation/types/premise-types';
import { Organisation } from 'modules/organisation/types/organisation-types';
import practitionerPageApiServer from 'common/service/practitioner-page-api';

const PractitionerAction = dynamic(() => import('modules/practitioner/components/practitioner-action'), { ssr: false });

interface PractitionersPageProps extends PageProps {
  practitioners: Practitioner[];
  practitioner?: Practitioner;
}

const PractitionersPage: React.FC<PractitionersPageProps> = ({ practitioners, practitioner }) => {
  const tabsData = [{ label: 'All Practitioners', component: <PractitionerList practitioners={practitioners} /> }];

  return (
    <AvixoListLayout
      title="Practitioners"
      actionButtons={
        <Link href={PAGE_URLS.PRACTITIONER(PRACTITIONER_LIST_ACTION.ADD_PRACTITIONER)}>
          <Button startIcon={<PlusOutlined />}>Add Practitioner</Button>
        </Link>
      }
    >
      <AvixoTabs tabsData={tabsData} />
      <PractitionerAction selectedPractitioner={practitioner} />
    </AvixoListLayout>
  );
};

export default PractitionersPage;

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { practitionerId, message, titleMessage, offset, limit } = ctx.query;
    const pageProps = {} as any;
    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    const practitionerApiService = new PractitionerApiService({}, ctx);
    const organizationService = new OrganisationApiService({}, ctx);

    try {
      if (practitionerId) {
        const { data } = await practitionerApiService.getPatientPractitioner(practitionerId.toString());
        pageProps.practitioner = data || null;
      }

      const { data: practitionerData } = await practitionerApiService.getPractitionersList({
        offset: offset as string,
        limit: limit as string,
      });

      if (practitionerData) {
        await Promise.allSettled(
          practitionerData.map(async (practitioner: Practitioner, index: number) => {
            const premises: Premise[] = [];
            const organisations: Organisation[] = [];

            if (practitioner?.practitionerPremises) {
              // Get premises for each practitioner
              await Promise.allSettled(
                practitioner.practitionerPremises?.map(async (premise: PractitionerPremise) => {
                  const premiseDetailRes = await organizationService.getPremiseDetails(premise.premiseId);
                  const premiseDetail: Premise = premiseDetailRes.data;
                  premises.push(premiseDetail);
                }),
              );
            }

            if (practitioner?.practitionerOrganisations) {
              // Get organisations for each practitioner
              await Promise.allSettled(
                practitioner.practitionerOrganisations?.map(async (organisation: PractitionerOrganisation) => {
                  const organisationDetailRes = await organizationService.getOrganizationDetails(
                    organisation.organisationId,
                  );
                  const organisationDetail: Organisation = organisationDetailRes.data;
                  organisations.push(organisationDetail);
                }),
              );
            }

            practitionerData[index].premises = premises.filter(premise => premise);
            practitionerData[index].organisations = organisations.filter(organisation => organisation);
          }),
        );
      }

      pageProps.practitioners = practitionerData;
    } catch {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...pageProps,
      },
    };
  },
  async post(ctx) {
    const { titleMessage } = ctx.query;
    const practitionerPageApi = await practitionerPageApiServer(ctx);

    return redirect(
      `${PAGE_URLS.PRACTITIONER()}?message=${practitionerPageApi?.message}&titleMessage=${
        titleMessage ?? practitionerPageApi?.titleMessage
      }`,
    );
  },
});
