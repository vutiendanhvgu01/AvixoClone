import { Box } from '@mui/material';
import { MedicalNoteTemplate } from 'modules/medical-record/types/medical-note-template';
import { AvixoSearchBar, AvixoTable } from 'share-components';
import MedicalNoteTemplateTableColumns from './medical-note-template-table-columns';

interface MedicalNoteTabProps {
  medicalNotes: MedicalNoteTemplate[];
}

const MedicalNoteTab: React.FC<MedicalNoteTabProps> = props => {
  const { medicalNotes } = props;

  return (
    <Box sx={{ pointerEvents: 1, pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 4 }}>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search medical note template..." />
      </Box>
      <Box sx={{ mx: -3 }}>
        <AvixoTable
          hasCheckBoxHeader={false}
          data={{ records: medicalNotes }}
          columns={MedicalNoteTemplateTableColumns}
          mode="offline"
        />
      </Box>
    </Box>
  );
};

export default MedicalNoteTab;
