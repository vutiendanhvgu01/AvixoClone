import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getYear } from 'date-fns';
import { FormikProps } from 'formik';
import range from 'lodash/range';
import { FC } from 'react';

const MONTHS = [
  {
    name: 'January',
    value: 0,
  },
  {
    name: 'February',
    value: 1,
  },
  {
    name: 'March',
    value: 2,
  },
  {
    name: 'April',
    value: 3,
  },
  {
    name: 'May',
    value: 4,
  },
  {
    name: 'June',
    value: 5,
  },
  {
    name: 'July',
    value: 6,
  },
  {
    name: 'August',
    value: 7,
  },
  {
    name: 'September',
    value: 8,
  },
  {
    name: 'October',
    value: 9,
  },
  {
    name: 'November',
    value: 10,
  },
  {
    name: 'December',
    value: 11,
  },
];

const RecommendedNextVisit: FC<FormikProps<any>> = ({ getFieldProps, errors, touched, values }) => {
  const currentYear = getYear(new Date());

  return (
    <Box sx={{ mt: 5, mb: 3 }}>
      <Typography variant="h6">Recommended Next Visit</Typography>
      <Divider sx={{ mr: -3, ml: -3, mt: 4, mb: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="overline">Month and year of next visit:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth required error={!!errors?.month}>
                <InputLabel id="month">Month</InputLabel>
                <Select label="Month" labelId="month" {...getFieldProps('month')} error={!!errors?.month}>
                  {MONTHS.map(month => (
                    <MenuItem value={month.value} key={month.value}>
                      {month.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required error={!!errors?.year}>
                <InputLabel id="year">Year</InputLabel>
                <Select label="Year" id="year" {...getFieldProps('year')} error={!!errors?.year}>
                  {range(currentYear + 10, currentYear - 1).map(year => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <TextField
            {...getFieldProps('generalNotes')}
            value={values.generalNotes}
            required
            label="Record of Discussion*"
            multiline
            rows={6}
            fullWidth
            error={Boolean(errors?.generalNotes)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecommendedNextVisit;
