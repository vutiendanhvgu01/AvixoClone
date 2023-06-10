import React, { useState, useCallback, useEffect } from 'react';
import { Typography } from '@mui/material';
import ImmunisationList from 'modules/immunisation/components/immunisation-list';
import ImmunisationApiService from 'modules/immunisation/services';
import AllergyApiService from 'modules/allergy/services';
import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AvixoDrawerConfirm } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import PatientDetailsLayout from 'modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-layout';
import type { Immunisation } from 'modules/immunisation/components/immunisation-types';
import type { Patient } from 'modules/patient/types/patient';
import { Allergy } from 'modules/allergy/components/allergy-types';
import dynamic from 'next/dynamic';
import AlertForm from 'common/components/alert-form';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import { Catalog } from 'modules/catalog/types';
import CatalogApiService from 'modules/catalog/service';
import { handle, redirect } from 'next-runtime';
import patientImmunisationsPageApiServer from 'common/service/patient-immunisation-page-api';
import { parseBody } from 'next/dist/server/api-utils/node';
import { forceRedirectPage } from '@AvixoUtils/pageUtils';

const PatientDetailsAction = dynamic(
  () => import('modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-action'),
  { ssr: false },
);
const ImmunisationForm = dynamic(() => import('modules/immunisation/components/immunisation-form'), { ssr: false });

interface AddEditDeleteImmunisationPageProps {
  immunisations: Immunisation[];
  allergies: Allergy[];
  selectedImmunisation: Immunisation;
  patient: Patient;
  params: {
    patientUUID: string;
    action: 'edit-immunisation' | 'delete-immunisation';
    message: string;
  };
  products: Catalog[];
}

