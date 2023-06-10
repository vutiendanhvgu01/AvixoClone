import { TextField, Box, Stack, Grid, InputBase, Button, FormControlLabel, Checkbox } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { useFormikContext } from 'formik';
import { PlusIcon } from 'share-components';
import { AddPatientAddressType, AddPatientInitialValuesType } from './add-edit-patient-form-types';
import ErrorText from './error-text';
import { NumbersOnlyRegex } from './constant';

const InputBox = styled(Box)(() => ({
  height: 318,
  display: 'flex',
}));

const CloseBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderLeftWidth: 0,
  borderStartEndRadius: 10,
  borderEndEndRadius: 10,
  color: theme.palette.error.main,
}));

interface PatientAddressProps {
  addressArray: AddPatientAddressType[];
}

const PatientAddress: React.FC<PatientAddressProps> = ({ addressArray }) => {
  const {
    values: { addresses },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<AddPatientInitialValuesType>();

  type AddressKeys = 'postal' | 'line1' | 'line2' | 'floorNo' | 'unitNo' | 'name' | 'city' | 'country';
  type HandleChangeType = (name: AddressKeys, value: string, index: number) => void;

  const handleChange: HandleChangeType = useCallback(
    (name, value, index) => {
      addresses[index][name] = value;
      setFieldValue('addresses', [...addresses]);
    },
    [addresses, setFieldValue],
  );

  const addNewAddress = () => {
    const prevAddresses = addresses;
    prevAddresses.push({
      name: '',
      floorNo: '',
      unitNo: '',
      line1: '',
      line2: '',
      postal: '',
      city: '',
      country: '',
      isPrimary: false,
    });
    setFieldValue('addresses', prevAddresses);
  };

  type RemoveAddressType = (index: number) => void;

  const removeAddress: RemoveAddressType = index => {
    if (addresses.length === 1) return;
    const prevAddresses = addresses;
    prevAddresses.splice(index, 1);
    setFieldValue('addresses', prevAddresses);
  };

  const handlePreferred = (index: number) => {
    const prevAddresses = addresses;
    addresses.forEach((address, i) => {
      prevAddresses[i].isPrimary = i === index;
    });
    setFieldValue('addresses', prevAddresses);
  };

  return (
    <Stack gap={2}>
      <InputBase value={JSON.stringify(addresses)} name="addresses" type="hidden" />
      {addressArray.map((address, index) => (
        <>
          <InputBox key={`patient-addresses-${index.toString()}`}>
            <Box sx={{ width: 400 }}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0, borderStartStartRadius: 10, height: 53 },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 400 }}
                label="Detail Address"
                required
                onChange={e => handleChange('line1', e.target.value, index)}
                value={addresses[index].line1}
                placeholder="Block/House No."
              />
              <InputBase
                sx={{
                  width: 400,
                  border: '1px solid #ccc',
                  px: 2,
                  height: 53,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                }}
                placeholder="Street Name"
                onChange={e => handleChange('line2', e.target.value, index)}
                value={addresses[index].line2}
              />
              <Grid container sx={{ width: 400 }}>
                <Grid item xs={6}>
                  <InputBase
                    sx={{ border: '1px solid #ccc', px: 2, height: 53, width: '-webkit-fill-available' }}
                    placeholder="Unit Level"
                    onChange={e => {
                      const { value } = e.target;
                      if (value === '' || NumbersOnlyRegex.test(value)) {
                        handleChange('floorNo', value, index);
                      }
                    }}
                    value={addresses[index].floorNo}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputBase
                    sx={{ border: '1px solid #ccc', px: 2, height: 53, width: '-webkit-fill-available' }}
                    placeholder="Unit Number"
                    onChange={e => handleChange('unitNo', e.target.value, index)}
                    value={addresses[index].unitNo}
                  />
                </Grid>
              </Grid>
              <InputBase
                sx={{
                  border: '1px solid #ccc',
                  px: 2,
                  height: 53,
                  width: 400,
                  borderBottomWidth: 0,
                }}
                placeholder="Postal Code"
                onChange={e => handleChange('postal', e.target.value, index)}
                value={addresses[index].postal}
              />
              <InputBase
                sx={{
                  border: '1px solid #ccc',
                  px: 2,
                  height: 53,
                  width: 400,
                }}
                placeholder="City"
                onChange={e => handleChange('city', e.target.value, index)}
                value={addresses[index].city}
              />
              <InputBase
                sx={{
                  border: '1px solid #ccc',
                  px: 2,
                  borderEndStartRadius: 10,
                  height: 53,
                  width: 400,
                  borderTopWidth: 0,
                }}
                placeholder="Country"
                onChange={e => handleChange('country', e.target.value, index)}
                value={addresses[index].country}
              />
            </Box>
            <CloseBox>
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => removeAddress(index)} />
            </CloseBox>
          </InputBox>
          {Array.isArray(addressArray) && addressArray?.length > 1 && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={addresses[index].isPrimary}
                  value={`addressCheckbox${index}`}
                  onClick={() => handlePreferred(index)}
                />
              }
              label="Mark as Primary"
              sx={{ mx: 1 }}
            />
          )}
          <ErrorText>
            {errors.addresses &&
              errors.addresses[index] &&
              touched.addresses &&
              touched.addresses[index] &&
              Object.keys(errors.addresses[index])
                .map(key => errors.addresses && (errors.addresses[index] as AddPatientAddressType)[key as AddressKeys])
                .join(', ')}
          </ErrorText>
        </>
      ))}
      <Box sx={{ display: 'flex' }}>
        <Button startIcon={<PlusIcon />} variant="text" onClick={addNewAddress} color="info">
          Another Address
        </Button>
      </Box>
    </Stack>
  );
};
export default PatientAddress;
