import React from 'react';
import { render } from '@testing-library/react';
import CasesCards from '../components/cases-cards';
import { FormattedCase } from '../components/cases-types';

const props: { data: FormattedCase[] } = {
  data: [
    {
      uuid: 'C-00021',
      ref: '12378998123asdhjk',
      userRef: 'asdz12378998123asdhjk',
      name: 'Cokorda Trinda Budi Pekerti',
      age: 52,
      gender: 'Female',
      nric: '*****4567A',
      enrolmentDate: '02/02/2023',
      lengthOfStay: 23,
      status: 'onboarded',
    },
    {
      uuid: 'C-00022',
      ref: 'asjkdads12332',
      userRef: 'asdzasjkdads12332',
      name: 'Jean Michel',
      age: 52,
      gender: 'Female',
      nric: '*****4567B',
      enrolmentDate: '02/02/2023',
      lengthOfStay: 23,
      status: 'active',
    },
  ],
};

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('CasesCards', () => {
  it('should render successfully all cards', () => {
    const { getByText } = render(<CasesCards {...props} />);
    expect(getByText(props.data[0].uuid)).toBeInTheDocument();
  });
});