const AddEditDeleteImmunisationPage: React.FC<AddEditDeleteImmunisationPageProps> = ({
  immunisations,
  selectedImmunisation,
  patient,
  allergies,
  params: { action, patientUUID },
  products,
}) => {
  const [isNehr, setIsNehr] = useState<boolean>(!!selectedImmunisation?.nehr);
  const router = useRouter();

  const goToImmunisationsPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_IMMUNISATION(patientUUID));
  }, [router, patientUUID]);

  useEffect(() => {
    if (action !== 'edit-immunisation' && action !== 'delete-immunisation') {
      setIsNehr(!!selectedImmunisation?.nehr);
    }
  }, [selectedImmunisation, action]);

  const renderActions = () => {
    if (!selectedImmunisation) return null;
    if (isNehr && (action === 'edit-immunisation' || action === 'delete-immunisation')) {
      return (
        <AlertForm
          onClose={goToImmunisationsPage}
          onCancel={goToImmunisationsPage}
          text="This immunisation record has been submitted to the NEHR previously. Any changes made to this record will be updated in the NEHR accordingly."
          onProceed={() => {
            setIsNehr(false);
          }}
        />
      );
    }
    switch (action) {
      case 'edit-immunisation':
        return (
          <ImmunisationForm
            open
            products={products}
            initData={selectedImmunisation}
            patientUUID={patientUUID}
            onCancel={goToImmunisationsPage}
          />
        );
      case 'delete-immunisation':
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToImmunisationsPage}
            action="delete-immunisation"
            id={selectedImmunisation.id}
            title="Delete Immunisation?"
            confirmContent={
              <Typography variant="body2">
                <strong>{selectedImmunisation.administeredProduct}</strong>
                {`will be deleted from ${patient.fullName}'s immunisation list. This action cannot be undone.`}
              </Typography>
            }
            footerProps={{
              confirmText: 'Yes, delete',
            }}
            inputProps={{
              name: 'reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Patient does not have this anymore.',
            }}
          />
        );
      default:
        return '';
    }
  };

  return (
    <PatientDetailsLayout patient={patient} allergies={allergies} immunisations={immunisations} activeTab={2}>
      <ImmunisationList immunisations={immunisations} />
      {renderActions()}
      <PatientDetailsAction products={products} patient={patient} />
    </PatientDetailsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, action, immunisationId, titleMessage, confirm } = ctx.query;
    const dataTypes = ['immunisations', 'allergies', 'listItems', 'products'];
    let pageProps = {} as AddEditDeleteImmunisationPageProps;
    const reqMethod = ctx.req.method;
    const nerhConnectorApiService = new NEHRConnectorApiService({}, ctx);
    let localMessage = '';
    const getSuccessMessage = (isNEHR: boolean) =>
      isNEHR
        ? 'New immunisation has been successfully added %26 New Immunisation has been successfully submitted to NEHR'
        : 'New immunisation has been successfully added';

    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const allergyApiService = new AllergyApiService({}, ctx);
        const immunisationApiService = new ImmunisationApiService({}, ctx);
        const catalogApiService = new CatalogApiService({}, ctx);

        const { data } = await patientService.getPatientDetails(patientUUID.toString());
        const patientId = data.id;
        pageProps.patient = data;

        await Promise.allSettled([
          immunisationApiService.getPatientImmunisation({ patientId }),
          allergyApiService.getPatientAllergies(patientId),
          catalogApiService.getItems(),
          catalogApiService.getListProducts(),
        ]).then(values => {
          values.forEach(({ value }: any, index) => {
            pageProps = {
              ...pageProps,
              [dataTypes[index]]: value?.data || [],
            };
          });
        });

        if (reqMethod === 'POST' || reqMethod === 'DELETE') {
          let responseMessage;
          const selectedImmunisation = pageProps.immunisations.find(
            it => it.id?.toString() === immunisationId?.toString(),
          );
          const body = await parseBody(ctx.req, '1mb');
          if (reqMethod === 'POST') {
            if (selectedImmunisation) {
              // update
              const result = await immunisationApiService.updatePatientImmunisation(immunisationId, {
                ...selectedImmunisation,
                ...body,
              });
              if (body?.nehr === 'on') {
                nerhConnectorApiService.submitImmunisationNEHR(selectedImmunisation.id).catch(error => {
                  console.error('Error when calling nehr service for immunisation updation', error);
                });
              }
              responseMessage = result?.originResponse?.status === 200 ? 'Changes saved successfully' : responseMessage;
            } else {
              // create
              const newBody = {
                ...body,
                nehr: body?.nehr === 'on',
                // immunisationId should be generated from BE instead
                id: `IMM-${new Date().getTime()}`,
              };
              const { originResponse } = await immunisationApiService.createNewPatientImmunisation(newBody);
              if (body?.nehr === 'on') {
                nerhConnectorApiService.submitImmunisationNEHR(newBody.id).catch(error => {
                  console.error('Error when calling nehr service for immunisation creation', error);
                });
              }
              responseMessage =
                originResponse?.status === 201
                  ? getSuccessMessage(newBody.nehr)
                  : "Can't create new immunisation, please contact administrator for more details";
            }
          }
          forceRedirectPage(ctx.res, PAGE_URLS.PATIENT_IMMUNISATION(patientUUID?.toString(), responseMessage));
        }

        // edit/delete immunisation page
        const isDelete = action === 'delete-immunisation';
        if (immunisationId && (action === 'edit-immunisation' || action === 'delete-immunisation')) {
          const selectedImmunisation = pageProps.immunisations.find(
            it => it.id?.toString() === immunisationId.toString(),
          );
          if (selectedImmunisation) {
            if (isDelete && confirm === 'true') {
              const { originResponse } = await immunisationApiService.deletePatientImmunisation(immunisationId);
              localMessage =
                originResponse.status === 200
                  ? 'Immunisation has been deleted successfully'
                  : "Can't delete this immunisation, please contact administrator for more details";
              nerhConnectorApiService.deleteImmunisationNEHR(selectedImmunisation.id).catch(error => {
                console.error('Error when calling nehr service for immunisation deletation', error);
              });
            } else {
              return {
                props: {
                  ...pageProps,
                  selectedImmunisation,
                  params: {
                    action,
                    patientUUID,
                    message: localMessage ?? null,
                  },
                },
              };
            }
            return {
              props: {
                ...pageProps,
                selectedImmunisation,
                titleMessage,
                params: {
                  patientUUID,
                  action: action || '',
                },
              },
            };
          }
        }
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
    const { patientUUID } = ctx.query;
    if (patientUUID) {
      const response = await patientImmunisationsPageApiServer(ctx);
      const { message, titleMessage } = response;

      return redirect(
        `${PAGE_URLS.PATIENT_IMMUNISATION(patientUUID.toString())}?message=${message}&titleMessage=${titleMessage}`,
      );
    }
    return redirect(ctx.resolvedUrl);
  },
});

export default AddEditDeleteImmunisationPage;
