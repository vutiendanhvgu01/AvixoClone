import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useIsMobile from 'common/hooks/useIsMobile';
import { FieldArray, Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { HwardFixedContainer, CalendarIcon, ClockFillIcon, DefaultFormProps } from 'share-components';
import { ActionButton, FormActionBox } from 'common/components/FormElements/form-elements';
import { MAPPED_SERVICE_FIELDS, SERVICES, ServiceUnion } from '../constants';
import { AppointmentFormSchema, AppointmentFormValues, DEFAULT_APPOINTMENT } from './appointment-types';

interface AppointmentFormProps extends DefaultFormProps {
  formTitle: string;
  initData?: AppointmentFormValues;
  onSubmit: FormikConfig<AppointmentFormValues>['onSubmit'];
}

const NewAppointmentForm = styled(Form)(() => ({
  height: 'calc(100% - 64px)',
  overflowY: 'auto',
}));
const FormWrapper = styled(Stack)(({ theme }) => ({
  marginTop: '24px',
  marginBottom: '24px',
  paddingLeft: '32px',
  paddingRight: '32px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
}));
const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: 24,
  ':last-child': {
    marginBottom: 0,
  },
}));

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  formTitle,
  open,
  onCancel,
  onSubmit,
  initData = {} as AppointmentFormValues,
}) => {
  const isMobile = useIsMobile();

  function onChangeAppointmentCount(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prevValue: AppointmentFormValues['numberOfAppointments'],
    values: AppointmentFormValues,
    setValues: FormikHelpers<AppointmentFormValues>['setValues'],
  ) {
    const appointments = [...values.appointments];
    const curValue = parseInt(e.target.value || '1', 10);
    const previousValue = parseInt(prevValue, 10) || 1;
    if (previousValue < curValue) {
      for (let i = previousValue; i < curValue; i += 1) {
        appointments.push(DEFAULT_APPOINTMENT);
      }
    } else {
      for (let i = previousValue; i >= curValue; i -= 1) {
        appointments.splice(i, 1);
      }
    }
    setValues({ ...values, appointments, numberOfAppointments: e.target.value });
  }

  function handleDelete(
    position: number,
    values: AppointmentFormValues,
    setValues: FormikHelpers<AppointmentFormValues>['setValues'],
  ) {
    const appointments = [...values.appointments];
    appointments.splice(position, 1);
    setValues({ ...values, appointments, numberOfAppointments: String(appointments.length) });
  }

  return (
    <HwardFixedContainer
      closeOnOutside
      title={formTitle}
      display={open}
      width={isMobile ? '100%' : '498px'}
      onClose={onCancel}
      headerComponent={isMobile ? <Typography variant="h6">{formTitle}</Typography> : null}
    >
      <Formik
        initialValues={initData}
        onSubmit={onSubmit}
        validationSchema={AppointmentFormSchema}
        validateOnChange={false}
      >
        {({ handleSubmit, values, setFieldValue, setValues, isSubmitting }) => (
          <NewAppointmentForm method="POST" onSubmit={handleSubmit} noValidate>
            <Divider />
            <FormWrapper>
              <Stack direction="row" gap={3}>
                <FormControl fullWidth sx={{ marginBottom: '0 !important' }}>
                  <InputLabel id="service-select">Select Service</InputLabel>
                  <Select
                    label="Select Service"
                    labelId="service-select"
                    value={values.service}
                    onChange={e => setFieldValue('service', e.target.value)}
                  >
                    {SERVICES.map(s => (
                      <MenuItem value={s} key={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '0 !important' }}>
                  <TextField
                    variant="outlined"
                    label="No of Appointments"
                    name="noOfAppointments"
                    id="noOfAppointments"
                    required
                    value={values.numberOfAppointments}
                    type="number"
                    onChange={e => onChangeAppointmentCount(e, values.numberOfAppointments, values, setValues)}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </FormControl>
              </Stack>
            </FormWrapper>

            <Divider />

            {/* Ref: https://jasonwatmore.com/post/2020/09/28/react-formik-dynamic-form-example */}
            <FieldArray name="appointments">
              {() =>
                values.appointments.map((app, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <FormWrapper key={i}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 3,
                      }}
                    >
                      <Typography variant="overline">APPOINTMENT {i + 1}</Typography>
                      {i !== 0 && (
                        <IconButton aria-label="Delete" onClick={() => handleDelete(i, values, setValues)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Stack direction="row" gap={3}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
                            disablePast
                            label="Start Date"
                            value={app.startDate}
                            components={{ OpenPickerIcon: CalendarIcon }}
                            onChange={date => setFieldValue(`appointments.[${i}].startDate`, date)}
                            renderInput={params => <TextField {...params} required />}
                            PopperProps={{
                              sx: {
                                '&.MuiPickersPopper-root': {
                                  boxShadow:
                                    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                                },
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                      <FormControl fullWidth>
                        <DesktopTimePicker
                          label="Start Time"
                          inputFormat="HH:mm"
                          components={{ OpenPickerIcon: ClockFillIcon }}
                          value={app.startTime}
                          onChange={time => setFieldValue(`appointments.[${i}].startTime`, time)}
                          renderInput={params => <TextField {...params} error={false} />}
                          PopperProps={{
                            sx: {
                              '&.MuiPickersPopper-root': {
                                boxShadow:
                                  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                              },
                            },
                          }}
                        />
                      </FormControl>
                    </Stack>
                    {MAPPED_SERVICE_FIELDS.orderRequest.includes(values.service as ServiceUnion) && (
                      <FormControlComponent>
                        <TextField
                          multiline
                          rows={2}
                          label="Order Request"
                          id="orderrequest"
                          value={app.orderRequest}
                          onChange={e => setFieldValue(`appointments.[${i}].orderRequest`, e.target.value)}
                        />
                      </FormControlComponent>
                    )}
                    {MAPPED_SERVICE_FIELDS.additionalComments.includes(values.service as ServiceUnion) && (
                      <FormControlComponent>
                        <TextField
                          multiline
                          rows={2}
                          label="Additional Comments"
                          id="additionalcomments"
                          value={app.additionalComments}
                          onChange={e => setFieldValue(`appointments.[${i}].additionalComments`, e.target.value)}
                        />
                      </FormControlComponent>
                    )}
                    {values.numberOfAppointments !== '1' && <Divider />}
                  </FormWrapper>
                ))
              }
            </FieldArray>

            <FormActionBox>
              <ActionButton type="submit" data-testid="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress color="inherit" size={20} sx={{ ml: '6px', mr: '7px' }} /> : 'Save'}
              </ActionButton>
            </FormActionBox>
          </NewAppointmentForm>
        )}
      </Formik>
    </HwardFixedContainer>
  );
};

export default AppointmentForm;
