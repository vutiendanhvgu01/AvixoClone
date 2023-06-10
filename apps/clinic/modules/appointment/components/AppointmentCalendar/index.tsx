import { DayHeaderContentArg, EventApi, EventContentArg } from '@fullcalendar/core';
import { CalendarImpl } from '@fullcalendar/core/internal';
import dayGrid from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Tooltip, Typography } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/system';
import { getEventsAppointMent } from 'modules/appointment/common/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useCallback, useRef, useState } from 'react';
import { PAGE_URLS } from 'share-components/src/constants';
import { datesAreOnSameTime } from 'share-components/src/utils/dateUtil';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { Appointment } from '../appointment-types';
import AppointmentDrawer from './appointment-drawer-content';
import CalendarHeader from './calendar-header';
import dayCellContent from './day-cell-content';
import EventContent from './event-content';
import events from './mock-data';
import { ExpandedZonedMarker, FullCalendarTimeFormat, ViewType } from './types';

const AppointmentAction = dynamic(() => import('modules/appointment/components/appointment-action'), {
  ssr: false,
});

const CalendarWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF',
  borderRadius: 8,
  '.fc-daygrid-body tr': {
    height: 142,
  },
  '.fc-scrollgrid.fc-scrollgrid-liquid': {
    borderLeftStyle: 'unset',
  },
  '.fc-toolbar': {
    fontFamily: '"Inter"',
  },
  '.fc-timegrid-slots': {
    'td div': {
      height: '25px',
    },
    '.fc-timegrid-slot': {
      height: '25px',
    },
    '.fc-timegrid-slot-lane': {
      background: '#FFF',
    },
    '.fc-timegrid-slot-label': {
      border: 'none',
    },
    '.fc-timegrid-slot-label-cushion': {
      position: 'relative',
      top: 36,
    },
  },
  '.fc-event': {
    background: 'none',
    border: 'none',

    '.fc-event-main': {
      width: '100%',
      height: '100%',
    },
  },
  'fc-timegrid-col-frame': {
    overflow: 'hidden',
  },
  '.fc-timegrid-col-events': {
    '.fc-timegrid-event-harness-inset .fc-timegrid-event': {
      boxShadow: 'none',
    },
  },
  '.fc-day': {
    '&.fc-daygrid-day.fc-day-today': {
      backgroundColor: 'unset',
    },
    '.fc-daygrid-day-top': {
      flexDirection: 'row',
      width: '100%',
      padding: '12px 5px 5px 5px',
      '.fc-daygrid-day-number': {
        width: '100%',
        padding: 0,
      },
    },
  },
  '.fc-daygrid-day-frame': {
    '&:hover': {
      backgroundColor: theme.palette.primary.states.hoverBackground,
    },
    '.fc-daygrid-day-events.fc-daygrid-day-events': {
      minHeight: 0,
      height: 0,
    },
  },
}));

interface AppointmentCalendarProps {
  appointmentList: Appointment[];
}
interface EventPopupProps {
  eventsList: any[];
  theme: Theme;
}

const EventPopup = ({ eventsList, theme }: EventPopupProps) => (
  <div className="event-popup">
    {eventsList.map(event => EventContent({ event } as EventContentArg, theme, false, true))}
  </div>
);

