/*
  This is a page template for:
  - /patient/${patientId}/dispense/{dispenseUUID}/
  - /patient/${patientId}/dispense/{dispenseUUID}?action=add-item
  - /patient/${patientId}/dispense/{dispenseUUID}?action=edit-item&itemId=...
  - /patient/${patientId}/dispense/{dispenseUUID}?action=delete-item&itemId=...
  - /patient/${patientId}/dispense/{dispenseUUID}?action=history
  - /patient/${patientId}/dispense/{dispenseUUID}?action=history&sessionId=...
*/
import type { Patient } from 'modules/patient/types/patient';
import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { AvixoDrawerConfirm, PageProps } from 'share-components';
import { PAGE_URLS, ROUTES, SUCCESS_STATUSES } from 'share-components/src/constants';
import DispenseDetailsLayout from 'modules/dispense/components/DispenseDetails/dispense-details-layout';
import DispensingHisory from 'modules/dispense/components/DispenseDetails/dispense-history';
import DispenseDetailsTabs from 'modules/dispense/components/DispenseDetails/dispense-details-tabs';
import type { TopBoxLayout } from 'pages/_app';
import HistoryNavBar from 'modules/dispense/components/DispenseDetails/dispense-history-navbar';
import DispenseItemForm from 'modules/dispense/components/DispenseItemForm/dispense-item-form';
import { HISTORY_ITEMS } from 'modules/dispense/mockData';
import { Dispense } from 'modules/dispense/types/dispense';
import { DISPENSE_DETAILS_ACTION } from 'modules/dispense/constants';
import PrescriptionForm from 'modules/prescription/components/PrescriptionForm';
import DispenseApiService from 'modules/dispense/services';
import { handle, redirect } from 'next-runtime';
import patientDispensePageApiServer from 'common/service/patient-dispense-page-api';
import { Item } from 'modules/prescription/types/item';
import { Typography } from '@mui/material';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import PrescriptionDeleteForm from 'modules/prescription/components/PrescriptionDelete/prescription-delete-form';
import { formatDate } from 'share-components/src/utils/formatUtils';
import PractitionerApiService from 'modules/practitioner/services';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import OrganisationApiService from 'modules/organisation/services';
import Premise from 'modules/organisation/types/premise-types';

interface PatientDispenseDetailsPageProps extends PageProps {
  patient: Patient;
  dispense: Dispense;
  selectedItem?: Item;
  params: {
    patientUUID: string;
    dispenseUUID: string;
    sessionId: string;
    itemId: string | null;
    action: 'add-item' | 'edit-item' | 'delete-item' | 'view-history' | 'finalise-dispense' | 'delete-dispense' | null;
    showHistoryBar: boolean;
  };
  practitioner?: Practitioner;
  premise?: Premise;
}

