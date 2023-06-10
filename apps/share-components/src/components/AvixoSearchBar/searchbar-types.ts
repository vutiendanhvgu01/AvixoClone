import { InputBaseProps } from '@mui/material';

interface AvixoSearchbarProps extends InputBaseProps {
  searchIcon?: boolean;
  filterIcon?: boolean;
  onSearch?: (val: string) => void;
  onSearchInputChange?: (value: string) => void;
  defaultValue?: string;
  onFilterClick?: () => void;
  dataCy?: string;
}

export default AvixoSearchbarProps;
