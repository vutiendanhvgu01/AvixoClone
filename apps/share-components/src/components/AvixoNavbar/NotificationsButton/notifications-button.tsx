import { Badge, IconButton, Tooltip } from '@mui/material';
import NotificationIcon from '../../AvixoIcons/notification-icon';

const NotificationsButton = () => (
  <Tooltip title="Notifications">
    <IconButton disableRipple sx={{ mr: '14px' }}>
      <Badge>
        <NotificationIcon />
      </Badge>
    </IconButton>
  </Tooltip>
);
export default NotificationsButton;
