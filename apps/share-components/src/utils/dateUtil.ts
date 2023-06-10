// eslint-disable-next-line import/prefer-default-export
export const datesAreOnSameTime = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
