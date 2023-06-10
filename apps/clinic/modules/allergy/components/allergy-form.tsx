import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { AvixoFixedContainer, CalendarIcon, FormActions, FormBody } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import * as Yup from 'yup';
import MOCK_ADMINISTRATION_ROUTE from 'modules/catalog/constants/mockData';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import usePractitioners from 'modules/practitioner/hooks/usePractitioners';
import { useClinicContext } from 'contexts/clinic-context';
import DrugNameAutocomplete from 'common/components/drug-name-autocomplete';
import DrugBrandAutocomplete from 'common/components/drug-brand-autocomplete';
import {
  ALLERGY_CLINICAL_STATUS,
  ALLERGY_CRITICALITY,
  ALLERGY_SEVERITIY,
  ALLERGY_SUSPECTED_DRUG,
  ALLERGY_TYPE,
  ALLERGY_SUB_TYPE,
  ALLERGY_VERIFICATION_STATUS,
  ALLERGY_INFORMATION_SOURCE,
} from '../constants';
import type { AllergyFormValues, InformationSource } from './allergy-types';

const Form = styled('form')(() => ({
  height: '100%',
}));

const InformationSourceWrap = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  margin: '-8px -32px 32px',
  padding: '0 32px',
}));

const stringRequiredIfInformationSourceIsPractitioner = Yup.string().when('informationSource', {
  is: (informationSource: string) => informationSource === 'practitioner',
  then: Yup.string().required('Required').nullable(),
  otherwise: Yup.string().nullable(),
});

const dateRequiredIfInformationSourceIsPractitioner = Yup.date().when('informationSource', {
  is: (informationSource: string) => informationSource === 'practitioner',
  then: Yup.date().required('Required').nullable(),
  otherwise: Yup.date().nullable(),
});

const AllergyFormSchema = Yup.object().shape({
  informationSource: Yup.string()
    .oneOf([...Object.keys(ALLERGY_INFORMATION_SOURCE), null])
    .nullable(),
  type: Yup.string().required('Required'),
  subType: Yup.string().when('informationSource', {
    is: (informationSource: string) => informationSource !== 'practitioner',
    then: Yup.string().required('Required').nullable(),
  }),
  name: Yup.string().required('Required'),
  adrBrand: stringRequiredIfInformationSourceIsPractitioner,
  suspectedDrug: stringRequiredIfInformationSourceIsPractitioner,
  validFrom: Yup.date().required('Required').nullable(),
  lastOccurrence: dateRequiredIfInformationSourceIsPractitioner,
  validTo: dateRequiredIfInformationSourceIsPractitioner,
  severity: stringRequiredIfInformationSourceIsPractitioner,
  criticality: stringRequiredIfInformationSourceIsPractitioner,
  verificationStatus: stringRequiredIfInformationSourceIsPractitioner,
  clinicalStatus: stringRequiredIfInformationSourceIsPractitioner,
  createdBy: Yup.number().required('Required').nullable(),
  reportedBy: Yup.number().when('informationSource', {
    is: (informationSource: string) => informationSource === 'practitioner',
    then: Yup.number().required('Required').nullable(),
    otherwise: Yup.number().nullable(),
  }),
});

export interface AllergyFormProps {
  handleOnSubmit?: (allergy: AllergyFormValues) => void;
  initData?: AllergyFormValues;
  open: boolean;
  onCancel?: () => void;
  patientId: string | number;
}

