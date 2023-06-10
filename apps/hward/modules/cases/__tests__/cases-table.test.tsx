import React from 'react';
import { render } from '@testing-library/react';
import CasesTable from '../components/cases-table';
import { CasesTableProps } from '../components/cases-types';

const props = {
  isFetching: false,
  casesList: {
    pages: [
      {
        cases: [
          {
            uuid: 'C-12345',
            ref: 'caseRef123',
            userRef: 'userRef123',
            name: 'John Doe',
            age: 52,
            gender: 'Male',
            nric: '*****123I',
            enrolmentDate: '2023-05-05T08:15:54+0000',
            lengthOfStay: 1,
            status: 'Onboarded',
            services: [],
          },
        ],
        total: 1,
      },
    ],
    pageParams: [undefined],
  },
  paginationOptions: {
    page: 0,
    perPage: 10,
  },
  handlePageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
} as unknown as CasesTableProps;

const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('CasesTable', () => {
  it('should render successfully', () => {
    const { getByText } = render(<CasesTable {...props} />);
    expect(getByText(props.casesList?.pages[0].cases?.[0].nric as string)).toBeInTheDocument();
  });
});
