import mapServiceData from 'modules/cases/utils/mapServiceData';
import { CaseResponse } from 'modules/cases/api/case-type';

describe('mapServiceData', () => {
  const caseDetail = {
    id: 62898,
    ref: '642cd1daeb060a5e7f3ba7f2',
    status: 'active',
    createdAt: '2023-04-05T01:41:46.422Z',
    user: {
      ref: '642cd1d83b545c270bfdfcbc',
      name: 'Test PersonOne',
      nric: 'S0372170A',
      gender: 'M',
      birthDate: '1967-12-31T00:00:00.000Z',
    },
    services: [
      {
        id: 78575,
        type: 'Visit',
        specialty: 'General Practitioner',
        scheduleStart: '2023-04-05T03:30:00.000Z',
        scheduleEnd: '2023-04-05T04:00:00.000Z',
        status: 'accepted',
        providers: [],
        patientNote: 'this is patient notes',
        clinicalNote: 'this is clinical notes',
      },
      {
        id: 78579,
        type: 'Delivery',
        specialty: 'Rider',
        scheduleStart: '2023-04-05T02:40:00.000Z',
        scheduleEnd: '2023-04-05T06:40:00.000Z',
        status: 'accepted',
        providers: [],
        jarvisNote: 'this is Jarvis notes',
      },
      {
        id: 78580,
        type: 'Delivery',
        specialty: 'Ambulance',
        scheduleStart: '2023-04-05T02:40:00.000Z',
        scheduleEnd: '2023-04-05T03:10:00.000Z',
        status: 'accepted',
        providers: [],
        patientCondition: 'Severe',
      },
    ],
  } as CaseResponse;

  it('should return filled orderRequest and Additional Comments if type is visit', () => {
    const formatted = mapServiceData(caseDetail);

    expect(formatted[0]).toEqual({
      uuid: `S-78575`,
      date: '2023-04-05T03:30:00.000Z',
      startTime: '11:30',
      endTime: '12:00',
      duration: 30,
      type: 'Visit',
      specialty: 'General Practitioner',
      providers: [],
      status: 'accepted',
      orderRequest: 'this is clinical notes',
      additionalComments: 'this is patient notes',
      notes: '',
      patientCondition: '',
    });
  });

  it('should return filled notes if specialty is Rider', () => {
    const formatted = mapServiceData(caseDetail);

    expect(formatted[1]).toEqual({
      uuid: `S-78579`,
      date: '2023-04-05T02:40:00.000Z',
      startTime: '10:40',
      endTime: '14:40',
      duration: 240,
      type: 'Delivery',
      specialty: 'Rider',
      providers: [],
      status: 'accepted',
      orderRequest: '',
      additionalComments: '',
      notes: 'this is Jarvis notes',
      patientCondition: '',
    });
  });

  it('should return filled patient condition if specialty is Ambulance', () => {
    const formatted = mapServiceData(caseDetail);

    expect(formatted[2]).toEqual({
      uuid: `S-78580`,
      date: '2023-04-05T02:40:00.000Z',
      startTime: '10:40',
      endTime: '11:10',
      duration: 30,
      type: 'Delivery',
      specialty: 'Ambulance',
      providers: [],
      status: 'accepted',
      orderRequest: '',
      additionalComments: '',
      notes: '',
      patientCondition: 'Severe',
    });
  });
});
