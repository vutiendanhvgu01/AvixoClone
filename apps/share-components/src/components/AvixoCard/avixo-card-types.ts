import { CardProps } from '@mui/material';

export interface AvixoCardNoResultProps {
  title: string;
  message?: string | React.ReactNode;
}

export interface AvixoCardProps extends CardProps {
  icon?: React.ReactNode;
  title?: string;
  titleVariant?: 'subtitle1' | 'overline';
  action?: React.ReactNode;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  withCardHeadingBorder?: boolean;
  fullHeight?: boolean;
  bg?: string;
  sx?: CardProps['sx'];
  customTitle?: React.ReactNode;
  onClick?: () => void;
  bordered?: boolean;
  footerAction?: React.ReactNode;
}
