import { FC, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Box,
  FormControl,
  Button,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { CalendarIcon, PlusIcon } from 'share-components';
import { stringifyNumber } from 'share-components/src/utils/formatUtils';
import CloseIcon from '@mui/icons-material/Close';
import { PHASE_LABEL, PRACTITIONER_FORM } from '../../constants';
import { QualificationType, PractitionerFormValues } from '../../types/practitioner-form';
import renderSelectMenuItem from '../common/select-menu-item';

const PractitionerQualificationPhase: FC = () => {
  const { values, setFieldValue, getFieldProps } = useFormikContext<PractitionerFormValues>();

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
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {PHASE_LABEL.qualification}
      </Typography>
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
                      <TextField fullWidth label="Type" {...getFieldProps(`qualifications.${index}.type`)}>
                        {renderSelectMenuItem(
                          PRACTITIONER_FORM.QUALIFICATION_TYPE_SELECT_OPTIONS,
                          `practitioner-qualification-type`,
                        )}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField label="Code" fullWidth {...getFieldProps(`qualifications.${index}.code`)} />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Issuer Name"
                        fullWidth
                        {...getFieldProps(`qualifications.${index}.issuerName`)}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          label="Issuer Type"
                          {...getFieldProps(`qualifications.${index}.issuerType`)}
                        >
                          {renderSelectMenuItem(
                            PRACTITIONER_FORM.QUALIFICATION_ISSUER_TYPE_SELECT_OPTIONS,
                            `practitioner-qualification-issuer-type`,
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Issuing Country"
                        fullWidth
                        {...getFieldProps(`qualifications.${index}.issuerCountry`)}
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
                          {...getFieldProps(`qualifications.${index}.validFrom`)}
                          onChange={value => handleDateChange(value, `qualifications.${index}.validFrom`)}
                        />
                        <DatePicker
                          label="Valid To"
                          renderInput={params => <TextField {...params} error={false} fullWidth />}
                          components={{
                            OpenPickerIcon: CalendarIcon,
                          }}
                          {...getFieldProps(`qualifications.${index}.validTo`)}
                          onChange={value => handleDateChange(value, `qualifications.${index}.validTo`)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {values?.qualifications?.length && (
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
    </Box>
  );
};

export default PractitionerQualificationPhase;
