import { FormControlLabel, IconButton, Stack, Switch } from '@mui/material';
import { ArchiveTickIcon, PencilIcon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { EmailTemplate } from '../email-template-types';

interface EmailTemplateTableColumnsProps {
  onDelete: (id: number) => void;
}

const EmailTemplateTableColumns = ({ onDelete }: EmailTemplateTableColumnsProps) =>
  [
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
      id: 'default',
      field: 'default',
      label: 'Set As Default',
      alignLabel: 'left',
      customRender: value => (value.default ? 'Yes' : 'No'),
    },
    {
      id: 'status',
      field: 'status',
      label: 'Status',
      alignLabel: 'left',
      customRender: value => (
        <FormControlLabel
          control={<Switch defaultChecked={value.status === 'active'} />}
          label={value.status}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      id: 'action',
      field: '',
      label: 'Action',
      alignLabel: 'left',
      customRender: value => (
        <Stack direction="row">
          <IconButton>
            <ArchiveTickIcon sx={{ path: { fill: value.default ? '#F8A52C' : '#6B7280' } }} />
          </IconButton>
          <IconButton>
            <PencilIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(value.id)}>
            <TrashIcon color="#6B7280" />
          </IconButton>
        </Stack>
      ),
    },
  ] as Array<AvixoTableColumnProps<EmailTemplate>>;

export default EmailTemplateTableColumns;