const AllergyForm: React.FC<AllergyFormProps> = props => {
  const router = useRouter();
  const { practitioner } = useClinicContext();
  const patientUUID = router.query.patientUUID?.toString() || '';
  const informationSource = (router.query.informationSource?.toString() as InformationSource) || null;
  const { initData, open = false, onCancel, patientId } = props;
  const premiseId = practitioner?.practitionerPremises?.[0]?.premiseId;
  const { practitioners } = usePractitioners({ premiseId });
  const form = useRef<HTMLFormElement | null>(null);

  const buttonText = initData?.id ? 'Save Changes' : 'Add Allergy';
  const formTitle = initData?.id ? 'Edit Allergy' : 'Add New Allergy';
  const action = initData?.id ? 'update-allergy' : 'create-allergy';

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...{
        informationSource,
        type: 'allergy',
        subType: null,
        criticality: null,
        verificationStatus: null,
        name: '',
        adrBrand: '',
        adrDrug: '',
        validFrom: null,
        lastOccurrence: null,
        validTo: null,
        severity: null,
        remarks: '',
        manifestationSctName: '',
        exposureRouteSct: null,
        exposureRouteSctName: null,
        clinicalStatus: null,
        suspectedDrug: '',
        createdBy: practitioner?.id || null,
        reportedBy: null,
        substanceCode: null,
        remark: '',
      },
      ...initData,
    },
    validationSchema: AllergyFormSchema,
    onSubmit: (values: AllergyFormValues, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { getFieldProps, values, touched, errors, setFieldValue, isSubmitting } = formik;
  const defaultCreatedBy = practitioners.find(it => it.id === initData?.createdBy || practitioner?.id);
  const defaultReportedBy = practitioners.find(it => it.id === initData?.reportedBy);
  const isDirectlyObserved = values.informationSource === 'practitioner';

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel} progress={0}>
      <Form ref={form} method="POST" data-cy="form" onSubmit={formik.handleSubmit} noValidate>
        <input hidden name="action" value={action} />
        {initData?.id && <input hidden name="id" value={initData?.id} />}
        {patientId && <input hidden name="patientId" value={patientId} />}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormBody>
            <InformationSourceWrap>
              <TextField
                required
                select
                fullWidth
                label="Report Type"
                {...getFieldProps('informationSource')}
                helperText={touched.informationSource && errors.informationSource}
                error={!!(touched.informationSource && errors.informationSource)}
              >
                {Object.keys(ALLERGY_INFORMATION_SOURCE).map(type => (
                  <MenuItem key={type} value={type}>
                    {ALLERGY_INFORMATION_SOURCE[type]}
                  </MenuItem>
                ))}
              </TextField>
            </InformationSourceWrap>

            {values.informationSource && (
              <>
                <Typography sx={{ color: 'black.main', marginBottom: 3 }} variant="h6" component="div">
                  1. Allergy Details
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    required
                    select
                    label="Type"
                    {...getFieldProps('type')}
                    helperText={touched.type && errors.type}
                  >
                    {Object.keys(ALLERGY_TYPE).map(type => (
                      <MenuItem key={type} value={type}>
                        {ALLERGY_TYPE[type]}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                {!isDirectlyObserved && (
                  <FormControl fullWidth>
                    <TextField
                      required
                      select
                      label="Sub Type"
                      {...getFieldProps('subType')}
                      helperText={touched.subType && errors.subType}
                      error={!!(touched.subType && errors.subType)}
                    >
                      {Object.keys(ALLERGY_SUB_TYPE).map(subType => (
                        <MenuItem key={subType} value={subType}>
                          {ALLERGY_SUB_TYPE[subType]}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
                <DrugNameAutocomplete
                  name="name"
                  error={touched.name && errors.name}
                  defaultValue={initData?.name ? { label: initData.name, value: initData.name } : undefined}
                />
                {isDirectlyObserved && (
                  <DrugBrandAutocomplete
                    name="adrBrand"
                    error={touched.adrBrand && errors.adrBrand}
                    defaultValue={
                      initData?.adrBrand ? { label: initData.adrBrand, value: initData.adrBrand } : undefined
                    }
                  />
                )}
                {isDirectlyObserved && (
                  <FormControl fullWidth>
                    <TextField
                      sx={{ textTransform: 'capitalize' }}
                      required
                      select
                      label="Suspected Drug"
                      {...getFieldProps('suspectedDrug')}
                      helperText={touched.suspectedDrug && errors.suspectedDrug}
                      error={!!(errors.suspectedDrug && touched.suspectedDrug)}
                    >
                      {Object.keys(ALLERGY_SUSPECTED_DRUG).map(item => (
                        <MenuItem sx={{ textTransform: 'capitalize' }} key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                )}
                {!isDirectlyObserved && (
                  <FormControl fullWidth>
                    <DatePicker
                      label="First Occurred"
                      inputFormat="dd/MM/yyyy"
                      value={values.validFrom}
                      onChange={value => {
                        if (value) {
                          setFieldValue('validFrom', new Date(value).toISOString());
                        }
                      }}
                      maxDate={new Date()}
                      components={{ OpenPickerIcon: CalendarIcon }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          required
                          error={!!(errors.validFrom && touched.validFrom)}
                          helperText={touched.validFrom && errors.validFrom}
                        />
                      )}
                    />
                    {values.validFrom && <input hidden name="validFrom" value={values.validFrom} />}
                  </FormControl>
                )}
                <FormControl>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    key={defaultCreatedBy?.id}
                    defaultValue={
                      defaultCreatedBy ? { value: defaultCreatedBy?.id, label: defaultCreatedBy?.name } : undefined
                    }
                    options={practitioners.map(it => ({
                      label: it.name,
                      value: it.id,
                    }))}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <TextField
                        {...params}
                        required
                        label="Created by"
                        error={!!(touched.createdBy && errors.createdBy)}
                        helperText={touched.createdBy && errors.createdBy}
                      />
                    )}
                    onChange={(_: React.SyntheticEvent, { value }) => {
                      setFieldValue('createdBy', value);
                    }}
                  />
                  {values.createdBy && <input hidden name="createdBy" value={values.createdBy} />}
                </FormControl>
                {isDirectlyObserved && (
                  <>
                    <Grid container spacing={3}>
                      <Grid xs={6} item>
                        <FormControl fullWidth>
                          <DatePicker
                            label="First Occurred"
                            inputFormat="dd/MM/yyyy"
                            value={values.validFrom}
                            onChange={value => {
                              if (value) {
                                const validFrom = new Date(value).toISOString();
                                setFieldValue('validFrom', validFrom);

                                if (values.lastOccurrence && validFrom > values.lastOccurrence) {
                                  setFieldValue('lastOccurrence', null);
                                  setFieldValue('validTo', null);
                                }
                              }
                            }}
                            components={{ OpenPickerIcon: CalendarIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                required
                                error={!!(errors.validFrom && touched.validFrom)}
                                helperText={touched.validFrom && errors.validFrom}
                              />
                            )}
                          />
                          {values.validFrom && <input hidden name="validFrom" value={values.validFrom} />}
                        </FormControl>
                      </Grid>
                      <Grid xs={6} item>
                        <FormControl fullWidth>
                          <DatePicker
                            label="Last Occurred"
                            inputFormat="dd/MM/yyyy"
                            minDate={values.validFrom}
                            value={values.lastOccurrence}
                            onChange={value => {
                              if (value) {
                                const lastOccurrence = new Date(value).toISOString();
                                setFieldValue('lastOccurrence', lastOccurrence);

                                if (values.validTo && lastOccurrence > values.validTo) {
                                  setFieldValue('validTo', null);
                                }
                              }
                            }}
                            components={{ OpenPickerIcon: CalendarIcon }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                value={values.lastOccurrence}
                                required
                                error={!!(errors.lastOccurrence && touched.lastOccurrence)}
                                helperText={touched.lastOccurrence && errors.lastOccurrence}
                              />
                            )}
                          />
                          {!values.lastOccurrence && (
                            <input hidden name="lastOccurrence" value={values.lastOccurrence as string} />
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Resolved on"
                        inputFormat="dd/MM/yyyy"
                        minDate={values.lastOccurrence}
                        value={values.validTo}
                        onChange={value => {
                          if (value) {
                            const validTo = new Date(value).toISOString();
                            setFieldValue('validTo', validTo);
                          }
                        }}
                        components={{ OpenPickerIcon: CalendarIcon }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            required
                            error={!!(errors.validTo && touched.validTo)}
                            helperText={touched.validTo && errors.validTo}
                          />
                        )}
                      />
                      {values.validTo && <input hidden name="validTo" value={values.validTo} />}
                    </FormControl>
                    <Autocomplete
                      autoComplete
                      disableClearable
                      defaultValue={
                        values.exposureRouteSct
                          ? { value: values.exposureRouteSct, label: values.exposureRouteSctName }
                          : undefined
                      }
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField {...params} label="Route of Administration" />
                      )}
                      onChange={(_event, option) => {
                        setFieldValue('exposureRouteSctName', option?.label || null);
                        setFieldValue('exposureRouteSct', option?.value || null);
                      }}
                      options={MOCK_ADMINISTRATION_ROUTE.map(item => ({ label: item.description, value: item.code }))}
                    />
                    <Typography sx={{ color: 'black.main', marginBottom: 3 }} variant="h6" component="div">
                      2. Statuses &amp; Others
                    </Typography>
                    <FormControl fullWidth>
                      <TextField
                        select
                        required
                        label="Severity of Reaction"
                        {...getFieldProps('severity')}
                        error={!!(touched.severity && errors.severity)}
                        helperText={touched.severity && errors.severity}
                      >
                        {Object.keys(ALLERGY_SEVERITIY).map(type => (
                          <MenuItem key={type} value={type}>
                            {ALLERGY_SEVERITIY[type]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        select
                        required
                        label="Criticality"
                        {...getFieldProps('criticality')}
                        error={!!(touched.criticality && errors.criticality)}
                        helperText={touched.criticality && errors.criticality}
                      >
                        {Object.keys(ALLERGY_CRITICALITY).map(type => (
                          <MenuItem key={type} value={type}>
                            {ALLERGY_CRITICALITY[type]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        select
                        required
                        label="Verification Status"
                        {...getFieldProps('verificationStatus')}
                        error={!!(touched.verificationStatus && errors.verificationStatus)}
                        helperText={touched.verificationStatus && errors.verificationStatus}
                      >
                        {Object.keys(ALLERGY_VERIFICATION_STATUS).map(type => (
                          <MenuItem key={type} value={type}>
                            {ALLERGY_VERIFICATION_STATUS[type]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        select
                        required
                        label="Clinical Status"
                        {...getFieldProps('clinicalStatus')}
                        error={!!(touched.clinicalStatus && errors.clinicalStatus)}
                        helperText={touched.clinicalStatus && errors.clinicalStatus}
                      >
                        {Object.keys(ALLERGY_CLINICAL_STATUS).map(type => (
                          <MenuItem key={type} value={type}>
                            {ALLERGY_CLINICAL_STATUS[type]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        label="Manifestation"
                        {...getFieldProps('manifestationSctName')}
                        error={!!(touched.manifestationSctName && errors.manifestationSctName)}
                        helperText={touched.manifestationSctName && errors.manifestationSctName}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        label="Description of Event"
                        {...getFieldProps('remarks')}
                        error={!!(touched.remarks && errors.remarks)}
                        helperText={touched.remarks && errors.remarks}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        disableClearable
                        key={defaultReportedBy?.id}
                        defaultValue={
                          defaultReportedBy
                            ? { value: defaultReportedBy?.id, label: defaultReportedBy?.name }
                            : undefined
                        }
                        options={practitioners.map(it => ({
                          label: it.name,
                          value: it.id,
                        }))}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <TextField
                            {...params}
                            required
                            label="Reported by"
                            error={!!(touched.reportedBy && errors.reportedBy)}
                            helperText={touched.reportedBy && errors.reportedBy}
                          />
                        )}
                        onChange={(_: React.SyntheticEvent, { value }) => {
                          setFieldValue('reportedBy', value);
                        }}
                      />
                      {values.reportedBy && <input hidden name="reportedBy" value={values.reportedBy} />}
                    </FormControl>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={<Checkbox defaultChecked {...getFieldProps('nehr')} />}
                        label="Submit allergy record to NEHR"
                      />
                    </FormControl>
                  </>
                )}
              </>
            )}
          </FormBody>

          <FormActions>
            {initData?.id && (
              <Link href={PAGE_URLS.PATIENT_ALLERGY_DELETE(patientUUID, initData.id)} style={{ marginRight: 'auto' }}>
                <Button variant="text" color="error" disabled={isSubmitting}>
                  Delete
                </Button>
              </Link>
            )}
            <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              {buttonText}
            </Button>
          </FormActions>
        </LocalizationProvider>
      </Form>
    </AvixoFixedContainer>
  );
};
export default AllergyForm;
