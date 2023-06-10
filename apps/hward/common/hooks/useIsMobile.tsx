import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

const useIsMobile = (breakpoints: Breakpoint = 'md'): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoints), { defaultMatches: true });
};

export default useIsMobile;
