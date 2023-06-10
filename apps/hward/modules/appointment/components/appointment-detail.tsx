import { AvixoSnackbar, CalendarIcon, ClockFillIcon, HwardFixedContainer, PencilIcon } from 'share-components';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { Appointment, EditAppointmentFormSchemas } from 'modules/appointment/components/appointment-types';
import mapAppointmentType from 'modules/appointment/utils/mapAppointmentType';
import { FormActionBox, ActionButton } from 'common/components/FormElements/form-elements';
import React, { useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import isEqual from 'lodash/isEqual';
import { getFormattedDateTime } from 'modules/appointment/utils/formatEditAppointmentReq';
import HwardModal from 'common/components/HwardModal/hward-modal';
import { SERVICES } from 'modules/appointment/constants';

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: 24,
  ':last-child': {
    marginBottom: 0,
  },
}));

const MainForm = styled('form')(() => ({
  height: 'auto',
  marginBottom: 32,
}));

interface AppointmentDetailProps {
  isOpen: boolean;
  close: () => void;
  service?: Appointment;
  onSubmit: (values: FormikValues) => Promise<void>;
  snackbarMessage?: string;
  closeSnackbar?: () => void;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  isOpen,
  close,
  service,
  onSubmit,
  snackbarMessage = '',
  closeSnackbar,
}) => {
  const isMobile = useIsMobile();
  const [disabled, setDisabled] = React.useState(true);
  const [openModal, setOpenModal] = useState(false);
  const serviceType = mapAppointmentType({
    specialty: service?.specialty ?? 'General Practitioner',
    service: service?.type,
  });
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      serviceType,
      startDate: service?.date,
      startTime: service?.date,
      orderRequest: service?.orderRequest ?? '',
      notes: service?.notes ?? '',
      additionalComments: service?.additionalComments ?? '',
      patientCondition: service?.patientCondition ?? '',
    },
    validationSchema: EditAppointmentFormSchemas,
    onSubmit: async values => {
      if (!isEqual(values, formik.initialValues)) {
        await onSubmit(values);
      }
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    if (!isOpen) {
      setDisabled(true);
      formik.resetForm();
    }
  }, [isOpen]);

  const handleCloseModal = () => setOpenModal(false);

  const handleEditForm = () => {
    if (!['draft', 'accepted'].includes(service?.status ?? '')) {
      setOpenModal(true);
      return;
    }
    setDisabled(false);
  };

  if (!service) return null;
  return (
    <>
      <HwardFixedContainer
        title="Appointment Details"
        display={isOpen}
        closeOnOutside
        width={isMobile ? '100%' : '498px'}
        onClose={close}
        bodyContainerStyle={{ height: 'calc(100% - 190px)' }}
        progress={100}
        linearProgressProps={{
          sx: { span: { backgroundColor: '#E6E8F0' }, height: '1px' },
        }}
      >
        <MainForm method="POST" data-cy="form" onSubmit={formik.handleSubmit} noValidate>
          <Box sx={{ mt: 2 }}>
            <Stack sx={{ mx: 3, mt: 3 }}>
              {disabled ? (
                <Typography sx={{ mb: 3 }} variant="overline">
                  {serviceType}
                </Typography>
              ) : (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="service-select">Select Service</InputLabel>
                    <Select
                      label="Select Service"
                      labelId="service-select"
                      value={formik.values.serviceType}
                      onChange={e => formik.setFieldValue('serviceType', e.target.value)}
                    >
                      {SERVICES.map(s => (
                        <MenuItem value={s} key={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Divider sx={{ mb: 3 }} />
                </>
              )}
              <FormControlComponent>
                <TextField variant="outlined" label="Service ID" value={service?.uuid} disabled />
              </FormControlComponent>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <FormControlComponent fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        disablePast={!disabled}
                        label="Start Date"
                        value={formik.values.startDate}
                        components={{ OpenPickerIcon: CalendarIcon }}
                        onChange={newDate => {
                          const formattedDate = getFormattedDateTime(newDate ?? '', formik?.values?.startDate ?? '');
                          formik.setFieldValue('startDate', formattedDate);
                          if (formik?.values?.startTime) {
                            formik.setFieldValue('startTime', formattedDate);
                          }
                        }}
                        renderInput={params => <TextField {...params} required />}
                        disabled={disabled}
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
                  </FormControlComponent>
                </Grid>
                <Grid item xs={6}>
                  <FormControlComponent fullWidth>
                    <DesktopTimePicker
                      label="Start Time"
                      inputFormat="HH:mm"
                      components={{ OpenPickerIcon: ClockFillIcon }}
                      value={formik.values.startTime}
                      onChange={time => {
                        const newTime = getFormattedDateTime(formik?.values?.startDate ?? '', time ?? '');
                        formik.setFieldValue('startTime', newTime);
                      }}
                      renderInput={params => <TextField {...params} error={!!formik?.errors?.startTime} />}
                      disabled={disabled}
                      PopperProps={{
                        sx: {
                          '&.MuiPickersPopper-root': {
                            boxShadow:
                              '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                          },
                        },
                      }}
                    />
                  </FormControlComponent>
                </Grid>
              </Grid>
              {['Doctor House Call', 'Nurse House Call'].includes(formik.values.serviceType) ? (
                <>
                  <FormControlComponent>
                    <TextField
                      variant="outlined"
                      label="Order Request"
                      disabled={disabled}
                      multiline
                      {...formik.getFieldProps('orderRequest')}
                    />
                  </FormControlComponent>
                  <FormControlComponent>
                    <TextField
                      variant="outlined"
                      label="Additional Comments"
                      multiline
                      rows={3}
                      disabled={disabled}
                      {...formik.getFieldProps('additionalComments')}
                    />
                  </FormControlComponent>
                </>
              ) : null}
              {formik.values.serviceType === 'Medication Delivery' ? (
                <FormControlComponent>
                  <TextField
                    variant="outlined"
                    label="Notes"
                    disabled={disabled}
                    multiline
                    {...formik.getFieldProps('notes')}
                  />
                </FormControlComponent>
              ) : null}
              {formik.values.serviceType === 'Ambulance' ? (
                <FormControlComponent>
                  <TextField
                    variant="outlined"
                    label="Patient Condition"
                    disabled={disabled}
                    multiline
                    {...formik.getFieldProps('patientCondition')}
                  />
                </FormControlComponent>
              ) : null}
              <Divider />
            </Stack>
          </Box>
          <FormActionBox>
            {disabled ? (
              <IconButton onClick={handleEditForm} data-testid="edit-appointment">
                <PencilIcon />
              </IconButton>
            ) : (
              <ActionButton type="submit" data-testid="submit-btn">
                {formik.isSubmitting ? (
                  <CircularProgress color="inherit" size={20} sx={{ ml: '6px', mr: '7px' }} />
                ) : (
                  'Save'
                )}
              </ActionButton>
            )}
          </FormActionBox>
        </MainForm>
      </HwardFixedContainer>
      <AvixoSnackbar
        open={!!snackbarMessage}
        onClose={closeSnackbar}
        actionText="Dismiss"
        autoHideDuration={2000}
        showActionButton={!isMobile}
        showIconButton={false}
        handleAction={closeSnackbar}
        sx={{ bottom: '42px !important' }}
        ContentProps={{
          message: (
            <Box sx={{ maxWidth: 265 }}>
              <Typography variant="caption" color="#fff">
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: snackbarMessage }} />
              </Typography>
            </Box>
          ),
        }}
      />
      <HwardModal
        open={openModal}
        title="Unable to edit appointment"
        onClose={handleCloseModal}
        closeText="Okay"
        subtitle="Unable to edit appointments that are already assigned. Please contact your administrator for support."
      />
    </>
  );
};

export default AppointmentDetail;
