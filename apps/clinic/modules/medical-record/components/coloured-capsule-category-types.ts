import { ChipProps } from '@mui/material';

type AvixoColouredCapsuleCategoryProps = {
  color: 'primary' | 'secondary' | 'info' | 'error';
} & Omit<ChipProps, 'color'>;

export default AvixoColouredCapsuleCategoryProps;
