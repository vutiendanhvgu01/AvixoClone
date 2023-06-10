import { formatInTimeZone } from 'date-fns-tz';
import format from 'date-fns/format';
import intervalToDuration from 'date-fns/intervalToDuration';
import isToday from 'date-fns/isToday';
import isValid from 'date-fns/isValid';
import isYesterday from 'date-fns/isYesterday';

import parse from 'date-fns/parse';

type Pattern =
  | 'MMM dd, yyyy, HH:mm:ss'
  | 'dd MMM yyyy'
  | "dd MMM, yyyy 'at' hh:mm a"
  | 'dd MMM yyyy, hh:mm:ss'
  | 'dd/MM/yy'
  | 'dd/MM/yy hh:mm a'
  | 'MM/dd/yyyy'
  | 'HH:mm a'
  | 'HH:mm'
  | "dd MMMM yyyy 'at' hh:mm a"
  | 'MMMM yyyy'
  | 'mm/dd/yyyy'
  | "dd/MM/yyyy 'at' hh:mm a"
  | "dd/MM/yyyy '-' hh:mm a"
  | 'dd MMM yyyy hh:mm a'
  | 'dd/MM/yyyy'
  | 'pp'
  | 'EEEE, dd MMMM yyyy'
  | 'H.mm a'
  | 'dd MMMM yyyy'
  | 'yyyy-M-dd'
  | 'MMM'
  | 'MMM dd, yyyy'
  | 'dd MMM yyyy, hh:mm a'
  | 'dd/MM/yyyy - hh:mm'
  | 'dd MMM yyyy - hh:mm'
  | 'dd MMM yyyy - HH:mm'
  | 'yyyy-MM-dd'
  | 'dd MMMM, yyyy';

type GlobalDatePattern = 'yyyy/MM/dd HH:mm:ss';

const DEFAULT_TIMEZONE = 'Asia/Singapore';

export const formatDate = (date?: string, pattern: Pattern = 'MMM dd, yyyy, HH:mm:ss', withTimezone = false) => {
  if (!date || !isValid(new Date(date))) return '';
  if (!withTimezone) return format(new Date(date), pattern);
  return formatInTimeZone(new Date(date), DEFAULT_TIMEZONE, pattern);
};

export const getRelativeDayName = (dateStr: string, pattern: GlobalDatePattern = 'yyyy/MM/dd HH:mm:ss') => {
  const date = parse(dateStr, pattern, new Date());
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'yyyy/MM/dd');
};

export const formatTime = (dateStr: string, pattern: GlobalDatePattern = 'yyyy/MM/dd HH:mm:ss') => {
  const date = parse(dateStr, pattern, new Date());
  return format(date, 'hh:mm a');
};
export const getDuration = (dateEarlier: string, dateLate: string = new Date().toJSON()) => {
  if (!dateEarlier || !isValid(new Date(dateEarlier)) || !isValid(new Date(dateLate))) return '';

  const dLate = new Date(dateLate);
  const dEarlier = new Date(dateEarlier);

  const duration = intervalToDuration({ start: dEarlier, end: dLate });
  const zeroPad = (num?: number) => String(num).padStart(2, '0');

  return `${zeroPad(duration.hours)}:${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`;
};

export const formatDateWithPattern = (
  dateStr: string,
  resultPattern: string,
  pattern: GlobalDatePattern = 'yyyy/MM/dd HH:mm:ss',
) => {
  const date = parse(dateStr, pattern, new Date());
  return format(date, resultPattern);
};

export const capitaliseFirstCharacter = (text: string | undefined) =>
  text
    ?.split(' ')
    .map(element => {
      if (element.length > 1) {
        return element.charAt(0).toUpperCase() + element.slice(1);
      }
      return element.toUpperCase();
    })
    .join(' ');

/**
 * Covert from Hex color to RGBA color
 * @param hex e.x: #FAFAFA
 * @param alpha defining the transparency of the color from 0 - 1
 * @returns string
 */
export const formatHexToRGBA = (hex?: string, alpha = 1): string => {
  if (!hex) return '';

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const formatAddresses = ({
  postal,
  blockNo,
  address,
  unitNo,
  label,
}: {
  postal: string | string[];
  blockNo: string | string[];
  address: string | string[];
  unitNo: string | string[];
  label: string | string[];
}) =>
  Array.isArray(postal)
    ? postal.map((item: string, index: number) => ({
        postal: item,
        line1: address[index],
        floorNo: blockNo[index],
        unitNo: unitNo[index],
        name: label[index],
      }))
    : [
        {
          postal,
          line1: address,
          floorNo: blockNo,
          unitNo,
          name: label,
        },
      ];

export const formatEmails = ({ email }: { email: string | string[] }) =>
  Array.isArray(email)
    ? email.map((item: string) => ({
        email: item,
      }))
    : [
        {
          email,
        },
      ];

export const formatPhones = ({
  phoneValue,
  countryCode,
}: {
  phoneValue: string | string[];
  countryCode: string | string[];
}) =>
  Array.isArray(phoneValue)
    ? phoneValue.map((item: string, index: number) => ({
        number: item,
        countryCode: countryCode[index],
      }))
    : [
        {
          number: phoneValue,
          isoNumber: countryCode,
        },
      ];

export const stringifyNumber = (number = 0): string => {
  const special = [
    'zeroth',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth',
  ];
  const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

  if (number < 20) {
    return special[number];
  }
  if (number % 10 === 0) {
    return `${deca[Math.floor(number / 10) - 2]}ieth`;
  }

  return `${deca[Math.floor(number / 10) - 2]}y-${special[number % 10]}`;
};

export const getPreferredFieldOfPatient = (
  patient: Record<string, any> | null,
  field: 'phones' | 'emails' | 'identities',
  key?: string,
): string => {
  try {
    const data = patient?.[field];
    const keyValue = key || (field === 'emails' ? 'email' : 'isoNumber');
    if (Array.isArray(data) && data?.length) {
      return data?.find((item: Record<string, any>) => item?.preferred)?.[keyValue] ?? data[0]?.[keyValue];
    }
    return '';
  } catch {
    return '';
  }
};

export const getPhoneNumberByPatient = (patient: Record<string, any> | null): string =>
  getPreferredFieldOfPatient(patient, 'phones');

export const getEmailByPatient = (patient: Record<string, any> | null): string =>
  getPreferredFieldOfPatient(patient, 'emails');
