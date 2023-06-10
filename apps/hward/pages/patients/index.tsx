import { Box, Typography } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import { FormikConfig } from 'formik';
import DashboardHeader from 'modules/Dashboard/components/dashboard-header';
import HwardTable from 'common/components/HwardTable/hward-table';
import { initialPatientFormData, PatientFormValues } from 'modules/patient/components/patient-types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { AvixoSnackbar, AvixoTable, getCookieValue, PageProps } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import PatientApiService from 'modules/patient/api/patient-api';
import mapPatientsData, { FormattedPatientData } from 'modules/patient/utils/mapPatientsData';
import snackbarMessages from 'modules/patient/utils/snackbarMesages';
import { PAGE_URLS } from 'share-components/src/constants';
import WelcomeSpeedoc from 'common/components/WelcomeSpeedoc';
import AddButton from 'common/components/AddButton';
import PatientsList from 'modules/patient/components/patients-list';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import usePatients from 'modules/patient/hooks/usePatients';
import useEnrolPatient from 'modules/patient/hooks/useEnrolPatient';
import { GetPatientsParams } from 'modules/patient/api/patient-api-type';
import DEFAULT_PAGINATION_OPTIONS from 'common/constants/paginationOptions';
import LoadMore from 'common/components/LoadMore/load-more';
import usePagination from 'common/hooks/usePagination';

const PatientForm = dynamic(() => import('modules/patient/components/patient-form'), { ssr: false });

interface PatientsPagePageProps extends PageProps {
  organizationRef: string;
}

const columns = [
  {
    id: 'name',
    field: 'name',
    label: 'PATIENT NAME',
    alignLabel: 'left',
    customRender: patient => (
      <Box>
        <Typography variant="subtitle2">{patient.fullname}</Typography>
        <Typography variant="caption" component="span">{`${patient.age} years old, ${patient.gender}`}</Typography>
      </Box>
    ),
  },
  {
    id: 'nric',
    field: 'nric',
    label: 'NRIC',
    alignLabel: 'left',
    customRender: patient => <Typography variant="subtitle2">{patient.censoredNRIC}</Typography>,
  },
  {
    id: 'enrolmentDate',
    field: 'enrolmentDate',
    label: 'ENROLMENT DATE',
    alignLabel: 'left',
    customRender: patient => <Typography variant="subtitle2">{patient.enrolmentDate}</Typography>,
  },
] as AvixoTableColumnProps<FormattedPatientData>[];

