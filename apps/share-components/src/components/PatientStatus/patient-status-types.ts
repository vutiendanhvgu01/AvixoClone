import { ChipPropsSizeOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export interface PatientStatusProps {
  size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
  label: string;
}
