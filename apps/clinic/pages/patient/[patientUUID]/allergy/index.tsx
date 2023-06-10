import AlertForm from 'common/components/alert-form';
import patientAllergyPageApiServer from 'common/service/patient-allergy-page-api';
import AllergyList from 'modules/allergy/components/allergy-list';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import AllergyApiService from 'modules/allergy/services';
import type { Immunisation } from 'modules/immunisation/components/immunisation-types';
import ImmunisationApiService from 'modules/immunisation/services';
import PatientDetailsLayout from 'modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-layout';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import { parseBody } from 'next/dist/server/api-utils/node';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AvixoDrawerConfirm, getAlertMessage, PageProps } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import CatalogApiService from 'modules/catalog/service';
import { Catalog } from 'modules/catalog/types';

const PatientDetailsAction = dynamic(
  () => import('modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-action'),
  { ssr: false },
);
const AllergyForm = dynamic(() => import('modules/allergy/components/allergy-form'), { ssr: false });

interface AddEditDeleteAllergyPageProps extends PageProps {
  immunisations: Immunisation[];
  allergies: Allergy[];
  patient: Patient;
  products: Catalog[];
  selectedAllergy: Allergy;
  params: {
    patientUUID: string;
    action?: 'edit-allergy' | 'delete-allergy' | 'update-allergy';
  };
}

