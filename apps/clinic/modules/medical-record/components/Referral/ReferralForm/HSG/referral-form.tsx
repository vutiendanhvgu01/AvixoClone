import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Box,
  Typography,
  TextField,
  TypographyProps,
  Divider,
  Button,
  RadioGroup,
  Radio,
  FormHelperText,
} from '@mui/material';
import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import type { Referral } from 'modules/medical-record/types/referral';
import type { Patient } from 'modules/patient/types/patient';
import { FormikProps, useFormik } from 'formik';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { REFERRAL_TYPES, REFERRAL_FORM } from 'modules/medical-record/constants/referral';
import { AvixoDrawerConfirm } from 'share-components';
import ReferralDrawerConfirm from '../../common/referral-drawer-confirm';
import useReferralDestination from '../../hooks/useReferralDestination';
import { getSpecificDataFromSummary } from './helpers';

interface ReferralFormValues extends Omit<Referral, 'id' | 'referralTypeId'> {
  id?: number;
  referralTypeId?: number;
  referralTypeName?: 'fast-track' | 'GPFirst' | 'routine' | 'A&E/UCC' | null;
  responsibility?: string;
  diagnosis?: string;
  drugAllergies?: string;
  medicalHistory?: string;
  CHASSFLVCDSSVisit?: string[];
  treatmentManagementAlreadyProvidedByGP?: string;
  gPChargeBillSize?: string;
  patientIsRequestingFor?: string;
  termsAndConditions?: boolean;
  body?: Referral | null;
}

interface ReferralInformationPropsType {
  patient: Patient;
  action?: 'add' | 'edit' | 'view';
  initData?: ReferralFormValues;
  onReferralTypeChange?: (template: string) => void;
}

const TermDetailText = (props: TypographyProps) => {
  const { children, ...otherProps } = props;
  return (
    <Typography variant="body2" {...otherProps}>
      {children}
    </Typography>
  );
};

