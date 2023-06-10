/*
  This is a page template for:
  - /patient/${patientId}/prescription/{prescriptionUUId}/
  - /patient/${patientId}/prescription/{prescriptionUUId}/item/add
  - /patient/${patientId}/prescription/{prescriptionUUId}/item/{itemId}/edit
  - /patient/${patientId}/prescription/{prescriptionUUId}/item/{itemId}/delete
*/
import patientPrescriptionPageApiServer from 'common/service/patient-prescription-page-api';
import DispenseApiService from 'modules/dispense/services';
import { Dispense } from 'modules/dispense/types/dispense';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';

import PrescriptionDeleteForm from 'modules/prescription/components/PrescriptionDelete/prescription-delete-form';
import PrescriptionDetailsLayout from 'modules/prescription/components/PrescriptionDetails/prescription-details-layout';
import PrescriptionForm from 'modules/prescription/components/PrescriptionForm';
import { InventoryValues } from 'modules/prescription/components/PrescriptionForm/types';
import PrescriptionMedicationsList from 'modules/prescription/components/PrescriptionList/prescription-medications-list';
import PrescriptionApiService from 'modules/prescription/service';
import { Item } from 'modules/prescription/types/item';
import { Prescription } from 'modules/prescription/types/prescription';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoTabs, getAlertMessage, PageProps } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { PAGE_URLS, SUCCESS_STATUSES } from 'share-components/src/constants';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import PractitionerApiService from 'modules/practitioner/services';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import OrganisationApiService from 'modules/organisation/services';
import Premise from 'modules/organisation/types/premise-types';

interface ViewAddEditDeletePrescriptionPageProps extends PageProps {
  patient: Patient;
  prescription: Prescription;
  dispense: Dispense;
  item: Partial<InventoryValues>;
  params: {
    patientUUID: string;
    itemId: string | null;
    prescriptionUUId: string;
    action: 'add' | 'edit' | 'delete' | 'finalise' | 'delete-prescription' | null;
  };
  practitioner?: Practitioner;
  premise?: Premise;
}

const getTabs = (prescriptionMedications: Item[], patient: Patient, prescription: Prescription) => [
  {
    label: 'List of Prescription Medications',
    component: (
      <PrescriptionMedicationsList
        prescriptionMedications={prescriptionMedications}
        patient={patient}
        prescription={prescription}
      />
    ),
  },
];

