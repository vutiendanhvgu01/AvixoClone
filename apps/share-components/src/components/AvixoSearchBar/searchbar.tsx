import * as React from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import AvixoSearchbarProps from './searchbar-types';
import SearchIcon from '../AvixoIcons/search-icon';
import SettingIcon from '../AvixoIcons/setting-icon';

const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  padding: '0 18px',
  color: theme.palette.neutral?.[500],
  fontSize: 16,
  '& fieldset': {
    borderColor: theme.palette.divider,
  },
}));

const AvixoSearchBar: React.FC<AvixoSearchbarProps> = (props: AvixoSearchbarProps) => {
  const {
    placeholder,
    dataCy,
    onSearch,
    onSearchInputChange,
    defaultValue,
    searchIcon = true,
    filterIcon = true,
    onFilterClick,
    sx,
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onKeyUp = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (onSearch && inputRef && inputRef.current) {
          onSearch(inputRef.current.value);
        }
      }
    },
    [onSearch],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onSearchInputChange) {
        onSearchInputChange(e.target.value);
      }
    },
    [onSearchInputChange],
  );

  return (
    <StyledInput
      fullWidth
      onChange={handleInputChange}
      onKeyUp={onKeyUp}
      defaultValue={defaultValue}
      ref={inputRef}
      startAdornment={
        searchIcon ? (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'neutral.500', opacity: 1 }} />
          </InputAdornment>
        ) : null
      }
      endAdornment={
        filterIcon ? (
          <InputAdornment position="end" onClick={onFilterClick}>
            <IconButton disableRipple>
              <SettingIcon sx={{ color: 'neutral.500' }} />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      sx={sx}
      placeholder={placeholder}
      data-cy={dataCy}
    />
  );
};

export default AvixoSearchBar;
