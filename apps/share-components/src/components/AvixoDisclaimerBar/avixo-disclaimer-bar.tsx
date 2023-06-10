import React, { FC } from 'react';
import { styled, Box, Typography } from '@mui/material';
import { AvixoDisclaimerBarType } from './avixo-disclaimer-bar-type';

const DisclaimerBox = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: '16px',
  color: '#0C7CD5',
  padding: '8px 16px',
  borderRadius: '8px',
  background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #64B6F7',
}));

const AvixoDisclaimerBar: FC<AvixoDisclaimerBarType> = ({ content }) => (
  <DisclaimerBox>
    <Typography>{content}</Typography>
  </DisclaimerBox>
);

export default AvixoDisclaimerBar;
