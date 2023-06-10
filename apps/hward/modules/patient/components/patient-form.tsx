import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useIsMobile from 'common/hooks/useIsMobile';
import getOneMap, { OneMapSuggestion } from 'common/services/getOneMap';
import { Form, Formik, FormikConfig } from 'formik';
import { useState } from 'react';
import { HwardFixedContainer, CalendarIcon, DefaultFormProps } from 'share-components';
import { ActionButton, FormActionBoxNotFixed } from 'common/components/FormElements/form-elements';
import addressFormatter from '../utils/addressFormatter';
import { GENDERS } from './form-options';
import { PatientFormSchema, PatientFormValues } from './patient-types';
import isValidNRIC from '../utils/isValidNRIC';

interface PatientFormProps extends DefaultFormProps {
  formTitle: string;
  initData?: PatientFormValues;
  onSubmit: FormikConfig<PatientFormValues>['onSubmit'];
}

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: 24,
  ':last-child': {
    marginBottom: 0,
  },
}));

const NewPatientForm = styled(Form)(({ theme }) => ({
  paddingTop: 32,
  paddingBottom: 32,
  height: 'calc(100% - 86px)',
  overflowY: 'scroll',
  [theme.breakpoints.down('md')]: {
    height: 'calc(100% - 32px)',
  },
}));

const ErrorText = styled(FormHelperText)(() => ({
  color: '#D14343',
}));

type IAutocomplete = Parameters<typeof Autocomplete<OneMapSuggestion>>[0];

