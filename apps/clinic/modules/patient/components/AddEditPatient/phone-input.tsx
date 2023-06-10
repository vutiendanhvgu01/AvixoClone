import { MenuItem, TextField, Box, InputBase, Stack, Button, FormControlLabel, Checkbox } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { useFormikContext } from 'formik';
import { PlusIcon } from 'share-components';
import CONSTANTS from './form-options';
import { AddPatientInitialValuesType, AddPatientPhoneType } from './add-edit-patient-form-types';
import ErrorText from './error-text';
import { DefaultCountryCode, DefaultPhoneLength, NumbersOnlyRegex } from './constant';

const InputBox = styled(Box)(() => ({
  height: 53,
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

interface PatientPhoneProps {
  phoneArray: AddPatientPhoneType[];
}

const PatientPhone: React.FC<PatientPhoneProps> = ({ phoneArray }) => {
  const {
    values: { phones },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<AddPatientInitialValuesType>();

  type HandleChangeNumberType = (value: string, index: number) => void;
  type HandleChangeCodeType = (value: number, index: number) => void;

  const handleChangeNumber: HandleChangeNumberType = useCallback(
    (value, index) => {
      const maxLength = phones[index].countryCode === DefaultCountryCode ? DefaultPhoneLength : null;
      if (value === '' || (NumbersOnlyRegex.test(value) && (!maxLength || value.length <= maxLength))) {
        phones[index].number = value;
        setFieldValue('phones', [...phones]);
      }
    },
    [phones, setFieldValue],
  );
  const handleChangeCode: HandleChangeCodeType = useCallback(
    (value, index) => {
      phones[index].countryCode = value;
      setFieldValue('phones', [...phones]);
    },
    [phones, setFieldValue],
  );
  const addNewPhone = () => {
    const prevPhones = phones;
    prevPhones.push({ countryCode: DefaultCountryCode, number: '', preferred: false });
    setFieldValue('phones', prevPhones);
  };

  type RemovePhoneType = (index: number) => void;

  const removePhone: RemovePhoneType = index => {
    if (phones.length === 1) return;
    const prevPhones = phones;
    prevPhones.splice(index, 1);
    setFieldValue('phones', prevPhones);
  };

  const handlePreferred = (index: number) => {
    const prevPhones = phones;
    phones.forEach((phone, i) => {
      prevPhones[i].preferred = i === index;
    });
    setFieldValue('phones', prevPhones);
  };

  return (
    <Stack gap={2}>
      <InputBase value={JSON.stringify(phones)} name="phones" type="hidden" />
      {phoneArray.map((phone, index) => (
        <>
          <InputBox key={`patient-phones-${index.toString()}`}>
            <Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  select
                  label="Mobile Number"
                  sx={{ width: 120, height: 53 }}
                  required
                  onChange={e => handleChangeCode(Number(e.target.value), index)}
                  value={phones[index].countryCode}
                  InputProps={{ style: { borderRadius: 0, borderStartStartRadius: 10, borderEndStartRadius: 10 } }}
                >
                  {CONSTANTS.countryCodes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <InputBase
                  sx={{ width: 280, height: 53, px: 2, border: 1, borderLeft: 0, borderColor: '#ccc' }}
                  placeholder="8-digit number"
                  required
                  onChange={e => handleChangeNumber(e.target.value, index)}
                  value={phones[index].number}
                />
              </Box>
            </Box>
            <CloseBox>
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => removePhone(index)} />
            </CloseBox>
          </InputBox>
          {Array.isArray(phoneArray) && phoneArray?.length > 1 && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={phones[index].preferred}
                  value={`phoneCheckBox${index}`}
                  onClick={() => handlePreferred(index)}
                />
              }
              label="Mark as Primary"
              sx={{ mx: 1 }}
            />
          )}
          <ErrorText>
            {errors.phones &&
              errors.phones[index] &&
              touched.phones &&
              touched.phones[index]?.number &&
              (errors.phones[index] as unknown as AddPatientPhoneType).number}
          </ErrorText>
        </>
      ))}
      <Box sx={{ display: 'flex' }}>
        <Button startIcon={<PlusIcon />} variant="text" onClick={addNewPhone} color="info">
          Another Number
        </Button>
      </Box>
    </Stack>
  );
};
export default PatientPhone;
