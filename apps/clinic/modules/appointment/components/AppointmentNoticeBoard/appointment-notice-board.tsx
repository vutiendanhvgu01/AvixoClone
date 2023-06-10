import { Box, IconButton, Paper, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { PlusIcon } from 'share-components';
import { styled } from '@mui/material/styles';
import router from 'next/router';
import { ROUTES, PAGE_URLS } from 'share-components/src/constants';
import AppointmentNoticeBoardProps from './appointment-notice-board-types';
import DailyNotice from './data/mock-daily-notice.json';
import WeeklyNotice from './data/mock-weekly-weekly.json';
import MonthlyNotice from './data/mock-monthy-notice.json';
import RenderTag from './render-notice-tag';

type NoticeType = { id: string; title: string; desc: string; type: string; date: string };

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: 15,
  background: theme.palette.primary.main,
  color: '#fff',
}));

const NoticeBox = styled(Box)(() => ({
  marginBottom: '8px',
  padding: '16px',
  borderRadius: '4px',
  '&:hover': {
    background: 'rgba(80,72,229,0.04)',
  },
}));

const AppointmentNoticeBoard: React.FC<AppointmentNoticeBoardProps> = ({ viewType }) => {
  const data = () => {
    switch (viewType) {
      case 'monthly':
        return { data: MonthlyNotice, date: '01 April 2023' };
      case 'weekly':
        return { data: WeeklyNotice, date: '01 April 2023 - 06 April 2023' };
      default:
        return { data: DailyNotice, date: '01 April 2023 - 30 April 2023' };
    }
  };

  const goToEditNotice = useCallback(() => {
    router.push(PAGE_URLS.EDIT_NOTICE('noticeID'));
  }, []);

  const goToAddNotice = useCallback(() => {
    router.push(ROUTES.ADD_NOTICE);
  }, []);

  return (
    <Paper sx={{ mt: 3, p: 2, display: 'flex', flexDirection: 'row', mr: 4 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 2 }}>
          <Box>
            <Typography variant="h6" color="neutral.900">
              Notice Board
            </Typography>
            <Typography variant="subtitle2" color="neutral.500">
              {data().date}
            </Typography>
          </Box>
          <ActionButton onClick={goToAddNotice}>
            <PlusIcon />
          </ActionButton>
        </Box>
        {data().data.map((notice: NoticeType) => (
          <NoticeBox key={notice.id} onClick={goToEditNotice}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color={viewType === 'daily' ? 'neutral.900' : 'neutral.500'} variant="subtitle2">
                {viewType === 'daily' ? notice.title : notice.date}
              </Typography>
              <RenderTag type={notice.type} />
            </Box>
            {viewType !== 'daily' && (
              <Typography variant="subtitle2" color="neutral.900">
                {notice.title}
              </Typography>
            )}
            <Typography variant="body2" color="neutral.500">
              {notice.desc}
            </Typography>
          </NoticeBox>
        ))}
      </Box>
    </Paper>
  );
};
export default AppointmentNoticeBoard;
