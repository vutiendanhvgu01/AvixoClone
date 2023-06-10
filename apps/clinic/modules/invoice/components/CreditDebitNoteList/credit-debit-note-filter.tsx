import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

interface InvoicesListFilterProps {
  onFilterSelected?: (value: string) => void;
  listStatus: string[];
}

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  fontSize: 16,
  fontWeight: 500,
}));

const InputOutlined = styled(OutlinedInput)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: 16,
  '& fieldset': {
    borderColor: theme.palette.divider,
  },
}));

const MenuItems = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  fontSize: 16,
  '& ul': {
    border: 'none',
    paddingTop: 0,
    paddingBottom: 0,
  },
  '& .MuiTypography-root': {
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.primary,
  },
  '& .MuiButtonBase-root .MuiMenuItem-root': {
    paddingLeft: 2,
    paddingRight: 2,
  },
  '& .MuiMenuItem-root+.MuiDivider-root': {
    margin: 0,
  },
}));

const CreditDebitNoteFilter: React.FC<InvoicesListFilterProps> = ({ onFilterSelected, listStatus }) => {
  const [selectedClaimStatus, setSelectedClaimStatus] = useState<string>('');
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedClaimStatus>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string' && value) {
      setSelectedClaimStatus(value);
      if (onFilterSelected) {
        onFilterSelected(value);
      }
    }
  };

  return (
    <FormControl sx={{ width: '100%', mr: 2 }}>
      <LabelSelect id="status-list" variant="outlined">
        Select List
      </LabelSelect>
      <Select
        label="Select Status"
        name="selectStatus"
        id="select-status-note"
        value={selectedClaimStatus}
        input={<InputOutlined label="Claim Status" />}
        onChange={handleChange}
        MenuProps={{
          disablePortal: true,
        }}
        sx={{
          '& .MuiList-root': {
            paddingTop: 0,
            paddingBottom: 0,
          },
          '& .MuiPopover-paper': {
            marginTop: 2,
            border: 1,
            borderColor: theme.palette.neutral?.[300],
            boxShadow: '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1);',
          },
        }}
      >
        {listStatus.map(status => (
          <MenuItems key={status} value={status}>
            <ListItemText primary={status} />
          </MenuItems>
        ))}
      </Select>
    </FormControl>
  );
};
export default CreditDebitNoteFilter;
