import { useState } from 'react';
import {
  Checkbox,
  Divider,
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
import { INVOICE_LIST_CLAIM_STATUS_TYPES } from '../../constants';

interface InvoicesListFilterProps {
  onFilterSelected: (value: string[] | string) => void;
}

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: 16,
  '& fieldset': {
    borderColor: theme.palette.divider,
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  fontSize: 16,
  fontWeight: 500,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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

const InvoicesListFilter: React.FC<InvoicesListFilterProps> = ({ onFilterSelected }) => {
  const [listSelectedClaimStatus, setListSelectedClaimStatus] = useState<string[]>([]);
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof listSelectedClaimStatus>) => {
    const {
      target: { value },
    } = event;

    if (value.includes('Select All')) {
      if (typeof value === 'string') {
        setListSelectedClaimStatus(['Select All']);
      } else if (listSelectedClaimStatus.includes('Select All')) {
        const valueExcludeSelectAll = value.filter(v => v !== 'Select All');
        setListSelectedClaimStatus(valueExcludeSelectAll);
      } else {
        setListSelectedClaimStatus(['Select All']);
      }
    } else {
      setListSelectedClaimStatus(typeof value === 'string' ? value.split(',') : value);
    }

    onFilterSelected(value);
  };

  return (
    <FormControl sx={{ width: '100%', mr: 2 }}>
      <StyledInputLabel id="patient-list-select" variant="outlined">
        Claim Status
      </StyledInputLabel>
      <Select
        label="Claim Status"
        name="claimStatus"
        id="claim-status-list-select"
        multiple
        value={listSelectedClaimStatus}
        input={<StyledOutlinedInput label="Claim Status" />}
        renderValue={(selected: string[]) => selected.join(', ')}
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
        <StyledMenuItem key="selectAll" value="Select All">
          <Checkbox indeterminate />
          <ListItemText primary="Select All" />
        </StyledMenuItem>
        <Divider sx={{ marginTop: 0, marginBottom: 0 }} component="li" />
        {INVOICE_LIST_CLAIM_STATUS_TYPES.map(status => (
          <StyledMenuItem key={status} value={status}>
            <Checkbox checked={listSelectedClaimStatus.indexOf(status) > -1} />
            <ListItemText primary={status} />
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InvoicesListFilter;
