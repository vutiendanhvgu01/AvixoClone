import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Edit2Icon, PrintIcon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate, getEmailByPatient, getPhoneNumberByPatient } from 'share-components/src/utils/formatUtils';
import { neutral } from 'share-components/theme/default-theme';
import { Appointment } from '../appointment-types';
import AppointmentStatus from './appointment-status';
import AppointmentVisitReason, { Reason } from './appointment-visit-reason';

const tableCellBaseProps = {
  sx: {
    fontSize: '14px',
    fontWeight: 400,
  },
};

const columns = (
  navigateAppointment: (appointmentId: string | number, action?: 'edit' | 'delete') => void,
): Array<AvixoTableColumnProps<Appointment>> => [
  {
    id: 'no',
    field: 'id',
    label: 'No',
    alignLabel: 'center',
    tableCellBaseProps: {
      sx: {
        ...tableCellBaseProps.sx,
        minWidth: '60px',
      },
    },
  },
  {
    id: 'date',
    field: 'startTime',
    label: 'Date',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
    customRender: value => (
      <div>
        <Typography variant="body2">{value?.startTime ? formatDate(value?.startTime, 'MM/dd/yyyy') : ''}</Typography>
      </div>
    ),
  },
  {
    id: 'time',
    field: '',
    label: 'Time',
    alignLabel: 'left',
    customRender: value => {
      const startTime = value?.startTime ? formatDate(value.startTime, 'HH:mm a') : '';
      const endTime = value?.endTime ? formatDate(value.endTime, 'HH:mm a') : '';
      return <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>{`${startTime} - ${endTime}`}</Typography>;
    },
  },
  {
    id: 'doctor',
    field: 'doctor',
    label: 'Doctor',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        ...tableCellBaseProps.sx,
        minWidth: '140px',
      },
    },
    customRender: value => (
      <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
        {value?.practitioner?.name}
      </Typography>
    ),
  },
  {
    id: 'patientName',
    field: '',
    label: 'Patient Name',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
    customRender: value => <Typography variant="body2">{value?.patient?.fullName?.toUpperCase()}</Typography>,
  },
  {
    id: 'patientId',
    field: 'patientId',
    label: 'Patient Id',
    alignLabel: 'left',
    tableCellBaseProps,
    customRender: value => <Typography variant="body2">{value?.patient?.id}</Typography>,
  },
  {
    id: 'patientEmail',
    field: 'patientEmail',
    label: 'Patient Email',
    alignLabel: 'left',
    tableCellBaseProps,
    customRender: value => <Typography variant="body2">{getEmailByPatient(value?.patient)}</Typography>,
  },
  {
    id: 'phone',
    field: 'phone',
    label: 'Phone',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        ...tableCellBaseProps.sx,
        whiteSpace: 'nowrap',
      },
    },
    customRender: value => <Typography variant="body2">{getPhoneNumberByPatient(value?.patient)}</Typography>,
  },
  {
    id: 'visitReason',
    field: 'reason',
    label: 'Visit Reason',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
    customRender: value => {
      const { reason } = value;
      return reason && <AppointmentVisitReason reason={reason as Reason} />;
    },
  },
  {
    id: 'importantNote',
    field: 'importantNote',
    label: 'Important Note',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
  },
  {
    id: 'status',
    field: '',
    label: 'Status',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
    customRender: value => <AppointmentStatus status={value.status} />,
  },
  {
    id: 'turnedUp',
    field: 'isNonPatient',
    label: 'Turn Up',
    alignLabel: 'left',
    customRender: value => (
      // mock at here
      <FormControlLabel
        control={<Checkbox checked />}
        label="Turned Up"
        sx={{
          '& .MuiFormControlLabel-label': {
            ...tableCellBaseProps.sx,
            whiteSpace: 'nowrap',
          },
        }}
      />
    ),
  },
  {
    id: 'comments',
    field: 'comments',
    label: 'Comments',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        minWidth: '180px',
      },
    },
  },
  {
    id: 'action',
    field: 'action',
    label: 'Action',
    alignLabel: 'left',
    customRender: ({ id }) => (
      <Box
        sx={{
          display: 'flex',
          gap: 6,
        }}
      >
        <Edit2Icon style={{ color: neutral[500], cursor: 'pointer' }} onClick={() => navigateAppointment(id)} />
        <PrintIcon sx={{ color: neutral[500], cursor: 'pointer' }} />
        <TrashIcon
          style={{ color: neutral[500], cursor: 'pointer' }}
          onClick={() => navigateAppointment(id, 'delete')}
        />
      </Box>
    ),
  },
];

export default columns;
