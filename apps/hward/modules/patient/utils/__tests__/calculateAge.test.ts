import calculateAge from '../calculateAge';

/**
 * Assumption:
 * 1. Year is 2023
 * 2. Month is before July
 */
describe('Test calculateAge', () => {
  it('calculates the correct age', () => {
    const birthdate = '2000-07-04T16:00:00.000Z';
    const actual = calculateAge(birthdate);
    const expected = 22;

    expect(actual).toEqual(expected);
  });

  it('#2 calculates the correct age', () => {
    const birthdate = '1998-12-31T16:00:00.000Z';
    const actual = calculateAge(birthdate);
    const expected = 24;

    expect(actual).toEqual(expected);
  });
});
