import { SetStateAction, Dispatch, RefObject } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventApi } from '@fullcalendar/core';

export enum ViewType {
  DAY_VIEW = 'timeGridDay',
  WEEK_VIEW = 'timeGridWeek',
  MONTH = 'dayGridMonth',
}

export enum FullCalendarTimeFormat {
  TIME_TEXT = 'H:mm A',
  DRAWER_TIME_TEXT = 'H.mm a',
  DRAWER_APPOINTMENT_DATE = 'dd MMMM yyyy',
  TITLE_FORMAT = 'EEEE, dd MMMM yyyy',
  TITLE_FORMAT_MONTH = 'MMMM yyyy',
  SLOT_LABEL_FORMAT = 'h A',
}

export enum DayViewValue {
  DAY = 'day',
  TODAY = 'toDay',
  WEEK = 'week',
  MONTH = 'month',
}

export enum BlackoutTypes {
  PUBLIC_HOLIDAY = 'Public Holiday',
}

export enum VisitTypes {
  HOME_VISIT = 'Home Visit',
  GENERAL = 'General',
}

export interface ExpandedZonedMarker {
  marker?: Date;
}

export interface FullCalendarHeaderProps {
  viewType?: string;
  setViewType?: Dispatch<SetStateAction<string>>;
  fullCalendarRef?: RefObject<FullCalendar>;
  jumpValue?: number;
}

export interface AppointmentDrawerProps {
  display: boolean;
  onClose: () => void;
  events?: EventApi[];
}
