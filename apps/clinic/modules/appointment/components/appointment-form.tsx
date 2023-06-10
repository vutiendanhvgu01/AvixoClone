/*
  Add/Edit Appointent form
*/
import CircleIcon from '@mui/icons-material/Circle';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BASE_URL } from 'common/constants/urls';
import { useClinicContext } from 'contexts/clinic-context';
import { useFormik } from 'formik';
import { BaseObject } from 'modules/invoice/components/InvoiceDetails/InvoiceService/service-types';
import { Patient } from 'modules/patient/types/patient';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { ChangeEvent, SyntheticEvent, useCallback, useRef } from 'react';
import {
  AvixoFixedContainer,
  AvixoPatientAutoComplete,
  AvixoPractitionerAutoComplete,
  DefaultFormProps,
  FormActions,
} from 'share-components';
import {
  formatHexToRGBA,
  getEmailByPatient,
  getPhoneNumberByPatient,
  getPreferredFieldOfPatient,
} from 'share-components/src/utils/formatUtils';
import { getFirstLetters } from 'share-components/src/utils/stringUtils';
import { getAppointmentFormValues, getValueFromFirstElementInArray } from '../common/utils';
import { PRACTITIONER_TYPE } from '../constants';
import AppointmentSchema from './appointment-schema';
import { AppointmentFormValues } from './appointment-types';

interface AppointmentFormProps extends DefaultFormProps {
  initData?: AppointmentFormValues;
}

const MainForm = styled('form')(() => ({
  height: '100%',
  padding: '20px 0 32px 0',
}));

const StackTitle = styled(Typography)(() => ({
  marginBottom: '32px',
}));

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '32px !important',
}));

const FormFieldsContainer = styled(Stack)(() => ({
  padding: '0 32px',
}));

//= ===================== SOURCES ===============================
const bookingSources: BaseObject[] = [
  { id: 1, name: 'Phone' },
  { id: 2, name: 'Email' },
  { id: 3, name: 'Social Application' },
];

const durationOptions: BaseObject[] = [
  { id: '15_MINUTES', name: '15 Minutes' },
  { id: '30_MINUTES', name: '30 Minutes' },
  { id: '1_HOUR', name: '1 Hour' },
];

const countryCodes: BaseObject[] = [
  { id: 65, name: 'Singapore +65' },
  { id: 1, name: 'United States +1' },
  { id: 0, name: 'South Georgia +0' },
];

const idTypes: BaseObject[] = [
  { id: 'passport', name: 'Passport' },
  { id: 'national-id', name: 'ID National' },
];

const roomOptions: BaseObject[] = [
  { id: '0', name: 'General Room' },
  { id: '1', name: 'Consult Room A' },
  { id: '2', name: 'Consult Room B' },
  { id: '3', name: 'Superior Room' },
];

const notifyMethods: BaseObject[] = [
  { id: 0, name: 'SMS' },
  { id: 1, name: 'Email' },
  { id: 2, name: 'Mobile App' },
];

const remiderTypes: BaseObject[] = [
  { id: 0, name: '1 Day before appointment' },
  { id: 1, name: '2 Day before appointment' },
  { id: 2, name: '3 Day before appointment' },
];

const visitReasonOptions = [
  { id: 'GENERAL', name: 'General', color: '#B35BCA' },
  { id: 'CT_SCAN', name: 'CT Scan', color: '#9FD5A1' },
  { id: 'FU_CONSULT', name: 'FU Consult', color: '#DA6868' },
  { id: 'REVIEW', name: 'Review', color: '#51ADF6' },
  { id: 'GENERAL_X_RAY', name: 'General X-Ray', color: '#1A405F' },
  { id: 'TREATMENT', name: 'Treatment', color: '#AD51F6' },
];

const statuses: BaseObject[] = [
  { id: 'planned', name: 'Planned' },
  { id: 'actualised', name: 'Actualised' },
  { id: 'confirmed', name: 'Confirmed' },
  { id: 'cancelled', name: 'Cancelled' },
];
//= ===================== END SOURCES ===============================

