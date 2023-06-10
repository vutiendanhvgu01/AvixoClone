import { PhoneNumber } from 'common/constants/types';
import { parsePhoneNumber } from 'libphonenumber-js';

type PatientContact = PhoneNumber & { _id: string };

function getContact(phone: PatientContact): string {
  if (!phone?.number) return '';

  const formattedContact = parsePhoneNumber(String(phone.number), 'SG');
  return `+${formattedContact?.countryCallingCode ?? phone.ext ?? 65} ${formattedContact?.nationalNumber}`;
}

function getPatientContacts(phones: PatientContact[]): {
  contact: string;
  alternativeContact: string;
} {
  return {
    contact: getContact(phones[0]),
    alternativeContact: getContact(phones[1]),
  };
}

export default getPatientContacts;
