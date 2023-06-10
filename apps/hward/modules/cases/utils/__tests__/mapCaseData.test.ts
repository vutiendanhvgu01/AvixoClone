import dayjs from 'dayjs';
import { CaseResponse } from 'modules/cases/api/case-type';
import { ServiceResponse } from 'modules/cases/api/service-type';
import { FormattedCase } from 'modules/cases/components/cases-types';
import { CensoredNRIC } from 'modules/patient/utils/censorNRIC';
import { formatDate } from 'share-components/src/utils/formatUtils';
import mapCaseData from '../mapCaseData';

const services: ServiceResponse[] = [
  {
    id: 1,
    type: 'Delivery',
    specialty: 'Ambulance',
    scheduleStart: '2023-05-02T02:00:00.000Z',
    scheduleEnd: '2023-05-02T02:30:00.000Z',
    status: 'accepted',
    providers: [],
    patientNote: '',
    patientCondition: 'additional comment',
  },
];
const drafts: ServiceResponse[] = [
  {
    id: 1,
    status: 'draft',
    type: 'Visit',
    specialty: 'Nurse',
    scheduleStart: '2023-05-02T16:30:00.000Z',
    scheduleEnd: '2023-05-02T16:45:00.000Z',
    providers: [],
  },
];
const caseData: CaseResponse = {
  id: 1,
  ref: 'case_123',
  status: 'onboarded',
  createdAt: '2023-05-03T02:03:47.805Z',
  user: {
    ref: 'patient_123',
    name: 'John Doe',
    nric: '*****123E',
    gender: 'M',
    birthDate: '1965-11-12T00:00:00.000Z',
  },
  services,
  drafts,
};

describe('Test mapCaseData', () => {
  it('transforms data without services', () => {
    const actual = mapCaseData(caseData);
    const expected: FormattedCase = {
      uuid: `C-${caseData.id}`,
      ref: caseData.ref,
      userRef: caseData.user.ref,
      name: caseData.user.name,
      age: dayjs().diff(caseData.user.birthDate, 'years'),
      gender: 'Male',
      nric: caseData.user.nric as CensoredNRIC,
      enrolmentDate: formatDate(caseData.createdAt, 'dd MMM yyyy'),
      lengthOfStay: dayjs().diff(caseData.createdAt, 'days'),
      status: 'Onboarded',
    };

    expect(actual).toEqual(expected);
  });

  it('transforms data with services', () => {
    const actual = mapCaseData(caseData, { services: true });
    const expected: FormattedCase = {
      uuid: `C-${caseData.id}`,
      ref: caseData.ref,
      userRef: caseData.user.ref,
      name: caseData.user.name,
      age: dayjs().diff(caseData.user.birthDate, 'years'),
      gender: 'Male',
      nric: caseData.user.nric as CensoredNRIC,
      enrolmentDate: formatDate(caseData.createdAt, 'dd MMM yyyy'),
      lengthOfStay: dayjs().diff(caseData.createdAt, 'days'),
      status: 'Onboarded',
      services: [
        {
          uuid: `S-${drafts[0].id}`,
          date: drafts[0].scheduleStart,
          startTime: formatDate(drafts[0].scheduleStart, 'HH:mm', true),
          endTime: formatDate(drafts[0].scheduleEnd, 'HH:mm', true),
          duration: dayjs(drafts[0].scheduleEnd).diff(drafts[0].scheduleStart, 'minutes'),
          type: drafts[0].type,
          specialty: drafts[0].specialty,
          providers: [],
          status: 'draft',
          orderRequest: '',
          notes: '',
          patientCondition: '',
          additionalComments: '',
        },
        {
          uuid: `S-${services[0].id}`,
          date: services[0].scheduleStart,
          startTime: formatDate(services[0].scheduleStart, 'HH:mm', true),
          endTime: formatDate(services[0].scheduleEnd, 'HH:mm', true),
          duration: dayjs(services[0].scheduleEnd).diff(services[0].scheduleStart, 'minutes'),
          type: services[0].type,
          specialty: services[0].specialty,
          providers: [],
          status: 'accepted',
          orderRequest: '',
          notes: '',
          patientCondition: 'additional comment',
          additionalComments: '',
        },
      ],
    };

    expect(actual).toEqual(expected);
  });
});
