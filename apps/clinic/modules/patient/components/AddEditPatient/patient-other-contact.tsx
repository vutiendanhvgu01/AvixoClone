import {
  TextField,
  Box,
  InputBase,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Grid,
  Typography,
  Divider,
  FormControl,
  Tooltip,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { CalendarIcon, PlusIcon } from 'share-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { stringifyNumber } from 'share-components/src/utils/formatUtils';
import { RemoveCircle } from '@mui/icons-material';
import CONSTANTS from './form-options';
import { AddPatientContactType, AddPatientInitialValuesType, AddPatientPhoneType } from './add-edit-patient-form-types';
import PatientContactAddress from './patient-other-contact-address';
import AddPatientSelect from './add-edit-patient-select';
import ErrorTypography from './error-text';
import { DefaultCountryCode, DefaultPhoneLength, NumbersOnlyRegex } from './constant';

interface PatientOtherContactProps {
  contactArray: AddPatientContactType[];
}
const initialContactObject = {
  email: { email: '' },
  fullName: '',
  relationship: '',
  phone: { countryCode: DefaultCountryCode, number: '' },
  gender: '',
  organisation: '',
  validFrom: '',
  validTo: '',
  isPrimary: false,
  address: {
    name: '',
    floorNo: '',
    unitNo: '',
    line1: '',
    line2: '',
    postal: '',
    city: '',
    country: '',
  },
};
const PatientOtherContact: React.FC<PatientOtherContactProps> = ({ contactArray }) => {
  const {
    values: { contact },
    errors: { contact: contactErrors },
    touched: { contact: contactTouched },
    setFieldValue,
  } = useFormikContext<AddPatientInitialValuesType>();

  const addNewContact = () => {
    const prevContact = contact;
    prevContact.push({ ...initialContactObject, isPrimary: !contact.length });
    setFieldValue('contact', prevContact);
  };

  const removeContact = useCallback(
    (index: number) => {
      let prevContact = contact;
      prevContact = prevContact.filter((el, i) => i !== index);
      setFieldValue('contact', prevContact);
    },
    [contact, setFieldValue],
  );

  type ContactKeys = 'fullName' | 'relationship' | 'gender' | 'organisation' | 'validFrom' | 'validTo';

  type HandleChangeType = (name: ContactKeys, value: string, index: number) => void;
  type HandlePhoneChangeType = (value: AddPatientPhoneType, index: number) => void;

  const handleChange: HandleChangeType = useCallback(
    (name, value, index) => {
      contact[index][name] = value;
      setFieldValue('contact', [...contact]);
    },
    [contact, setFieldValue],
  );

  const handlePhoneChange: HandlePhoneChangeType = useCallback(
    (value, index) => {
      const maxLength = contact[index].phone.countryCode === DefaultCountryCode ? DefaultPhoneLength : null;
      const { number } = value;
      if (number === '' || (NumbersOnlyRegex.test(number) && (!maxLength || number.length <= maxLength))) {
        contact[index].phone = value;
        setFieldValue('contact', [...contact]);
      }
    },
    [contact, setFieldValue],
  );

  const handleEmailChange = useCallback(
    (value: string, index: number) => {
      contact[index].email.email = value;
      setFieldValue('contact', [...contact]);
    },
    [contact, setFieldValue],
  );

  const handlePreferred = (index: number) => {
    const prevContact = contact;
    contact.forEach((item, i) => {
      prevContact[i].isPrimary = i === index;
    });
    setFieldValue('contact', prevContact);
  };

  const checkError = (index: number) =>
    contactErrors &&
    contactErrors[index] &&
    typeof contactErrors[index] === typeof initialContactObject &&
    contactTouched;

  return (
    <Stack gap={2}>
      <InputBase value={JSON.stringify(contact)} name="contact" type="hidden" />
      {contactArray.map((contactOption, index) => (
        <>
          <Box key={`patient-contact-${index.toString()}`}>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography textTransform="capitalize" variant="subtitle1" color="text.secondary">{`${stringifyNumber(
                index + 1,
              )} Contact`}</Typography>
              <Tooltip title="Remove">
                <Button variant="text" onClick={() => removeContact(index)}>
                  <RemoveCircle color="primary" />
                </Button>
              </Tooltip>
            </Stack>
            <FormControl fullWidth>
              <TextField
                label="Name"
                value={contact[index].fullName}
                onChange={e => handleChange('fullName', e.target.value, index)}
                required
              />
              {checkError(index) && (
                <ErrorTypography>
                  {contactErrors && ((contactErrors[index] as unknown as AddPatientContactType)?.fullName || '')}
                </ErrorTypography>
              )}
            </FormControl>
            <TextField
              select
              fullWidth
              label="Gender"
              value={contact[index].gender}
              onChange={e => handleChange('gender', e.target.value, index)}
              sx={{ textTransform: 'capitalize' }}
            >
              {CONSTANTS.genders.map(option => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <FormControl fullWidth>
              <TextField
                label="Email Address"
                id={`email-other-contact${index}`}
                value={contact[index].email.email}
                onChange={e => handleEmailChange(e.target.value, index)}
                sx={{ mt: 2, width: '100%' }}
                required
              />
              {checkError(index) && (
                <ErrorTypography>
                  {contactErrors && ((contactErrors[index] as unknown as AddPatientContactType)?.email?.email || '')}
                </ErrorTypography>
              )}
            </FormControl>

            <AddPatientSelect
              name="relationship"
              label="Relationship"
              options={CONSTANTS.relationships}
              value={contact[index].relationship}
              onChange={e => handleChange('relationship', e.target.value, index)}
              required
              customError={
                checkError(index) && contactErrors
                  ? (contactErrors[index] as unknown as AddPatientContactType)?.relationship || ''
                  : ''
              }
            />
            <Box sx={{ display: 'flex', mt: 3 }}>
              <TextField
                select
                label="Mobile Number"
                sx={{ width: 120, height: 53 }}
                required
                onChange={e =>
                  handlePhoneChange({ ...contact[index].phone, countryCode: Number(e.target.value) }, index)
                }
                value={contact[index].phone.countryCode}
                InputProps={{ style: { borderRadius: 0, borderStartStartRadius: 10, borderEndStartRadius: 10 } }}
              >
                {CONSTANTS.countryCodes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <InputBase
                sx={{
                  width: 330,
                  height: 53,
                  px: 2,
                  border: 1,
                  borderLeft: 0,
                  borderColor: '#ccc',
                  borderStartEndRadius: 10,
                  borderEndEndRadius: 10,
                }}
                placeholder="8-digit number"
                required
                onChange={e => handlePhoneChange({ ...contact[index].phone, number: e.target.value }, index)}
                value={contact[index].phone.number}
              />
            </Box>
            {checkError(index) && (
              <ErrorTypography>
                {contactErrors && ((contactErrors[index] as unknown as AddPatientContactType)?.phone?.number || '')}
              </ErrorTypography>
            )}
            <PatientContactAddress contactIndex={index} />
            <Grid container mt={3} spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  label="Valid From"
                  inputFormat="MM/dd/yyyy"
                  value={contact[index].validFrom}
                  onChange={date => handleChange('validFrom', date as string, index)}
                  components={{ OpenPickerIcon: CalendarIcon }}
                  renderInput={params => <TextField {...params} error={undefined} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Valid To"
                  inputFormat="MM/dd/yyyy"
                  value={contact[index].validTo}
                  onChange={date => handleChange('validTo', date as string, index)}
                  components={{ OpenPickerIcon: CalendarIcon }}
                  renderInput={params => <TextField {...params} error={undefined} />}
                />
              </Grid>
            </Grid>
          </Box>
          {contactArray?.length > 1 && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={contact[index].isPrimary}
                  value={`otherContactCheckbox${index}`}
                  onClick={() => handlePreferred(index)}
                />
              }
              label="Mark as Primary"
              sx={{ mx: 1 }}
            />
          )}
          <Divider />
        </>
      ))}
      <Box sx={{ display: 'flex' }}>
        <Button startIcon={<PlusIcon />} variant="text" onClick={addNewContact} color="info">
          Another Contact
        </Button>
      </Box>
    </Stack>
  );
};
export default PatientOtherContact;
