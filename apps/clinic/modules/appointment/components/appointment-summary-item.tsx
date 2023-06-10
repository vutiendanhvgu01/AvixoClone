import { FC } from 'react';
import { Box } from '@mui/system';
import { Typography, List, ListItem, styled, Divider, Card, useTheme } from '@mui/material';
import intervalToDuration from 'date-fns/intervalToDuration';
import { AppointmentItem } from './appointment-summary-types';

const AppointmentInformation = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: 53,
});

const CalendarCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px 8px',
  height: 53,
  width: 40,
  borderRadius: 8,
  margin: '0 16px 0 0',
});

const AppointmentSummaryItem: FC<any> = props => {
  const { title = 'upcoming', items, isPast = false } = props;
  const theme = useTheme();

  const getMonthName = (date: string): string => {
    const monthName = new Date(date).toLocaleString('default', { month: 'long' });
    return monthName.slice(0, 3);
  };

  const formatAMPM = (date: string): string => {
    let hours: number | string = new Date(date).getHours();
    let minutes: number | string = new Date(date).getMinutes();
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  const getMinutesDuration = (startDate: string, endDate: string) => {
    const timeDuration = intervalToDuration({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    return timeDuration.minutes;
  };

  const calendarCardBackground =
    isPast && theme.palette.neutral
      ? theme.palette.neutral[400]
      : 'linear-gradient(229.63deg, #6D60FF 11.1%, #2C7CFF 95.3%)';

  return (
    <Box
      sx={{
        width: '445px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="overline" display="block">
        {title}
      </Typography>
      <List sx={{ width: '100%', maxWidth: 445, bgcolor: 'background.paper' }}>
        {items &&
          items.map((item: AppointmentItem, index: number) => (
            <>
              <ListItem key={item.uuid} sx={{ paddingLeft: 0, maxWidth: 445, paddingRight: 0 }}>
                <CalendarCard sx={{ background: calendarCardBackground }}>
                  <Typography component="span" variant="caption" sx={{ color: 'primary.contrastText' }}>
                    {getMonthName(item.dateFrom)}
                  </Typography>
                  <Typography component="span" variant="h6" sx={{ color: 'primary.contrastText' }}>
                    {new Date(item.dateFrom).getDate()}
                  </Typography>
                </CalendarCard>
                <AppointmentInformation>
                  <Typography component="span" variant="subtitle1" color="text.primary">
                    {item.activity}
                  </Typography>
                  <Typography component="span" variant="caption">
                    {item.doctor}
                  </Typography>
                </AppointmentInformation>
                <AppointmentInformation sx={{ marginLeft: 'auto' }}>
                  <Typography component="span" variant="subtitle2" color="text.primary">
                    {formatAMPM(item.dateFrom)} - {formatAMPM(item.dateTo)}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ color: theme?.palette?.chart?.purple5, marginLeft: 'auto' }}
                  >
                    {getMinutesDuration(item.dateFrom, item.dateTo)} min. duration
                  </Typography>
                </AppointmentInformation>
              </ListItem>
              {index + 1 < 3 && (
                <Divider variant="inset" component="li" sx={{ marginBottom: '12px', marginLeft: 13 }} />
              )}
            </>
          ))}
      </List>
    </Box>
  );
};

export default AppointmentSummaryItem;
