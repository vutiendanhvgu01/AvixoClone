import { Box, Grid, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormikContext } from 'formik';
import useOrganizations from 'hooks/useOrganizations';
import usePremises from 'hooks/usePremises';
import { FC, useCallback } from 'react';
import { AvatarFill, CalendarIcon } from 'share-components';
import { PHASE_LABEL, PRACTITIONER_FORM } from '../../constants';
import renderSelectMenuItem from '../common/select-menu-item';
import { PractitionerFormValues } from '../../types/practitioner-form';

const PractitionerDetailPhase: FC = () => {
  const { values, setFieldValue, errors, touched, getFieldProps } = useFormikContext<PractitionerFormValues>();
  const { organisations } = useOrganizations();
  const { premises } = usePremises(values?.organisation);

  const handleRemoveImage = useCallback(() => {
    setFieldValue?.('avatar', '');
  }, [setFieldValue]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {PHASE_LABEL.detail}
      </Typography>

      <Box sx={{ display: 'flex', mb: 2 }}>
        <AvatarFill
          avatarUrl={values?.avatar}
          handleChange={img => setFieldValue('avatar', img)}
          onRemove={handleRemoveImage}
          removeButtonProps={{
            sx: { ml: 'auto', pr: 0, color: 'neutral.500', ':hover': { background: 'none' } },
          }}
        />
      </Box>

      <TextField
        label="Full name"
        required
        fullWidth
        {...getFieldProps('name')}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Of Birth"
          value={values.birthDate || null}
          onChange={val => setFieldValue('birthDate', val ? new Date(val).toISOString() : '')}
          renderInput={params => (
            <TextField
              {...params}
              name="birthDate"
              required
              fullWidth
              error={Boolean(touched.birthDate && errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />
          )}
          components={{
            OpenPickerIcon: CalendarIcon,
          }}
        />
      </LocalizationProvider>

      <TextField
        label="NRIC"
        variant="outlined"
        required
        fullWidth
        {...getFieldProps('nric')}
        error={Boolean(touched.nric && errors.nric)}
        helperText={touched.nric && errors.nric}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            required
            label="Gender"
            {...getFieldProps('gender')}
            error={Boolean(touched.gender && errors.gender)}
            helperText={touched.gender && errors.gender}
          >
            {renderSelectMenuItem(PRACTITIONER_FORM.GENDER_SELECT_OPTIONS, 'practitioner-detail-gender-')}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            select
            fullWidth
            label="Language"
            {...getFieldProps('language')}
            error={Boolean(touched.language && errors.language)}
            helperText={touched.language && errors.language}
          >
            {renderSelectMenuItem(PRACTITIONER_FORM.LAGUAGE_SELECT_OPTIONS, 'practitioner-detail-language-')}
          </TextField>
        </Grid>
      </Grid>

      <TextField
        select
        fullWidth
        required
        label="Status"
        {...getFieldProps('status')}
        error={Boolean(touched.status && errors.status)}
        helperText={touched.status && errors.status}
      >
        {renderSelectMenuItem(PRACTITIONER_FORM.STATUS_SELECT_OPTIONS)}
      </TextField>

      <TextField
        select
        fullWidth
        required
        label="Organisation"
        {...getFieldProps('organisation')}
        error={Boolean(touched.organisation && errors.organisation)}
        helperText={touched.organisation && errors.organisation}
      >
        {renderSelectMenuItem(
          organisations?.map(it => ({ label: it.name, value: it.id })) || [],
          'practitioner-organisation',
        )}
      </TextField>

      <TextField
        select
        fullWidth
        required
        label="Premise"
        {...getFieldProps('premise')}
        error={Boolean(touched.premise && errors.premise)}
        helperText={touched.premise && errors.premise}
      >
        {renderSelectMenuItem(premises?.map(it => ({ label: it.name, value: it.id })) || [], 'practitioner-premise')}
      </TextField>

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        {...getFieldProps('description')}
        error={Boolean(touched.description && errors.description)}
        helperText={touched.description && errors.description}
      />
    </Box>
  );
};

export default PractitionerDetailPhase;
