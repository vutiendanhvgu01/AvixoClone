import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form, Formik } from 'formik';
import {
  MEDICAL_CERTIFICATE_DESCRIPTION,
  MEDICAL_CERTIFICATE_DIAGNOSIS,
  MEDICAL_CERTIFICATE_EMAIL_TO,
  MEDICAL_CERTIFICATE_PRACTITIONER_NAME,
  MEDICAL_CERTIFICATE_TYPE,
} from 'modules/medical-record/constants/medical-certificate';
import { MedicalCertificateValues } from 'modules/medical-record/types/medical-certificate';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AvixoFixedContainer, CalendarIcon, ClockFillIcon, DefaultFormProps } from 'share-components';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import medicalCertificateFormSchema from './medical-certificate-from-schema';

interface MedicalCertificateFormProps extends DefaultFormProps {
  initData?: MedicalCertificateValues;
}

const CircleDot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral?.[300],
  width: 12,
  height: 12,
  borderRadius: '50%',
}));

const Rectangle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral?.[300],
  width: 2,
  height: 74,
  margin: '10px 0',
}));
const DateRangeIndicatorContainer = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
const ButtonBack = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  '&:hover': {
    backgroundColor: theme.palette.neutral?.[200],
  },
}));

const today = new Date();
const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);
const todayISO = today.toISOString();

const initialValues: MedicalCertificateValues = {
  dateOfVisit: todayISO,
  startDate: todayISO,
  endDate: nextDay.toISOString(),
  startTime: todayISO,
  endTime: todayISO,
  dateOfIssue: todayISO,
  type: MEDICAL_CERTIFICATE_TYPE.medical_certificate,
  description: MEDICAL_CERTIFICATE_DESCRIPTION.medical_description,
  diagnosis: [],
  remark: '',
  practitionerName: '',
  sendToEmail: false,
  emailto: [],
  emailcc: [],
  emailbcc: [],
  subject: '',
  message: '',
};

const requiredFields = [
  'dateOfVisit',
  'startDate',
  'endDate',
  'startTime',
  'endTime',
  'dateOfIssue',
  'practitionerName',
];
const requiredFieldsWithSendEmail = ['emailto', 'subject', 'message'];

