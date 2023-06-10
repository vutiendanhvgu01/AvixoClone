// Mock data for fullcalendar
export const extendedProps = {
  eventType: 'General',
  patientName: 'Armin van Buuren',
  patientPhoneNumber: '+65 8232 8123',
  doctorName: 'Dr Fillash',
  blackoutType: 'Public Holiday',
};

const events = [
  {
    id: '1',
    title: 'Meeting',
    start: '2023-03-27 01:00:00',
    end: '2023-03-27 02:00:00',
    description: 'Mock 1 hour event 1',
    extendedProps,
  },
  {
    id: '2',
    title: 'Meeting',
    start: '2023-03-27 01:00:00',
    end: '2023-03-27 02:00:00',
    description: 'Mock 1 hour event 2',
    extendedProps,
  },
  {
    id: '3',
    title: 'Meeting',
    start: '2023-03-27 02:45:00',
    end: '2023-03-27 03:00:00',
    description: 'Mock 15 minutes event',
    extendedProps,
  },
  {
    id: '4',
    title: 'Meeting',
    start: '2023-03-27 02:15:00',
    end: '2023-03-27 02:45:00',
    description: 'Mock 30 minutes event',
    extendedProps,
  },
  {
    id: '5',
    title: 'Meeting',
    start: '2023-03-27 02:15:00',
    end: '2023-03-27 02:45:00',
    description: 'Mock 30 minutes event 2',
    extendedProps,
  },
];

export default events;
