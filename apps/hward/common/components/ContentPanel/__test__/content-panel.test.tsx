import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ContentPanel from 'common/components/ContentPanel/content-panel';
import { PatientInfoIcon } from 'share-components';
import { Typography } from '@mui/material';

describe('Content Panel', () => {
  it('should use show empty content panel with title', () => {
    const { getByText } = render(<ContentPanel title="Patient Info" Icon={PatientInfoIcon} />);

    expect(getByText('Patient Info')).toBeInTheDocument();
    expect(getByText('Coming Soon')).toBeInTheDocument();
  });

  it('should use show content panel with title', () => {
    const { getByText } = render(
      <ContentPanel title="Patient Info" Icon={PatientInfoIcon}>
        <Typography>Lorem Ipsum</Typography>
      </ContentPanel>,
    );

    expect(getByText('Patient Info')).toBeInTheDocument();
    expect(getByText('Lorem Ipsum')).toBeInTheDocument();
  });
});