const PatientDispenseDetailsPage: React.FC<PatientDispenseDetailsPageProps> & TopBoxLayout = ({
  params: { action, patientUUID, dispenseUUID, sessionId },
  dispense,
  patient,
  selectedItem,
  practitioner,
  premise,
}) => {
  const router = useRouter();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const goToMainPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_DISPENSING_DETAIL(patientUUID, dispenseUUID));
  }, [router, patientUUID, dispenseUUID]);

  const toggleDispensingHistory = useCallback(() => {
    router.push(
      PAGE_URLS.PATIENT_DISPENSING_DETAIL(
        patientUUID,
        dispenseUUID,
        !showHistory ? DISPENSE_DETAILS_ACTION.VIEW_HISTORY : '',
      ),
    );
    setShowHistory(!showHistory);
  }, [router, patientUUID, dispenseUUID, showHistory]);

  const toggleDispenseFinalisation = useCallback(() => {
    router.push(
      PAGE_URLS.PATIENT_DISPENSING_DETAIL(patientUUID, dispenseUUID, DISPENSE_DETAILS_ACTION.FINALISE_DISPENSE),
    );
  }, [router, patientUUID, dispenseUUID]);

  const renderActions = () => {
    switch (action) {
      case DISPENSE_DETAILS_ACTION.EDIT_ITEM: {
        let initData: unknown;

        if (selectedItem) {
          // the currently apply for inventory
          const { instructions, ...restItem } = selectedItem;
          initData = {
            id: restItem.id || selectedItem.ID, // TODO: Remove selectedItem.ID once BE fix property name in the API
            patientId: patient.id,
            addFromName: 'inventory',
            inventory: restItem,
            instructions: instructions || [],
          };
        }
        return (
          <DispenseItemForm initData={initData as Item} dispense={dispense} patient={patient} onClose={goToMainPage} />
        );
      }
      case DISPENSE_DETAILS_ACTION.ADD_ITEM:
        return (
          <PrescriptionForm
            action="create-dispense-item"
            patient={patient}
            title="Add Item"
            display
            onClose={goToMainPage}
            type="dispenseUUID"
            typeId={dispenseUUID}
          />
        );
      case DISPENSE_DETAILS_ACTION.DELETE_ITEM:
        return selectedItem ? (
          <AvixoDrawerConfirm
            open
            handleClose={goToMainPage}
            inputProps={{
              name: 'reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Need to be deleted',
            }}
            action="delete-dispense-item"
            id={selectedItem.id || selectedItem.ID} // TODO: Remove selectedItem.ID once BE fix property name in the API
            title="Delete Item?"
            moreActions={[
              { name: 'dispenseId', value: dispense?.id ?? 0 },
              { name: 'nameItem', value: selectedItem?.name ?? '' },
            ]}
            confirmContent={
              <Typography variant="body2">
                <strong>{selectedItem?.name}</strong> will be deleted from {patient.fullName}’s prescription history
                list. This action cannot be undone.
              </Typography>
            }
          />
        ) : null;
      case DISPENSE_DETAILS_ACTION.VIEW_HISTORY:
        if (sessionId) {
          return '';
        }
        return <DispensingHisory items={HISTORY_ITEMS} showHistory setShowHistory={toggleDispensingHistory} />;
      case DISPENSE_DETAILS_ACTION.DELETE_DISPENSE:
        return (
          <PrescriptionDeleteForm
            handleClose={goToMainPage}
            patient={patient}
            id={dispense.id ?? 0}
            title="Delete Dispense?"
            action="delete-dispense"
            description={`You are about to delete DP-${formatDate(
              dispense?.createdAt,
              'dd/MM/yy hh:mm a',
            )}. This action cannot be undone.`}
            moreActions={[{ name: 'dispenseId', value: dispense?.id ?? 0 }]}
          />
        );
      default:
        return '';
    }
  };

  return (
    <DispenseDetailsLayout
      patient={patient}
      dispense={dispense}
      practitioner={practitioner}
      premise={premise}
      onHistoryClick={toggleDispensingHistory}
      onFinaliseClick={toggleDispenseFinalisation}
    >
      <DispenseDetailsTabs patient={patient} dispense={dispense} prescriptions={dispense?.items || []} />
      {renderActions()}
    </DispenseDetailsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, dispenseUUID, action, itemId, sessionId, message, titleMessage } = ctx.query;
    const pageProps = {} as PatientDispenseDetailsPageProps;
    pageProps.message = (message as string) ?? null;
    pageProps.titleMessage = (titleMessage as string) ?? null;

    if (patientUUID && dispenseUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);

        const { data } = await patientService.getPatientDetails(patientUUID.toString());
        pageProps.patient = data;

        const dispenseService = new DispenseApiService({}, ctx);
        const { data: dispense } = await dispenseService.getDispenseDetail(dispenseUUID as string, 'uuid');
        const { data: items } = await dispenseService.getDispenseItems(dispense.id);
        pageProps.dispense = dispense;
        pageProps.dispense.items = items;

        if (dispense) {
          const { premiseId = 0, prescribedBy = 0 } = dispense;

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

        switch (action) {
          case DISPENSE_DETAILS_ACTION.EDIT_ITEM:
          case DISPENSE_DETAILS_ACTION.DELETE_ITEM:
            if (itemId) {
              pageProps.selectedItem = pageProps.dispense.items?.find(it => String(it.ID) === String(itemId));
            }
            break;
          case DISPENSE_DETAILS_ACTION.VIEW_HISTORY:
            if (sessionId) {
              // TODO: Get dispense history details
            }
            break;
          case DISPENSE_DETAILS_ACTION.FINALISE_DISPENSE:
            if (dispense) {
              const {
                originResponse: { status: dispenseFinaliseStatus },
              } = await dispenseService.finaliseDispense(dispense.id);

              // Submit the dispense to NEHR via the NEHR connector.
              // The API for Submit is not implemented but can just continue with the integration. 404 is fine.
              if (SUCCESS_STATUSES.includes(dispenseFinaliseStatus)) {
                const NEHRService = new NEHRConnectorApiService(ctx, {});
                NEHRService.submitDispenseToNEHR(dispense.id).catch(e => {
                  console.error('Error when calling nehr service for dispense creation', e);
                });
              }

              return {
                redirect: {
                  permanent: false,
                  destination: PAGE_URLS.PATIENT_DISPENSING_DETAIL(patientUUID.toString(), dispenseUUID.toString()),
                },
              };
            }
            break;

          default:
        }

        return {
          props: {
            ...pageProps,
            params: {
              action: action || '',
              itemId: itemId || '',
              sessionId: sessionId || '',
              dispenseUUID,
              patientUUID,
              showHistoryNavBar: !!sessionId,
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
    const { patientUUID, dispenseUUID } = ctx.query;
    if (patientUUID && dispenseUUID) {
      const response = await patientDispensePageApiServer(ctx, patientUUID as string);
      let message = response?.message;

      if (response?.status === 201) {
        message = response?.message ? response?.message : 'has been successfully added';
      }

      const {
        body: { action },
      } = ctx.req;
      if (action === DISPENSE_DETAILS_ACTION.DELETE_DISPENSE) {
        return redirect(`${ROUTES.DISPENSE}?message=${message}&titleMessage=${response?.titleMessage}`);
      }

      return redirect(
        `${PAGE_URLS.PATIENT_DISPENSING_DETAIL(
          patientUUID.toString(),
          dispenseUUID.toString(),
        )}?message=${message}&titleMessage=${response?.titleMessage}`,
      );
    }

    return redirect(ctx.resolvedUrl);
  },
});

export default PatientDispenseDetailsPage;

PatientDispenseDetailsPage.getTopBox = function getTopBox(props: any) {
  if (props?.params?.showHistoryNavBar) {
    return { topBox: <HistoryNavBar />, height: 80 };
  }
  return null;
};
