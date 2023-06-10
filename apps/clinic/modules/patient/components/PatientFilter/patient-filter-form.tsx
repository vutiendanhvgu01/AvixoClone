import React, { useCallback } from 'react';
import { TextField, Box, Typography, Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import { Formik, Form } from 'formik';

export interface PatientFilterFormProps {
  initialValues?: {
    nric: string;
    hrn: string;
  };
  // eslint-disable-next-line react/no-unused-prop-types
  onCancel?: () => void;
}

const PatientFilterForm: React.FC<PatientFilterFormProps> = ({ initialValues = {} }) => {
  const onSubmit = useCallback(() => {
    // Todo
  }, []);

  return (
    <Box sx={{ px: 1 }}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange }) => (
          <Form>
            <Typography variant="overline">Unique Identifier</Typography>
            <Box sx={{ my: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="hrn-mrn-select">HRN / MRN</InputLabel>
                <Select label="HRN / MRN" onChange={handleChange} name="hrn" id="hrn-mrn-select">
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
              <TextField
                defaultValue=""
                name="nric"
                label="NRIC / Passport / Driver License ID"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Typography variant="overline">Patient Details</Typography>
            <Box sx={{ my: 2 }}>
              <TextField defaultValue="" name="name" label="Patient Name" fullWidth onChange={handleChange} />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="dob-select">DOB</InputLabel>
                <Select label="DOB" onChange={handleChange} name="dob" id="dob-select">
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider />
            <Box sx={{ my: 2 }}>
              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel id="insurer-select">Insurer / Panel</InputLabel>
                <Select label="Insurer / Panel" onChange={handleChange} name="insurer" id="insurer-select">
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
              <TextField defaultValue="" name="company" label="Company" fullWidth onChange={handleChange} />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PatientFilterForm;
