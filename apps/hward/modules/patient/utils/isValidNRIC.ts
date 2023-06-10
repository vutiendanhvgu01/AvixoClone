// Copied from: apps/share-components/src/services/yup.ts
function isValidNRIC(nric: string) {
  if (!nric || nric.length !== 9) {
    // NRIC must be 9 characters long
    return false;
  }
  if (nric[0] !== 'S' && nric[0] !== 'T' && nric[0] !== 'G' && nric[0] !== 'F') {
    return false;
  }

  const checkDigit = nric[8];
  const weight = [0, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 1; i < 8; i += 1) {
    sum += parseInt(nric[i], 10) * weight[i];
  }

  if (nric[0] === 'T' || nric[0] === 'G') {
    sum += 4;
  }

  const checksum = sum % 11;
  if (nric[0] === 'S' || nric[0] === 'T') {
    switch (checkDigit) {
      // JZIHGFEDCBA
      case 'J':
        return checksum === 0;
      case 'Z':
        return checksum === 1;
      case 'I':
        return checksum === 2;
      case 'H':
        return checksum === 3;
      case 'G':
        return checksum === 4;
      case 'F':
        return checksum === 5;
      case 'E':
        return checksum === 6;
      case 'D':
        return checksum === 7;
      case 'C':
        return checksum === 8;
      case 'B':
        return checksum === 9;
      case 'A':
        return checksum === 10;
      default:
        // checksum failed
        return false;
    }
  } else if (nric[0] === 'G' || nric[0] === 'F') {
    switch (checkDigit) {
      // XWUTRQPNMLK
      case 'X':
        return checksum === 0;
      case 'W':
        return checksum === 1;
      case 'U':
        return checksum === 2;
      case 'T':
        return checksum === 3;
      case 'R':
        return checksum === 4;
      case 'Q':
        return checksum === 5;
      case 'P':
        return checksum === 6;
      case 'N':
        return checksum === 7;
      case 'M':
        return checksum === 8;
      case 'L':
        return checksum === 9;
      case 'K':
        return checksum === 10;
      default:
        // checksum failed
        return false;
    }
  }
  return false;
}

export default isValidNRIC;