const AppointmentCalendar: FC<AppointmentCalendarProps> = ({ appointmentList }) => {
  const router = useRouter();
  const [eventsTooltip, setEventsTooltip] = useState<null | {
    eventsList: any[];
    anchorEl: HTMLElement;
  }>(null);
  const fullCalendarRef = useRef<FullCalendar>(null);
  const [viewType, setViewType] = useState<string>(ViewType.MONTH);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<EventApi[]>([]);
  const theme = useTheme();
  const [jumpValue, setJumpValue] = useState<number | undefined>(undefined);

  const getViewType = (view: string) => {
    switch (view) {
      case 'Day':
        return ViewType.DAY_VIEW;
      case 'Week':
        return ViewType.WEEK_VIEW;
      default:
        return ViewType.MONTH;
    }
  };

  const dayHeaderContent = (headerContent: DayHeaderContentArg) => (
    <Typography component="span" variant="overline">
      {headerContent.text}
    </Typography>
  );

  const handleFormatTitle = useCallback(
    (date: ExpandedZonedMarker) => {
      const { marker = new Date() } = date;
      const formatString =
        viewType === ViewType.MONTH ? FullCalendarTimeFormat.TITLE_FORMAT_MONTH : FullCalendarTimeFormat.TITLE_FORMAT;
      return formatDate(marker.toString(), formatString);
    },
    [viewType],
  );

  const handleSetViewType = useCallback(
    (arg: DateClickArg) => {
      if (viewType === ViewType.MONTH && !(arg?.jsEvent?.target as HTMLInputElement).type) {
        fullCalendarRef?.current?.getApi()?.changeView(ViewType.DAY_VIEW, arg.date);
        setViewType(ViewType.DAY_VIEW);
      }
    },
    [viewType],
  );

  const handleEventMouseEnter = (info: any) => {
    const data = getEventsAppointMent(appointmentList);

    // eslint-disable-next-line no-underscore-dangle
    const { start } = info.event._instance.range;
    const eventsList = data.filter(event => datesAreOnSameTime(new Date(event.start), start));
    if (eventsList.length < 2) {
      return;
    }
    setEventsTooltip({
      eventsList,
      anchorEl: info.el,
    });
  };

  const handleEventMouseLeave = () => {
    setEventsTooltip(null);
  };

  const handleChangeDrawer = useCallback(
    (currentEvents?: EventApi[]) => {
      if (currentEvents) {
        setSelectedDateEvents(currentEvents);
      }
      setIsOpenDrawer(!isOpenDrawer);
    },
    [isOpenDrawer],
  );

  const getCalendarIncrementType = (value: string) => {
    switch (value) {
      case 'Day':
        return 'days';
      case 'Month':
        return 'months';
      case 'Week':
        return 'weeks';
      default:
        return null;
    }
  };

  const handleJumpAction = useCallback(
    (type: string, value: number) => {
      const jumpType = getCalendarIncrementType(type);
      if (jumpType) {
        const localApi = fullCalendarRef?.current?.getApi() as CalendarImpl;
        localApi?.today();
        localApi?.incrementDate({ [jumpType]: value });
        setViewType(getViewType(type));
        setJumpValue(value);
      }
    },
    [fullCalendarRef, setViewType, setJumpValue],
  );

  return (
    <Tooltip
      title={<EventPopup eventsList={eventsTooltip?.eventsList ?? []} theme={theme} />}
      PopperProps={{
        placement: 'right',
        anchorEl: eventsTooltip?.anchorEl,
        sx: {
          '& .MuiTooltip-tooltip': {
            background: 'none ',
          },
        },
      }}
    >
      <CalendarWrapper>
        <CalendarHeader
          jumpValue={jumpValue}
          viewType={viewType}
          setViewType={setViewType}
          fullCalendarRef={fullCalendarRef}
        />

        <FullCalendar
          ref={fullCalendarRef}
          slotEventOverlap
          nowIndicator
          scrollTime="00:00"
          plugins={[timeGridPlugin, dayGrid, momentPlugin, interactionPlugin]}
          initialView={viewType}
          events={getEventsAppointMent(appointmentList)}
          headerToolbar={false}
          titleFormat={({ date }) => handleFormatTitle(date)}
          themeSystem="standard"
          dayHeaders={viewType !== ViewType.DAY_VIEW}
          dayHeaderContent={dayHeaderContent}
          dayHeaderFormat="dddd"
          dayCellContent={cellContent =>
            dayCellContent(cellContent, handleChangeDrawer, fullCalendarRef?.current?.getApi()?.getEvents())
          }
          dateClick={handleSetViewType}
          allDaySlot={false}
          slotDuration="00:15:00"
          slotLabelInterval="01:00:00"
          slotLabelFormat={FullCalendarTimeFormat.SLOT_LABEL_FORMAT}
          eventContent={eventContent => EventContent(eventContent, theme, viewType === ViewType.MONTH)}
          eventDisplay={viewType === ViewType.MONTH ? 'none' : 'initial'}
          eventTimeFormat={FullCalendarTimeFormat.TIME_TEXT}
          selectable={viewType === ViewType.MONTH}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          eventClick={eventContent => router.push(PAGE_URLS.APPOINTMENT_EDIT_CALENDAR(eventContent?.event?.id))}
        />
        <AppointmentDrawer display={isOpenDrawer} onClose={handleChangeDrawer} events={selectedDateEvents} />
        <AppointmentAction onJump={handleJumpAction} />
      </CalendarWrapper>
    </Tooltip>
  );
};

export default AppointmentCalendar;