const REFERRAL_FIELDS: {
  [key: string]: {
    component: React.FC<
      { onCHASSFLVCDSSVisitChange: (e: ChangeEvent<HTMLInputElement>) => void } & Partial<
        FormikProps<ReferralFormValues>
      >
    >;
    columns: number;
  };
} = {
  'doctor-healthcare-name': {
    columns: 4,
    component: ({ getFieldProps, touched, errors }) => (
      <FormControl fullWidth>
        <FormLabel component="legend" required>
          Assign responsibility
        </FormLabel>
        <RadioGroup defaultValue="Named" {...getFieldProps?.('responsibility')}>
          <FormControlLabel value="Named" control={<Radio />} label="Named" />
          <FormControlLabel value="Unnamed" control={<Radio />} label="Unnamed" />
        </RadioGroup>
        <FormHelperText error>{touched?.responsibility && errors?.responsibility}</FormHelperText>
      </FormControl>
    ),
  },
  'chas-visit': {
    columns: 4,
    component: ({ getFieldProps, onCHASSFLVCDSSVisitChange }) => (
      <FormControl fullWidth>
        <FormLabel component="legend">Is this referral related to a CHAS/SFL/VCDSS visit?</FormLabel>
        <FormGroup>
          <FormControlLabel
            label="CHAS"
            {...getFieldProps?.('CHASSFLVCDSSVisit')}
            control={<Checkbox value="CHAS" onChange={onCHASSFLVCDSSVisitChange} />}
          />
          <FormControlLabel
            label="SFL"
            {...getFieldProps?.('CHASSFLVCDSSVisit')}
            control={<Checkbox value="SFL" onChange={onCHASSFLVCDSSVisitChange} />}
          />
          <FormControlLabel
            label="VCDSS"
            {...getFieldProps?.('CHASSFLVCDSSVisit')}
            control={<Checkbox value="VCDSS" onChange={onCHASSFLVCDSSVisitChange} />}
          />
        </FormGroup>
      </FormControl>
    ),
  },
  'requesting-for': {
    columns: 4,
    component: ({ getFieldProps }) => (
      <FormControl fullWidth>
        <TextField label="Patient is requesting for" {...getFieldProps?.('patientIsRequestingFor')} />
      </FormControl>
    ),
  },
  diagnosis: {
    columns: 4,
    component: ({ getFieldProps }) => (
      <FormControl fullWidth>
        <TextField label="Diagnosis" multiline rows={6} {...getFieldProps?.('diagnosis')} />
      </FormControl>
    ),
  },
  reason: {
    columns: 4,
    component: ({ getFieldProps, touched, errors }) => (
      <FormControl fullWidth>
        <TextField
          label="Reason for Referral"
          required
          multiline
          rows={6}
          {...getFieldProps?.('reason')}
          helperText={touched?.reason && errors?.reason}
          error={!!(touched?.reason && errors?.reason)}
        />
      </FormControl>
    ),
  },
  treatment: {
    columns: 4,
    component: ({ getFieldProps, touched, errors }) => (
      <FormControl fullWidth>
        <TextField
          label="Treatment/Management already provided by GP"
          required
          multiline
          rows={6}
          {...getFieldProps?.('treatmentManagementAlreadyProvidedByGP')}
          helperText={touched?.treatmentManagementAlreadyProvidedByGP && errors?.treatmentManagementAlreadyProvidedByGP}
          error={!!(touched?.treatmentManagementAlreadyProvidedByGP && errors?.treatmentManagementAlreadyProvidedByGP)}
        />
      </FormControl>
    ),
  },
  'medical-history': {
    columns: 4,
    component: ({ getFieldProps, touched, errors }) => (
      <FormControl fullWidth>
        <TextField
          label="Medical History"
          required
          multiline
          rows={6}
          {...getFieldProps?.('medicalHistory')}
          helperText={touched?.medicalHistory && errors?.medicalHistory}
          error={!!(touched?.medicalHistory && errors?.medicalHistory)}
        />
      </FormControl>
    ),
  },
  'drug-allergies': {
    columns: 4,
    component: ({ getFieldProps, errors, touched }) => (
      <FormControl fullWidth>
        <TextField
          label="Drug Allergies"
          required
          multiline
          rows={6}
          {...getFieldProps?.('drugAllergies')}
          helperText={touched?.drugAllergies && errors?.drugAllergies}
          error={!!(touched?.drugAllergies && errors?.drugAllergies)}
        />
      </FormControl>
    ),
  },
  'gp-charge': {
    columns: 4,
    component: ({ getFieldProps, touched, errors }) => (
      <FormControl fullWidth>
        <TextField
          type="number"
          label="GP Charge / Bill Size"
          {...getFieldProps?.('gPChargeBillSize')}
          helperText={touched?.gPChargeBillSize && errors?.gPChargeBillSize}
          error={!!(touched?.gPChargeBillSize && errors?.gPChargeBillSize)}
        />
      </FormControl>
    ),
  },
  dummy: {
    columns: 4,
    component: () => <div />,
  },
  'terms-and-conditions': {
    columns: 10,
    component: ({ getFieldProps, touched, errors, values }) => (
      <>
        <Box>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: '600',
              fontSize: '12px',
              lineHeight: '30px',
              marginBottom: '16px',
            }}
          >
            Terms &amp; Conditions
          </Typography>
          <TermDetailText>
            1. This GPFirst Referral Form is applicable only to the A7E / Emergency Department or Urgent Care Centre
            indicated in this form.
          </TermDetailText>
          <Typography component="span" variant="body2">
            {'2. The original referral form is '}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: 'error.main',
              }}
            >
              only valid only the day of issue, and up to 0200hrs of the following day if the referral form is issued
              close to midnight. Patient s are advised to visit the A&amp;E without delay.
            </Typography>
          </Typography>
          <TermDetailText>
            3. For GPFirst Programme to be valid, the original referral form must be fully completed and produced
            together with the NRIC/passport/work pass, at the point of registration at the A&amp;E / ED or UCC.
          </TermDetailText>
          <TermDetailText>
            4. Patient will pay the prevailing A&amp;E / ED or UCC fees less S$50 if referred through GPFirst Programme.
          </TermDetailText>
          <TermDetailText>
            5. Specialised investigations required and/or non-standardised medication prescribed at the A&amp;E / ED or
            UCC will be separately charged.
          </TermDetailText>
          <TermDetailText>
            6. The Hospitals reserve the right to change the terms and conditions of this programme, or withdraw from
            this Programme without prior notice, which shall be deemed effective immediately upon such change or
            withdrawal and such change/withdrawal shall be without liability toward participating clinic and patient.
          </TermDetailText>
        </Box>
        <Box
          sx={{
            marginTop: '24px',
          }}
        >
          <FormControlLabel
            {...getFieldProps?.('termsAndConditions')}
            control={<Checkbox checked={!!values?.termsAndConditions} />}
            label="As the referring doctor, I acknowledge that I have decided on the appropriate venue of A&E treatment for the patient as indicated above, and have discussed and agreed upon it with the patient."
            sx={{
              '>.MuiFormControlLabel-label': {
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
              },
            }}
          />
          <FormHelperText error>{touched?.termsAndConditions && errors?.termsAndConditions}</FormHelperText>
        </Box>
      </>
    ),
  },
};

