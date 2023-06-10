import { renderHook, act } from '@testing-library/react';
import usePatientEnrolSubmit from '../usePatientEnrolSubmit';

jest.mock('next/router', () => ({
  useRouter() {
    return jest.fn();
  },
}));

const successCallback = jest.fn();
const fns = {
  close: jest.fn(),
  setShowNotification: jest.fn(),
  setSnackbarMessage: jest.fn(),
};

describe('Test usePatientEnrolSubmit', () => {
  it('should be defined', () => {
    expect(usePatientEnrolSubmit).toBeDefined();
  });

  it('should call on its auxilliary functions', () => {
    const { result } = renderHook(() => usePatientEnrolSubmit(successCallback, fns));
    act(() => {
      result.current.onSubmit({} as any, {} as any);
    });
    expect(fns.setShowNotification).toHaveBeenCalled();
    expect(fns.setSnackbarMessage).toHaveBeenCalled();
  });
});
