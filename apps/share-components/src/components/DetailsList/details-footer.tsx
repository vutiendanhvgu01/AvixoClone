import * as React from 'react';
import { Box } from '@mui/material';
import { DetailsFooterProps } from './details-list-types';

const DetailsFooter: React.FC<DetailsFooterProps> = ({ children }) => <Box>{children}</Box>;

export default DetailsFooter;
