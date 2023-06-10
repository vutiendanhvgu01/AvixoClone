import React, { useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  FormControl,
  MenuItem,
  TextField,
  TextFieldProps,
  Stack,
  Typography,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Grid,
  styled,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PAGE_URLS } from 'share-components/src/constants';
import { Catalog } from 'modules/catalog/types';
import { routeOfAdminSetCode } from 'modules/immunisation/components/mock-data';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import usePractitioners from 'modules/practitioner/hooks/usePractitioners';
import { AvixoFixedContainer, DefaultFormProps, Form, FormActions, FormBody } from 'share-components';
import { useClinicContext } from 'contexts/clinic-context';
import usePractitionerDetails from 'modules/practitioner/hooks/usePractitionerDetails';
import type { ImmunisationFormValues } from './immunisation-types';
import { IMMUNISATION_FORM } from '../constants';

const StackTitle = styled(Typography)(() => ({
  marginBottom: '32px',
}));

export interface ImmunisationFormProps extends DefaultFormProps {
  initData?: ImmunisationFormValues;
  patientUUID?: string;
  products: Catalog[];
}

const initialValues: ImmunisationFormValues = {
  administeredProduct: '',
  statusReason: '',
  batchNo: '',
  site: '',
  route: '',
  manufacturer: '',
  givenBy: null,
  orderedBy: null,
  doseQuantity: null,
  administeredBy: null,
  reason: '',
  notes: '',
  name: '',
  dateOfAdministration: '',
  protocolDoseNumber: null,
  requestedBy: null,
  expiryDate: '',
  nehr: true,
  unitOfMeasurement: null,
  status: 'not-done',
};

