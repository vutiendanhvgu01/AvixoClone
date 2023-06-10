import { render, screen } from '@testing-library/react';
import { AvixoTable } from 'share-components';
import { useMediaQuery } from '@mui/material';
import HwardTable from '../hward-table';

jest.mock('@mui/material', () => {
  const original = jest.requireActual('@mui/material');
  return {
    ...original,
    useMediaQuery: jest.fn(),
  };
});

describe('Test HWardTable', () => {
  it('renders the table', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
    render(
      <HwardTable
        title="Title goes here"
        placeholder="Placeholder Goes Here"
        table={
          <AvixoTable
            data={{ records: [{ uuid: 'one' }] }}
            mode="offline"
            columns={[{ id: 'uuid', field: 'uuid', label: 'UUID' }]}
          />
        }
        cards={
          <>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
          </>
        }
      />,
    );

    expect(screen.getByRole('heading', { name: /title goes here/i })).toBeInTheDocument();
    expect(screen.getByText(/one/i)).toBeInTheDocument();
  });

  it('renders the cards', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);
    render(
      <HwardTable
        title="Title goes here"
        placeholder="Placeholder Goes Here"
        table={
          <AvixoTable
            data={{ records: [{ uuid: 'one' }] }}
            mode="offline"
            columns={[{ id: 'uuid', field: 'uuid', label: 'UUID' }]}
          />
        }
        cards={
          <>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
          </>
        }
      />,
    );

    expect(screen.getAllByText(/hello world/i)).toHaveLength(3);
  });
});
