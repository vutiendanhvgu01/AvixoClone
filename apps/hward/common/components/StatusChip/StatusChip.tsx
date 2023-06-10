import { Chip } from '@mui/material';

const StatusChip = ({ status }: { status: string }) => {
  const color = {
    Received: 'white',
    Assigned: 'warning.main',
    Ongoing: '#14B8A6',
    Completed: 'chart.purple3',
    Cancelled: 'error.main',
  }[status];
  const backgroundColor = {
    Received: '#8FB5CA',
    Assigned: '#FFF6E3',
    Ongoing: '#e7f8f6',
    Completed: '#eceeff',
    Cancelled: '#FFDFE5',
  }[status];
  return <Chip label={status} sx={{ fontSize: 12, color, backgroundColor }} />;
};

export default StatusChip;
