import { AvixoTable } from 'share-components';
import { Appointment } from 'modules/appointment/components/appointment-types';
import { Box, Typography } from '@mui/material';
import { formatDate } from 'share-components/src/utils/formatUtils';
import StatusChip from 'common/components/StatusChip/StatusChip';
import mapAppointmentStatus from 'modules/appointment/utils/mapAppointmentStatus';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { PaginationOptions } from 'common/constants/paginationOptions';
import mapAppointmentType from 'modules/appointment/utils/mapAppointmentType';

const columns = [
  {
    id: 'id',
    field: 'serviceId',
    label: 'Appt ID',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <Typography variant="subtitle2">{appointment.uuid}</Typography>
      </Box>
    ),
  },
  {
    id: 'serviceType',
    field: 'serviceType',
    label: 'Appt Type',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <Typography variant="subtitle2">
          {mapAppointmentType({ service: appointment.type, specialty: appointment.specialty })}
        </Typography>
      </Box>
    ),
  },
  {
    id: 'patientName',
    field: 'patientName',
    label: 'Patient Name',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <Typography variant="subtitle2">{appointment?.user?.name}</Typography>
        <Typography
          variant="caption"
          component="span"
        >{`${appointment?.user?.age} years old, ${appointment?.user?.gender}`}</Typography>
      </Box>
    ),
  },
  {
    id: 'nric',
    field: 'nric',
    label: 'NRIC',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <Typography variant="subtitle2">{appointment?.user?.nric}</Typography>
      </Box>
    ),
  },
  {
    id: 'createdAt',
    field: 'createAt',
    label: 'Date & Time',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <Typography variant="subtitle2">{formatDate(appointment.date, 'dd MMM yyyy - HH:mm')}</Typography>
      </Box>
    ),
  },
  {
    id: 'status',
    field: 'status',
    label: 'Status',
    alignLabel: 'left',
    customRender: appointment => (
      <Box>
        <StatusChip status={mapAppointmentStatus(appointment.status)} />
      </Box>
    ),
  },
] as AvixoTableColumnProps<Appointment>[];

interface AppointmentTableProps {
  appointments: Appointment[];
  loading?: boolean;
  paginationOptions: PaginationOptions;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalAppointments: number;
  onClickRow: (appointment: Appointment) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  loading,
  paginationOptions,
  onPageChange,
  onPageSizeChange,
  totalAppointments,
  onClickRow,
}) => (
  <AvixoTable
    loading={loading}
    columns={columns}
    onRowClick={onClickRow}
    data={{ records: appointments }}
    primaryKey="_id"
    hasCheckBoxHeader={false}
    emptyText="There are no Appointments."
    mode="remote"
    pagination={{
      total: totalAppointments,
      pageSize: paginationOptions.perPage,
      currentPage: paginationOptions.page,
      pageSizeOptions: [10, 20, 50],
      onPageChange,
      onPageSizeChange,
    }}
    tableContainerStyle={{ maxHeight: '63vh' }}
    titleToolTip="View appointment details"
    tableBaseProps={{
      sx: {
        // This is to prevent the table from showing a gigantic whitespace
        'tr:has(> td:only-child)': {
          display: (paginationOptions.page === 1 && loading) || appointments?.length === 0 ? 'table-row' : 'none',
        },
      },
    }}
    ssr={false}
  />
);

export default AppointmentTable;
