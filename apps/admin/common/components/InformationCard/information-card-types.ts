import { SxProps } from '@mui/material';

export interface InformationLineProps {
  title: string;
  value: string | React.ReactNode;
  sx?: SxProps;
}

export default interface InformationProps {
  informations: Array<InformationLineProps>;
  title: string;
  onEdit?: () => void;
}