const PatientForm: React.FC<PatientFormProps> = ({
  initData = {} as PatientFormValues,
  open,
  formTitle,
  onCancel,
  onSubmit,
}) => {
  const [options, setOptions] = useState<OneMapSuggestion[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const isMobile = useIsMobile();

  const handleTyping: IAutocomplete['onInputChange'] = async (_event, value) => {
    if (value.length >= 3) {
      setShowOptions(true);
      const places = await getOneMap(value);
      setOptions(places);
    } else {
      setShowOptions(false);
    }
  };

  const getOptionLabel: IAutocomplete['getOptionLabel'] = option => option.ADDRESS;

  const customPopper: IAutocomplete['PopperComponent'] = props => (
    <Popper
      {...props}
      open={showOptions}
      modifiers={[
        {
          name: 'flip',
          options: {
            fallbackPlacements: [],
          },
        },
      ]}
      popperOptions={{
        placement: 'bottom',
      }}
      sx={{ boxShadow: '0px 0px 4px rgba(0,0,0,0.2)' }}
    />
  );

  const padding = isMobile ? 3 : 4;
  return (
    <HwardFixedContainer
      closeOnOutside
      title={formTitle}
      display={open}
      width={isMobile ? '100%' : '498px'}
      onClose={onCancel}
      headerComponent={isMobile ? <Typography variant="h6">{formTitle}</Typography> : null}
      progress={100}
      linearProgressProps={{
        sx: { span: { backgroundColor: '#7681F3' } },
      }}
      bodyContainerStyle={{ height: '100%' }}
    >
      <Formik
        initialValues={initData}
        onSubmit={onSubmit}
        validationSchema={PatientFormSchema}
        validateOnChange={false}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched, isSubmitting, setErrors, setFieldError }) => (
          <NewPatientForm method="POST" data-testid="newPatientForm" onSubmit={handleSubmit} noValidate>
            <Stack px={padding}>
              <FormControlComponent>
                <TextField
                  variant="outlined"
                  label="Full Name"
                  name="fullName"
                  id="fullName"
                  data-testid="enterFullName"
                  required
                  value={values.fullName}
                  onChange={e => setFieldValue('fullName', e.target.value)}
                  helperText={errors.fullName}
                  error={!!errors.fullName}
                  inputProps={{
                    'data-testid': 'full-name-input',
                  }}
                />
              </FormControlComponent>
              <FormControlComponent>
                <InputLabel htmlFor="gender" required>
                  Gender
                </InputLabel>
                <Select
                  label="gender"
                  id="gender"
                  name="gender"
                  required
                  value={values.gender}
                  onChange={e => setFieldValue('gender', e.target.value)}
                  error={!!(touched.gender && errors.gender)}
                  data-testid="gender-select"
                  inputProps={{
                    'data-testid': 'gender-select-input',
                  }}
                >
                  {GENDERS.map(gender => (
                    <MenuItem value={gender} key={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.gender && touched.gender && <ErrorText>{errors.gender}</ErrorText>}
              </FormControlComponent>
              <FormControlComponent>
                <TextField
                  variant="outlined"
                  label="NRIC"
                  name="nric"
                  id="nric"
                  data-testid="enterNric"
                  required
                  value={values.nric}
                  onChange={e => {
                    const { value } = e.target;
                    setFieldValue('nric', value);
                    if (!isValidNRIC(value)) {
                      setFieldError('nric', 'Invalid NRIC');
                    } else {
                      setErrors({ ...errors, nric: '' });
                    }
                  }}
                  helperText={errors.nric}
                  error={!!errors.nric}
                  inputProps={{
                    'data-testid': 'nric-input',
                  }}
                />
              </FormControlComponent>
              <FormControlComponent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    disableFuture
                    label="Patient Date of Birth"
                    onChange={date => {
                      const d = date as unknown as { $d: Date };
                      if (date && d.$d.toString() !== 'Invalid Date') {
                        setFieldValue('birthdate', date);
                      }
                    }}
                    value={values.birthdate}
                    components={{
                      OpenPickerIcon: CalendarIcon,
                    }}
                    renderInput={params => (
                      <TextField {...params} data-testid="DOB" error={!!(touched.birthdate && errors.birthdate)} />
                    )}
                  />
                </LocalizationProvider>
              </FormControlComponent>

              <Divider sx={{ marginBottom: 3 }} />

              <FormControlComponent>
                <TextField
                  label="Patient/Caregiver's Contact"
                  placeholder="+65 8888 8888"
                  required
                  id="contact"
                  data-testid="enterPatientContact"
                  value={values.contact}
                  onChange={e => setFieldValue('contact', e.target.value)}
                  helperText={errors.contact}
                  error={!!errors.contact}
                  inputProps={{
                    'data-testid': 'contact-input',
                  }}
                />
              </FormControlComponent>
              <FormControlComponent>
                <TextField
                  label="Alternative Contact"
                  id="alternativeContact"
                  data-testid="enterAltContact"
                  value={values.alternativeContact}
                  onChange={e => setFieldValue('alternativeContact', e.target.value)}
                  helperText={errors.alternativeContact}
                  error={!!errors.alternativeContact}
                  inputProps={{
                    'data-testid': 'alt-contact-input',
                  }}
                />
              </FormControlComponent>

              <Divider sx={{ marginBottom: 3 }} />

              <Autocomplete
                onChange={(_event, value) => {
                  setShowOptions(false);
                  if (value) {
                    const address = addressFormatter(value, values.address);
                    setFieldValue('address', address);
                    if (address?.postalCode !== 'NIL') setFieldValue('address.postalCode', address.postalCode);
                  } else {
                    setFieldValue('address.postalCode', '');
                  }
                }}
                onInputChange={handleTyping}
                options={options}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={() => true}
                renderInput={params => (
                  <TextField
                    {...params}
                    data-testid="Address"
                    label="Postal code, street name, building"
                    variant="outlined"
                  />
                )}
                noOptionsText={<Typography variant="body2">No result</Typography>}
                loadingText={<Typography variant="body2">Loading...</Typography>}
                PopperComponent={customPopper}
                ListboxProps={{ style: { height: 200 } }}
                forcePopupIcon={false}
              />
              <FormControlComponent>
                <TextField
                  label="Unit Number"
                  id="unit"
                  data-testid="enterUnit"
                  value={values.address.unit}
                  onChange={e => setFieldValue('address.unit', e.target.value)}
                  helperText={errors.address?.unit}
                  error={!!errors.address?.unit}
                  inputProps={{
                    'data-testid': 'unit-input',
                  }}
                />
              </FormControlComponent>
              <FormControlComponent>
                <TextField
                  label="Postal/Zip Code"
                  id="postalCode"
                  value={values.address.postalCode}
                  onChange={e => setFieldValue('address.postalCode', e.target.value)}
                  helperText={errors.address?.postalCode}
                  error={!!errors.address?.postalCode}
                />
              </FormControlComponent>
            </Stack>
            <FormActionBoxNotFixed sx={{ mt: 4 }}>
              <ActionButton type="submit" data-testid="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress data-testid="submit-spinner" color="inherit" size={20} sx={{ mx: '33px' }} />
                ) : (
                  'Enrol Patient'
                )}
              </ActionButton>
            </FormActionBoxNotFixed>
          </NewPatientForm>
        )}
      </Formik>
    </HwardFixedContainer>
  );
};

export default PatientForm;
