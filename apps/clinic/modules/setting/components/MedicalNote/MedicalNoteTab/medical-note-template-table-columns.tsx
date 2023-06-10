import { AvixoTableColumnProps } from '@ShareComponents/AvixoTable/avixo-table-types';
import { FormControlLabel, IconButton, Stack, Switch } from '@mui/material';
import { MedicalNoteTemplate } from 'modules/medical-record/types/medical-note-template';
import { ArchiveTickIcon, PencilIcon, TrashIcon } from 'share-components';

const MedicalNoteTemplateTableColumns: Array<AvixoTableColumnProps<MedicalNoteTemplate>> = [
  {
    id: 'no',
    field: 'id',
    label: 'No',
    alignLabel: 'left',
  },
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    alignLabel: 'left',
  },
  {
    id: 'status',
    field: 'status',
    label: 'Status',
    alignLabel: 'left',
    customRender: medicalNote => (
      <FormControlLabel
        control={<Switch defaultChecked={medicalNote.default} />}
        label={medicalNote.default ? 'Active' : 'Inactive'}
        sx={{ textTransform: 'capitalize' }}
      />
    ),
  },
  {
    id: 'action',
    field: '',
    label: 'Action',
    alignLabel: 'left',
    customRender: medicalNote => (
      <Stack direction="row" gap={3}>
        <IconButton>
          <ArchiveTickIcon sx={{ path: { fill: medicalNote.default ? '#F8A52C' : '#6B7280' } }} />
        </IconButton>
        <IconButton>
          <PencilIcon />
        </IconButton>
        <IconButton>
          <TrashIcon />
        </IconButton>
      </Stack>
    ),
  },
];

export default MedicalNoteTemplateTableColumns;
