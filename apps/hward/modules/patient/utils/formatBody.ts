import dayjs from 'dayjs';
import { PhoneNumber } from 'common/constants/types';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PatientFormValues } from '../components/patient-types';

export type FormattedPatientBody = Omit<PatientFormValues, 'contact' | 'alternativeContact'> & {
  phoneNumber: PhoneNumber;
  alternatePhoneNumber: PhoneNumber;
  email: string;
  birthdate: string;
};

export default function formatBody(body: PatientFormValues): FormattedPatientBody {
  // Add 8 hours to ensure that it is in UTC+8
  const birthdate = dayjs(body.birthdate).add(8, 'hour').toISOString();
  const formattedContact = parsePhoneNumber(body.contact, 'SG');
  const final = {
    fullName: body.fullName,
    gender: body.gender === 'Male' ? 'M' : 'F',
    nric: body.nric,
    birthdate,
    phoneNumber: {
      ext: parseInt(formattedContact?.countryCallingCode ?? '65', 10),
      number: parseInt(formattedContact?.nationalNumber ?? '', 10),
    },
  } as FormattedPatientBody;

  if (body.address?.fullAddress?.length !== 0) final.address = body.address;

  if (body.alternativeContact) {
    const formattedAlternativeContact = parsePhoneNumber(body.alternativeContact, 'SG');
    final.alternatePhoneNumber = {
      ext: parseInt(formattedAlternativeContact?.countryCallingCode ?? '65', 10),
      number: parseInt(formattedAlternativeContact?.nationalNumber ?? '', 10),
    };
  }

  return final;
}
