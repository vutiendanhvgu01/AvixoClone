import { FC, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Box,
  FormControl,
  Select,
  InputLabel,
  Button,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FormikProps, FieldArray } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { CalendarIcon, PlusIcon } from 'share-components';
import { stringifyNumber } from 'share-components/src/utils/formatUtils';
import CloseIcon from '@mui/icons-material/Close';
import { PHASE_LABEL, PRACTITIONER_TYPE_VALUE, PRACTITIONER_ISSUER_TYPE_VALUE } from '../../constants';
import { SelectMenuItemType, QualificationType } from './practitioner-form-types';
import renderSelectMenuItem from '../common/select-menu-item';

const typeSelectItem: SelectMenuItemType[] = [
  {
    label: 'Practice License',
    value: PRACTITIONER_TYPE_VALUE.practiceLicense,
  },
  {
    label: 'Other License',
    value: PRACTITIONER_TYPE_VALUE.otherLicense,
  },
  {
    label: 'Education',
    value: PRACTITIONER_TYPE_VALUE.education,
  },
  {
    label: 'Specialisation',
    value: PRACTITIONER_TYPE_VALUE.specialisation,
  },
  {
    label: 'Certification',
    value: PRACTITIONER_TYPE_VALUE.certification,
  },
  {
    label: 'Other',
    value: PRACTITIONER_TYPE_VALUE.other,
  },
];

const issuerTypeSelectItem: SelectMenuItemType[] = [
  {
    label: 'Organisation',
    value: PRACTITIONER_ISSUER_TYPE_VALUE.organisation,
  },
  {
    label: 'Professional Body',
    value: PRACTITIONER_ISSUER_TYPE_VALUE.professionalBody,
  },
  {
    label: 'University',
    value: PRACTITIONER_ISSUER_TYPE_VALUE.university,
  },
];

const PractitionerQualificationPhase: FC<{ formikProps: FormikProps<any> }> = ({ formikProps }) => {
  const { values, setFieldValue } = formikProps;

  const handleRemoveQualification = useCallback(
    (position: number) => {
      const currQualifications = values.qualifications || [];
      currQualifications.splice(position, 1);
      setFieldValue('qualifications', currQualifications);
    },
    [setFieldValue, values],
  );

  const handleDateChange = useCallback(
    (value: Dayjs | null, fieldName: string) => {
      if (setFieldValue) {
        setFieldValue(fieldName, value);
      }
    },
    [setFieldValue],
  );

  return (
    <Grid sx={{ p: 4 }} container direction="column">
      <Grid item>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {PHASE_LABEL.qualification}
        </Typography>
      </Grid>
      <FieldArray
        name="qualifications"
        render={arrayHelper => (
          <div>
            <Box>
              {!!values.qualifications?.length &&
                values.qualifications.map((qualificationItem: QualificationType, index: number) => (
                  <Box key={`practitioner-qualification-${qualificationItem.id}`}>
                    {index > 0 && (
                      <Box>
                        <Divider sx={{ ml: '-32px', mr: '-32px', mb: 5, mt: 2 }} />
                        <Box display="flex" marginBottom={3}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            sx={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {stringifyNumber(index + 1)} Qualification
                          </Typography>
                          <IconButton
                            sx={{ padding: 0, color: 'neutral.500', ml: 'auto' }}
                            aria-label="delete"
                            onClick={() => handleRemoveQualification(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                    <Grid item>
                      <FormControl fullWidth>
                        <InputLabel id="practitioner-qualification-type">Type</InputLabel>
                        <Select
                          labelId="practitioner-qualification-type"
                          label="Type"
                          {...formikProps.getFieldProps(`qualifications.${index}.type`)}
                        >
                          {renderSelectMenuItem(typeSelectItem, `practitioner-qualification-type`)}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="practitioner-qualification-code"
                        label="Code"
                        variant="outlined"
                        fullWidth
                        {...formikProps.getFieldProps(`qualifications.${index}.code`)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="practitioner-qualification-issuer-name"
                        label="Issuer Name"
                        variant="outlined"
                        fullWidth
                        {...formikProps.getFieldProps(`qualifications.${index}.issuerName`)}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <InputLabel id="practitioner-qualification-type">Issuer Type</InputLabel>
                        <Select
                          labelId="practitioner-qualification-issuer-type"
                          label="Issuer Type"
                          {...formikProps.getFieldProps(`qualifications.${index}.issuerType`)}
                        >
                          {renderSelectMenuItem(issuerTypeSelectItem, `practitioner-qualification-issuer-type`)}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="practitioner-qualification-issuing-country"
                        label="Issuing Country"
                        variant="outlined"
                        fullWidth
                        {...formikProps.getFieldProps(`qualifications.${index}.issuerCountry`)}
                      />
                    </Grid>
                    <Grid item display="flex">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Valid From"
                          renderInput={params => <TextField {...params} error={false} fullWidth sx={{ mr: 3 }} />}
                          components={{
                            OpenPickerIcon: CalendarIcon,
                          }}
                          {...formikProps.getFieldProps(`qualifications.${index}.validFrom`)}
                          onChange={value => handleDateChange(value, `qualifications.${index}.validFrom`)}
                        />
                        <DatePicker
                          label="Valid To"
                          renderInput={params => <TextField {...params} error={false} fullWidth />}
                          components={{
                            OpenPickerIcon: CalendarIcon,
                          }}
                          {...formikProps.getFieldProps(`qualifications.${index}.validTo`)}
                          onChange={value => handleDateChange(value, `qualifications.${index}.validTo`)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {values.qualifications?.length > 1 && (
                      <FormControlLabel
                        sx={{
                          paddingBottom: '30px',
                        }}
                        control={<Checkbox checked={Number(values.qualificationPrimaryPosition) === index} />}
                        onChange={(e, checked) => setFieldValue('qualificationPrimaryPosition', checked ? index : -1)}
                        label="Mark as Primary"
                      />
                    )}
                  </Box>
                ))}
            </Box>
            <Button
              size="small"
              variant="text"
              color="info"
              sx={{
                color: 'chart.blue5',
                padding: 0,
                '&:hover': {
                  background: 'none',
                },
                mt: '24px',
                mr: 'auto',
              }}
              startIcon={<PlusIcon />}
              onClick={() =>
                arrayHelper.push({
                  id: values.qualifications?.length,
                  type: '',
                  code: '',
                  issuerName: '',
                  issuerType: '',
                  issuerCountry: '',
                  validFrom: '',
                  validTo: '',
                })
              }
            >
              Another Qualification
            </Button>
          </div>
        )}
      />
    </Grid>
  );
};

export default PractitionerQualificationPhase;
