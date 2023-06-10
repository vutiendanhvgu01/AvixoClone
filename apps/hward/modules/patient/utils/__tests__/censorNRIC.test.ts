import censorNRIC from '../censorNRIC';

describe('Test censorNRIC', () => {
  it('Censors NRIC correctly', () => {
    const nric = 'S0000001I';
    const actual = censorNRIC(nric);
    const expected = '*****001I';

    expect(actual).toEqual(expected);
  });
});
