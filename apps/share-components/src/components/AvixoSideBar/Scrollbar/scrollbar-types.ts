import type { ReactNode } from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material';

interface ScrollbarProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default ScrollbarProps;
