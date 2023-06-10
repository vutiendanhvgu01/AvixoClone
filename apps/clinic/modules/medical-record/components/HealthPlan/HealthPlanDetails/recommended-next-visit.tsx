import { Typography, Box, Stack } from '@mui/material';
import React from 'react';

interface RecommendedNextVisitProps {
  title: string;
  date: string;
  heading: string;
  content: string;
}

const RecommendedNextVisit: React.FC<RecommendedNextVisitProps> = ({ title, date, heading, content }) => (
  <Stack spacing={3}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h5">{date}</Typography>
    <Box>
      <Typography variant="overline">{heading}</Typography>
      <Typography variant="body2" color="neutral.500">
        {content}
      </Typography>
    </Box>
  </Stack>
);

export default RecommendedNextVisit;
