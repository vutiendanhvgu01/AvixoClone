import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <Box>
      <Typography variant="h1">Heading 1</Typography>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});
