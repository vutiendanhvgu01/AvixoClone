import React, { FC, useCallback } from 'react';
import { styled, Box, Typography } from '@mui/material';
import { AvixoDrawer } from 'share-components';
import { getRelativeDayName, formatTime } from 'share-components/src/utils/formatUtils';
import type { DispensingHistoryProps } from '../../types/history';

const DateText = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.black.main,
}));

const AuthorText = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '20px',
  color: theme.palette.neutral?.[500],
}));

const DetailText = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '20px',
  color: theme.palette.black.main,
  marginTop: '16px',
}));

const ItemBox = styled(Box)(({ theme }) => ({
  paddingBottom: '48px',
  borderLeft: 1,
  borderColor: 'transparent',
  borderStyle: 'solid',
  paddingLeft: '20px',
  position: 'relative',
  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    background: theme.palette.neutral?.[500],
    borderRadius: '50%',
    position: 'absolute',
    left: '-4.5px',
    top: '15px',
  },
  '&::after': {
    content: '""',
    width: '10px',
    height: '10px',
    background: 'white',
    position: 'absolute',
    left: '-5px',
    top: '25px',
  },
}));

const ItemInnerBox = styled(Box)(() => ({
  padding: '8px',
  borderRadius: '8px',
  '&::before': {
    content: '""',
    width: '10px',
    height: '10px',
    background: 'white',
    position: 'absolute',
    left: '-5px',
    top: '5px',
  },
  '&:hover': {
    background: 'rgba(80, 72, 229, 0.04)',
  },
}));

const DispensingHistory: FC<DispensingHistoryProps> = ({ showHistory, setShowHistory, items }) => {
  const content = useCallback(
    () =>
      items.map((item, key) => {
        const isLastIndex = key === items.length - 1;
        return (
          <ItemBox
            key={item.id}
            sx={{
              borderLeftColor: isLastIndex ? 'transparent' : 'divider',
            }}
          >
            <ItemInnerBox>
              <DateText>{`${getRelativeDayName(item.date)} at ${formatTime(item.date)}`}</DateText>
              <AuthorText>{item.by}</AuthorText>
              <DetailText>{item.detail}</DetailText>
            </ItemInnerBox>
          </ItemBox>
        );
      }),
    [items],
  );

  return (
    <AvixoDrawer
      header="History"
      description="This is an overview of past dispensing. To view the dispensing details for a particular date, click on that date."
      show={showHistory}
      setShow={setShowHistory}
      content={
        <Box
          sx={{
            marginTop: '40px',
            marginLeft: '32px',
            marginRight: '32px',
          }}
        >
          {content()}
        </Box>
      }
    />
  );
};

export default DispensingHistory;
