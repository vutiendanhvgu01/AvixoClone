import { FormControl, Grid, InputLabel, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FormikProps } from 'formik';
import organisationProxyService from 'modules/organisation/services/proxy';
import { FC, useCallback, useEffect, useState } from 'react';
import { AvatarFill, CalendarIcon } from 'share-components';
import {
  PHASE_LABEL,
  PRACTITIONER_GENDER_VALUE,
  PRACTITIONER_LANGUAGE_VALUE,
  PRACTITIONER_STATUS_VALUE,
} from '../../constants';
import renderSelectMenuItem from '../common/select-menu-item';
import { SelectMenuItemType } from './practitioner-form-types';

const genderSelectItem: SelectMenuItemType[] = [
  {
    label: 'Male',
    value: PRACTITIONER_GENDER_VALUE.male,
  },
  {
    label: 'Female',
    value: PRACTITIONER_GENDER_VALUE.female,
  },
  {
    label: 'Not Known',
    value: PRACTITIONER_GENDER_VALUE.notKnown,
  },
  {
    label: 'Not Applicable',
    value: PRACTITIONER_GENDER_VALUE.notApplicable,
  },
];

const statusSelectItem: SelectMenuItemType[] = [
  {
    label: 'Active',
    value: PRACTITIONER_STATUS_VALUE.active,
  },
  {
    label: 'Suspended',
    value: PRACTITIONER_STATUS_VALUE.suspended,
  },
  {
    label: 'In Active',
    value: PRACTITIONER_STATUS_VALUE.inactive,
  },
];

const languageSelectItem: SelectMenuItemType[] = [
  {
    label: 'English',
    value: PRACTITIONER_LANGUAGE_VALUE.english,
  },
  {
    label: 'Vietnamese',
    value: PRACTITIONER_LANGUAGE_VALUE.vietnamese,
  },
];

const PractitionerDetailPhase: FC<{ formikProps: FormikProps<any> }> = ({ formikProps }) => {
  const { values, setFieldValue, errors } = formikProps;
  const [organisations, setOrganisations] = useState<SelectMenuItemType[]>([]);
  const [premises, setPremises] = useState<SelectMenuItemType[]>([]);

  const handleRemoveImage = useCallback(() => {
    setFieldValue?.('avatar', '');
  }, [setFieldValue]);

  const handleChangeDateOfBirth = useCallback(
    (value: Dayjs | null) => {
      setFieldValue?.('birthDate', value);
    },
    [setFieldValue],
  );

  const fetchOrganisations = async () => {
    try {
      const { data } = await organisationProxyService.getOrganizations();
      setOrganisations(
        data.map(item => ({
          label: item.name,
          value: item.id,
        })),
      );
    } catch (error) {
      // TODO handle error
      console.log({ error });
    }
  };

  const fetchPremises = useCallback(async () => {
    if (values?.organisation) {
      try {
        const { data } = await organisationProxyService.getPremises({
          organisationId: values?.organisation,
        });
        setPremises(
          data.map(item => ({
            label: item.name,
            value: item.id,
          })),
        );
      } catch (error) {
        // TODO handle error
        console.log({ error });
      }
    } else {
      setPremises([]);
    }
  }, [values?.organisation]);

  useEffect(() => {
    fetchOrganisations().catch(error => console.log({ error }));
  }, []);

  useEffect(() => {
    fetchPremises();
  }, [fetchPremises]);

  return (
    <Grid container sx={{ p: 4 }} direction="column">
      <Grid item>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {PHASE_LABEL.detail}
        </Typography>
      </Grid>

      <Grid item sx={{ display: 'flex', mb: 2 }}>
        <AvatarFill
          avatarUrl={values?.avatar}
          handleChange={(img: string) => setFieldValue('avatar', img)}
          onRemove={handleRemoveImage}
          removeButtonProps={{
            sx: { ml: 'auto', pr: 0, color: 'neutral.500', ':hover': { background: 'none' } },
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          id="practitioner-detail-full-name"
          label="Full name"
          variant="outlined"
          required
          error={Boolean(errors?.name)}
          fullWidth
          {...formikProps.getFieldProps('name')}
        />
      </Grid>

      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Of Birth"
            value={values.birthDate}
            onChange={handleChangeDateOfBirth}
            renderInput={params => <TextField {...params} required fullWidth error={Boolean(errors?.birthDate)} />}
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item>
        <TextField
          id="practitioner-detail-nric"
          label="NRIC"
          variant="outlined"
          required
          error={Boolean(errors?.nric)}
          fullWidth
          {...formikProps.getFieldProps('nric')}
        />
      </Grid>

      <Grid item display="flex">
        <FormControl required fullWidth sx={{ marginRight: 2 }}>
          <InputLabel required id="practitioner-detail-gender">
            Gender
          </InputLabel>
          <Select
            labelId="practitioner-detail-gender"
            label="Gender"
            error={Boolean(errors?.gender)}
            {...formikProps.getFieldProps('gender')}
          >
            {renderSelectMenuItem(genderSelectItem, 'practitioner-detail-gender-')}
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel required id="practitioner-detail-gender">
            Language
          </InputLabel>
          <Select
            labelId="practitioner-detail-language"
            label="Language"
            error={Boolean(errors?.language)}
            {...formikProps.getFieldProps('language')}
          >
            {renderSelectMenuItem(languageSelectItem, 'practitioner-detail-language-')}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl fullWidth required>
          <InputLabel id="practitioner-other-status">Status</InputLabel>
          <Select
            error={Boolean(errors?.status)}
            value={values?.status}
            name="status"
            labelId="practitioner-other-status"
            label="Status"
            onChange={formikProps.handleChange}
          >
            {renderSelectMenuItem(statusSelectItem)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl fullWidth required>
          <InputLabel id="practitioner-other-organisation">Organisation</InputLabel>
          <Select
            error={Boolean(errors?.organisation)}
            labelId="practitioner-other-organisation"
            label="Organisation"
            {...formikProps.getFieldProps('organisation')}
          >
            {renderSelectMenuItem(organisations)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl fullWidth required>
          <InputLabel id="practitioner-other-premise">Premise</InputLabel>
          <Select
            error={Boolean(errors?.premise)}
            value={values?.premise}
            name="premise"
            labelId="practitioner-other-premise"
            label="Premise"
            onChange={formikProps.handleChange}
          >
            {renderSelectMenuItem(premises)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <TextField
          id="practitioner-detail-description"
          label="Description"
          variant="outlined"
          error={Boolean(errors?.description)}
          fullWidth
          {...formikProps.getFieldProps('description')}
        />
      </Grid>
    </Grid>
  );
};

export default PractitionerDetailPhase;
