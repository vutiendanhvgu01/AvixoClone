import { Divider, FormControl, Grid, InputAdornment, MenuItem, TextField, Stack } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Field, FormikProps } from 'formik';
import { orderBy } from 'lodash';
import { FC } from 'react';
import { DEFAULT_GRID_COLUMNS } from 'share-components/src/constants';
import { InputRow } from '../common/components';
import CustomizedDropdownForFormik from '../common/components/customized-dropdown-formik';
import { FREQUENCIES } from '../constants/frequency';
import { ROUTER_OF_ADMINISTRATIONS } from '../constants/router-of-administration';
import { GroupOption, InstructionTypes, PrescriptionValues } from '../types';

const renderSelectGroup = (options: GroupOption, isGroup: boolean) => {
  const items = orderBy(options.data, [option => option.label.toLocaleLowerCase()], ['asc']).map(option => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));
  return [items, isGroup && <Divider key={options.status} />];
};

const StepForm: FC<{
  instruction: InstructionTypes;
  instructionIndex: number;
  formikProps: FormikProps<PrescriptionValues>;
  arrayHelpers: any;
  noOfColumns: number;
}> = ({ formikProps, instruction, instructionIndex, noOfColumns }) => {
  const { errors, touched } = formikProps;

  const instructionsErrors = Array.isArray(errors?.instructions) && (errors?.instructions as any)[instructionIndex];
  const instructionsTouched = Array.isArray(touched?.instructions) && (touched?.instructions as any)[instructionIndex];

  return (
    <>
      <Grid item sm={DEFAULT_GRID_COLUMNS} md={DEFAULT_GRID_COLUMNS}>
        <InputRow>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(instructionsErrors?.validFrom && instructionsTouched?.validFrom)}
                    name={`instructionList[${instructionIndex}].validFrom`}
                  />
                )}
                label="From"
                value={instruction?.validFrom}
                minDate={new Date()}
                onChange={newValue => {
                  formikProps.setFieldValue(`instructions[${instructionIndex}].validFrom`, newValue);
                }}
              />
              {instruction?.validFrom && (
                <input
                  hidden
                  name={`instructions[${instructionIndex}].validFrom`}
                  value={`${new Date(instruction.validFrom).toISOString()}`}
                />
              )}
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(instructionsErrors?.validTo && instructionsTouched?.validTo)}
                    name={`instructionList[${instructionIndex}].validTo`}
                    helperText={instructionsErrors?.validTo}
                  />
                )}
                value={instruction?.validTo}
                minDate={instruction?.validFrom || new Date()}
                label="To"
                onChange={newValue => {
                  formikProps.setFieldValue(`instructions[${instructionIndex}]['validTo']`, newValue);
                }}
              />
              {instruction?.validTo && (
                <input
                  hidden
                  name={`instructions[${instructionIndex}].validTo`}
                  value={`${new Date(instruction.validTo).toISOString()}`}
                />
              )}
            </Stack>
          </LocalizationProvider>
        </InputRow>
      </Grid>
      {instructionIndex === 0 && (
        <Grid item sm={DEFAULT_GRID_COLUMNS}>
          <InputRow>
            <Field
              name={`instructions[${instructionIndex}].routeName`}
              component={CustomizedDropdownForFormik}
              selectLabel="Route of administration"
            >
              {ROUTER_OF_ADMINISTRATIONS?.map((route: GroupOption, index) =>
                renderSelectGroup(route, index < ROUTER_OF_ADMINISTRATIONS.length - 1),
              )}
            </Field>
          </InputRow>
        </Grid>
      )}

      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          <Stack direction="row" spacing={2}>
            <FormControl
              sx={{
                marginBottom: 0,
                width: '100%',
              }}
              required
            >
              <TextField
                required
                type="number"
                name={`instructions[${instructionIndex}].dose`}
                label="Dosage Qty"
                error={Boolean(instructionsErrors?.dose && instructionsTouched?.dose)}
                onChange={formikProps.handleChange}
                value={instruction.dose}
                defaultValue={0}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="start">Tab/s</InputAdornment>,
                  inputProps: {
                    min: '0',
                  },
                }}
              />
            </FormControl>
            <Field
              required
              value={instruction.timingFrequency}
              name={`instructions[${instructionIndex}].timingFrequency`}
              error={Boolean(instructionsErrors?.timingFrequency && instructionsTouched?.timingFrequency)}
              component={CustomizedDropdownForFormik}
              selectLabel="Frequency"
              formControlProps={{
                required: true,
                error: Boolean(instructionsErrors?.timingFrequency && instructionsTouched?.timingFrequency),
              }}
            >
              {FREQUENCIES?.map((frequency: GroupOption, index) =>
                renderSelectGroup(frequency, index < FREQUENCIES.length - 1),
              )}
            </Field>
          </Stack>
        </InputRow>
      </Grid>
      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          <Stack direction="row" spacing={2}>
            <FormControl
              sx={{
                marginBottom: 0,
                width: '100%',
              }}
              required
            >
              <TextField
                required
                name={`instructions[${instructionIndex}].duration`}
                type="number"
                label="Duration"
                error={Boolean(instructionsErrors?.duration && instructionsTouched?.duration)}
                onChange={formikProps.handleChange}
                value={instruction.duration}
                defaultValue={0}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="start">Day/s</InputAdornment>,
                  inputProps: {
                    min: '0',
                  },
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                marginBottom: 0,
                width: '100%',
              }}
              required
            >
              <TextField
                type="number"
                name={`instructions[${instructionIndex}].maxDose`}
                label="Total Qty"
                // don't remove
                // error={Boolean(instructionsErrors?.total && instructionsTouched?.total)}
                onChange={formikProps.handleChange}
                value={instruction.maxDose}
                defaultValue={0}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="start">Tab/s</InputAdornment>,
                  inputProps: {
                    min: '0',
                  },
                }}
              />
            </FormControl>
          </Stack>
        </InputRow>
      </Grid>
      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          <FormControl
            sx={{
              marginBottom: 0,
              width: '100%',
            }}
            required
          >
            <TextField
              required
              name={`instructions[${instructionIndex}].text`}
              label="Instruction"
              error={Boolean(instructionsErrors?.text && instructionsTouched?.text)}
              onChange={formikProps.handleChange}
              value={instruction.text}
              fullWidth
            />
          </FormControl>
        </InputRow>
      </Grid>
      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          <FormControl
            sx={{
              marginBottom: 0,
              width: '100%',
            }}
            required
          >
            <TextField
              name={`instructions[${instructionIndex}].additional`}
              label="Indication"
              error={Boolean(instructionsErrors?.additional && instructionsTouched?.additional)}
              onChange={formikProps.handleChange}
              value={instruction.additional || ''}
              fullWidth
            />
          </FormControl>
        </InputRow>
      </Grid>
      {instruction?.id && <input hidden name={`instructions[${instructionIndex}].id`} value={instruction?.id} />}
    </>
  );
};

export default StepForm;
