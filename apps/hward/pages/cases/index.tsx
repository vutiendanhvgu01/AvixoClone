import { Box, Button, Stack, Typography } from '@mui/material';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useFlag } from '@unleash/nextjs';
import AddButton from 'common/components/AddButton';
import HwardTable from 'common/components/HwardTable/hward-table';
import MenuDotsButton from 'common/components/MenuDotsButton/menu-dots-button';
import WelcomeSpeedoc from 'common/components/WelcomeSpeedoc';
import DEFAULT_PAGINATION_OPTIONS from 'common/constants/paginationOptions';
import useIsMobile from 'common/hooks/useIsMobile';
import DashboardApiService from 'modules/Dashboard/api/dashboard-api';
import { GetStatsParams } from 'modules/Dashboard/api/dashboard-api-type';
import DashboardCards from 'modules/Dashboard/components/dashboard-cards';
import DashboardHeader from 'modules/Dashboard/components/dashboard-header';
import useStats from 'modules/Dashboard/hooks/useStats';
import CasesCards from 'modules/cases/components/cases-cards';
import CasesTable from 'modules/cases/components/cases-table';
import useCases from 'modules/cases/hooks/useCases';
import CaseApiService from 'modules/cases/services';
import { GetCasesParams } from 'modules/cases/services/shared';
import getOngoingCases from 'modules/cases/utils/getOngoingCases';
import PatientApiService from 'modules/patient/api/patient-api';
import { GetPatientCountParams } from 'modules/patient/api/patient-api-type';
import { initialPatientFormData } from 'modules/patient/components/patient-types';
import usePatientEnrolSubmit from 'modules/patient/hooks/usePatientEnrolSubmit';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { AppointmentsOutlineIcon, AvixoSnackbar, PageProps, getCookieValue } from 'share-components';
import ListItemsIcon from 'share-components/src/components/AvixoIcons/list-items-icon';
import { PAGE_URLS } from 'share-components/src/constants';
import LoadMore from 'common/components/LoadMore/load-more';
import usePagination from 'common/hooks/usePagination';

const PatientForm = dynamic(() => import('modules/patient/components/patient-form'), { ssr: false });

interface CasesPagePageProps extends PageProps {
  patientCountParams: GetPatientCountParams;
  statsParams: GetStatsParams;
  businessRef: string;
}

