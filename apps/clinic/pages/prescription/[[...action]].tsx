import { Box } from '@mui/system';
import patientPrescriptionPageApiServer from 'common/service/patient-prescription-page-api';
import PatientApiService from 'modules/patient/services';
import PrescriptionListHeader from 'modules/prescription/components/PrescriptionList/prescription-list-header';
import PrescriptionListTab from 'modules/prescription/components/PrescriptionList/prescription-list-tab';
import type { Prescription } from 'modules/prescription/types/prescription';
import React, { FC, useCallback } from 'react';
import { AvixoTabData, isDataProps, AvixoTabs, getAlertMessage, PageProps } from 'share-components';
import PrescriptionApiService from 'modules/prescription/service';
import { handle, redirect } from 'next-runtime';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';

const PrescriptionForm = dynamic(() => import('modules/prescription/components/PrescriptionForm'), {
  loading: () => <div>Loading...</div>,
});

interface PrescriptionPageProps extends PageProps {
  prescriptions: Prescription[];
  params: {
    action: string;
    prescriptionId?: number;
  };
}

const Tabs = (prescriptions: Prescription[]): AvixoTabData[] => [
  {
    label: 'All Prescriptions',
    url: PAGE_URLS.PRESCRIPTION(),
    component: <PrescriptionListTab prescriptions={prescriptions} />,
  },
  {
    label: 'Deleted Prescriptions',
    url: `${PAGE_URLS.PRESCRIPTION()}?is-deleted=true`,
    component: <div>Deleted Prescriptions</div>,
  },
];

const PrescriptionPage: FC<PrescriptionPageProps> = ({ prescriptions, params: { action } }) => {
  const router = useRouter();

  const goToPrescriptionListPage = useCallback(() => {
    router.push(ROUTES.PRESCRIPTION);
  }, [router]);

  return (
    <Box>
      <PrescriptionListHeader />
      <AvixoTabs
        sxProps={{
          container: { background: '#fff', borderRadius: '16px 16px 0 0', color: '#000', minHeight: 'inherit' },
        }}
        tabsData={Tabs(prescriptions)}
      />
      {action === 'add' && (
        <PrescriptionForm
          title="Create New Prescription"
          display
          onClose={goToPrescriptionListPage}
          action="create-prescription"
        />
      )}
    </Box>
  );
};

export const getServerSideProps = handle({
  async get(ctx) {
    const { action, message, titleMessage, offset, limit } = ctx.query;
    let prescriptionsPageProps: unknown;
    try {
      const prescriptionApiService = new PrescriptionApiService({}, ctx);
      let prescriptions = (await prescriptionApiService.getPrescriptions({ offset, limit })).data;
      prescriptionsPageProps = {
        prescriptions: [],
      };
      if (isDataProps<PrescriptionPageProps>(prescriptionsPageProps)) {
        if (prescriptions.length > 0) {
          const patientService = new PatientApiService({}, ctx);
          const patientIds = [...new Set(prescriptions.map((prescription: Prescription) => prescription.patientId))];
          const patientsData = await Promise.all(
            patientIds.map(patientId => patientService.getPatientDetails(patientId as string, 'id').catch(e => e)),
          );
          const patientMap = new Map();
          patientsData
            .filter(item => !(item instanceof Error))
            .forEach(patientData => {
              const patient = patientData?.data;
              patientMap.set(patient.id, patient);
            });
          prescriptions.forEach((prescription: Prescription, index: number) => {
            prescriptions[index].patient = patientMap.get(prescription.patientId);
          });
          prescriptions = prescriptions.filter((prescription: Prescription) => prescription.patient);
        }

        if (action) {
          if (action?.length > 1) {
            return {
              notFound: true,
            };
          }

          if (action?.length === 1 && Number(action[0]) > 0) {
            return {
              props: {
                ...getAlertMessage(message as string, titleMessage as string),
                prescriptions,
                params: {
                  prescriptionId: action[0],
                },
              },
            };
          }

          return {
            props: {
              ...getAlertMessage(message as string, titleMessage as string),
              prescriptions,
              params: {
                action: 'add',
              },
            },
          };
        }

        return {
          props: {
            ...getAlertMessage(message as string, titleMessage as string),
            prescriptions,
            params: {},
          },
        };
      }
    } catch (error) {
      return {
        notFound: true,
      };
    }

    return {
      notFound: true,
    };
  },
  async post(ctx) {
    const response = await patientPrescriptionPageApiServer(ctx);
    let message = 'Fail to create';

    if (response?.status === 201) {
      message = 'has been successfully added';
    }
    return redirect(`${ROUTES.PRESCRIPTION}?message=${message}&titleMessage=New Prescription`);
  },
});

export default PrescriptionPage;
