import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

type SearchContainerProps = {
  zIndex: number;
};

const SearchContainer = styled(Box)<SearchContainerProps>(({ theme, zIndex }) => ({
  padding: '32px 24px 24px 24px',
  position: 'sticky',
  top: 78,
  zIndex: zIndex ?? theme.zIndex.appBar + 1,
  backgroundColor: 'white',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    top: 50,
  },
}));

export default SearchContainer;
