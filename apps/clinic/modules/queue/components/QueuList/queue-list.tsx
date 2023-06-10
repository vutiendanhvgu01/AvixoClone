import CircleIcon from '@mui/icons-material/Circle';
import { Alert, Box, MenuItem, Stack, styled, Typography } from '@mui/material';
import { differenceInYears } from 'date-fns';
import { getPatientIdentity } from 'modules/patient/services';
import { QUEUE_ACTIONS_MENU } from 'modules/queue/constants';
import Queue, { BasedOnType } from 'modules/queue/types';
import { NestedMenuItem } from 'mui-nested-menu';
import Link from 'next/link';
import {
  AvixoNestMenuCustom,
  AvixoTable,
  ClockQueueIcon,
  EndQueueIcon,
  MenuNestItemData,
  StartQueueIcon,
} from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { formatDate, getDuration } from 'share-components/src/utils/formatUtils';
import { RenderAssignToColumn, RenderInvoiceColumn, RenderPatientColumn } from '../RenderColumnComponent';

const WithLink = styled(Typography)(({ theme }) => ({
  a: {
    color: theme.palette.chart?.blue5,
  },
}));
const columns: Array<AvixoTableColumnProps<Queue>> = [
  {
    id: 'no',
    field: 'id',
    label: 'No',
    alignLabel: 'left',
  },
  {
    id: 'timeStatus',
    field: 'timeStatus',
    label: 'Time Status',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 350,
      },
    },
    customRender(value) {
      return (
        <Stack display="flex" direction="row" spacing={2}>
          <Box position="relative">
            <StartQueueIcon
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-45%)',
              }}
            />
            <Typography variant="subtitle2" component="span" ml={2}>
              {formatDate(value.startTime, 'HH:mm')}
            </Typography>
            <Typography variant="caption" component="p">
              {formatDate(value.startTime, 'dd MMM yyyy')}
            </Typography>
          </Box>
          <Box position="relative">
            <EndQueueIcon
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-45%)',
              }}
            />
            <Typography variant="subtitle2" component="span" ml={2}>
              {value.endTime ? formatDate(value.endTime, 'HH:mm') : '-'}
            </Typography>
            <Typography variant="caption" component="p">
              {formatDate(value.endTime, 'dd MMM yyyy')}
            </Typography>
          </Box>
          <Box position="relative">
            <ClockQueueIcon
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <Typography variant="subtitle2" component="span" ml={2}>
              {getDuration(value.startTime)}
            </Typography>
            <Typography variant="caption" component="p" textAlign="end">
              at {formatDate(new Date().toJSON(), 'HH:mm')}
            </Typography>
          </Box>
        </Stack>
      );
    },
  },
  {
    id: 'status',
    field: 'status',
    label: 'Status',
    alignLabel: 'left',
    sort: true,
    customRender(value) {
      return <RenderPatientColumn value={value} />;
    },
  },
  {
    id: 'localtion',
    field: 'localtion',
    label: 'Location',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 200,
      },
    },
    sort: true,
    customRender(value) {
      return (
        <>
          {value.location?.status && (
            <Typography variant="subtitle2" component="p">
              {value.location?.status}
            </Typography>
          )}
          {value.location?.content && (
            <Typography variant="subtitle2" component="p">
              {value.location?.content}
            </Typography>
          )}
        </>
      );
    },
  },
  {
    id: 'patient',
    field: 'patient',
    label: 'Patient',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 400,
      },
    },
    customRender: value => (
      <Stack display="flex" direction="row" alignItems="center">
        <Box>
          <Typography component="p">{value?.patient?.fullName}</Typography>
          <Typography variant="caption">ID Number: {getPatientIdentity(value?.patient?.identities)?.value}</Typography>
          <Typography component="span" mx={1}>
            <CircleIcon
              sx={{
                fontSize: 4,
                verticalAlign: 'middle',
              }}
            />
          </Typography>
          <Typography component="span">
            {value.patient?.gender},{' '}
            {value.patient?.birthDate && differenceInYears(new Date(), new Date(value.patient.birthDate))}
          </Typography>
          <Typography sx={{ textDecoration: 'underline' }}>
            {value.patient?.phones && value.patient?.phones[0].number}
          </Typography>
        </Box>
        {value.isNewPatient && (
          <Alert
            severity="info"
            icon={false}
            sx={{
              marginLeft: 2,
            }}
          >
            New
          </Alert>
        )}
      </Stack>
    ),
  },
  {
    id: 'assignedTo',
    field: 'assignedTo',
    label: 'Assigned To',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 200,
      },
    },
    customRender: (value, iRecord) => <RenderAssignToColumn value={value} iRecord={iRecord} />,
  },
  {
    id: 'visitReason',
    field: 'visitReason',
    label: 'Visit Reason',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 200,
      },
    },
    customRender: value => (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CircleIcon
          sx={{
            color: 'calendar.purple',
          }}
        />
        <Typography>{value?.reason}</Typography>
      </Box>
    ),
  },
  {
    id: 'clinicComment',
    field: 'comment',
    label: 'Clinic Comment',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 220,
      },
    },
  },
  {
    id: 'invoicePayment',
    field: 'invoicePayment',
    label: 'Invoice & Payment',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 280,
      },
    },
    customRender: value => <RenderInvoiceColumn value={value} />,
  },
  {
    id: 'prescription',
    field: 'prescription',
    label: 'Prescription',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 200,
      },
    },
    customRender: value => (
      <>
        <Typography mt={1}>{value?.prescription?.name}</Typography>
        <ul
          style={{
            color: '#6B7280',
          }}
        >
          {value?.prescription?.items &&
            Array.isArray(value?.prescription?.items) &&
            value?.prescription?.items.map(item => (
              <li key={item.id}>
                <Typography variant="caption">{item.shortName}</Typography>
              </li>
            ))}
        </ul>
      </>
    ),
  },
  {
    id: 'action',
    field: 'action',
    label: 'Action',
    alignLabel: 'left',
    sort: true,
    tableCellBaseProps: {
      sx: {
        width: 250,
      },
    },
    customRender: () => (
      <AvixoNestMenuCustom
        menuButtonPropsBase={{
          customAction: (
            <Typography
              color="primary"
              variant="button"
              sx={{
                cursor: 'pointer',
              }}
            >
              Please Select
            </Typography>
          ),
        }}
      >
        {QUEUE_ACTIONS_MENU.map((action: MenuNestItemData) => (
          <>
            <MenuItem key={action.label}>
              <Typography variant="body1">{action.label}</Typography>
            </MenuItem>
            {action.items && (
              <NestedMenuItem parentMenuOpen label={action.label} component={Typography}>
                {action.items.map((item: MenuNestItemData) => (
                  <MenuItem key={action.label}>
                    <Typography variant="body1">{item.label}</Typography>
                  </MenuItem>
                ))}
              </NestedMenuItem>
            )}
          </>
        ))}
      </AvixoNestMenuCustom>
    ),
  },
];

const QueueList: React.FC<{ basedOn: BasedOnType; queues: Queue[] }> = ({ queues }) => (
  <AvixoTable
    hasCheckBoxHeader
    data={{ records: queues }}
    columns={columns}
    mode="offline"
    emptyText={
      <Box
        sx={{
          position: 'absolute',
          left: '20%',
        }}
      >
        <Typography variant="subtitle2">The queue list you are viewing is empty.</Typography>
        <WithLink variant="subtitle2">
          Click to <Link href="/">add new patient to queue</Link> or move patient from today&#39;s appointment.
        </WithLink>
      </Box>
    }
    hasSelectedFn
    hasCollapseRow
    tableBaseProps={{
      sx: {
        width: '180%',
      },
    }}
  />
);

export default QueueList;
