import { TextField, Box, Stack, Grid, InputBase } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { AddPatientContactType, AddPatientInitialValuesType } from './add-edit-patient-form-types';
import ErrorTypography from './error-text';

const InputBox = styled(Box)(() => ({
  height: 318,
  display: 'flex',
}));

interface PatientContactAddressProps {
  contactIndex: number;
}

const PatientContactAddress: React.FC<PatientContactAddressProps> = ({ contactIndex }) => {
  const {
    values: { contact },
    errors: { contact: contactErrors },
    touched: { contact: contactTouched },
    setFieldValue,
  } = useFormikContext<AddPatientInitialValuesType>();

  type AddressKeys = 'postal' | 'line1' | 'line2' | 'floorNo' | 'unitNo' | 'name' | 'city' | 'country';
  type HandleChangeType = (name: AddressKeys, value: string) => void;

  const handleChange: HandleChangeType = useCallback(
    (name, value) => {
      contact[contactIndex].address[name] = value;
      setFieldValue('contact', [...contact]);
    },
    [contact, contactIndex, setFieldValue],
  );
  const checkAddressError = () =>
    contactErrors &&
    contactErrors[contactIndex] &&
    typeof contactErrors[contactIndex] === typeof contact[contactIndex] &&
    (contactErrors[contactIndex] as unknown as AddPatientContactType)?.address &&
    contactTouched &&
    contactTouched[contactIndex].address;
  return (
    <Stack gap={2} mt={3}>
      <InputBox>
        <Box sx={{ width: 430 }}>
          <TextField
            InputProps={{
              style: { borderRadius: 0, borderStartStartRadius: 10, borderStartEndRadius: 10, height: 53 },
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 430 }}
            label="Detail Address"
            onChange={e => handleChange('line1', e.target.value)}
            value={contact[contactIndex].address.line1}
            placeholder="Address Line 1"
          />
          <InputBase
            sx={{
              width: 430,
              border: '1px solid #ccc',
              px: 2,
              height: 53,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            placeholder="Address Line 2"
            onChange={e => handleChange('line2', e.target.value)}
            value={contact[contactIndex].address.line2}
          />
          <Grid container sx={{ width: 430 }}>
            <Grid item xs={6}>
              <InputBase
                sx={{ border: '1px solid #ccc', px: 2, height: 53, width: '-webkit-fill-available' }}
                placeholder="Unit Level"
                onChange={e => handleChange('floorNo', e.target.value)}
                value={contact[contactIndex].address.floorNo}
              />
            </Grid>
            <Grid item xs={6}>
              <InputBase
                sx={{ border: '1px solid #ccc', px: 2, height: 53, width: '-webkit-fill-available' }}
                placeholder="Unit Number"
                onChange={e => handleChange('unitNo', e.target.value)}
                value={contact[contactIndex].address.unitNo}
              />
            </Grid>
          </Grid>
          <InputBase
            sx={{
              border: '1px solid #ccc',
              px: 2,
              height: 53,
              width: 430,
              borderBottomWidth: 0,
            }}
            placeholder="Postal Code"
            onChange={e => handleChange('postal', e.target.value)}
            value={contact[contactIndex].address.postal}
          />
          <InputBase
            sx={{
              border: '1px solid #ccc',
              px: 2,
              height: 53,
              width: 430,
            }}
            placeholder="City"
            onChange={e => handleChange('city', e.target.value)}
            value={contact[contactIndex].address.city}
          />
          <InputBase
            sx={{
              border: '1px solid #ccc',
              px: 2,
              borderEndStartRadius: 10,
              borderEndEndRadius: 10,
              height: 53,
              width: 430,
              borderTopWidth: 0,
            }}
            placeholder="Country"
            onChange={e => handleChange('country', e.target.value)}
            value={contact[contactIndex].address.country}
          />
        </Box>
      </InputBox>
      <ErrorTypography>
        {contactErrors &&
          checkAddressError() &&
          Object.keys((contactErrors[contactIndex] as unknown as AddPatientContactType)?.address)
            .map(key => (contactErrors[contactIndex] as unknown as AddPatientContactType)?.address[key as AddressKeys])
            .join(', ')}
      </ErrorTypography>
    </Stack>
  );
};
export default PatientContactAddress;