const AddEditImmunisationForm = (props: ImmunisationFormProps) => {
  const { practitioner, patient } = useClinicContext();
  const { initData, patientUUID, products, open, onCancel } = props;
  const premiseId = practitioner?.practitionerPremises?.[0].premiseId;
  const { practitioners } = usePractitioners({ premiseId });
  const router = useRouter();
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: initData || initialValues,
    validationSchema: IMMUNISATION_FORM.SCHEMA,
    onSubmit: (values: ImmunisationFormValues, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { touched, errors, isSubmitting, getFieldProps, handleBlur, values, setFieldValue } = formik;
  const { practitioner: defaultOrderedBy, loading: isFetchedOrderedBy } = usePractitionerDetails(initData?.requestedBy);

  const onDateChange = useCallback(
    (name: string, value?: Date | string | null) => {
      setFieldValue(name, value ? new Date(value).toISOString() : null);
    },
    [setFieldValue],
  );

  const formTitle = initData?.id ? 'Edit Immunisation' : 'Add New Immunisation';

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel} progress={0}>
      <Form ref={form} noValidate method="post" onSubmit={formik.handleSubmit}>
        <input type="hidden" name="action" value={initData?.id ? 'update-immunisation' : 'create-immunisation'} />
        <input type="hidden" name="patientId" value={patient?.id} />
        <input type="hidden" name="id" value={initData?.id} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormBody>
            <Stack>
              <StackTitle variant="h6">1. Product Detail</StackTitle>
              <TextField
                select
                required
                fullWidth
                label="Product"
                {...getFieldProps('administeredProduct')}
                sx={{
                  '.MuiOutlinedInput-input.MuiOutlinedInput-input': {
                    whiteSpace: 'unset',
                    wordBreak: 'break-all',
                  },
                }}
                error={!!(touched.administeredProduct && errors.administeredProduct)}
                helperText={touched.administeredProduct && errors.administeredProduct}
              >
                {products?.map((product: Catalog) => (
                  <MenuItem key={`product-item-${product.id}`} value={product.name}>
                    {product.name}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Dose"
                    type="number"
                    required
                    {...getFieldProps('doseQuantity')}
                    error={!!(touched.doseQuantity && errors.doseQuantity)}
                    helperText={touched.doseQuantity && errors.doseQuantity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    label="UOM"
                    required
                    {...getFieldProps('unitOfMeasurement')}
                    error={!!(touched.unitOfMeasurement && errors.unitOfMeasurement)}
                    helperText={touched.unitOfMeasurement && errors.unitOfMeasurement}
                  >
                    {IMMUNISATION_FORM.UOM.map(item => (
                      <MenuItem key={`immunisation-uom-${item.value}`} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                required
                label="Dose Series"
                {...getFieldProps('protocolDoseNumber')}
                error={!!(touched.protocolDoseNumber && errors.protocolDoseNumber)}
                helperText={touched.protocolDoseNumber && errors.protocolDoseNumber}
              />
              <TextField
                select
                fullWidth
                required
                label="Site"
                {...getFieldProps('site')}
                error={!!(touched.site && errors.site)}
                helperText={touched.site && errors.site}
              >
                {IMMUNISATION_FORM.SITES.map((site: any) => (
                  <MenuItem key={`site-item-${site.id}`} value={site.name}>
                    {site.name}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                autoComplete
                disableClearable
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="route"
                    label="Route of Administration"
                    error={!!(touched.route && errors.route)}
                    helperText={touched.route && errors.route}
                  />
                )}
                onChange={(event: React.SyntheticEvent, newValue: Record<string, any>) => {
                  setFieldValue('route', newValue.code);
                }}
                options={routeOfAdminSetCode.map(item => ({ value: item.code, label: item.description }))}
              />
              <TextField
                fullWidth
                required
                label="Batch no."
                {...getFieldProps('batchNo')}
                error={!!(touched.batchNo && errors.batchNo)}
                helperText={touched.batchNo && errors.batchNo}
              />
              <TextField
                fullWidth
                label="Manufacturer"
                {...getFieldProps('manufacturer')}
                error={!!(touched.manufacturer && errors.manufacturer)}
                helperText={touched.manufacturer && errors.manufacturer}
              />
              <FormControl fullWidth>
                <DatePicker
                  label="Expiry date"
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                    <TextField
                      {...params}
                      error={!!(touched.expiryDate && errors.expiryDate)}
                      helperText={touched.expiryDate && errors.expiryDate}
                    />
                  )}
                  onChange={date => onDateChange('expiryDate', date)}
                  minDate={new Date()}
                  value={values.expiryDate}
                />
                <input hidden name="expiryDate" value={values.expiryDate} />
              </FormControl>
            </Stack>
            <Stack>
              <StackTitle variant="h6">2. Status</StackTitle>
              <TextField
                select
                fullWidth
                label="Status"
                {...getFieldProps('status')}
                error={!!(touched.status && errors.status)}
                helperText={touched.status && errors.status}
              >
                {IMMUNISATION_FORM.STATUSES.map(status => (
                  <MenuItem key={`status-item-${status.value}`} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                disableClearable
                defaultValue={
                  initData?.administeredBy
                    ? { value: initData.administeredBy, label: initData.administeredBy }
                    : undefined
                }
                options={practitioners.map(it => ({
                  label: it.name,
                  value: it.name,
                }))}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    {...params}
                    required
                    label="Given by"
                    name="administeredBy"
                    error={!!(touched.administeredBy && errors.administeredBy)}
                    helperText={touched.administeredBy && errors.administeredBy}
                  />
                )}
                onChange={(_: React.SyntheticEvent, { value }) => {
                  setFieldValue('administeredBy', value);
                }}
              />
              <FormControl fullWidth>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Date"
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      value={values.dateOfAdministration}
                      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                        <TextField
                          {...params}
                          required
                          error={!!(touched.dateOfAdministration && errors.dateOfAdministration)}
                          helperText={touched.dateOfAdministration && errors.dateOfAdministration}
                        />
                      )}
                      onChange={date => onDateChange('dateOfAdministration', date)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Time"
                      value={values.dateOfAdministration}
                      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                        <TextField
                          {...params}
                          onBlur={handleBlur}
                          error={!!(touched.dateOfAdministration && errors.dateOfAdministration)}
                          helperText={touched.dateOfAdministration && errors.dateOfAdministration}
                        />
                      )}
                      onChange={date => onDateChange('dateOfAdministration', date)}
                    />
                  </Grid>
                  <input type="hidden" name="dateOfAdministration" value={values.dateOfAdministration} />
                </Grid>
              </FormControl>
            </Stack>
            {isFetchedOrderedBy && (
              <>
                <Autocomplete
                  fullWidth
                  disableClearable
                  defaultValue={
                    defaultOrderedBy ? { value: defaultOrderedBy?.id, label: defaultOrderedBy?.name } : undefined
                  }
                  options={practitioners.map(it => ({
                    label: it.name,
                    value: it.id,
                  }))}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      required
                      label="Ordered by"
                      error={!!(touched.requestedBy && errors.requestedBy)}
                      helperText={touched.requestedBy && errors.requestedBy}
                    />
                  )}
                  onChange={(_: React.SyntheticEvent, { value }) => {
                    setFieldValue('requestedBy', value);
                  }}
                />
                {values.requestedBy && <input type="hidden" name="requestedBy" value={values.requestedBy} />}
              </>
            )}
            <TextField
              label="Remarks"
              fullWidth
              required
              placeholder="Write something"
              multiline
              rows={4}
              {...getFieldProps('notes')}
              error={!!(touched.notes && errors.notes)}
              helperText={touched.notes && errors.notes}
            />
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox defaultChecked {...getFieldProps('nehr')} />}
                label="Submit immunisation record to NEHR "
              />
            </FormControl>
          </FormBody>
          <FormActions>
            {initData?.id && (
              <Button
                variant="text"
                color="error"
                sx={{ mr: 'auto' }}
                onClick={() => {
                  router.push(PAGE_URLS.PATIENT_IMMUNISATION_DELETE(patientUUID, initData?.id));
                }}
              >
                Delete
              </Button>
            )}
            <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />} Save Changes
            </Button>
          </FormActions>
        </LocalizationProvider>
      </Form>
    </AvixoFixedContainer>
  );
};

export default AddEditImmunisationForm;
