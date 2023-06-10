import { Button } from '@mui/material';
import PatientListTabs from 'modules/patient/components/PatientList/patient-list-tabs';
import { PatientListItem } from 'modules/patient/components/PatientList/patient-list-types';
import PatientApiService from 'modules/patient/services';
import { useCallback } from 'react';
import { parseBody } from 'next/dist/server/api-utils/node';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import PatientListForm from 'modules/patient/components/PatientList/PatientListForm/patient-list-form';
import { AvixoListLayout, PlusOutlined } from 'share-components';
import Link from 'next/link';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import { formatDate } from 'share-components/src/utils/formatUtils';
import subDays from 'date-fns/subDays';
import { HSG_LIST_RECENTLY_ENROLLED } from 'modules/patient/constants';

interface PatientListProps {
  listItems: PatientListItem[];
  params: {
    action: string;
    listId: string;
  };
}

const PatientLists: React.FC<PatientListProps> = props => {
  const { listItems, params } = props;
  const { action } = params;
  const router = useRouter();

  const goToMainPage = useCallback(() => {
    router.push(ROUTES.PATIENT_LIST);
  }, [router]);

  return (
    <AvixoListLayout
      title="Patient List"
      actionButtons={
        <Link href={PAGE_URLS.PATIENT_LIST_ADD()} passHref>
          <Button startIcon={<PlusOutlined />}>New List</Button>
        </Link>
      }
    >
      <PatientListTabs listItems={listItems} />
      {action === 'add' && <PatientListForm open onCancel={goToMainPage} />}
    </AvixoListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const action = ctx.query.action as string;
    const patientService = new PatientApiService({}, ctx);

    const { data: listItems } = await patientService.getPatientLists();

    // Get Patients for HSG List - Recently Enrolled
    const enrolledListIndex = listItems.findIndex(it => it.name === HSG_LIST_RECENTLY_ENROLLED);
    if (enrolledListIndex > -1) {
      const scmsConnectorApiService = new SCMSConnectorApiService({}, ctx);
      const params = {
        dateFrom: formatDate(subDays(new Date(), 7).toISOString(), 'yyyy-MM-dd'),
        dateTo: formatDate(new Date().toISOString(), 'yyyy-MM-dd'),
      };

      try {
        const { data: patients } = await scmsConnectorApiService.getPatientsEnrolled(params);
        listItems[enrolledListIndex].patients = patients;
      } catch (e) {
        listItems[enrolledListIndex].patients = [];
      }
    }

    if (action && ctx.req.method === 'POST') {
      const body = await parseBody(ctx.req, '1mb');
      const { name, description } = body;
      await patientService.createPatientList({
        name,
        description,
      });

      return {
        redirect: {
          permanent: false,
          destination: ROUTES.PATIENT_LIST,
        },
      };
    }

    return {
      props: {
        listItems,
        params: {
          action: action || '',
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PatientLists;
