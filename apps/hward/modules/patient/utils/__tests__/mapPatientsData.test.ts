import { PatientResponseProfile } from 'modules/patient/api/patient-api-type';
import mapPatientsData from '../mapPatientsData';

const patients = [
  {
    _id: '123abc',
    createdAt: '2023-03-20T16:00:00.000Z',
    profile: {
      fullName: 'Rayhan Abisha',
      gender: 'M',
      birthdate: '2000-07-03T16:00:00.000Z',
    },
    identification: {
      documents: [
        {
          type: 'nric',
          id: 'S0000001I',
        },
      ],
    },
    accounts: [
      {
        type: 'hward',
        active: true,
        country: 'SG',
        meta: { taggedDate: '2023-04-06T01:44:27.740Z' },
        organizationRef: '642250d6ce8b5765fa16e2b2',
      },
    ],
  },
] as PatientResponseProfile[];

describe('Test mapPatientsData', () => {
  it('Transforms patient data correctly', () => {
    const actual = mapPatientsData(patients);
    const expected = [
      {
        uuid: '123abc',
        fullname: 'Rayhan Abisha',
        censoredNRIC: '*****001I',
        enrolmentDate: '06 Apr 2023',
        gender: 'Male',
        age: 22,
      },
    ];

    expect(actual).toEqual(expected);
  });
});