const ReferralForm: React.FC<ReferralInformationPropsType> = ({ patient, initData, action, onReferralTypeChange }) => {
  const { referralTypes, referralInstitutions, institutionSpecialties } = useReferralDestination();
  const [drawerConfirm, setDrawerConfirm] = useState<{
    action: 'add' | 'update' | 'cancel';
    show: boolean;
  }>({
    action: 'add',
    show: false,
  });
  const form = useRef<HTMLFormElement | null>(null);
  const [listFields, setListFields] = useState<string[]>([]);

  const initSummary = initData?.summary || '';

  const formik = useFormik({
    initialValues: {
      ...{
        title: '',
        referralTypeId: undefined,
        referralTypeName: null,
        specialty: '',
        specialtyCode: '',
        hsgInstitutionCode: '',
        hsgInstitutionHciCode: '',
        hsgInstitutionName: '',
        reason: '',
        termsAndConditions: false,
        body: null,
        patientId: patient.id,
      },
      ...initData,
      drugAllergies: getSpecificDataFromSummary(initSummary, 'drugAllergies'),
      medicalHistory: getSpecificDataFromSummary(initSummary, 'medicalHistory'),
      gPChargeBillSize: getSpecificDataFromSummary(initSummary, 'gPChargeBillSize'),
      CHASSFLVCDSSVisit: getSpecificDataFromSummary(initSummary, 'CHASSFLVCDSSVisit')?.split(',') || [],
      treatmentManagementAlreadyProvidedByGP: getSpecificDataFromSummary(
        initSummary,
        'treatmentManagementAlreadyProvidedByGP',
      ),
      diagnosis: getSpecificDataFromSummary(initSummary, 'diagnosis'),
      responsibility: getSpecificDataFromSummary(initSummary, 'responsibility'),
      patientIsRequestingFor: getSpecificDataFromSummary(initSummary, 'patientIsRequestingFor'),
    },
    enableReinitialize: true,
    validationSchema: REFERRAL_FORM.SCHEMA,
    onSubmit: async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true);
      const summary = `<p><span>Assign responsibility</span><span data-assign-responsibility>${values.responsibility}</span></p><p><span>Is this referral related to a CHAS/SFL/VCDSS visit?</span><span data-chas-sfl-vcdss-visit>${values.CHASSFLVCDSSVisit}</span></p><p><span>Patient is requesting for</span><span data-patient-is-requesting-for>${values.patientIsRequestingFor}</span></p><p><span>Treatment/Management already provided by GP</span><span data-treatment-management>${values.treatmentManagementAlreadyProvidedByGP}</span></p><p><span>Diagnosis</span><span data-diagnosis>${values.diagnosis}</span></p><p><span>GP Charge / Bill Size</span><span data-gp-change-bill-size>${values.gPChargeBillSize}</span></p><p><span>Medical History</span><span data-medical-history>${values.medicalHistory}</span></p><p><span>Drug Allergies</span><span data-drug-allergies>${values.drugAllergies}</span></p>`;

      setFieldValue(
        'body',
        JSON.stringify({
          ...values,
          summary,
        }),
      );

      if (values.referralTypeName === REFERRAL_TYPES.ROUTINE) {
        form.current?.submit();
      } else {
        setDrawerConfirm({ action: initData?.id ? 'update' : 'add', show: true });
      }
      setSubmitting(false);
    },
  });

  const { getFieldProps, errors, values, setFieldValue, touched, handleChange } = formik;

  const onConfirmBtnClick = useCallback(() => {
    form.current?.submit();
  }, []);

  const onCancelBtnClick = useCallback(() => {
    setDrawerConfirm({ action: 'cancel', show: true });
  }, []);

  const toggleConfirmDelete = () => {
    setDrawerConfirm({ ...drawerConfirm, show: false });
  };

  const onCHASSFLVCDSSVisitChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = e.target;
      let CHASSFLVCDSSVisitValues = (values.CHASSFLVCDSSVisit as string[]) || [];

      if (checked) {
        CHASSFLVCDSSVisitValues = CHASSFLVCDSSVisitValues.concat([value.toString()]);
      } else {
        const idx = CHASSFLVCDSSVisitValues.findIndex(val => val === value);
        CHASSFLVCDSSVisitValues.splice(idx, 1);
      }

      setFieldValue(name, CHASSFLVCDSSVisitValues);
    },
    [values.CHASSFLVCDSSVisit, setFieldValue],
  );

  useEffect(() => {
    switch (values.referralTypeName) {
      case REFERRAL_TYPES.GPFIRST:
        setListFields(REFERRAL_FORM.GPFIRST_COMPONENT_KEYS);
        break;
      case REFERRAL_TYPES.ROUTINE:
        setListFields(REFERRAL_FORM.ROUTINE_COMPONENT_KEYS);
        break;
      case REFERRAL_TYPES.AE_UCC:
        setListFields(REFERRAL_FORM.AEUCC_COMPONENT_KEYS);
        break;
      default:
        setListFields(REFERRAL_FORM.ROUTINE_COMPONENT_KEYS);
        break;
    }
  }, [values.referralTypeName]);

  return (
    <Box
      sx={{
        px: 4,
      }}
    >
      <form ref={form} method="post" onSubmit={formik.handleSubmit} noValidate>
        <input type="hidden" name="action" value={initData?.id ? 'update-referral' : 'create-referral'} />
        <input type="hidden" {...getFieldProps('body')} />
        <Grid
          container
          spacing={3}
          sx={{
            marginTop: '26px',
            marginBottom: '32px',
          }}
        >
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                select
                required
                label="Type of Referral"
                {...getFieldProps('referralTypeId')}
                onChange={e => {
                  handleChange(e);
                  const template = referralTypes.find(it => it.id.toString() === e.target.value.toString())?.name || '';
                  setFieldValue('referralTypeName', template);
                  setFieldValue('hsgInstitutionCode', '');
                  setFieldValue('hsgInstitutionHciCode', '');
                  setFieldValue('hsgInstitutionName', '');
                  setFieldValue('hsgOutboundEmail', '');
                  setFieldValue('specialty', '');
                  setFieldValue('specialtyCode', '');
                  if (onReferralTypeChange) {
                    onReferralTypeChange(template);
                  }
                }}
                helperText={touched.referralTypeId && errors.referralTypeId}
                error={!!(touched.referralTypeId && errors.referralTypeId)}
              >
                {referralTypes?.map(referralType => (
                  <MenuItem key={`referralType-${referralType.id}`} value={referralType.id}>
                    {referralType.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                select
                required
                disabled={!values.referralTypeId}
                label="Referred Institution"
                {...getFieldProps('hsgInstitutionCode')}
                onChange={e => {
                  const institutionCode = e.target.value;
                  handleChange(e);
                  if (values.referralTypeId) {
                    const selectedInstitution = referralInstitutions[values.referralTypeId].find(
                      it => it.institutionCode === institutionCode,
                    );
                    setFieldValue('hsgInstitutionCode', selectedInstitution?.institutionCode);
                    setFieldValue('hsgInstitutionHciCode', selectedInstitution?.institutionHciCode);
                    setFieldValue('hsgInstitutionName', selectedInstitution?.institutionName);
                    setFieldValue('hsgOutboundEmail', selectedInstitution?.hsgOutboundEmail);
                  }
                  setFieldValue('specialty', '');
                  setFieldValue('specialtyCode', '');
                }}
                helperText={touched.hsgInstitutionCode && errors.hsgInstitutionCode}
                error={!!(touched.hsgInstitutionCode && errors.hsgInstitutionCode)}
              >
                {values.referralTypeId && referralInstitutions[values.referralTypeId]?.length ? (
                  referralInstitutions[values.referralTypeId].map(institution => (
                    <MenuItem key={`institution-${institution.institutionCode}`} value={institution.institutionCode}>
                      {institution.institutionName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem />
                )}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                select
                required
                label="Speciality/Service"
                disabled={!(values.referralTypeId && values.hsgInstitutionCode)}
                {...getFieldProps('specialty')}
                onChange={e => {
                  const specialtyCode = e.target.value;
                  const specialty = institutionSpecialties[values.hsgInstitutionCode].find(
                    it => it.specialtyCode === specialtyCode,
                  )?.specialty;
                  handleChange(e);
                  setFieldValue('specialty', specialty);
                }}
                helperText={touched.specialtyCode && errors.specialtyCode}
                error={!!(touched.specialtyCode && errors.specialtyCode)}
              >
                {values.referralTypeId &&
                values.hsgInstitutionCode &&
                institutionSpecialties[values.hsgInstitutionCode]?.length ? (
                  institutionSpecialties[values.hsgInstitutionCode].map(({ specialty, specialtyCode }) => (
                    <MenuItem key={`specialty-${specialtyCode}`} value={specialtyCode}>
                      {specialty}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem />
                )}
              </TextField>
            </FormControl>
          </Grid>
          {listFields.map((fieldName, index) => {
            const field = REFERRAL_FIELDS[fieldName];
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={`grid_${fieldName}_${index}`} item xs={field.columns}>
                {field.component({ getFieldProps, errors, touched, values, onCHASSFLVCDSSVisitChange })}
              </Grid>
            );
          })}
        </Grid>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            mt: 4,
          }}
        >
          {action === 'edit' && initData && (
            <Button variant="text" color="error" onClick={onCancelBtnClick}>
              Cancel Referral
            </Button>
          )}

          <Box ml="auto">
            <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD(patient.uuid)}>
              <Button variant="text">Back</Button>
            </Link>
            <Button
              sx={{
                marginLeft: '20px',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>

        {drawerConfirm.show &&
          drawerConfirm.action !== 'cancel' &&
          values.referralTypeName &&
          values.referralTypeName !== REFERRAL_TYPES.ROUTINE && (
            <ReferralDrawerConfirm
              type={values.referralTypeName}
              onCancel={() => setDrawerConfirm({ ...drawerConfirm, show: false })}
              action={drawerConfirm.action}
              patient={patient}
              onConfirm={onConfirmBtnClick}
            />
          )}
      </form>
      {drawerConfirm.action === 'cancel' && (
        <AvixoDrawerConfirm
          open={drawerConfirm.show}
          handleClose={toggleConfirmDelete}
          title="Cancel Referral?"
          action="delete-referral"
          id={initData?.id}
          confirmContent={<Typography variant="body2">Please provide reason for the changes.</Typography>}
          inputProps={{
            name: 'reason',
            label: 'Reason for cancellation',
            required: true,
            defaultValues: '',
          }}
        />
      )}
    </Box>
  );
};

export default ReferralForm;
