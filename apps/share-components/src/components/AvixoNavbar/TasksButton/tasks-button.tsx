import { IconButton, Tooltip } from '@mui/material';
import TasksIcon from '../../AvixoIcons/tasks-icon';

const TasksButton = () => (
  <Tooltip title="Tasks">
    <IconButton disableRipple sx={{ ml: '20px', mr: '14px' }}>
      <TasksIcon />
    </IconButton>
  </Tooltip>
);
export default TasksButton;