const CasesPage: React.FC<CasesPagePageProps> = ({ patientCountParams, statsParams, businessRef }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const close = () => setOpen(false);
  const closeSnackbar = useCallback(() => {
    setShowNotification(false);
    setSnackbarMessage('');
  }, []);
  const isAppointmentsFeatureEnabled = useFlag('hward.appointments');
  const {
    paginationOptions,
    search,
    handleSearch,
    onTablePageChange,
    handlePageSizeChange,
    loadMoreRef,
    setHandlePagination,
  } = usePagination({ searchPrefix: 'C-' });

  const {
    data: casesList,
    fetchNextPage,
    fetchPreviousPage,
    status,
    isFetching,
    refetch,
  } = useCases({ businessRef, country: 'SG', perPage: paginationOptions.perPage, search });
  const { data: stats } = useStats({ patientCountParams, statsParams });
  const { onSubmit: onPatientEnrolSubmit } = usePatientEnrolSubmit(refetch, {
    close,
    setShowNotification,
    setSnackbarMessage,
  });

  useEffect(() => {
    setHandlePagination({ fetchNextPage, fetchPreviousPage });
  }, [fetchNextPage, fetchPreviousPage, setHandlePagination]);

  return (
    <Box>
      <Box>
        <DashboardHeader
          renderLeft={() => <WelcomeSpeedoc />}
          renderRight={() => (
            <>
              {isAppointmentsFeatureEnabled && (
                <Link href={PAGE_URLS.HWARD_APPOINTMENTS()} passHref>
                  <Button
                    startIcon={<AppointmentsOutlineIcon />}
                    variant="hward-ghost"
                    sx={{ mr: { md: 2, xs: 0, sm: 2 } }}
                  >
                    Appointments
                  </Button>
                </Link>
              )}
              <Link href={PAGE_URLS.HWARD_PATIENT_LIST()} passHref>
                <Button startIcon={<ListItemsIcon />} variant="hward-ghost" sx={{ mr: { md: 2, xs: 0, sm: 2 } }}>
                  Patients
                </Button>
              </Link>
              <AddButton testid="enroll-patient" title="Enrol New Patient" handleClick={() => setOpen(prev => !prev)} />
            </>
          )}
          renderBottom={() => (
            <Stack direction="row" sx={{ width: '100%', gap: 2 }}>
              {isAppointmentsFeatureEnabled ? (
                <MenuDotsButton />
              ) : (
                <Link href={PAGE_URLS.HWARD_PATIENT_LIST()} passHref>
                  <Button startIcon={<ListItemsIcon />} variant="hward-outlined" sx={{ mr: { md: 2, xs: 0, sm: 2 } }}>
                    Patients
                  </Button>
                </Link>
              )}
              <AddButton
                sx={{ flexGrow: 1 }}
                testid="enroll-patient"
                title="Enrol New Patient"
                handleClick={() => setOpen(prev => !prev)}
              />
            </Stack>
          )}
        >
          <PatientForm
            formTitle="Enrol New Patient"
            open={open}
            onCancel={close}
            initData={initialPatientFormData}
            onSubmit={onPatientEnrolSubmit}
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
        <DashboardCards
          appointmentsTotal={stats?.appointmentsTotal}
          casesOngoing={stats?.casesOngoing}
          casesCompleted={stats?.casesCompleted}
          patientCount={stats?.patientCount}
        />
      </Box>
      <HwardTable
        title="Active Cases"
        placeholder="Search patient or case ID"
        onSearchChange={handleSearch}
        table={
          <CasesTable
            isFetching={isFetching}
            casesList={casesList}
            paginationOptions={paginationOptions}
            onPageChange={onTablePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        }
        cards={
          <Box sx={{ marginBottom: isFetching ? 1 : 0 }}>
            {status !== 'loading' && status !== 'error' && (
              <CasesCards data={casesList.pages.map(p => p.cases).flat()} />
            )}
          </Box>
        }
      />
      {isMobile && <LoadMore loading={isFetching} ref={loadMoreRef} />}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pageProps = {} as CasesPagePageProps;
  const patientApiService = new PatientApiService();
  const dashboardApiService = new DashboardApiService();
  const caseService = new CaseApiService();
  const businessRef = getCookieValue('businessRef', ctx) as string;
  const organizationRef = getCookieValue('organizationRef', ctx) as string;
  const queryClient = new QueryClient();
  const patientCountParams: GetPatientCountParams = { organizationRef };
  const statsParams: GetStatsParams = { country: 'SG', businessRef };
  const casesParams = {
    businessRef,
    country: 'SG',
    perPage: DEFAULT_PAGINATION_OPTIONS.perPage,
  } as GetCasesParams;

  // Get cases
  await queryClient.prefetchInfiniteQuery(['cases', casesParams], async () => {
    const { data } = await caseService.getCases(casesParams);

    return {
      cases: getOngoingCases(data),
      total: data.total,
    };
  });
  // Get stats for dashboard cards
  await queryClient.fetchQuery(['stats'], async () => {
    const promises = [
      patientApiService.getPatientCount(patientCountParams),
      dashboardApiService.getStats(statsParams),
    ] as const;
    const [
      {
        data: { count: patientCount },
      },
      {
        data: { appointmentsTotal, casesOngoing, casesCompleted },
      },
    ] = await Promise.all(promises);

    return {
      patientCount,
      appointmentsTotal,
      casesOngoing,
      casesCompleted,
    };
  });

  pageProps.patientCountParams = patientCountParams;
  pageProps.statsParams = statsParams;
  pageProps.businessRef = businessRef;

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...pageProps,
    },
  };
};

export default CasesPage;
