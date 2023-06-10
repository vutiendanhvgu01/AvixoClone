import { EventContentArg } from '@fullcalendar/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox, Chip, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import differenceInMinutes from 'date-fns/differenceInMinutes';

const EventContent = (eventContent: EventContentArg, theme: Theme, isMonthView = false, isHover = false) => {
  const muiTheme = theme;
  const eventTimeDifference = differenceInMinutes(eventContent?.event?.end || 0, eventContent?.event?.start || 0);
  const isOneHourBlock = eventTimeDifference === 60;
  const isHalfHourBlock = eventTimeDifference === 30;
  const isQuarterHourBlock = !isOneHourBlock && !isHalfHourBlock;

  const eventBackgroundColor = () => {
    if (isHover) {
      return muiTheme.palette.calendar?.black1;
    }
    if (isOneHourBlock) {
      return muiTheme.palette.calendar?.pink;
    }
    if (isHalfHourBlock) {
      return muiTheme.palette.calendar?.green;
    }
    return muiTheme.palette.calendar?.purple;
  };

  if (isMonthView) {
    return null;
  }
  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        background: eventBackgroundColor,
        border: '1px solid #FFF',
        borderRadius: '4px',
        height: '100%',
        width: '100%',
        padding: 1,
        paddingTop: isQuarterHourBlock ? '4px' : 1,
        flexWrap: 'inherit',
        maxWidth: isOneHourBlock ? 'none' : '181px',
        minWidth: '150px',
        cursor: 'pointer',
      }}
    >
      <Grid item display="flex" alignItems="center">
        {isQuarterHourBlock && !isHover && (
          <Typography
            fontSize={8}
            component="div"
            mr="4px"
            lineHeight="16px"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '52px',
              display: 'inline-block',
              color: '#FFF',
            }}
          >
            {eventContent?.event?.extendedProps?.patient?.fullName}
          </Typography>
        )}
        <Typography fontSize={8} component="div" color="#FFF" lineHeight="0" mr="4px">
          {isOneHourBlock || isHover ? eventContent?.timeText : eventContent?.event?.extendedProps?.eventType}
        </Typography>
        <Checkbox
          sx={{
            width: '12px',
            height: '12px',
            background: '#FFF',
            color: `${muiTheme.palette.secondary.main} !important`,
            border: '2px solid #FFF',
            '> input': {
              width: '12px',
              height: '12px',
            },
            padding: '4px',
          }}
          icon={
            <RadioButtonUncheckedIcon
              sx={{
                fontSize: '12px',
              }}
            />
          }
          checkedIcon={
            <CheckCircleIcon
              sx={{
                fontSize: '12px',
              }}
            />
          }
          defaultChecked
        />
        <Chip
          size="small"
          label={eventContent?.event?.extendedProps?.practitioner?.name}
          sx={{
            height: '12px',
            marginLeft: 'auto',
            fontSize: 8,
            border: '1px solid #FFF',
            backgroundColor: 'info.main',
          }}
        />
      </Grid>
      {isHover ? (
        <Grid item marginBottom="auto">
          <Typography fontWeight={400} fontSize={10} color="#FFF" component="div">
            {eventContent?.event?.extendedProps?.eventType}
          </Typography>
          <Typography fontWeight={500} variant="caption" color="#FFF" component="div">
            {eventContent?.event?.extendedProps?.patient?.fullName}
          </Typography>
          <Typography variant="caption" color="#FFF" component="div">
            {eventContent?.event?.extendedProps?.patient?.phones[0].number}
          </Typography>
        </Grid>
      ) : (
        !isQuarterHourBlock && (
          <Grid item marginBottom="auto">
            {isOneHourBlock && (
              <Typography fontWeight={400} fontSize={10} color="#FFF" component="div">
                {eventContent?.event?.extendedProps?.eventType}
              </Typography>
            )}
            <Typography fontWeight={500} variant="caption" color="#FFF" component="div">
              {eventContent?.event?.extendedProps?.patient?.fullName}
            </Typography>
            {isOneHourBlock && (
              <Typography variant="caption" color="#FFF" component="div">
                {eventContent?.event?.extendedProps?.patient?.phones[0].number}
              </Typography>
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};

export default EventContent;