const ViewAddEditDeletePrescriptionPage: React.FC<ViewAddEditDeletePrescriptionPageProps> = ({
  params: { action = null, patientUUID },
  patient,
  prescription,
  dispense,
  item,
  practitioner,
  premise,
}) => {
  const router = useRouter();

  const goToPrescriptionDetailsPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID, prescription.uuid));
  }, [router, patientUUID, prescription]);

  const renderActions = () => {
    if (action) {
      switch (action) {
        case 'edit': {
          let initialData: unknown;

          if (item) {
            // the currently apply for inventory
            const { instructions, ...restItem } = item;
            initialData = {
              id: restItem?.id,
              patientId: patient?.id,
              addFromName: 'inventory',
              inventory: restItem,
              instructions,
            };
          }
          return (
            <PrescriptionForm
              action="update-prescription"
              initialData={initialData}
              type="prescriptionId"
              typeId={`${prescription.id}`}
              title="Edit Prescription"
              display
              onClose={() => {
                router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID, `${prescription.uuid}`));
              }}
              onDelete={() => {
                router.push(
                  PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL_ITEM(patient.uuid, prescription.uuid, item.id, 'delete'),
                );
              }}
              patient={patient}
            />
          );
        }
        case 'add':
          return (
            <PrescriptionForm
              action="create-prescription"
              type="prescriptionId"
              typeId={`${prescription.id}`}
              title="Add Item"
              display
              onClose={() => {
                router.push(PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID, prescription.uuid));
              }}
              patient={patient}
            />
          );
        case 'delete':
          return (
            <PrescriptionDeleteForm
              handleClose={goToPrescriptionDetailsPage}
              patient={patient}
              item={item}
              id={item.id ?? 0}
              moreActions={[
                { name: 'prescriptionId', value: prescription?.id ?? 0 },
                { name: 'nameItem', value: item?.name ?? '' },
              ]}
            />
          );
        case 'delete-prescription':
          return (
            <PrescriptionDeleteForm
              handleClose={goToPrescriptionDetailsPage}
              patient={patient}
              item={item}
              id={prescription.id ?? 0}
              title="Delete Prescription?"
              action="delete-prescription"
              description={`You are about to delete PS-${formatDate(
                prescription?.createdAt,
                'dd/MM/yy hh:mm a',
              )}. This action cannot be undone.`}
              moreActions={[
                { name: 'prescriptionId', value: prescription?.id ?? 0 },
                { name: 'nameItem', value: prescription?.createdAt ?? '' },
              ]}
            />
          );
        default:
          return '';
      }
    }
    return '';
  };

  return (
    <PrescriptionDetailsLayout
      patient={patient}
      prescription={prescription}
      dispense={dispense}
      practitioner={practitioner}
      premise={premise}
    >
      <AvixoTabs tabsData={getTabs(prescription?.items || [], patient ?? {}, prescription ?? {})} />
      {renderActions()}
    </PrescriptionDetailsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, prescriptionIdAction, action: queryAction, message, titleMessage } = ctx.query;
    const pageProps = {} as ViewAddEditDeletePrescriptionPageProps;

    if (patientUUID && prescriptionIdAction) {
      try {
        const patientService = new PatientApiService({}, ctx);

        const { data: patientData } = await patientService.getPatientDetails(patientUUID.toString());
        pageProps.patient = patientData;
        const prescriptionUUID = prescriptionIdAction[0].toString();
        const prescriptionService = new PrescriptionApiService({}, ctx);
        const dispenseService = new DispenseApiService({}, ctx);

        let action = prescriptionIdAction[2] || null;
        let itemId = null;

        /* eslint-disable prefer-destructuring */
        if (prescriptionIdAction.length === 4) {
          action = prescriptionIdAction[3];
          itemId = prescriptionIdAction[2];
        }
        if (
          prescriptionUUID ||
          (prescriptionUUID && action === 'add') ||
          (itemId && (action === 'edit' || action === 'delete'))
        ) {
          // call API get prescription by patient id and prescription id
          const { data: prescriptionData } = await prescriptionService.getPrescriptionDetail(prescriptionUUID);

          if (prescriptionData) {
            const { premiseId = 0, prescribedBy = 0 } = prescriptionData;

            if (prescribedBy) {
              const practitionerService = new PractitionerApiService({}, ctx);
              const { data: practitionerData } = await practitionerService.getPatientPractitioner(prescribedBy);
              pageProps.practitioner = practitionerData;
            }

            if (premiseId) {
              const organisationService = new OrganisationApiService({}, ctx);
              const { data: premiseData } = await organisationService.getPremiseDetails(premiseId);
              pageProps.premise = premiseData;
            }
          }
          if (!prescriptionData?.isDraft) {
            const { data: dispenseList } = await dispenseService.getDispenseListByTypeId('patientId', patientData.id);
            if (dispenseList && dispenseList.length > 0) {
              pageProps.dispense = dispenseList.slice(-1)[0];
            }
          }

          if (queryAction === 'finalise' && prescriptionData?.id) {
            const {
              originResponse: { status: prescriptionFinaliseStatus },
            } = await prescriptionService.finalisePrescription(prescriptionData.id.toString());

            // Submit the prescription to NEHR via the NEHR connector.
            // The API for Submit is not implemented but can just continue with the integration. 404 is fine.
            if (SUCCESS_STATUSES.includes(prescriptionFinaliseStatus)) {
              const NEHRService = new NEHRConnectorApiService(ctx, {});
              NEHRService.submitPrescriptionToNEHR(prescriptionData.id.toString()).catch(e => {
                console.error('Error when calling nehr service for prescription creation', e);
              });
            }

            const {
              originResponse: { status },
            } = await dispenseService.createDispense({
              prescriptionId: prescriptionData.id,
              patientId: patientData.id,
              isDraft: true,
            });
            if (status === 201) {
              return {
                redirect: {
                  permanent: false,
                  destination: PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(patientUUID.toString(), prescriptionUUID),
                },
              };
            }
          }

          if (itemId && prescriptionData?.id) {
            // call API get item detail by itemID from Prescription detail
            const { data: itemData } = await prescriptionService.getPrescriptionItemDetail(
              prescriptionData?.id,
              itemId,
            );
            if (itemData) {
              pageProps.item = itemData;
            }
          }
          pageProps.prescription = prescriptionData;
          return {
            props: {
              ...pageProps,
              ...getAlertMessage(message as string, titleMessage as string),
              params: {
                action: action || queryAction || null,
                prescriptionUUID,
                patientUUID,
                itemId,
              },
            },
          };
        }

        return {
          redirect: {
            permanent: false,
            destination: PAGE_URLS.PATIENT_PRESCRIPTION(patientUUID.toString()),
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
    const { patientUUID, prescriptionIdAction } = ctx.query;
    if (patientUUID && prescriptionIdAction) {
      const prescriptionUUID = prescriptionIdAction[0] ?? 0;
      const response = await patientPrescriptionPageApiServer(ctx);

      let message = response?.message;
      const {
        body: { action },
      } = ctx.req;
      if (action === 'delete-prescription') {
        return redirect(`${PAGE_URLS.PRESCRIPTION()}?message=${message}&titleMessage=${response?.titleMessage}`);
      }

      if (response?.status === 201) {
        message = response?.message ? response?.message : 'has been successfully added';
      }
      return redirect(
        `${PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(
          patientUUID.toString(),
          prescriptionUUID,
        )}?message=${message}&titleMessage=${response?.titleMessage}`,
      );
    }
    return redirect(ctx.resolvedUrl);
  },
});

export default ViewAddEditDeletePrescriptionPage;
