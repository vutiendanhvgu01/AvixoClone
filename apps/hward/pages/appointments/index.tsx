import getServerSideFeatureFlag from 'common/services/getServerSideFeatureFlag';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { PAGE_URLS } from 'share-components/src/constants';
import { getCookieValue, PageProps } from 'share-components';
import { Box } from '@mui/material';
import DashboardHeader from 'modules/Dashboard/components/dashboard-header';
import WelcomeSpeedoc from 'common/components/WelcomeSpeedoc';
import HwardTable from 'common/components/HwardTable/hward-table';
import AppointmentList from 'modules/appointment/components/appointment-list';
import mapAppointments from 'modules/appointment/utils/mapAppointments';
import AppointmentTable from 'modules/appointment/components/appointment-table';
import AppointmentApiService from 'modules/appointment/api/appointment-api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useAppointments from 'modules/appointment/hooks/useAppointments';
import DEFAULT_PAGINATION_OPTIONS from 'common/constants/paginationOptions';
import useIsMobile from 'common/hooks/useIsMobile';
import LoadMore from 'common/components/LoadMore/load-more';
import usePagination from 'common/hooks/usePagination';
import AppointmentDetail from 'modules/appointment/components/appointment-detail';
import useAppointmentDetail from 'modules/appointment/hooks/useAppointmentDetail';

interface AppointmentsProps extends PageProps {
  businessRef: string;
}

const Appointments: React.FC<AppointmentsProps> = ({ businessRef }) => {
  const isMobile = useIsMobile();
  const {
    paginationOptions,
    search,
    handleSearch,
    handlePageSizeChange,
    onTablePageChange,
    loadMoreRef,
    setHandlePagination,
  } = usePagination({ searchPrefix: 'S-' });
  const { data, fetchPreviousPage, fetchNextPage, status, isFetching, refetch } = useAppointments({
    businessRef,
    country: 'SG',
    perPage: paginationOptions.perPage,
    search,
  });
  useEffect(() => {
    setHandlePagination({ fetchNextPage, fetchPreviousPage });
  }, [fetchNextPage, fetchPreviousPage, setHandlePagination]);
  const activePage = paginationOptions.page;
  const splitAppointments = data?.pages?.[activePage]?.appointments ?? [];
  const totalAppointments = data?.pages?.[0]?.appointmentTotal ?? 0;
  const { open, ...appointmentDetailProps } = useAppointmentDetail({ onSubmitSuccess: refetch });

  return (
    <Box>
      <DashboardHeader renderLeft={() => <WelcomeSpeedoc />}>
        <HwardTable
          title={`Appointments (${totalAppointments})`}
          placeholder="Search patient name or service ID"
          onSearchChange={handleSearch}
          table={
            <AppointmentTable
              appointments={splitAppointments}
              loading={isFetching}
              paginationOptions={paginationOptions}
              onPageChange={onTablePageChange}
              onPageSizeChange={handlePageSizeChange}
              totalAppointments={totalAppointments}
              onClickRow={open}
            />
          }
          cards={
            <Box sx={{ marginBottom: isFetching ? 1 : 0 }}>
              {status !== 'loading' && status !== 'error' && (
                <AppointmentList appointments={data?.pages?.map(a => a.appointments).flat() ?? []} onClickRow={open} />
              )}
            </Box>
          }
        />
        {isMobile && <LoadMore loading={isFetching} ref={loadMoreRef} />}
        <AppointmentDetail {...appointmentDetailProps} />
      </DashboardHeader>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pageProps = {} as AppointmentsProps;
  const { isEnabled: isAppointmentsFeatureEnabled } = await getServerSideFeatureFlag('hward.appointments');

  if (!isAppointmentsFeatureEnabled) {
    return {
      redirect: {
        destination: PAGE_URLS.HWARD_CASES(),
        permanent: false,
      },
    };
  }

  const businessRef = getCookieValue('businessRef', ctx) as string;
  const appointmentService = new AppointmentApiService();
  const queryClient = new QueryClient();
  const params = {
    businessRef,
    country: 'SG',
    perPage: DEFAULT_PAGINATION_OPTIONS.perPage,
  };

  await queryClient.prefetchInfiniteQuery(['appointments', params], async () => {
    const { data } = await appointmentService.getServices(params);
    return mapAppointments(data);
  });

  pageProps.businessRef = businessRef;
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...pageProps,
    },
  };
};

export default Appointments;
