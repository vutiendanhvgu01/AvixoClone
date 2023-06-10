import { PatientResponseProfile } from 'modules/patient/api/patient-api-type';
import mapPatientData from 'modules/patient/utils/mapPatientData';

const patient = {
  profile: {
    fullName: 'Nina H-WARD',
    birthdate: '1986-12-23T00:00:00.000Z',
    gender: 'F',
  },
  identification: {
    phone: {
      ext: 65,
      number: 89898989,
      fullNumber: '6589898989',
    },
    email: 'nina.hward.91111@speedoc.com',
    documents: [
      {
        type: 'nric',
        id: 'S5088720J',
        _id: '6423e51c2f2ac0f210454427',
      },
    ],
  },
  contacts: {
    phones: [
      {
        ext: 65,
        number: 89898989,
        _id: '6423e51b2f2ac0f21045441a',
      },
      {
        ext: 65,
        number: 88888888,
        _id: '6423e51b2f2ac0f21045441b',
      },
    ],
    addresses: [
      {
        fullAddress: 'SingaporeChangi Airport (SIN), SingaporeChangi Airport, Airport Boulevard, Changi, Singapore',
        unit: '#4B',
        city: 'Singapore',
        postalCode: '872501',
        country: 'SG',
        _id: '6423e51b2f2ac0f21045441c',
      },
    ],
  },
  _id: '6423e4c32f2ac0f2104543f0',
  createdAt: '2023-03-29T02:42:31.834Z',
  modifiedAt: '2023-03-29T07:13:32.832Z',
  status: 'active',
  accounts: [
    {
      type: 'speedoc-patient',
      active: true,
      meta: {
        name: 'Nina H-WARD',
      },
      id: '6423e4c35b1b514f76a11929',
    },
    {
      type: 'avixo',
      active: true,
      country: 'SG',
      meta: {
        pcno: '000080',
      },
      id: '80',
      url: 'https://staging-cms.avixoserver.com/client/dev_speedoc_sg/patient/default/view?id=318',
    },
    {
      type: 'hward',
      active: true,
      country: 'SG',
      meta: {
        taggedDate: '2023-03-29T07:13:32.407Z',
      },
      organizationRef: '642250d6ce8b5765fa16e2b2',
    },
  ],
  __v: 4,
} as PatientResponseProfile;

describe('mapPatientData', () => {
  it('should return formatted patient data', () => {
    const formatted = mapPatientData(patient);

    expect(formatted).toEqual({
      uuid: '6423e4c32f2ac0f2104543f0',
      avixoUrl: 'https://staging-cms.avixoserver.com/client/dev_speedoc_sg/patient/default/view?id=318',
      speedocPatientRef: '6423e4c35b1b514f76a11929',
      enrolmentDate: '2023-03-29T07:13:32.407Z',
      fullName: 'Nina H-WARD',
      dateOfBirth: 'Dec 23, 1986',
      gender: 'Female',
      nric: '*****720J',
      contact: '+65 89898989',
      alternativeContact: '+65 88888888',
      address: 'SingaporeChangi Airport (SIN), SingaporeChangi Airport, Airport Boulevard, Changi, Singapore',
      unitNumber: '#4B',
      postcode: '872501',
    });
  });
});
