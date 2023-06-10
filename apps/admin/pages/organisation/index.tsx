import organisationPageApiServer from 'common/service/organisation-page-api';
import OrganisationLayout from 'modules/organisation/components/common/organisation-layout';
import type { Organisation } from 'modules/organisation/components/organisation-types';
import OrganisationTabs from 'modules/organisation/components/OrganisationList/organisation-list-tabs';
import { ORGANISATION_TABS } from 'modules/organisation/constants';
import OrganizationService from 'modules/organisation/services';
import { Practitioner, PractitionerOrganisation, PractitionerPremise } from 'modules/practitioner/types/practitioner';
import PractitionerApiService from 'modules/practitioner/services';
import type Premise from 'modules/premise/components/premise-types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { handle, redirect } from 'next-runtime';
import React from 'react';
import { PageProps } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const OrganisationAction = dynamic(() => import('modules/organisation/components/common/organisation-action'), {
  ssr: false,
});

interface OrganisationPagePageProps extends PageProps {
  activeTab: number;
  parentOrganisations: Organisation[];
  organisations: Organisation[];
  premises: Premise[];
  practitioner?: Practitioner;
  practitioners: Practitioner[];
}

const OrganisationPage: React.FC<OrganisationPagePageProps> = ({
  activeTab,
  organisations,
  premises,
  parentOrganisations,
  practitioner,
  practitioners,
}) => (
  <OrganisationLayout isDetailPage={false} title="Speedoc Pte Ltd">
    <OrganisationTabs
      activeTab={activeTab}
      organisations={organisations}
      premises={premises}
      parentOrganisations={parentOrganisations}
      practitioners={practitioners}
    />
    <OrganisationAction practitioner={practitioner} />
  </OrganisationLayout>
);

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { tab, practitionerId, message, titleMessage } = ctx.query;
    const pageProps = {} as OrganisationPagePageProps;
    pageProps.activeTab = tab ? ORGANISATION_TABS.indexOf(tab.toString()) : 0;
    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    const params: { [key: string]: string | number | boolean } = {};
    const organizationService = new OrganizationService({}, ctx);
    const practitionerApiService = new PractitionerApiService({}, ctx);

    let res;

    try {
      if (practitionerId) {
        res = await practitionerApiService.getPractitioner(practitionerId.toString());
        pageProps.practitioner = res.data || null;
      }

      switch (tab) {
        case 'Organisation':
          params.isParent = false;
          res = await organizationService.getOrganizations(params);
          pageProps.organisations = res.data.filter(it => !it.isParent);
          break;
        case 'Premise':
          res = await organizationService.getPremises();
          pageProps.premises = res.data;
          break;
        case 'Practitioner': {
          const practitioners = (await practitionerApiService.getPractitioners('')).data as Practitioner[];

          await Promise.allSettled(
            practitioners.map(async (practitioner, index: number) => {
              const premises: Premise[] = [];
              const organisations: Organisation[] = [];

              // Get premises for each practitioner
              await Promise.allSettled(
                practitioner.practitionerPremises?.map(async (premise: PractitionerPremise) => {
                  const premiseDetailRes = await organizationService.getPremiseDetails(premise.premiseId);
                  const premiseDetail: Premise = premiseDetailRes.data;
                  premises.push(premiseDetail);
                }),
              );

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

              practitioners[index].premises = premises.filter(premise => premise);
              practitioners[index].organisations = organisations.filter(organisation => organisation);
            }),
          );

          pageProps.practitioners = practitioners;
          break;
        }
        default:
          params.isParent = true;
          res = await organizationService.getOrganizations(params);
          pageProps.parentOrganisations = res.data;
      }
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
    const { tab, titleMessage } = ctx.query;
    const organisationPageApi = await organisationPageApiServer(ctx);

    return redirect(
      `${PAGE_URLS.ORGANISATION(tab ? tab.toString() : '')}&message=${organisationPageApi?.message}&titleMessage=${
        titleMessage ?? organisationPageApi?.titleMessage
      }`,
    );
  },
});

export default OrganisationPage;
