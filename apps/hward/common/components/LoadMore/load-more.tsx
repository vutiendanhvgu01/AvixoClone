import { Button, CircularProgress, Stack } from '@mui/material';
import { forwardRef } from 'react';

interface LoadMoreProps {
  loading: boolean;
}

const LoadMore = forwardRef<any, LoadMoreProps>(({ loading }, ref) => (
  <>
    <Stack alignItems="center" sx={{ display: loading ? 'flex' : 'none', marginBottom: loading ? 4 : 0 }}>
      <CircularProgress />
    </Stack>
    <Button aria-hidden sx={{ opacity: 0 }} ref={ref} type="button" />
  </>
));

LoadMore.displayName = 'LoadMore';

export default LoadMore;
