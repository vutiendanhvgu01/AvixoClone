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

interface AppointmentListFilterProps {
  onFilterSelected: (value: string[] | string) => void;
  dataList: string[];
  title: string;
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

const AppointmentListFilter: React.FC<AppointmentListFilterProps> = ({ dataList, onFilterSelected, title }) => {
  const [listSelectedClaimStatus, setListSelectedClaimStatus] = useState<string[]>([dataList[0]]);
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
      <StyledInputLabel id={`${title}-list-select`} variant="outlined">
        {title}
      </StyledInputLabel>
      <Select
        label={title}
        name={title}
        id={`${title}-list-select`}
        multiple
        value={listSelectedClaimStatus}
        input={<StyledOutlinedInput label={title} />}
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
        {dataList.map(item => (
          <StyledMenuItem key={item} value={item}>
            <Checkbox checked={listSelectedClaimStatus.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </StyledMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppointmentListFilter;
