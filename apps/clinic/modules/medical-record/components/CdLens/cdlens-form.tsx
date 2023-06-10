import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { AvixoFixedContainer, CalendarIcon, DefaultFormProps, Form, FormActions, FormBody } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { DISEASE_ITEMS } from '../mockData';
import type { CdlensFormValues, SelectMenuItemType, SetFieldValueType } from './cdlens-form-types';
import CdLensSchema from './schema';

const confirmationMethodSelectItems: SelectMenuItemType[] = [
  {
    label: 'Clinical',
    value: 'clinical',
  },
  {
    label: 'Laboratory',
    value: 'laboratory',
  },
  {
    label: 'Both',
    value: 'both',
  },
];

const followUpSelectItems: SelectMenuItemType[] = [
  {
    label: 'Treated as outpatient',
    value: 'outpatient-treatment',
  },
  {
    label: 'Referred to Communicable Disease Center',
    value: 'cdc-referral',
  },
  {
    label: 'Hospitalized',
    value: 'hospitalisation',
  },
  {
    label: 'Death',
    value: 'death',
  },
];

const diseaseItems: SelectMenuItemType[] = DISEASE_ITEMS.map(item => ({ label: item, value: item }));

export interface CdlensFormProps extends DefaultFormProps {
  initData?: CdlensFormValues;
  patientId: string | number;
}

const DATEPICKER_INPUT_FORMAT = 'DD MMMM YYYY';

const CdLensForm: React.FC<CdlensFormProps> = ({ open = false, onCancel, initData, patientId }) => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const formTitle = initData?.id ? 'Edit CDLENS' : 'Submit CDLENS';
  const btnSubmitText = initData?.id ? 'Save CDLENS' : 'Submit CDLENS';

  const initValues: CdlensFormValues = {
    diseaseName: '',
    vaccinationStatus: 'yes',
    confirmationMethod: '',
    followUpAction: '',
    dateOfDiagnosis: '',
    dateOfOnset: '',
    dateOfNotification: '',
  };

  const handleChangeDate = React.useCallback(
    (field: string, value: Dayjs | string | null, setFieldValue: SetFieldValueType) => {
      setFieldValue(field, value);
    },
    [],
  );

  const handleSubmit = React.useCallback(() => {
    formRef?.current?.submit();
  }, [formRef]);

  return (
    <AvixoFixedContainer display={open} progress={60} title={formTitle} onClose={onCancel}>
      <Formik initialValues={initValues} validationSchema={CdLensSchema} onSubmit={handleSubmit} enableReinitialize>
        {formikProps => (
          <Form method="post" ref={formRef} noValidate onSubmit={formikProps.handleSubmit}>
            <input type="text" hidden value="add-cdlens" name="action" />
            {patientId && <input type="text" hidden value={patientId} name="patientId" />}
            <FormBody>
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <FormControl required fullWidth>
                    <InputLabel required id="cdlens-form-disease">
                      Disease
                    </InputLabel>
                    <Select
                      labelId="cdlens-form-disease"
                      label="Disease"
                      {...formikProps.getFieldProps('diseaseName')}
                      error={Boolean(formikProps.errors?.diseaseName)}
                    >
                      {diseaseItems.map((item: SelectMenuItemType) => (
                        <MenuItem key={`cdlens-disease-item-${item?.value}`} value={item?.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sx={{ borderBottom: '1px solid', borderBottomColor: 'divider' }}>
                  <Typography variant="overline">Vaccination Status</Typography>
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      aria-labelledby="vaccination-status-label"
                      {...formikProps.getFieldProps('vaccinationStatus')}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl required fullWidth>
                    <InputLabel required id="cdlens-form-confirmationMethod">
                      Confirmation Method
                    </InputLabel>
                    <Select
                      labelId="cdlens-form-confirmationMethod"
                      label="Confirmation Method"
                      {...formikProps.getFieldProps('confirmationMethod')}
                      error={Boolean(formikProps.errors?.confirmationMethod)}
                    >
                      {confirmationMethodSelectItems.map((item: SelectMenuItemType) => (
                        <MenuItem key={`cdlens-confirmationMethod-item-${item?.value}`} value={item?.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Diagnosis"
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="dateOfDiagnosis"
                          required
                          fullWidth
                          error={Boolean(formikProps.errors?.dateOfDiagnosis)}
                        />
                      )}
                      components={{
                        OpenPickerIcon: CalendarIcon,
                      }}
                      value={formikProps.values.dateOfDiagnosis}
                      onChange={value => handleChangeDate('dateOfDiagnosis', value, formikProps.setFieldValue)}
                      inputFormat={DATEPICKER_INPUT_FORMAT}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sx={{ borderBottom: '1px solid', borderBottomColor: 'divider' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Lab. Notification"
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="dateOfNotification"
                          required
                          fullWidth
                          error={Boolean(formikProps.errors?.dateOfNotification)}
                        />
                      )}
                      components={{
                        OpenPickerIcon: CalendarIcon,
                      }}
                      value={formikProps.values.dateOfNotification}
                      onChange={value => handleChangeDate('dateOfNotification', value, formikProps.setFieldValue)}
                      inputFormat={DATEPICKER_INPUT_FORMAT}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Onset"
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="dateOfOnset"
                          required
                          fullWidth
                          error={Boolean(formikProps.errors?.dateOfOnset)}
                        />
                      )}
                      components={{
                        OpenPickerIcon: CalendarIcon,
                      }}
                      value={formikProps.values.dateOfOnset}
                      onChange={value => handleChangeDate('dateOfOnset', value, formikProps.setFieldValue)}
                      inputFormat={DATEPICKER_INPUT_FORMAT}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <FormControl required fullWidth>
                    <InputLabel required id="cdlens-form-follow-up">
                      Follow Up
                    </InputLabel>
                    <Select
                      labelId="cdlens-form-follow-up"
                      label="Follow Up"
                      error={Boolean(formikProps?.errors?.followUpAction)}
                      {...formikProps.getFieldProps('followUpAction')}
                    >
                      {followUpSelectItems.map((item: SelectMenuItemType) => (
                        <MenuItem key={`cdlens-follow-up-item-${item?.value}`} value={item?.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </FormBody>
            <FormActions>
              <Button variant="text">Cancel</Button>
              <Button type="submit">{btnSubmitText}</Button>
            </FormActions>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default CdLensForm;
