import type { FC } from 'react';
import SimpleBar from 'simplebar-react';
import { styled } from '@mui/material/styles';
import type ScrollbarProps from './scrollbar-types';

const ScrollbarRoot = styled(SimpleBar)``;

const Scrollbar: FC<ScrollbarProps> = ({ children, sx }) => <ScrollbarRoot sx={sx}>{children}</ScrollbarRoot>;

export default Scrollbar;
