import Chance from 'chance';

export const chance = new Chance();
export const randomFirstName = chance.first();
export const randomLastName = chance.last();
export const randomPhoneNumber = `9${chance.string({ length: 7, numeric: true })}`;

function pad(num, size) {
  const s = `0000000${num}`;
  return s.substring(s.length - size);
}

// first = S,T,F,G age=10-100
export function generateNric(first, age) {
  // eslint-disable-next-line no-param-reassign
  age = parseInt(age, 10);
  if (first !== 'S' && first !== 'T' && first !== 'F' && first !== 'G') return;
  // eslint-disable-next-line no-param-reassign
  if (!(age >= -1 && age <= 9)) age = -1;

  // The IC Generator Algorithm
  const { crypto } = window;
  const randomizerArray = new Uint32Array(1);
  const randomNumber = crypto.getRandomValues(randomizerArray)[0] * 2 ** -32;

  const chars = pad(Math.floor(randomNumber * 9999999), 7).split('');
  if (age !== -1) chars[0] = age;

  const output = first + chars.join('');

  chars[0] *= 2;
  chars[1] *= 7;
  chars[2] *= 6;
  chars[3] *= 5;
  chars[4] *= 4;
  chars[5] *= 3;
  chars[6] *= 2;

  let sum = 0;
  const offset = first === 'T' || first === 'G' ? 4 : 0;
  const st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
  for (let i = 0; i <= 6; i += 1) {
    sum += chars[i];
  }
  const temp = (offset + sum) % 11;

  let theAlpha = '';
  if (first === 'S' || first === 'T') {
    theAlpha = st[temp];
  } else if (first === 'F' || first === 'G') {
    theAlpha = fg[temp];
  } else theAlpha = '?';

  // eslint-disable-next-line consistent-return
  return output + theAlpha;
}
