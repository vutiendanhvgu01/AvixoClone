/**
 * Get first letter of each word in a string.
 * John Doe => JD
 */
export const getFirstLetters = (str?: string, number?: number) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(i => i.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, number || 2);
};

/**
 * Uppercase first letter for every words
 */
export const toTitleCase = (str: string) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
};
export const isValidString = (value: any): boolean => typeof value === 'string' || value instanceof String;

export const getInitial = (name: string) => `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
