import { Typography } from '@mui/material';
import { AvixoDrawerConfirm } from 'share-components';

interface NoticeFormProps {
  onCancel: () => void;
}

const DeleteNotice: React.FC<NoticeFormProps> = ({ onCancel }) => (
  <AvixoDrawerConfirm
    title="Delete Notice"
    confirmContent={
      <Typography variant="body2">
        This action cannot be undone. Are you sure you want to delete <strong>Computer Upgrade</strong> notice on 28
        April 2023?
      </Typography>
    }
    id="test-id"
    inputProps={{
      name: 'reason',
      label: 'Reason of deletion',
      required: true,
      defaultValues: '',
    }}
    open
    handleClose={onCancel}
  />
);

export default DeleteNotice;
