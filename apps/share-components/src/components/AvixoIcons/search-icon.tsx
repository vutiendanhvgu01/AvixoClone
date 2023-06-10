import { createSvgIcon } from '@mui/material';

const SearchIcon = createSvgIcon(
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="11" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="18.4142" y1="19" x2="21" y2="21.5858" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>,
  'Search',
);

export default SearchIcon;
