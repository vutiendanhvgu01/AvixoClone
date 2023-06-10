import { ReactNode } from 'react';
import { BoxProps, LinearProgressProps } from '@mui/material';

interface HwardFixedContainerProps {
  children: React.ReactNode;
  title: string;
  display: boolean;
  onClose?: () => void;
  closeOnOutside?: boolean;
  width?: number | string;
  progress?: number;
  linearProgressProps?: LinearProgressProps;
  /**
   * Custom Header
   */
  headerComponent?: ReactNode;
  containerSx?: BoxProps['sx'];
  bodyContainerStyle?: React.CSSProperties;
}

export interface DefaultFormProps {
  open: boolean;
  onCancel?: () => void;
}

export default HwardFixedContainerProps;
