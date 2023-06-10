import PatientApiService from 'modules/patient/services';
import { useCallback } from 'react';
import { parseBody } from 'next/dist/server/api-utils/node';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AvixoFixedContainer, AvixoListLayout, ExportIcon, PlusOutlined } from 'share-components';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import PatientListDetailTabs from 'modules/patient/components/PatientList/PatientListDetail/patient-list-detail-tabs';
import AddPatientToList from 'modules/patient/components/PatientList/AddPatientToList/add-patient-to-list';
import DeletePatientFromList from 'modules/patient/components/PatientList/DeletePatientFromList/delete-patient-from-list';
import { Patient } from 'modules/patient/types/patient';
import DeleteList from 'modules/patient/components/PatientList/DeleteList/delete-list';
import PatientListForm from 'modules/patient/components/PatientList/PatientListForm/patient-list-form';
import Link from 'next/link';
import { Button } from '@mui/material';
import EnrolledList from 'modules/hsg/components/EnrollList/enrolled-list';
import { PatientListItem } from 'modules/patient/components/PatientList/patient-list-types';
import { DEFAULT_PAGE_SIZE_PATIENT, HSG_LIST_RECENTLY_ENROLLED } from 'modules/patient/constants';

interface PatientListDetailsProps {
  listData: PatientListItem;
  allPatientsList: Patient[];
  isHSGListEnrolled: boolean;
  params: {
    action: string;
    patientUUID?: string;
  };
}

const PatientListDetails: React.FC<PatientListDetailsProps> = props => {
  const { listData, params, allPatientsList, isHSGListEnrolled } = props;
  const { action, patientUUID } = params;
  const { id, name, description } = listData;
  const router = useRouter();

  const goTo = useCallback(
    (type: string) => {
      if (type === 'list') {
        router.push(ROUTES.PATIENT_LIST);
      } else if (type === 'viewList') {
        router.push(PAGE_URLS.PATIENT_LIST_DETAILS(id));
      }
    },
    [router, id],
  );

  const patientName = listData.patients.find((patient: Patient) => patient.uuid === patientUUID)?.fullName;

  const renderAction = () => {
    switch (action) {
      case 'edit':
        return <PatientListForm open initData={{ id, name, description }} onCancel={() => goTo('viewList')} />;

      case 'delete':
        return <DeleteList title={`Remove ${listData.name}?`} onClose={() => goTo('list')} />;

      case 'delete-patient':
        return patientName ? (
          <DeletePatientFromList title={`Remove ${patientName} from the list?`} onClose={() => goTo('viewList')} />
        ) : null;

      case 'add-patient-to-list':
        return (
          <AvixoFixedContainer title={`Add patients to ${listData?.name}`} display onClose={() => goTo('viewList')}>
            <AddPatientToList patients={listData.patients} allPatientsList={allPatientsList} />
          </AvixoFixedContainer>
        );

      default:
        return '';
    }
  };

  return (
    <AvixoListLayout
      title={listData.name}
      subTitle={listData.description}
      actionButtons={
        <>
          <Link href={PAGE_URLS.PATIENT_LIST_DETAILS_EDIT(id)} passHref>
            <Button startIcon={<ExportIcon />} color="whiteLight">
              Edit List Info
            </Button>
          </Link>
          <Link href={PAGE_URLS.PATIENT_LIST_DETAILS_ADD_PATIENT_TO_LIST(id)} passHref>
            <Button startIcon={<PlusOutlined />}>New Patient to List</Button>
          </Link>
        </>
      }
    >
      {isHSGListEnrolled ? (
        <EnrolledList patients={listData.patients} />
      ) : (
        <PatientListDetailTabs listData={listData} />
      )}
      {renderAction()}
    </AvixoListLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const action = ctx.query.action as string;
    const listId = ctx.query.listId as string;
    const patientUUID = ctx.query.patientUUID as string;
    let pageProps = {} as PatientListDetailsProps;
    const patientService = new PatientApiService({}, ctx);
    const { data } = await patientService.getPatientListDetails(listId);
    const isHSGListEnrolled = data.name === HSG_LIST_RECENTLY_ENROLLED;

    if (action === 'add-patient-to-list') {
      const allPatients = await patientService.getPatients(DEFAULT_PAGE_SIZE_PATIENT);
      pageProps = {
        ...pageProps,
        allPatientsList: allPatients?.data || [],
      };
    }

    pageProps = {
      ...pageProps,
      listData: data,
      isHSGListEnrolled,
      params: {
        action: action || '',
        patientUUID: patientUUID || '',
      },
    };

    if (ctx.req.method === 'POST') {
      const body = await parseBody(ctx.req, '1mb');
      switch (action) {
        case 'delete': {
          const { reason } = body;
          await patientService.deletePatientList(listId, {
            reason,
          });
          return {
            redirect: {
              permanent: false,
              destination: ROUTES.PATIENT_LIST,
            },
          };
        }
        case 'edit': {
          const { name, description } = body;
          await patientService.updatePatientList(listId as string, {
            name,
            description,
          });

          return {
            redirect: {
              permanent: false,
              destination: PAGE_URLS.PATIENT_LIST_DETAILS(listId),
            },
          };
        }
        case 'delete-patient':
          await patientService.deletePatientFromList(listId, patientUUID);
          return {
            redirect: {
              permanent: false,
              destination: PAGE_URLS.PATIENT_LIST_DETAILS(listId),
            },
          };
        default:
      }
    }

    return {
      props: pageProps,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PatientListDetails;