const AddEditDeleteAllergyPage: React.FC<AddEditDeleteAllergyPageProps> = ({
  allergies,
  immunisations,
  selectedAllergy,
  patient,
  params: { action, patientUUID },
  products,
}) => {
  const [isNehr, setIsNehr] = useState<boolean>(!!selectedAllergy?.nehr);
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);

  const goToPatientAllergyPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_ALLERGY(patientUUID));
  }, [router, patientUUID]);

  useEffect(() => {
    if (action !== 'edit-allergy' && action !== 'delete-allergy' && action !== 'update-allergy') {
      setIsNehr(!!selectedAllergy?.nehr);
    }
  }, [selectedAllergy, action]);

  const deleteAllergy = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_ALLERGY_DELETE(patientUUID, selectedAllergy?.id, true));
  }, [router, patientUUID, selectedAllergy]);

  const updateAllergy = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_CONFIRM_UPDATE(patientUUID, selectedAllergy?.id, true));
  }, [router, patientUUID, selectedAllergy]);

  const renderActions = () => {
    if (isNehr && (action === 'edit-allergy' || action === 'delete-allergy')) {
      return (
        <AlertForm
          onClose={goToPatientAllergyPage}
          onCancel={goToPatientAllergyPage}
          text=" This allergy record has been submitted to the NEHR previously. Any changes made to this record will be updated
          in the NEHR accordingly."
          onProceed={() => {
            setIsNehr(false);
          }}
        />
      );
    }
    switch (action) {
      case 'edit-allergy':
        return <AllergyForm initData={selectedAllergy} open onCancel={goToPatientAllergyPage} patientId={patient.id} />;
      case 'update-allergy':
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToPatientAllergyPage}
            inputProps={{
              name: 'reason',
              label: 'Reason for update',
              required: true,
              defaultValues: '',
            }}
            disabled={disabled}
            onInputChange={e => {
              setDisabled(!e.target.value);
            }}
            title="Save Changes?"
            confirmContent={<span>You have made an edit to the form, proceed to save?</span>}
            footerProps={{
              onConfirmClick: updateAllergy,
              confirmText: 'Yes, save',
            }}
          />
        );
      case 'delete-allergy':
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToPatientAllergyPage}
            inputProps={{
              name: 'reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: '',
            }}
            onInputChange={e => {
              setDisabled(!e.target.value);
            }}
            disabled={disabled}
            title="Delete Allergy?"
            confirmContent={
              <span>
                <strong>{selectedAllergy.name}</strong> will be deleted from {patient.fullName}’s allergy list. This
                action cannot be undone.
              </span>
            }
            footerProps={{
              onConfirmClick: deleteAllergy,
              confirmText: 'Yes, delete',
            }}
          />
        );

      default:
        return '';
    }
  };

  return (
    <PatientDetailsLayout immunisations={immunisations} patient={patient} allergies={allergies} activeTab={1}>
      <AllergyList allergies={allergies} />
      {/* {selectedAllergy.nehr ? : } */}
      {renderActions()}
      <PatientDetailsAction patient={patient} products={products} />
    </PatientDetailsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, action, allergyId, message, titleMessage, confirm } = ctx.query;
    const reqMethod = ctx.req.method;
    const dataTypes = ['immunisations', 'allergies'];
    let pageProps = {} as AddEditDeleteAllergyPageProps;
    const isConfirm = confirm === 'true';

    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const allergyApiService = new AllergyApiService({}, ctx);
        const immunisationApiService = new ImmunisationApiService({}, ctx);
        const catalogApiService = new CatalogApiService({}, ctx);

        const { data } = await patientService.getPatientDetails(patientUUID.toString());
        pageProps.patient = data;

        await Promise.allSettled([
          immunisationApiService.getPatientImmunisation({ patientId: data.id }),
          allergyApiService.getPatientAllergies(data.id),
        ]).then(values => {
          values.forEach(({ value }: any, index) => {
            pageProps = {
              ...pageProps,
              [dataTypes[index]]: value?.data || [],
            };
          });
        });

        const products = await catalogApiService.getListProducts();
        pageProps.products = products.data;

        if (reqMethod === 'POST' || reqMethod === 'PUT' || reqMethod === 'DELETE') {
          const body = await parseBody(ctx.req, '1mb');
          body.patientId = pageProps.patient.id;

          // TODO: Create/Update/Delete allergy
          const selectedAllergy = pageProps.allergies.find(it => it.id?.toString() === allergyId);

          if (selectedAllergy && isConfirm) {
            const { originResponse } = await allergyApiService.updateAllergy(allergyId as string, body);
            const messageAPI =
              originResponse.status === 200
                ? 'Allergy has been successfully deleted'
                : `Can't delele this allergy, please contact administrator for more details`;
            return redirect(
              `${PAGE_URLS.PATIENT_ALLERGY(
                patientUUID.toString(),
              )}?message=${messageAPI}&titleMessage=New Prescription`,
            );
          }

          return {
            redirect: {
              permanent: false,
              destination: PAGE_URLS.PATIENT_ALLERGY(patientUUID.toString()),
            },
          };
        }

        // edit/delete allergy page
        if ((action === 'edit-allergy' || action === 'delete-allergy' || action === 'update-allergy') && allergyId) {
          const selectedAllergy = pageProps.allergies.find(it => it.id?.toString() === allergyId.toString());
          let changedMessage = null;

          if (selectedAllergy) {
            if (isConfirm) {
              const { originResponse } = await allergyApiService.deleteAllergy(allergyId as string);
              changedMessage =
                originResponse.status === 200
                  ? 'Allergy has been successfully deleted'
                  : `Can't delele this allergy, please contact administrator for more details`;
            } else {
              return {
                props: {
                  ...pageProps,
                  ...getAlertMessage(message as string, titleMessage as string),
                  selectedAllergy,
                  params: {
                    action,
                    patientUUID,
                  },
                },
              };
            }
          }
          return {
            redirect: {
              permanent: false,
              destination: `${PAGE_URLS.PATIENT_ALLERGY(patientUUID.toString())}${
                changedMessage ? `?message=${changedMessage}` : ''
              }`,
            },
          };
        }

        // allergy list page
        return {
          props: {
            ...pageProps,
            ...getAlertMessage(message as string, titleMessage as string),
            params: {
              patientUUID,
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
    const { patientUUID } = ctx.query;

    if (patientUUID) {
      const response = await patientAllergyPageApiServer(ctx);
      return redirect(
        `${PAGE_URLS.PATIENT_ALLERGY(patientUUID.toString())}?message=${response?.message}&titleMessage=${
          response?.titleMessage
        }`,
      );
    }
    return redirect(ctx.resolvedUrl);
  },
});

export default AddEditDeleteAllergyPage;
