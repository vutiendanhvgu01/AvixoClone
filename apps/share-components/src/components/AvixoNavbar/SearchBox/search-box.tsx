import { useCallback, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { InputBase, Paper, Box, Dialog, DialogContent } from '@mui/material';
import { SearchBoxProps } from './search-box-type';
import SearchIcon from '../../AvixoIcons/search-icon';

const SearchForm = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  display: 'none',
  alignItems: 'center',
  width: 266,
  padding: '5px 8px 5px 12px',
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  border: `1px solid ${theme.palette.divider}`,
}));

const FormInput = styled(InputBase)(() => ({
  backgroundColor: 'transparent',
  fontSize: 14,
  color: 'rgba(255, 255, 255, 0.5)',
  flex: 1,
}));

const SearchButton = styled(SearchIcon)(() => ({ cursor: 'pointer', opacity: 0.5 }));

const SearchIconMobile = styled(SearchIcon)(({ theme }) => ({
  cursor: 'pointer',
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const SearchBox = (props: SearchBoxProps) => {
  const { onSearch } = props;
  const [isDiaLogOpen, setDialogOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleDialog = useCallback(() => {
    setDialogOpen(!isDiaLogOpen);
  }, [isDiaLogOpen]);

  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (onSearch && inputRef && inputRef.current) {
        onSearch(inputRef.current.value);
      }
    }
  }, []);

  const onClick = useCallback(() => {
    if (onSearch && inputRef && inputRef.current) {
      onSearch(inputRef.current.value);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchForm as="form" sx={{ border: 'none' }}>
        <FormInput inputRef={inputRef} onKeyUp={onKeyUp} placeholder="Search anything" />
        <SearchButton onClick={onClick} />
      </SearchForm>
      <SearchIconMobile onClick={toggleDialog} />

      <Dialog sx={{ display: { md: 'none' } }} fullWidth maxWidth="sm" onClose={toggleDialog} open={isDiaLogOpen}>
        <DialogContent>
          <SearchForm as="form" sx={{ display: 'flex', width: '100%' }}>
            <FormInput
              inputRef={inputRef}
              size="medium"
              onKeyUp={onKeyUp}
              inputProps={{ sx: { color: 'black.main' } }}
              placeholder="Search anything"
            />
            <SearchButton onClick={onClick} />
          </SearchForm>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default SearchBox;