const MedicalCertificateForm: React.FC<MedicalCertificateFormProps> = ({
  onCancel,
  initData = {} as MedicalCertificateValues,
  open,
}) => {
  const [formValues, setformValues] = useState<MedicalCertificateValues>(initialValues);
  const [progress, setProgress] = useState<number>(0);
  const [isCheckedSendToEmail, setIsCheckedSendToEmail] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailSectionRef = useRef<HTMLDivElement | null>(null);

  let formTitle = initData?.id ? 'Edit Medical Certificate' : 'Add Medical Certificate';
  if (initData?.sendToEmail) {
    formTitle = 'Email Medical Certificate';
  }

  const onSubmit = useCallback(() => {
    formRef.current?.submit();
  }, []);

  const removeFieldValue = (
    chosenValue: string,
    values: string[] | undefined,
    setFieldCallback: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    fieldName: string,
  ) => {
    if (values && values.length) {
      const newValues = [...values];
      const valueIndex = values.indexOf(chosenValue);
      if (valueIndex !== -1) {
        newValues.splice(valueIndex, 1);
        setFieldCallback(fieldName, newValues);
      }
    }
  };

  useEffect(() => {
    const newLength = Object.entries(formValues).filter(item => {
      const fieldKey = item[0];
      const value = item[1];

      if (requiredFields.includes(fieldKey)) {
        return value;
      }

      if (isCheckedSendToEmail && requiredFieldsWithSendEmail.includes(fieldKey)) {
        if (Array.isArray(value)) {
          return value.length;
        }
        return value;
      }
    }).length;

    if (progress !== newLength) {
      setProgress(newLength);
    }
  }, [formValues]);

  useEffect(() => {
    if (initData.sendToEmail && emailSectionRef) {
      emailSectionRef.current?.scrollIntoView();
    }
  }, [initData, emailSectionRef]);

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel}>
      <LinearProgress variant="determinate" value={(progress / (isCheckedSendToEmail ? 10 : 7)) * 100} />
      <Formik
        initialValues={{ ...initialValues, ...initData }}
        validationSchema={medicalCertificateFormSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
          /* and other goodies */
        }) => {
          setformValues(values);
          return (
            <Form onSubmit={handleSubmit} ref={formRef} noValidate>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Container
                  sx={{
                    padding: '32px 32px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100% - 100px)',
                    overflowY: 'scroll',
                  }}
                >
                  <Container sx={{ padding: '0 0 20px 0' }}>
                    <Typography sx={{ color: 'text.secondary', marginBottom: 3 }} variant="overline" component="div">
                      Visit Information
                    </Typography>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Date of Visit"
                        inputFormat="MM/dd/yyyy"
                        value={values.dateOfVisit}
                        onChange={value => {
                          setFieldValue('dateOfVisit', value);
                        }}
                        components={{ OpenPickerIcon: CalendarIcon }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            required
                            error={!!(errors.dateOfVisit && touched.dateOfVisit)}
                            helperText={touched.dateOfVisit && errors.dateOfVisit}
                          />
                        )}
                      />
                    </FormControl>
                    <Box sx={{ position: 'relative' }}>
                      <DateRangeIndicatorContainer>
                        <CircleDot />
                        <Rectangle />
                        <CircleDot />
                      </DateRangeIndicatorContainer>
                      <Box sx={{ display: 'flex', mb: '52px' }}>
                        <FormControl sx={{ ml: '28px' }}>
                          <DatePicker
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={values.startDate}
                            onChange={handleChange}
                            components={{ OpenPickerIcon: CalendarIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                required
                                error={!!(errors.startDate && touched.startDate)}
                                helperText={touched.startDate && errors.startDate}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl sx={{ ml: '28px' }}>
                          <TimePicker
                            label="Start Time"
                            inputFormat="HH:mm"
                            components={{ OpenPickerIcon: ClockFillIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                required
                                error={!!(errors.startDate && touched.startDate)}
                                helperText={touched.startDate && errors.startDate}
                              />
                            )}
                            onChange={value => {
                              setFieldValue('startDate', value);
                            }}
                            value={values.startTime}
                          />
                        </FormControl>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ ml: '28px' }}>
                          <DatePicker
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            value={values.endDate}
                            onChange={value => {
                              setFieldValue('endDate', value);
                            }}
                            components={{ OpenPickerIcon: CalendarIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                required
                                error={!!(errors.endDate && touched.endDate)}
                                helperText={touched.endDate && errors.endDate}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl sx={{ ml: '28px' }}>
                          <TimePicker
                            label="End Time"
                            inputFormat="HH:mm"
                            components={{ OpenPickerIcon: ClockFillIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                required
                                error={!!(errors.endTime && touched.endTime)}
                                helperText={touched.endTime && errors.endTime}
                              />
                            )}
                            onChange={value => {
                              setFieldValue('endTime', value);
                            }}
                            value={values.endTime}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </Container>

                  <Container>
                    <Typography sx={{ color: 'text.secondary', marginBottom: 3 }} variant="overline" component="div">
                      MC Details
                    </Typography>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Date of Issue"
                        inputFormat="MM/dd/yyyy"
                        value={values.dateOfIssue}
                        onChange={value => {
                          setFieldValue('dateOfIssue', value);
                        }}
                        components={{ OpenPickerIcon: CalendarIcon }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            required
                            error={!!(errors.dateOfIssue && touched.dateOfIssue)}
                            helperText={touched.dateOfIssue && errors.dateOfIssue}
                          />
                        )}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        select
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleChange}
                        error={!!(errors.type && touched.type)}
                        helperText={touched.type && errors.type}
                      >
                        {Object.keys(MEDICAL_CERTIFICATE_TYPE).map(type => (
                          <MenuItem key={type} value={type}>
                            {MEDICAL_CERTIFICATE_TYPE[type]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        select
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        error={!!(errors.description && touched.description)}
                        helperText={touched.description && errors.description}
                      >
                        {Object.keys(MEDICAL_CERTIFICATE_DESCRIPTION).map(description => (
                          <MenuItem key={description} value={description}>
                            {MEDICAL_CERTIFICATE_DESCRIPTION[description]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="multiple-diagnosis-label">Diagnosis</InputLabel>
                      <Select
                        name="diagnosis"
                        labelId="multiple-diagnosis-label"
                        id="multiple-diagnosis-select"
                        multiple
                        label="Diagnosis"
                        value={values.diagnosis || []}
                        onChange={handleChange}
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(value => (
                              <Chip
                                key={value}
                                label={value}
                                deleteIcon={<CloseIcon />}
                                onDelete={() => removeFieldValue(value, values.diagnosis, setFieldValue, 'diagnosis')}
                                sx={{
                                  backgroundColor: '#EEEDFC',
                                }}
                                onMouseDown={event => {
                                  event.stopPropagation();
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {Object.keys(MEDICAL_CERTIFICATE_DIAGNOSIS).map(diagnosis => (
                          <MenuItem key={diagnosis} value={diagnosis}>
                            {MEDICAL_CERTIFICATE_DIAGNOSIS[diagnosis]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        name="remark"
                        label="Remark"
                        value={values.remark}
                        onChange={handleChange}
                        error={!!(errors.remark && touched.remark)}
                        helperText={touched.remark && errors.remark}
                        multiline
                        minRows={2}
                      />
                    </FormControl>
                  </Container>

                  <Container>
                    <Typography sx={{ color: 'text.secondary', marginBottom: 3 }} variant="overline" component="div">
                      Provider Information
                    </Typography>
                    <FormControl fullWidth>
                      <TextField
                        required
                        select
                        name="practitionerName"
                        label="Practitioner Name"
                        value={values.practitionerName}
                        onChange={handleChange}
                        error={!!(errors.practitionerName && touched.practitionerName)}
                        helperText={touched.practitionerName && errors.practitionerName}
                      >
                        {Object.keys(MEDICAL_CERTIFICATE_PRACTITIONER_NAME).map(name => (
                          <MenuItem key={name} value={name}>
                            {MEDICAL_CERTIFICATE_PRACTITIONER_NAME[name]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="sendToEmail"
                            checked={values.sendToEmail}
                            onChange={e => {
                              setIsCheckedSendToEmail(e.target.checked);
                              handleChange(e);
                            }}
                            sx={{}}
                          />
                        }
                        label="Send Medical Certificate to Email"
                        sx={{
                          color: values.sendToEmail ? 'text.primary' : 'neutral.500',
                        }}
                      />
                    </FormControl>
                  </Container>

                  {values.sendToEmail && (
                    <Container ref={emailSectionRef}>
                      <Typography sx={{ color: 'text.secondary', marginBottom: 3 }} variant="overline" component="div">
                        Email Information
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel required id="multiple-emailto-label">
                          To
                        </InputLabel>
                        <Select
                          required
                          name="emailto"
                          labelId="multiple-emailto-label"
                          id="multiple-emailto-select"
                          multiple
                          label="To"
                          value={values.emailto || []}
                          onChange={handleChange}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  deleteIcon={<CloseIcon />}
                                  onDelete={() => removeFieldValue(value, values.diagnosis, setFieldValue, 'emailto')}
                                  onMouseDown={event => {
                                    event.stopPropagation();
                                  }}
                                  sx={{
                                    backgroundColor: '#EEEDFC',
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(MEDICAL_CERTIFICATE_EMAIL_TO).map(id => (
                            <MenuItem key={id} value={MEDICAL_CERTIFICATE_EMAIL_TO[id]}>
                              {MEDICAL_CERTIFICATE_EMAIL_TO[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="multiple-emailcc-label">Cc</InputLabel>
                        <Select
                          name="emailcc"
                          labelId="multiple-emailcc-label"
                          id="multiple-emailcc-select"
                          multiple
                          label="Cc"
                          value={values.emailcc || []}
                          onChange={handleChange}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  deleteIcon={<CloseIcon />}
                                  onDelete={() => removeFieldValue(value, values.diagnosis, setFieldValue, 'emailcc')}
                                  sx={{
                                    backgroundColor: '#EEEDFC',
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(MEDICAL_CERTIFICATE_EMAIL_TO).map(id => (
                            <MenuItem key={id} value={MEDICAL_CERTIFICATE_EMAIL_TO[id]}>
                              {MEDICAL_CERTIFICATE_EMAIL_TO[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="multiple-emailbcc-label">Bcc</InputLabel>
                        <Select
                          name="emailbcc"
                          labelId="multiple-emailbcc-label"
                          id="multiple-emailbcc-select"
                          multiple
                          label="Bcc"
                          value={values.emailbcc || []}
                          onChange={handleChange}
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  deleteIcon={<CloseIcon />}
                                  onDelete={() => removeFieldValue(value, values.diagnosis, setFieldValue, 'emailbcc')}
                                  sx={{
                                    backgroundColor: '#EEEDFC',
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(MEDICAL_CERTIFICATE_EMAIL_TO).map(id => (
                            <MenuItem key={id} value={MEDICAL_CERTIFICATE_EMAIL_TO[id]}>
                              {MEDICAL_CERTIFICATE_EMAIL_TO[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name="subject"
                          label="Subject"
                          value={values.subject}
                          onChange={handleChange}
                          error={!!(errors.subject && touched.subject)}
                          helperText={touched.subject && errors.subject}
                          multiline
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          required
                          name="message"
                          label="Message"
                          value={values.message}
                          onChange={handleChange}
                          error={!!(errors.message && touched.message)}
                          helperText={touched.message && errors.message}
                          multiline
                          minRows={2}
                        />
                      </FormControl>
                    </Container>
                  )}
                </Container>
              </LocalizationProvider>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '32px', borderTop: '1px solid #E6E8F0' }}>
                <ButtonBack variant="text" onClick={onCancel}>
                  Back
                </ButtonBack>
                <Button variant="text">Save &amp; Print</Button>
                <Button variant="text">Save &amp; Email</Button>
                <Button disabled={!isValid} type="submit">
                  Save
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default MedicalCertificateForm;
