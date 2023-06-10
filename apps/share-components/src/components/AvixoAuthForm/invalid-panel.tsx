import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '../AvixoIcons/info-icon';

const background = 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #D14343';
const iconColor = '#D14343';

const InvalidPanel = styled(Stack)(() => ({
  background,
  color: '#900909',
  padding: 16,
  marginBottom: 24,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
}));

const TextDanger = styled(Typography)(() => ({
  letterSpacing: '-0.0183em',
  fontWeight: 400,
  fontSize: 14,
  background,
}));

interface InvalidPanelProps {
  message: string;
}

const InvalidPanelComponent: FC<InvalidPanelProps> = ({ message }) => (
  <InvalidPanel direction="row" data-cy="errors">
    <InfoIcon
      sx={{
        fill: iconColor,
        marginRight: '10px',
      }}
    />
    <TextDanger data-cy="errors">{message}</TextDanger>
  </InvalidPanel>
);
export default InvalidPanelComponent;
