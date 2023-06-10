import { useState, useCallback, useEffect } from 'react';
import { Typography, Box, Button, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { LeftIcon, RightIcon, CalendarRemoveIcon, SendIcon } from 'share-components';
import { styled } from '@mui/system';
import { CalendarImpl } from '@fullcalendar/core/internal';
import { useRouter } from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { FullCalendarHeaderProps, ViewType, DayViewValue } from './types';

const ControlButton = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: 'unset',
  color: theme.palette?.neutral?.[500],
  marginRight: 16,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral.contrastText,
  border: 'unset',
  backgroundColor: theme.palette?.neutral?.[100],
  '&:hover': {
    border: 'unset',
  },
}));

const CalendarHeader: React.FC<FullCalendarHeaderProps> = ({
  viewType: currViewType,
  setViewType,
  fullCalendarRef,
  jumpValue,
}) => {
  const getViewValue = (viewType: string | undefined) => {
    switch (viewType) {
      case ViewType.DAY_VIEW:
        return DayViewValue.DAY;
      case ViewType.WEEK_VIEW:
        return DayViewValue.WEEK;
      case ViewType.MONTH:
        return DayViewValue.MONTH;
      default:
        return DayViewValue.TODAY;
    }
  };
  const [viewValue, setViewValue] = useState<string>(getViewValue(currViewType));
  const calendarApi = fullCalendarRef?.current?.getApi() as CalendarImpl;
  const [title, setTitle] = useState<string>(calendarApi?.getCurrentData()?.viewTitle);
  const router = useRouter();

  const handleChangeViewValue = useCallback((event: React.MouseEvent<HTMLElement>, newValue: string) => {
    setViewValue(newValue);
  }, []);

  const handlePrev = useCallback(() => {
    calendarApi?.prev();
    setTitle(calendarApi?.getCurrentData()?.viewTitle);
  }, [calendarApi]);

  const handleNext = useCallback(() => {
    calendarApi?.next();
    setTitle(calendarApi?.getCurrentData()?.viewTitle);
  }, [calendarApi]);

  const handleChangeView = useCallback(
    (viewType: string, isToday = false) => {
      if (setViewType) {
        setViewType(viewType);
      }
      calendarApi?.changeView(viewType, isToday ? new Date() : undefined);
    },
    [calendarApi, setViewType],
  );

  const goToJumpTo = useCallback(() => {
    router.push(PAGE_URLS.APPOINTMENT_JUMP());
  }, [router]);

  useEffect(() => {
    const localApi = fullCalendarRef?.current?.getApi() as CalendarImpl;
    setTitle(localApi?.getCurrentData()?.viewTitle);
    setViewValue(getViewValue(currViewType));
    if (currViewType) {
      localApi?.changeView(currViewType, undefined);
    }
  }, [currViewType, fullCalendarRef, jumpValue, setViewType]);

  return (
    <Grid container justifyContent="space-between" sx={{ p: 4 }}>
      <Grid item display="flex" sx={{ alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ ml: 4 }}>
          <ControlButton variant="text" onClick={handlePrev}>
            <LeftIcon />
          </ControlButton>
          <ControlButton variant="text" onClick={handleNext}>
            <RightIcon />
          </ControlButton>
        </Box>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={viewValue}
          onChange={handleChangeViewValue}
          exclusive
          sx={{
            backgroundColor: 'neutral.100',
            padding: '4px',
            marginRight: 2,
            '.MuiToggleButton-root': {
              borderColor: 'neutral.100',
              padding: '4px 16px',
              textTransform: 'capitalize',
            },
            '.Mui-selected.Mui-selected': {
              backgroundColor: 'neutral.contrastText',
              color: '#FFF',
              borderRadius: '4px',
            },
          }}
        >
          <ToggleButton
            size="small"
            value={DayViewValue.TODAY}
            onClick={() => handleChangeView(ViewType.DAY_VIEW, true)}
          >
            <Typography variant="subtitle2">Today</Typography>
          </ToggleButton>
          <ToggleButton size="small" value={DayViewValue.DAY} onClick={() => handleChangeView(ViewType.DAY_VIEW)}>
            <Typography variant="subtitle2">Day</Typography>
          </ToggleButton>
          <ToggleButton size="small" value={DayViewValue.WEEK} onClick={() => handleChangeView(ViewType.WEEK_VIEW)}>
            <Typography variant="subtitle2">Week</Typography>
          </ToggleButton>
          <ToggleButton size="small" value={DayViewValue.MONTH} onClick={() => handleChangeView(ViewType.MONTH)}>
            <Typography variant="subtitle2">Month</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <CustomButton variant="outlined" startIcon={<CalendarRemoveIcon />} sx={{ mr: 2 }}>
          Add Blackout
        </CustomButton>
        <CustomButton variant="outlined" startIcon={<SendIcon />} onClick={goToJumpTo}>
          Jump to..
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default CalendarHeader;
