import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { AvixoTable } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { Appointment } from '../appointment-types';
import AppointmentListHeader from './appointment-list-header';
import columns from './appointment-table-column';

const PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [10, 20, 50];
interface AppointmentListTableProps {
  appointmentList: Appointment[];
}

const AppointmentListTable: React.FC<AppointmentListTableProps> = ({ appointmentList }) => {
  const router = useRouter();

  const navigateAppointment = (appointmentId: string | number, action: 'edit' | 'delete' = 'edit'): void => {
    if (action === 'edit') {
      router.push(PAGE_URLS.APPOINTMENT_LIST_EDIT(appointmentId));
    } else if (action === 'delete') {
      router.push(PAGE_URLS.APPOINTMENT_LIST_DELETE(appointmentId));
    }
  };

  return (
    <Box sx={{ background: 'white', borderRadius: '16px 16px 0 0' }}>
      <AppointmentListHeader />
      <Box mt={-6}>
        <AvixoTable
          columns={columns(navigateAppointment)}
          data={{ records: appointmentList }}
          primaryKey="id"
          emptyText="No appointment have been created."
          mode="offline"
          hasCheckBoxHeader={false}
          pagination={{
            pageSize: PAGE_SIZE,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            onPageChange: (page: number) => {
              console.log(page);
            },
            onPageSizeChange: (pageSize: number) => {
              console.log(pageSize);
            },
          }}
          hasPagination
          onRowClick={(rowData: Appointment) => {
            navigateAppointment(rowData?.id);
          }}
        />
      </Box>
    </Box>
  );
};

export default AppointmentListTable;
