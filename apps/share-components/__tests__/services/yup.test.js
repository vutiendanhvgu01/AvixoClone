import yup from '../../src/services/yup';

const nricSchema = yup.string().isValidNRIC();

it('S1234567D is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('S1234567D');
  expect(parsedNRIC).toBe('S1234567D');
});

it('S1236512H is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('S1236512H');
  expect(parsedNRIC).toBe('S1236512H');
});

it('S2123123A is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('S2123123A');
  expect(parsedNRIC).toBe('S2123123A');
});

it('S4131222A is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('S4131222A');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('S0000001A is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('S0000001A');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('T0000001E is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('T0000001E');
  expect(parsedNRIC).toBe('T0000001E');
});

it('G0000001P is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('G0000001P');
  expect(parsedNRIC).toBe('G0000001P');
});

it('G1234567X is a valid NRIC', async () => {
  const parsedNRIC = await nricSchema.validate('G1234567X');
  expect(parsedNRIC).toBe('G1234567X');
});

it('F1234567E is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('F1234567E');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('F2345678T is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('F2345678T');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('T0000001B is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('T0000001B');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('G0000001H is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('G0000001H');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('G1234567A is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('G1234567A');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('F1234567C is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('F1234567C');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});

it('F2345678E is an invalid NRIC', async () => {
  try {
    await nricSchema.validate('F2345678E');
  } catch (err) {
    expect(err.errors[0]).toBe('Please enter a valid NRIC');
  }
});
