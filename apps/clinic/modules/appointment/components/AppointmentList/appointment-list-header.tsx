import { Box, Grid } from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import { APPOINTMENT_LIST_DOCTORS, APPOINTMENT_LIST_STATUSES } from 'modules/appointment/constants';
import { useRouter } from 'next/router';
import { AvixoSearchBar } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import AppointmentListDateRangePicker from './appointment-list-date-range-picker';
import AppointmentListFilter from './appointment-list-filter';

const AppointmentListHeader: React.FC = () => {
  const router = useRouter();

  const onDateRangeSelected = (dateRange: DateRange<Date>) => {
    console.log(dateRange);
  };
  const onFilterSelected = (value: string | string[]) => {
    console.log(value);
  };
  return (
    <Box sx={{ p: '32px' }}>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <AppointmentListFilter
            title="Doctors"
            dataList={APPOINTMENT_LIST_DOCTORS}
            onFilterSelected={onFilterSelected}
          />
        </Grid>
        <Grid item md={3}>
          <AppointmentListFilter
            title="Appointment Status"
            dataList={APPOINTMENT_LIST_STATUSES}
            onFilterSelected={onFilterSelected}
          />
        </Grid>
        <Grid item md={3}>
          <AppointmentListDateRangePicker onDateRangeSelected={onDateRangeSelected} />
        </Grid>
        <Grid item md={3}>
          <AvixoSearchBar
            placeholder="Search patient..."
            onFilterClick={() => router.push(PAGE_URLS.APPOINTMENT_ADVANCED_SEARCH())}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentListHeader;
