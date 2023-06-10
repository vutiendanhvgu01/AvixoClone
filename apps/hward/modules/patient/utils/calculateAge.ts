import dayjs from 'dayjs';

/**
 *
 * @param birthdateRaw ISO Format Date in string
 * @returns Person's age
 */
function calculateAge(birthdateRaw: string) {
  const birthdate = dayjs(birthdateRaw);
  const now = dayjs();

  return now.diff(birthdate, 'year');
}

export default calculateAge;
