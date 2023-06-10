import { Typography, Grid, Chip, Box, Button } from '@mui/material';
import { DayCellContentArg, EventApi } from '@fullcalendar/core';
import moment from 'moment';
import { BlackoutTypes, VisitTypes } from './types';

const dayCellContent = (
  cellContent: DayCellContentArg,
  handleChangeDrawer: (events?: EventApi[]) => void,
  events: EventApi[] = [],
) => {
  const { dayNumberText, isOther, isToday, date } = cellContent;
  const textColor = isOther ? 'neutral.300' : 'neutral.900';
  const currentEvents = events?.filter((event: EventApi) => moment(date).isSame(event.start, 'days'), []) || [];

  // Dummy data for now, will implement later
  const hasPublicHolidayBlackoutType = currentEvents?.some(
    (event: EventApi) => event.extendedProps?.blackoutType === BlackoutTypes.PUBLIC_HOLIDAY,
  );

  // Dummy function to handle visit type for now
  const calcVisitType = currentEvents?.reduce((visitType: Record<string, number>, event) => {
    const { eventType = '' } = event.extendedProps;
    if (visitType?.[eventType]) {
      // eslint-disable-next-line no-param-reassign
      visitType[eventType] += 1;
    } else {
      // eslint-disable-next-line no-param-reassign
      visitType[eventType] = 1;
    }

    return visitType;
  }, {});

  const todayDateStyle = isToday
    ? {
        display: 'block',
        color: '#FFF',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        textAlign: 'center',
      }
    : {};

  return (
    <Grid container>
      <Grid item mr="6px">
        <Typography variant="h6" color={textColor} ml={1} sx={todayDateStyle}>
          {dayNumberText}
        </Typography>
      </Grid>
      {hasPublicHolidayBlackoutType && (
        <Grid item>
          <Chip
            size="small"
            label="Public Holiday"
            sx={{
              border: '1px solid #FFF',
              backgroundColor: 'warning.main',
              fontSize: 12,
              height: '20px',
            }}
          />
        </Grid>
      )}
      {!!currentEvents.length && (
        <Grid
          item
          sx={{
            marginTop: 1,
            height: '92px',
            width: '152px',
            backgroundColor: '#FAFAFA',
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!!calcVisitType[VisitTypes.GENERAL] && (
            <Box display="flex">
              <Typography component="span" color="calendar.purple">
                General
              </Typography>
              <Typography component="span" color="#000" ml="auto">
                {calcVisitType[VisitTypes.GENERAL]}
              </Typography>
            </Box>
          )}
          {!!calcVisitType[VisitTypes.HOME_VISIT] && (
            <Box display="flex">
              <Typography component="span" color="calendar.green">
                Home Visit
              </Typography>
              <Typography component="span" color="#000" ml="auto">
                {calcVisitType[VisitTypes.HOME_VISIT]}
              </Typography>
            </Box>
          )}
          {/* Logic for that button will be  handle later */}
          <Button
            sx={{
              textDecoration: 'underline',
              padding: 0,
              marginLeft: 'auto',
              marginTop: 'auto',
              fontSize: '12px',
              fontWeight: 400,
            }}
            variant="text"
            color="black"
            onClick={() => handleChangeDrawer(currentEvents)}
          >
            +2 more
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default dayCellContent;
