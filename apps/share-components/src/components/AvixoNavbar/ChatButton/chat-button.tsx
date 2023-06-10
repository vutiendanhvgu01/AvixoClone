import { IconButton, Tooltip } from '@mui/material';
import MessageQuestionIcon from '../../AvixoIcons/message-question-icon';

const ChatButton = () => (
  <Tooltip title="Chat">
    <IconButton disableRipple sx={{ mr: '14px' }}>
      <MessageQuestionIcon />
    </IconButton>
  </Tooltip>
);
export default ChatButton;
