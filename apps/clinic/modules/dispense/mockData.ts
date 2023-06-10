import { Dispense } from './types/dispense';

export const MOCK_DISPENSES: Dispense[] = [
  {
    id: 2,
    uuid: 'e781030e-9fdd-11ed-ba09-0242ac110006',
    patientId: 1,
    dispenseId: 'DS-13/12/22 02:29',
    status: 'completed',
    category: 'community',
    validFrom: '0001-01-01T00:00:00Z',
    createdAt: '2023-01-29T14:04:53.894Z',
    items: [
      {
        id: 1,
        prescriptionId: 1,
        name: 'name',
        code: 'code',
        shortName: 'Paracetamol 450mg + Orphenadrine Citrate 35mg Tablet',
        genericName: 'string',
        brandName: 'string',
        description: 'Paracetamol 450mg + Orphenadrine Citrate 35mg Tablet',
        packSize: 1,
        unitOfMeasurement: 'string',
        quantity: 100,
        notes: '10 tab/s / Take 2 tab/s / 3 times a day / May cause drowsiness.DO NOT TAKE WITH ALCOHOL',
        allowSubstitution: true,
        instructions: [
          {
            id: 1,
            text: 'Paracetamol 450mg + Orphenadrine Citrate 35mg Tablet',
            itemId: 'string',
            additional: 'string',
            doseUnit: 'string',
            doseRateUnit: 'string',
            timingFrequency: 'string',
            maxDoseUnit: 'string',
            maxDoseDuration: 'string',
            maxDoseDurationUnit: 'string',
            routeCode: 'string',
            routeName: 'string',
            methodCode: 'string',
            methodName: 'string',
            siteName: 'string',
            siteCode: 'string',
            dose: 1,
            doseRate: 1,
            maxDose: 1,
            duration: 1,
            sequence: 1,
            asNeeded: false,
          },
        ],
      },
    ],
    patient: {
      id: 1,
      uuid: '771f342d-ac51-11ed-98f7-40b0763cf0e6',
      patientId: 1,
      fullName: 'Joshua Tan',
      medicalRecordNumber: 'test123',
      salutation: 'Mr',
      firstName: 'abhishek',
      middleName: 'kumar',
      preferredName: 'Joshua',
      preferredSalutation: 'Mr',
      birthDate: '1993-01-24T00:00:00Z',
      nationality: 'Singapore',
      race: 'Chinese',
      religion: 'Christian',
      placeOfBirth: 'Singapore',
      gender: 'male',
      genderPreferred: 'male',
      maritalStatus: 'Single',
      primaryOrganisationId: 2,
      company: 'Grab Pte Ltd',
      occupation: 'Engineer',
      referredBy: 'me',
      notes: 'Patient is allergic to Paracetemol',
      organisationId: 1,
      premiseId: 11,
      createdAt: '2023-02-14T15:52:20.922Z',
      updatedAt: '2023-04-24T09:18:14.469Z',
      deletedAt: undefined,
      identities: [
        {
          id: 1,
          idType: 'national-id',
          idSubType: 'citizen',
          issuingCountry: 'SG',
          idNumber: 'S9339120I',
          isVerified: true,
          validFrom: '2023-04-07T10:14:15.184Z',
          updatedAt: '2023-04-24T09:18:14.472Z',
          createdAt: '2023-02-14T15:52:21.058Z',
          deletedAt: undefined,
        },
        {
          id: 21,
          idType: 'passport',
          idSubType: 'citizen',
          issuingCountry: 'SG',
          idNumber: 'K1236512H',
          isVerified: true,
          validFrom: '2023-04-07T10:14:15.184Z',
          updatedAt: '2023-04-24T09:18:14.472Z',
          createdAt: '2023-04-05T15:19:49.213Z',
          deletedAt: undefined,
        },
      ],
      phones: [
        {
          id: 1,
          preferred: false,
          isoNumber: '+6598345671',
          number: '98345671',
          exitCode: 0,
          areaCode: 0,
          countryCode: 65,
          extension: 0,
          type: '',
          validFrom: '0001-01-01T00:00:00Z',
          updatedAt: '2023-04-24T09:18:14.476Z',
          createdAt: '2023-02-14T15:52:21.337Z',
          deletedAt: undefined,
        },
      ],
      emails: [
        {
          id: 1,
          email: 'joshua.tan93@gmail.com',
          verifiedAt: '0001-01-01T00:00:00Z',
          preferred: false,
          type: '',
          validFrom: '0001-01-01T00:00:00Z',
          updatedAt: '2023-04-24T09:18:14.48Z',
          createdAt: '2023-02-14T15:52:21.612Z',
          deletedAt: undefined,
        },
        {
          id: 131,
          email: 'lenin@avixo.com',
          verifiedAt: '0001-01-01T00:00:00Z',
          preferred: false,
          type: '',
          validFrom: '0001-01-01T00:00:00Z',
          updatedAt: '2023-04-24T09:18:14.48Z',
          createdAt: '2023-04-07T10:14:15.191Z',
          deletedAt: undefined,
        },
      ],
      addresses: [
        {
          id: 1,
          name: '34',
          purpose: 'home',
          text: '95 Giraffe Gateway, 78, Singapore, Singapore, 914166',
          floorNo: '02',
          unitNo: '34',
          line1: 'Blk 12',
          line2: 'Jurong Street 12',
          city: 'Singapore',
          district: '',
          state: '',
          country: 'Singapore',
          postal: '432122',
          isPrimary: true,
          validFrom: '2023-04-01T23:25:20Z',
          validTo: '2023-10-10T23:25:20Z',
          updatedAt: '2023-04-24T09:18:14.484Z',
          createdAt: '2023-04-07T15:25:23Z',
          deletedAt: undefined,
        },
        {
          id: 53,
          name: 'Home',
          purpose: 'not applicable',
          text: '8 Kaki Bukit Ave 1, #04-06, Singapore 417941',
          floorNo: '04',
          unitNo: '06',
          line1: '8 Kaki Bukit Ave 1',
          line2: '8',
          city: 'Singapore',
          district: 'Singapore',
          state: 'Singapore',
          country: 'Singapore',
          postal: '417941',
          validFrom: '2022-10-16T23:26:22Z',
          validTo: '2024-01-20T23:26:22Z',
          updatedAt: '2023-04-24T09:18:14.484Z',
          createdAt: '2023-04-08T05:51:04.455Z',
          deletedAt: undefined,
        },
      ],
      contact: [
        {
          id: 2,
          email: {
            id: 4,
            email: 'james.tan7892@gmail.com',
            verifiedAt: '0001-01-01T00:00:00Z',
            preferred: false,
            type: '',
            validFrom: '0001-01-01T00:00:00Z',
            updatedAt: '2023-04-24T09:18:14.49Z',
            createdAt: '2023-02-14T15:53:55.843Z',
            deletedAt: undefined,
          },
          address: {
            id: 60,
            name: '',
            purpose: 'home',
            floorNo: '01',
            unitNo: '23',
            line1: 'Blk 890',
            line2: 'Jurong St 12',
            city: 'Singapore',
            district: '',
            state: '',
            country: 'Singapore',
            postal: '678543',
            validFrom: '0001-01-01T00:00:00Z',
            updatedAt: '2023-04-24T09:18:14.492Z',
            createdAt: '2023-04-20T05:49:01.915Z',
            deletedAt: undefined,
            text: '',
          },
          phone: {
            id: 4,
            isoNumber: '+659067439',
            preferred: true,
            number: '9067439',
            exitCode: 0,
            areaCode: 0,
            countryCode: 65,
            extension: 0,
            type: '',
            validFrom: '0001-01-01T00:00:00Z',
            updatedAt: '2023-04-24T09:18:14.494Z',
            createdAt: '2023-02-14T15:53:56.233Z',
            deletedAt: undefined,
          },
          fullName: 'vishal',
          gender: 'male',
          validFrom: '0001-01-01T00:00:00Z',
          validTo: '2023-04-17T05:48:27Z',
          updatedAt: '2023-04-24T09:18:14.488Z',
          createdAt: '2023-02-14T15:53:55.691Z',
          deletedAt: undefined,
          relationship: '',
        },
      ],
    },
  },
];

export const HISTORY_ITEMS = [
  {
    id: 1,
    date: '2023/02/07 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 2,
    date: '2023/02/07 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 3,
    date: '2023/02/06 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 4,
    date: '2023/02/06 16:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 5,
    date: '2023/02/04 10:47:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 6,
    date: '2023/02/07 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 7,
    date: '2023/02/07 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 8,
    date: '2023/02/06 11:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 9,
    date: '2023/02/06 16:33:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
  {
    id: 10,
    date: '2023/02/04 10:47:00',
    by: 'Dr. Fahir Khiard',
    detail: 'New medicine added Hexylresorcinol 2.4 mg Lozenge',
  },
];
