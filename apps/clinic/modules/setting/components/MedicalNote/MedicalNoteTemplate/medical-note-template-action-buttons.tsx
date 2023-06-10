import { Button } from '@mui/material';
import { AngleUpIcon, AvixoMenuButton, EyeIcon, PlusOutlined } from 'share-components';
import MedicalNoteTemplateStatus from './medical-note-template-status';

const MedicalNoteTemplateActionButtons: React.FC = () => (
  <>
    <Button color="whiteLight" startIcon={<EyeIcon />}>
      Preview Template
    </Button>
    <AvixoMenuButton
      ButtonProps={{
        startIcon: null,
        endIcon: <AngleUpIcon style={{ transform: 'rotate(-180deg)' }} />,
        color: 'whiteLight',
      }}
      AvixoMenuBaseProps={{
        menuData: [
          {
            label: <MedicalNoteTemplateStatus status="active" />,
            value: 'active',
          },
          {
            label: <MedicalNoteTemplateStatus status="inactive" />,
            value: 'inactive',
          },
        ],
      }}
      label={<MedicalNoteTemplateStatus status="active" />}
    />
    <Button startIcon={<PlusOutlined />}>Add Component</Button>
  </>
);

export default MedicalNoteTemplateActionButtons;
