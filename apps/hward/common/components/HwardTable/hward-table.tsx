import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { AvixoSearchBar } from 'share-components';
import { debounce } from 'lodash';
import SearchContainer from 'common/components/SearchContainer/search-container';
import useScroll from 'common/hooks/useScroll';

interface HwardTableProps {
  title: string;
  placeholder: string;
  table: React.ReactElement;
  cards: React.ReactElement;
  onSearchChange?: (arg: string) => any;
}

const Container = styled(Box)(({ theme }) => ({
  flexDirection: 'row',
  marginTop: 32,
  backgroundColor: 'white',
  borderRadius: 16,
  [theme.breakpoints.down('sm')]: {
    marginTop: 24,
    marginLeft: -24,
    marginRight: -24,
  },
}));

function HwardTable({ title, placeholder, cards, table, onSearchChange = () => null }: HwardTableProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const onInputChange = debounce((text: string) => {
    onSearchChange(text);
  }, 1000);
  // On small screen devices searchContainer should not covers the dots menu
  const scrollY = useScroll();
  const containerZindex = scrollY > 50 ? theme.zIndex.appBar + 1 : 0;

  return (
    <Container>
      <SearchContainer zIndex={containerZindex}>
        <Typography variant="h6" sx={{ pb: 3 }}>
          {title}
        </Typography>
        <AvixoSearchBar
          placeholder={placeholder}
          defaultValue=""
          filterIcon={false}
          onSearchInputChange={onInputChange}
        />
      </SearchContainer>
      {isTablet ? cards : table}
    </Container>
  );
}

export default HwardTable;
