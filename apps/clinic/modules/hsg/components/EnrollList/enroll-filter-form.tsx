import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import { AvixoFixedContainer, DefaultFormProps, FormActions, FormBody, Form, CalendarIcon } from 'share-components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import addDays from 'date-fns/addDays';

const EnrollFilterForm: React.FC<DefaultFormProps> = ({ open, onCancel }) => {
  const [maxDate, setMaxDate] = useState<Date | null>(new Date());

  const formik = useFormik({
    initialValues: {
      dateFrom: null,
      dateTo: null,
    },
    onSubmit: () => {
      /* API Integration */
    },
  });

  const { getFieldProps, values, touched, errors, setFieldValue } = formik;

  const onDateFromChange = (value: Date | null) => {
    let nMaxDate = new Date();
    if (value) {
      const dateFrom = new Date(value);
      setFieldValue('dateFrom', dateFrom.toISOString());
      nMaxDate = addDays(dateFrom, 7);
      if (nMaxDate.toISOString() > new Date().toISOString()) {
        nMaxDate = new Date();
      }
    } else {
      setFieldValue('dateFrom', null);
    }

    if (
      values.dateTo &&
      values.dateFrom &&
      (values.dateTo > nMaxDate.toISOString() || values.dateTo < values.dateFrom)
    ) {
      setFieldValue('dateTo', null);
    }
    setMaxDate(nMaxDate);
  };

  return (
    <AvixoFixedContainer title="Advanced Search" display={open} onClose={onCancel}>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormBody>
            <Box sx={{ pb: 1 }}>
              <Typography variant="overline">Unique Identifier</Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
              <FormControl fullWidth>
                <TextField label="NRIC" {...getFieldProps('nric')} />
              </FormControl>
            </Box>
            <Box sx={{ pb: 1 }}>
              <Typography variant="overline">Patient Details</Typography>
            </Box>
            <FormControl fullWidth>
              <TextField label="Patient Name" {...getFieldProps('name')} />
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Age" {...getFieldProps('age')} />
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Contact" {...getFieldProps('contact')} />
            </FormControl>
            <Divider sx={{ mb: 5, mt: 2 }} />
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <DatePicker
                    label="From"
                    inputFormat="MM/dd/yyyy"
                    maxDate={new Date()}
                    value={values.dateFrom || null}
                    onChange={onDateFromChange}
                    components={{ OpenPickerIcon: CalendarIcon }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        value={values.dateFrom}
                        required
                        error={!!(errors.dateFrom && touched.dateFrom)}
                        helperText={touched.dateFrom && errors.dateFrom}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <DatePicker
                    label="To"
                    inputFormat="MM/dd/yyyy"
                    minDate={values.dateFrom ? values.dateFrom : null}
                    maxDate={maxDate}
                    value={values.dateTo || null}
                    onChange={value => {
                      setFieldValue('dateTo', value ? new Date(value).toISOString() : null);
                    }}
                    components={{ OpenPickerIcon: CalendarIcon }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        value={values.dateTo}
                        required
                        error={!!(errors.dateTo && touched.dateTo)}
                        helperText={touched.dateTo && errors.dateTo}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select label="Status" id="status" {...getFieldProps('status')}>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </FormBody>
          <FormActions sx={{ justifyContent: 'flex-start', button: { ml: 0 } }}>
            <Button variant="text">Clear</Button>
          </FormActions>
        </LocalizationProvider>
      </Form>
    </AvixoFixedContainer>
  );
};

export default EnrollFilterForm;