const AppointmentForm: React.FC<AppointmentFormProps> = ({ initData, open, onCancel, onDelete }) => {
  const theme = useTheme();
  const formTitle = initData?.id ? 'Edit Appointment' : 'Add Appointment';
  const submitButtonTitle = initData?.id ? 'Save Changes' : 'Add Appointment';
  const form = useRef<HTMLFormElement | null>(null);
  const action = initData?.id ? 'edit-appointment' : 'add-appointment';
  const { organisation } = useClinicContext();

  const initialValues: AppointmentFormValues = {
    caseId: 1,
    startTime: new Date().toString(),
    type: '15_MINUTES',
    isNewPatient: true,
    patientType: 'new',
    patientId: 0,
    patientName: '',
    patientEmail: '',
    countryCode: 0,
    phoneNumber: '',
    idType: 'passport',
    idNumber: '',
    practitionerId: 0,
    practitionerName: '',
    practitionerType: '',
    serviceType: '0',
    reason: 'GENERAL',
    comments: '',
    isSendNotification: false,
    sendVia: '',
    remiderType: '',
    status: 'planned',
    title: '',
    action,
    organisationId: organisation?.id as number,
  };

  const formik = useFormik({
    initialValues: { ...initialValues, ...getAppointmentFormValues(initData) },
    validationSchema: AppointmentSchema,
    onSubmit: () => {
      form.current?.submit();
    },
  });
  const { getFieldProps, touched, errors, handleBlur, handleChange, values, setFieldValue, isSubmitting } = formik;
  const renderStartDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => (
      <TextField
        required
        name="wrappedStartTime"
        {...params}
        onBlur={handleBlur}
        error={!!(touched.startTime && errors.startTime)}
      />
    ),
    [errors.startTime, handleBlur, touched.startTime],
  );

  const handleChangeGivenDate = useCallback(
    (value: Date | null) => {
      setFieldValue('startTime', value?.toISOString());
    },
    [setFieldValue],
  );

  const onChangePatientValue = useCallback(
    (event: SyntheticEvent<Element, Event>, value: Patient | null) => {
      setFieldValue('patientEmail', getEmailByPatient(value));
      setFieldValue('countryCode', getPreferredFieldOfPatient(value, 'phones', 'countryCode'));
      setFieldValue('phoneNumber', getPhoneNumberByPatient(value));
      setFieldValue('idType', getValueFromFirstElementInArray(value?.identities, 'idType'));
      setFieldValue('idNumber', getValueFromFirstElementInArray(value?.identities, 'idNumber'));
      setFieldValue('patientName', value?.fullName);
      setFieldValue('patientId', value?.id);
    },
    [setFieldValue],
  );

  const isPatientExisting = () => values.patientType === 'existing';
  const handleStatusSubmit = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value === 'actualised') {
        formik.handleSubmit();
        formik.validateForm().then(validate => {
          if (Object.keys(validate).length <= 0) {
            formik.setFieldValue('status', e.target.value);
          }
        });
      } else {
        formik.setFieldValue('status', e.target.value);
      }
    },
    [formik],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel} width="996px">
        <MainForm ref={form} noValidate method="post" onSubmit={formik.handleSubmit}>
          <FormFieldsContainer>
            <Stack>
              {values?.id && <input type="hidden" name="id" value={values?.id} />}
              <input type="hidden" id="action" name="action" value={values.action} />
              <input type="hidden" id="organisationId" name="organisationId" value={values.organisationId} />
              <input type="hidden" id="patientId" name="patientId" value={values?.patientId} />
              <input type="hidden" id="practitionerId" name="practitionerId" value={values?.practitionerId} />
              <FormControlComponent fullWidth>
                <TextField select label="Booking Source" {...getFieldProps('caseId')}>
                  {bookingSources.map((bookingSource: BaseObject) => (
                    <MenuItem key={`booking-item-${bookingSource.id}`} value={bookingSource.id}>
                      {bookingSource.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControlComponent>
            </Stack>
            <Divider sx={{ margin: '0 -32px 32px -32px' }} />
            <Stack>
              <StackTitle variant="overline">Time & Date</StackTitle>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControlComponent fullWidth>
                    <DatePicker
                      label="Date"
                      renderInput={renderStartDateInput}
                      onChange={handleChangeGivenDate}
                      value={values.startTime}
                    />
                  </FormControlComponent>
                </Grid>
                <Grid item xs={3}>
                  <FormControlComponent fullWidth>
                    <TimePicker
                      label="Time"
                      renderInput={renderStartDateInput}
                      onChange={handleChangeGivenDate}
                      value={values.startTime}
                    />
                    <input type="hidden" name="startTime" value={values.startTime} />
                  </FormControlComponent>
                </Grid>
                <Grid item xs={6}>
                  <FormControlComponent fullWidth>
                    <TextField
                      required
                      select
                      label="Select Duration"
                      {...getFieldProps('type')}
                      error={!!(touched.type && errors.type)}
                      helperText={touched.type && errors.type}
                    >
                      {durationOptions.map((duration: BaseObject) => (
                        <MenuItem key={`duration-item-${duration.id}`} value={duration.id}>
                          {duration.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControlComponent>
                </Grid>
              </Grid>
            </Stack>
            <Divider sx={{ margin: '-8px 0 32px 0px' }} />
            <Stack>
              <Grid container>
                <Grid item xs>
                  <Stack>
                    <StackTitle variant="overline">Patient Information</StackTitle>
                    <FormControlComponent fullWidth>
                      <RadioGroup
                        row
                        aria-labelledby="patientType-label"
                        name="patientType"
                        onChange={handleChange}
                        value={values.patientType}
                      >
                        <FormControlLabel value="new" control={<Radio />} label="New Patient" />
                        <FormControlLabel value="existing" control={<Radio />} label="Existing Patient" />
                      </RadioGroup>
                    </FormControlComponent>
                    {isPatientExisting() ? (
                      <FormControlComponent fullWidth sx={{ marginBottom: '8px !important' }}>
                        <AvixoPatientAutoComplete
                          value={{
                            fullName: values?.patientName,
                            value: values?.patientId,
                          }}
                          baseUrl={BASE_URL}
                          id="patient-select-demo"
                          autoHighlight
                          onChange={onChangePatientValue}
                          renderOption={(props: Record<string, any>, option: Record<string, any>) => (
                            <li {...props}>
                              <Stack flexDirection="row" justifyContent="space-around">
                                <Avatar
                                  sx={{
                                    bgcolor: 'primary.main',
                                  }}
                                >
                                  {getFirstLetters(option.fullName)}
                                </Avatar>
                                <Box ml={2}>
                                  <Typography variant="body1">{option?.fullName}</Typography>
                                  <Typography variant="body2">{`Phone Number: ${
                                    option?.phones?.length > 0 ? option?.phones[0].isoNumber : 'Undefined'
                                  } | NRIC: ${
                                    option?.identities?.length > 0 ? option?.identities[0].idNumber : 'Undefined'
                                  }`}</Typography>
                                </Box>
                              </Stack>
                            </li>
                          )}
                          renderInput={params => (
                            <TextField {...params} label="Patient Name" {...getFieldProps('patientName')} />
                          )}
                        />
                      </FormControlComponent>
                    ) : (
                      <FormControlComponent fullWidth required>
                        <InputLabel id="patient-name-field">Patient Name</InputLabel>
                        <OutlinedInput
                          label="Patient Name"
                          id="patient-name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          value={values.patientName}
                          name="patientName"
                          error={!!(touched.patientName && errors.patientName)}
                        />
                      </FormControlComponent>
                    )}

                    <FormControlComponent fullWidth>
                      <InputLabel id="email-field">Email</InputLabel>
                      <OutlinedInput
                        label="Email"
                        id="email"
                        disabled={isPatientExisting()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.patientEmail}
                        name="patientEmail"
                        error={!!(touched.patientEmail && errors.patientEmail)}
                      />
                    </FormControlComponent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlComponent fullWidth>
                          <TextField
                            required
                            select
                            label="Country Code"
                            disabled={isPatientExisting()}
                            {...getFieldProps('countryCode')}
                            error={!!(touched.countryCode && errors.countryCode)}
                            helperText={touched.countryCode && errors.countryCode}
                          >
                            {countryCodes.map((code: BaseObject) => (
                              <MenuItem key={`code-item-${code.id}`} value={code.id}>
                                {code.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControlComponent>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlComponent fullWidth required>
                          <InputLabel id="phone-number-field">Phone Number</InputLabel>
                          <OutlinedInput
                            label="Phone Number"
                            id="phone-number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isPatientExisting()}
                            required
                            value={values.phoneNumber}
                            name="phoneNumber"
                            error={!!(touched.phoneNumber && errors.phoneNumber)}
                          />
                        </FormControlComponent>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlComponent fullWidth>
                          <TextField select label="ID Type" {...getFieldProps('idType')} disabled={isPatientExisting()}>
                            {idTypes.map((type: BaseObject) => (
                              <MenuItem key={`type-item-${type.id}`} value={type.id}>
                                {type.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControlComponent>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlComponent fullWidth>
                          <InputLabel id="id-number-field">ID Number</InputLabel>
                          <OutlinedInput
                            label="ID Number"
                            id="id-number"
                            disabled={isPatientExisting()}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.idNumber}
                            name="idNumber"
                            error={!!(touched.idNumber && errors.idNumber)}
                          />
                        </FormControlComponent>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack>
                    <StackTitle variant="overline">Visit Detail</StackTitle>
                    <FormControlComponent fullWidth>
                      <TextField
                        required
                        select
                        label="Visit Reason"
                        {...getFieldProps('reason')}
                        error={!!(touched.reason && errors.reason)}
                        helperText={touched.reason && errors.reason}
                      >
                        {visitReasonOptions.map(reason => (
                          <MenuItem key={`reason-item-${reason.id}`} value={reason.id}>
                            <CircleIcon sx={{ color: reason.color, marginRight: '10px' }} />
                            {reason.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControlComponent>
                    <FormControlComponent fullWidth>
                      <InputLabel id="detail-field">Clinic Comments</InputLabel>
                      <OutlinedInput
                        label="Clinic Comments"
                        id="detail"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comments}
                        name="comments"
                        multiline
                        rows={3}
                        error={!!(touched.comments && errors.comments)}
                      />
                    </FormControlComponent>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ margin: '0 32px' }} />
                <Grid item xs>
                  <Stack>
                    <StackTitle variant="overline">Assign Patient To</StackTitle>
                    <FormControlComponent fullWidth sx={{ marginBottom: '8px !important' }}>
                      <AvixoPractitionerAutoComplete
                        value={{
                          name: values?.practitionerName,
                          value: values?.practitionerId,
                        }}
                        baseUrl={BASE_URL}
                        filterOptions={options =>
                          options
                            ?.sort((a, b) => -b.status.localeCompare(a.status))
                            ?.map(option => ({
                              ...option,
                              group:
                                option?.status === 'active'
                                  ? PRACTITIONER_TYPE.AVAILABLE
                                  : PRACTITIONER_TYPE.UNAVAILABLE,
                            })) ?? []
                        }
                        autoHighlight
                        groupBy={option => option.group}
                        onChange={(event: React.SyntheticEvent, value: Practitioner | null) => {
                          setFieldValue('practitionerId', value?.id);
                          setFieldValue('practitionerName', value?.name);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderOption={(props: Record<string, any>, option: Record<string, any>) => (
                          <li {...props} key={option?.uuid}>
                            <Stack flexDirection="row" justifyContent="space-around">
                              <Avatar
                                sx={{
                                  bgcolor:
                                    option?.group === PRACTITIONER_TYPE.AVAILABLE ? 'primary.main' : 'neutral.700',
                                }}
                              >
                                {getFirstLetters(option?.name)}
                              </Avatar>
                              <Box ml={2}>
                                <Typography
                                  variant="body1"
                                  color={option?.group === PRACTITIONER_TYPE.AVAILABLE ? 'neutral.900' : 'neutral.700'}
                                >
                                  {option?.name}
                                </Typography>
                                <Typography variant="body2">{option?.description}</Typography>
                              </Box>
                            </Stack>
                          </li>
                        )}
                        renderInput={params => <TextField {...params} label="Practitioner" />}
                      />
                      <FormHelperText>Please add appointment date and time to select practitioner</FormHelperText>
                    </FormControlComponent>
                    <FormControlComponent fullWidth>
                      <TextField
                        required
                        select
                        label="Room"
                        {...getFieldProps('serviceType')}
                        error={!!(touched.serviceType && errors.serviceType)}
                        helperText={touched.serviceType && errors.serviceType}
                      >
                        {roomOptions.map(room => (
                          <MenuItem key={`room-item-${room?.id}`} value={room?.id}>
                            {room?.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControlComponent>
                  </Stack>
                  <Stack>
                    <StackTitle variant="overline">Assign Patient To</StackTitle>
                    <FormControlComponent fullWidth>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isSendNotification"
                            checked={values.isSendNotification}
                            onChange={handleChange}
                          />
                        }
                        label="Send Notification"
                      />
                    </FormControlComponent>
                    <FormControlComponent fullWidth>
                      <TextField
                        required
                        select
                        label="Send via"
                        disabled={!values.isSendNotification}
                        {...getFieldProps('sendVia')}
                        error={!!(touched.sendVia && errors.sendVia)}
                        helperText={touched.sendVia && errors.sendVia}
                      >
                        {notifyMethods.map(notify => (
                          <MenuItem key={`notify-item-${notify.id}`} value={notify.id}>
                            {notify.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControlComponent>
                    <FormControlComponent fullWidth>
                      <TextField
                        required
                        select
                        label="Send in advance"
                        disabled={!values.isSendNotification}
                        {...getFieldProps('remiderType')}
                        error={!!(touched.remiderType && errors.remiderType)}
                        helperText={touched.remiderType && errors.remiderType}
                      >
                        {remiderTypes.map(remider => (
                          <MenuItem key={`remider-item-${remider.id}`} value={remider.id}>
                            {remider.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControlComponent>
                  </Stack>
                  <Stack>
                    <StackTitle variant="overline">Appointment status</StackTitle>
                    <Paper
                      elevation={0}
                      sx={{
                        background: formatHexToRGBA(theme.palette.secondary.main, 0.05),
                        padding: '34px 44px 32px',
                      }}
                    >
                      <FormControlComponent fullWidth>
                        <TextField select label="Status" {...getFieldProps('status')} onChange={handleStatusSubmit}>
                          {statuses.map(status => (
                            <MenuItem key={`status-item-${status.id}`} value={status.id}>
                              {status.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControlComponent>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </FormFieldsContainer>
          <FormActions position="relative">
            {initData && (
              <Button
                color="error"
                variant="text"
                sx={{
                  position: 'absolute',
                  left: '2%',
                }}
                onClick={() => {
                  if (onDelete) {
                    onDelete();
                  }
                }}
              >
                Delete
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                mr: 2,
              }}
            >
              {isSubmitting && <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />} {submitButtonTitle}
            </Button>
            {initData?.id && (
              <>
                <Divider orientation="vertical" flexItem variant="middle" />
                <Button disabled={isSubmitting}>
                  {isSubmitting && <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />} Add Patient to Queue
                </Button>
              </>
            )}
          </FormActions>
        </MainForm>
      </AvixoFixedContainer>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
