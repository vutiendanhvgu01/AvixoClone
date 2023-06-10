import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { MEDICAL_NOTE_TEMPLATE_COLOR } from 'modules/setting/constants/medical-note-template';
import { toTitleCase } from 'share-components/src/utils/stringUtils';

interface MedicalNoteTemplateStatusProps {
  status: 'active' | 'inactive';
}

const Status = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatusColor = styled(Box)<{ color: string }>(({ theme, color }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  backgroundColor: color === 'success' ? theme.palette.success.main : theme.palette.error.main,
  borderRadius: '50%',
  marginRight: 8,
}));

const MedicalNoteTemplateStatus: React.FC<MedicalNoteTemplateStatusProps> = ({ status }) => (
  <Status>
    <StatusColor color={MEDICAL_NOTE_TEMPLATE_COLOR[status]} />
    {toTitleCase(status)}
  </Status>
);

export default MedicalNoteTemplateStatus;
