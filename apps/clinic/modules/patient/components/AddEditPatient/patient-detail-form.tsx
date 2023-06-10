import { Stack, Box, Typography, TextField, Grid, Divider, Button, LinearProgress, Avatar } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { CalendarIcon } from 'share-components';
import Person from '@mui/icons-material/Person';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import AddPatientInput from './add-edit-patient-input';
import AddPatientSelect from './add-edit-patient-select';
import CONSTANTS from './form-options';
import PatientIdentity from './patient-identity';

type FormValues = AddPatientInitialValuesType;
const defaultDateFormat = 'dd/MM/yyyy';

const PatientDetailForm = ({ edit }: { edit?: boolean }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<FormValues>();
  const [photo, setPhoto] = useState('');
  return (
    <Box>
      <LinearProgress value={20} variant="determinate" sx={{ mb: 4 }} />
      <Stack gap={2}>
        <Typography variant="h6">1. Patient Information</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            width: '100%',
            marginBottom: '30px',
          }}
        >
          <Box>
            <Button
              size="small"
              variant="text"
              color="primary"
              component="label"
              sx={{
                padding: 0,
                '&:hover': {
                  background: 'none',
                },
              }}
            >
              {values.photo ? (
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    marginRight: 2,
                  }}
                  src={photo}
                />
              ) : (
                <Box
                  sx={{
                    borderColor: 'primary.main',
                    borderWidth: 10,
                    borderStyle: 'solid',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 45,
                    height: 45,
                    marginRight: 2,
                  }}
                >
                  <Person
                    sx={{
                      fontSize: 20,
                    }}
                  />
                </Box>
              )}
              {values.photo ? 'Change' : 'Upload photo'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(event: any) => {
                  setFieldValue('photo', event.target.files[0]);
                  return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(event.target.files[0]);

                    fileReader.onload = () => {
                      setPhoto(fileReader.result?.toString() ?? '');
                      resolve(fileReader.result);
                    };

                    fileReader.onerror = (error: any) => {
                      reject(error);
                    };
                  });
                }}
              />
            </Button>
          </Box>
          <Box>
            {values.photo && (
              <Button
                size="small"
                variant="text"
                color="black"
                sx={{
                  padding: 0,
                  '&:hover': {
                    background: 'none',
                  },
                }}
                onClick={() => setFieldValue('photo', '')}
              >
                Remove
              </Button>
            )}
          </Box>
        </Box>
        <AddPatientSelect
          name="salutation"
          label="Salutation"
          options={CONSTANTS.salutations}
          value={values.salutation}
          onChange={e => setFieldValue('salutation', e.target.value)}
        />
        <AddPatientInput name="fullName" label="Full Name" required />
        <AddPatientInput name="preferredName" label="Preferred Name" />
        <DatePicker
          label="Date Of Birth"
          inputFormat={defaultDateFormat}
          value={values.birthDate}
          onChange={date => setFieldValue('birthDate', date)}
          components={{ OpenPickerIcon: CalendarIcon }}
          maxDate={new Date()}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              required
              name="birthDate"
              error={!!(errors.birthDate && touched.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />
          )}
        />
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <AddPatientSelect
              required
              name="nationality"
              label="Country"
              options={CONSTANTS.countries}
              value={values.nationality}
              onChange={e => setFieldValue('nationality', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <AddPatientSelect
              name="placeOfBirth"
              label="Country Of Birth"
              options={CONSTANTS.countries}
              value={values.placeOfBirth}
              onChange={e => setFieldValue('placeOfBirth', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <AddPatientSelect
              required
              name="gender"
              label="Gender"
              options={CONSTANTS.genders}
              value={values.gender}
              onChange={e => setFieldValue('gender', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <AddPatientSelect
              name="genderPreferred"
              label="Preferred Gender"
              options={CONSTANTS.genders}
              value={values.genderPreferred}
              onChange={e => setFieldValue('genderPreferred', e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider />
        <PatientIdentity identityArray={values.identities} />
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 3, alignItems: 'center' }}>
          <Stack>{!edit && <Typography variant="subtitle2">2. Contact Information</Typography>}</Stack>
          <Button type="submit">{edit ? 'Save Changes' : 'Next'}</Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default PatientDetailForm;
