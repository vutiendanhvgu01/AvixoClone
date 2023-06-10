import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import PatientFilter from 'modules/patient/components/PatientFilter/patient-filter';
import PatientApiService from 'modules/patient/services';
import { PatientListItem } from 'modules/patient/components/PatientList/patient-list-types';
import PatientManagementTabs from 'modules/patient/components/PatientManagement/patient-management-tabs';
import { HSG_LIST_RECENTLY_ENROLLED, PATIENT_MANAGEMENT_ACTION } from 'modules/patient/constants';
import AddPatientForm from 'modules/patient/components/AddEditPatient/add-edit-patient-form';
import { AvixoListLayout, ExportIcon, ImportIcon, PlusOutlined } from 'share-components';
import Link from 'next/link';
import { handle, redirect } from 'next-runtime';
import patientManagementPageApiServer from 'common/service/patient-management-page-api';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import { formatDate } from '@AvixoUtils/formatUtils';
import { subDays } from 'date-fns';

interface PatientManagementPageProps {
  patientList: PatientListItem[];
  selectedList: PatientListItem;
  activeTab: number;
  params: {
    listId: string;
    action: string;
  };
}

const PatientManagementPage: React.FC<PatientManagementPageProps> = ({
  patientList,
  activeTab,
  selectedList,
  params: { listId, action },
}) => {
  const router = useRouter();

  const goToMainPage = useCallback(() => {
    router.push(ROUTES.PATIENT_MANAGEMENT);
  }, [router]);

  const renderActions = () => {
    switch (action) {
      case PATIENT_MANAGEMENT_ACTION.ADD_PATIENT:
        return <AddPatientForm type="add" onCancel={goToMainPage} />;

      case PATIENT_MANAGEMENT_ACTION.SEARCH:
        return <PatientFilter onClose={goToMainPage} />;

      default:
        return '';
    }
  };

  return (
    <AvixoListLayout
      title="All Patients"
      actionButtons={
        <>
          <Button startIcon={<ImportIcon />} color="whiteLight">
            Import
          </Button>
          <Button startIcon={<ExportIcon />} color="whiteLight">
            Export
          </Button>
          <Link href={ROUTES.PATIENT_MANAGEMENT_ADD}>
            <Button startIcon={<PlusOutlined />}>New Patient</Button>
          </Link>
        </>
      }
    >
      <PatientManagementTabs
        activeTab={activeTab}
        patients={selectedList?.patients || []}
        patientList={patientList}
        selectedList={listId}
      />
      {renderActions()}
    </AvixoListLayout>
  );
};

const getActiveTab = (isNew?: string, isDeleted?: string) => {
  switch (true) {
    case isNew === 'true':
      return 1;
    case isDeleted === 'true':
      return 2;
    default:
      return 0;
  }
};

export const getServerSideProps = handle({
  async get(ctx) {
    const dataTypes = ['patientList'];
    const { action, listId, isNew, isDeleted } = ctx.query;
    let pageProps = {
      activeTab: getActiveTab(isNew?.toString(), isDeleted?.toString()),
      params: {
        listId: listId?.toString() || '',
        action: action || '',
      },
    } as PatientManagementPageProps;

    const patientService = new PatientApiService({}, ctx);
    await Promise.allSettled([patientService.getPatientLists()]).then(values => {
      values.forEach(({ value }: any, index) => {
        pageProps = {
          ...pageProps,
          [dataTypes[index]]: value?.data || [],
        };
      });
    });

    let selectedList = pageProps.patientList.find(it => it.isPrimaryList);
    if (listId) {
      selectedList = pageProps.patientList.find(it => it.id.toString() === listId.toString());
    }

    // Get Patients for HSG List - Recently Enrolled
    if (selectedList?.name === HSG_LIST_RECENTLY_ENROLLED) {
      const scmsConnectorApiService = new SCMSConnectorApiService({}, ctx);
      const params = {
        dateFrom: formatDate(subDays(new Date(), 7).toISOString(), 'yyyy-MM-dd'),
        dateTo: formatDate(new Date().toISOString(), 'yyyy-MM-dd'),
      };

      try {
        const { data: patients } = await scmsConnectorApiService.getPatientsEnrolled(params);
        selectedList.patients = patients;
      } catch (e) {
        selectedList.patients = [];
      }
    }

    return {
      props: {
        ...pageProps,
        selectedList,
      },
    };
  },

  async post(ctx) {
    const action = ctx.query.action || ctx.req.body.action;
    const response = await patientManagementPageApiServer(ctx);
    const params = `message=${response?.message}&titleMessage=${response?.titleMessage}`;

    switch (action) {
      case PATIENT_MANAGEMENT_ACTION.ADD_PATIENT:
        return redirect(`${ROUTES.PATIENT_MANAGEMENT}?${params}`);
      case PATIENT_MANAGEMENT_ACTION.CREATE_PRESCIPTION:
        return redirect(
          `${PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(response.data.patientUUID, response.data.uuid)}?${params}`,
        );

      default:
        return redirect(ctx.resolvedUrl);
    }
  },
});

export default PatientManagementPage;