const PatientsPage: React.FC<PatientsPagePageProps> = ({ organizationRef }) => {
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const isMobile = useIsMobile();
  const {
    paginationOptions,
    search,
    handleSearch,
    handlePageSizeChange,
    loadMoreRef,
    setHandlePagination,
    onTablePageChange,
  } = usePagination();
  const {
    data: patientsList,
    fetchNextPage,
    fetchPreviousPage,
    status,
    isFetching,
    refetch,
  } = usePatients({
    organizationRef,
    search,
    perPage: paginationOptions.perPage,
  });
  const activePage = paginationOptions.page;
  const patients = patientsList?.pages?.[activePage]?.patients;
  const totalPatients = patientsList?.pages?.[0]?.totalPatients ?? 0;

  const close = () => setOpen(false);
  const closeSnackbar = useCallback(() => {
    setShowNotification(false);
    setSnackbarMessage('');
  }, []);
  const router = useRouter();

  useEffect(() => {
    setHandlePagination({ fetchNextPage, fetchPreviousPage });
  }, [fetchNextPage, fetchPreviousPage, setHandlePagination]);

  const patientEnrolment = useEnrolPatient({
    onSuccess: data => {
      if (data.status === 400 && !!data.patientId) {
        setShowNotification(false);
        router.push(PAGE_URLS.HWARD_PATIENT_DETAILS(data.patientId));
      } else if (data.status === 200) {
        refetch();
        close();
        setShowNotification(true);
        setSnackbarMessage(snackbarMessages.success(data.fullName, data.caseId));
      }
    },
    onError: (error, variables) => {
      setShowNotification(true);
      if (error.message === 'Error: Email or nric already used') {
        setSnackbarMessage(snackbarMessages.duplicate(variables.fullName));
      } else {
        setSnackbarMessage(snackbarMessages.error);
      }
    },
  });
  const onRowClick = useCallback(
    (uuid: string) => {
      router.push(PAGE_URLS.HWARD_PATIENT_DETAILS(uuid));
    },
    [router],
  );

  const onSubmit: FormikConfig<PatientFormValues>['onSubmit'] = async values => {
    await patientEnrolment.mutateAsync(values);
  };

  return (
    <Box>
      <DashboardHeader
        renderLeft={() => <WelcomeSpeedoc />}
        renderRight={() => (
          <AddButton testid="enroll-patient" title="Enrol New Patient" handleClick={() => setOpen(prev => !prev)} />
        )}
        renderBottom={() => (
          <AddButton
            testid="enroll-patient"
            title="Enrol New Patient"
            handleClick={() => setOpen(prev => !prev)}
            fullWidth
          />
        )}
      >
        <PatientForm
          formTitle="Enrol New Patient"
          open={open}
          onCancel={close}
          initData={initialPatientFormData}
          onSubmit={onSubmit}
        />
        <AvixoSnackbar
          open={showNotification}
          onClose={closeSnackbar}
          actionText="Dismiss"
          autoHideDuration={2000}
          showActionButton={!isMobile}
          showIconButton={false}
          handleAction={closeSnackbar}
          sx={{ bottom: '42px !important' }}
          ContentProps={{
            message: (
              <Box sx={{ maxWidth: 265 }}>
                <Typography variant="caption" color="#fff">
                  {/* eslint-disable-next-line react/no-danger */}
                  <div dangerouslySetInnerHTML={{ __html: snackbarMessage }} />
                </Typography>
              </Box>
            ),
          }}
        />
      </DashboardHeader>
      <HwardTable
        title={`Patients (${totalPatients})`}
        placeholder="Search patient name or NRIC..."
        onSearchChange={handleSearch}
        table={
          <AvixoTable
            loading={isFetching}
            columns={columns}
            onRowClick={e => onRowClick(e.uuid)}
            data={{ records: patients ?? [] }}
            primaryKey="_id"
            hasCheckBoxHeader={false}
            emptyText="There are no patients found."
            mode="remote"
            pagination={{
              total: totalPatients,
              pageSize: paginationOptions.perPage,
              currentPage: paginationOptions.page,
              pageSizeOptions: [10, 20, 50],
              onPageChange: onTablePageChange,
              onPageSizeChange: handlePageSizeChange,
            }}
            titleToolTip="View patient details"
            tableBaseProps={{
              sx: {
                // This is to prevent the table from showing a gigantic whitespace
                'tr:has(> td:only-child)': {
                  display:
                    (paginationOptions.page === 1 && isFetching) || patients?.length === 0 ? 'table-row' : 'none',
                },
              },
            }}
            ssr={false}
          />
        }
        cards={
          <Box sx={{ marginBottom: isFetching ? 1 : 0 }}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {status !== 'loading' && status !== 'error' && (
              <PatientsList patientsList={patientsList.pages.map(page => page.patients).flat()} />
            )}
          </Box>
        }
      />
      {isMobile && <LoadMore loading={isFetching} ref={loadMoreRef} />}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pageProps = {} as PatientsPagePageProps;
  const organizationRef = getCookieValue('organizationRef', ctx) as string;
  const patientApiService = new PatientApiService();
  const queryClient = new QueryClient();
  const params = {
    organizationRef,
    perPage: DEFAULT_PAGINATION_OPTIONS.perPage,
  } as GetPatientsParams;
  await queryClient.prefetchInfiniteQuery(['patients', params], async () => {
    const {
      data: { patients, nextPageAvailable, totalPatients },
    } = await patientApiService.getPatients(params);
    return {
      patients: mapPatientsData(patients),
      nextPageAvailable,
      totalPatients,
    };
  });

  pageProps.organizationRef = organizationRef;

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...pageProps,
    },
  };
};

export default PatientsPage;
