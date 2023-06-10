import React, { FC } from 'react';
import { Stack, Typography, Link as LinkMui } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InfoOutlined } from '@mui/icons-material';

const panelColor = 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #64B6F7';
const InfoAuthIcon = styled(InfoOutlined)(() => ({
  width: 20,
  height: 20,
  color: '#64B6F7',
}));
const TextSupportPanel = styled(Typography)(() => ({
  letterSpacing: '-0.1px',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  marginLeft: 10,
}));

const TextSupport = styled(LinkMui)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationColor: theme.palette.primary.main,
}));

const PanelSupport = styled(Stack)(({ theme }) => ({
  height: 76,
  background: panelColor,
  borderRadius: 8,
  marginBottom: 32,
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    height: 98,
  },
}));

interface PanelSupportComponentProps {
  contact?: string;
}

const PanelSupportComponent: FC<PanelSupportComponentProps> = ({ contact = '#' }) => (
  <PanelSupport>
    <InfoAuthIcon />
    <TextSupportPanel data-cy="info">
      Please contact your <span style={{ fontWeight: 600 }}>Clinic Administrator</span> or
      <TextSupport href={contact} underline="always">
        {' '}
        Avixo Support team
      </TextSupport>{' '}
      to reset your password.
    </TextSupportPanel>
  </PanelSupport>
);
export default PanelSupportComponent;
