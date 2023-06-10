import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  styled,
  Switch,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FinanceInformation from 'common/components/FinanceInformation/finance-information';
import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AddressFill,
  AvatarFill,
  AvixoFixedContainer,
  AvixoTimeZone,
  DefaultFormProps,
  EmailFill,
  PhoneNumberFill,
  QualificationSection,
} from 'share-components';
import OrganisationProxyService from '../services/proxy';
import OrganisationSchema from './organisation-schema';
import { Organisation, OrganisationFormValues, SwitchProps } from './organisation-types';

const STEPS = [
  {
    value: 'ORGANISATION_DETAILS',
    label: '1. Organisation Details',
  },
  {
    value: 'CONTACT_INFORMATION',
    label: '2. Contact Information',
  },
  {
    value: 'FINANCE_INFORMATION',
    label: '3. Finance Information',
  },
  {
    value: 'TIMEZONE',
    label: '4. Timezone',
  },
  {
    value: 'QUALIFICATION',
    label: '5. Qualification',
  },
];

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

const GreyTypography = styled(Typography)(() => ({
  color: '#6B7280',
}));

const StackTitle = styled(Typography)(() => ({
  marginBottom: '32px',
}));

const MainForm = styled(Form)(() => ({
  height: '100%',
}));

const FormFieldsContainer = styled(Stack)(() => ({
  padding: '32px',
  '& *::-webkit-scrollbar': {
    width: '0.4em',
  },
  '& *::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '& *::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
}));

const RenderSwitch = (props: SwitchProps) => {
  const { values, setFieldValue } = props;
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue('includeParentOrg', event.target.checked);
    },
    [setFieldValue],
  );
  return <Switch checked={values.includeParentOrg} onChange={handleChange} />;
};

export const currencySelectData: Record<string, any>[] = [
  {
    name: 'SGD',
    id: 1,
  },
  {
    name: 'MYR',
    id: 2,
  },
  {
    name: 'THB',
    id: 3,
  },
  {
    name: 'IDR',
    id: 4,
  },
];

const statusSelectData: Record<string, string>[] = [
  {
    name: 'Active',
    id: 'active',
  },
  {
    name: 'Suspended',
    id: 'suspended',
  },
  {
    name: 'Inactive',
    id: 'inactive',
  },
];

const codesSelectData: Record<string, string>[] = [
  {
    name: 'Healthcare Provider',
    id: 'prov',
  },
  {
    name: 'Hospital Department',
    id: 'dept',
  },
  {
    name: 'Organisational Team',
    id: 'team',
  },
  {
    name: 'Government',
    id: 'govt',
  },
  {
    name: 'Insurance Company',
    id: 'ins',
  },
  {
    name: 'Payer',
    id: 'pay',
  },
  {
    name: 'Educational Institute',
    id: 'edu',
  },
  {
    name: 'Religious Institution',
    id: 'reli',
  },
  {
    name: 'Clinical Research Sponsor',
    id: 'crs',
  },
  {
    name: 'Community Group',
    id: 'cg',
  },
  {
    name: 'Non-Healthcare Business',
    id: 'bus',
  },
  {
    name: 'Other',
    id: 'other',
  },
];

interface OrganisationFormProps extends DefaultFormProps {
  initData?: OrganisationFormValues;
  step?: number;
}

const OrganisationForm: React.FC<OrganisationFormProps> = ({ onCancel, initData, open, step }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [organisations, setOrganisations] = React.useState<Partial<Organisation>[]>([]);
  const currentValidationSchema = OrganisationSchema[activeStep];
  const isLastStep = activeStep === STEPS.length - 1;

  const btnCancelText = initData ? 'Cancel' : 'Back';
  const title = initData ? 'Edit Organisation' : 'Add New Organisation';
  let btnSubmitText = isLastStep ? 'Add Organisation' : 'Next';
  if (initData) {
    btnSubmitText = 'Save Changes';
  }

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const initialValues: OrganisationFormValues = {
    includeParentOrg: false,
    parentOrganisation: '',
    image: {},
    name: '',
    companyName: '',
    companyRegNo: '',
    description: '',
    currency: '1',
    taxRate: 0,
    timeZone: '1',
    phoneNumbers: [
      {
        countryCode: '',
        phoneValue: '',
        isPrimary: false,
      },
    ],
    emails: [
      {
        mail: '',
        isPrimary: false,
      },
    ],
    addresses: [
      {
        line1: '',
        line2: '',
        city: '',
        country: '',
        floorNo: '',
        unitLevel: '',
        postal: '',
        unitNo: '',
        isPrimary: false,
      },
    ],
    code: 'prov',
    categoryId: '',
    subCategoryId: '',
    licenseFrom: new Date().toISOString(),
    licenseTo: new Date().toISOString(),
    status: 'active',
    qualifications: [
      {
        code: '',
        issuerName: '',
        issuerType: 'organisation',
        issuingCountry: '',
        type: 'certification',
        validFrom: new Date().toISOString(),
        validTo: new Date().toISOString(),
        isPrimary: false,
      },
    ],
  };

  const onSubmit = useCallback(() => {
    if (isLastStep || initData) {
      formRef?.current?.submit();
    } else {
      setActiveStep(activeStep + 1);
    }
  }, [activeStep, isLastStep]);

  const getProgressValues = () => ((activeStep + 1) * 100) / STEPS.length;

  useEffect(() => {
    OrganisationProxyService.getParentOrganisation()
      .then(({ data }) => {
        setOrganisations(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const renderLicenseInput = useCallback(
    (
      params: JSX.IntrinsicAttributes & TextFieldProps,
      handleBlur: (e: React.FocusEvent<any, Element>) => void,
      touched: any,
      errors: any,
      field: string,
    ) => (
      <TextField {...params} name={field} required onBlur={handleBlur} error={!!(touched[field] && errors[field])} />
    ),
    [],
  );

  const handleChangeLicense = useCallback((value: any, setFieldValue: (...args: any[]) => void, field: string) => {
    setFieldValue(field, value);
  }, []);

  useEffect(() => {
    setActiveStep(step || 0);
  }, [step]);

  return (
    <AvixoFixedContainer title={title} display={open} onClose={onCancel}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Formik
          initialValues={{ ...initialValues, ...initData }}
          validationSchema={currentValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, touched, errors, values, setFieldValue, getFieldProps, handleSubmit }) => (
            <MainForm ref={formRef} data-cy="organisation-form" method="POST" onSubmit={handleSubmit} noValidate>
              <input type="text" hidden value="add-organisation" name="action" />
              <LinearProgress variant="determinate" value={getProgressValues()} />
              <FormFieldsContainer
                sx={{
                  display: STEPS[activeStep].value === 'ORGANISATION_DETAILS' ? 'block' : 'none',
                  overflowY: 'scroll',
                  height: 'calc(100% - 100px)',
                }}
              >
                <Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <StackTitle variant="h6">Part of Parent Organisation?</StackTitle>
                    <RenderSwitch values={values} setFieldValue={setFieldValue} />
                  </Box>
                  <Box sx={{ display: !values.includeParentOrg ? 'block' : 'none' }}>
                    <GreyTypography variant="body2">
                      If this organisation is not part of any organisation, It will be created as a{' '}
                      <Link href="/organisation?action=add-organisation" variant="body2">
                        New Parent Organisation.
                      </Link>
                    </GreyTypography>
                  </Box>
                  <Box sx={{ display: values.includeParentOrg ? 'block' : 'none', marginTop: '30px' }}>
                    <FormControlComponent fullWidth error={!!(touched.parentOrganisation && errors.parentOrganisation)}>
                      <InputLabel required={values.includeParentOrg} id="parent-org-options">
                        Select Parent Organisation
                      </InputLabel>
                      <Select
                        labelId="parent-org-options"
                        id="parent-org-options-select"
                        name="parentOrganisation"
                        label="Select Parent Organisation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.parentOrganisation}
                      >
                        {organisations?.map((parentOrg: Partial<Organisation>) => (
                          <MenuItem key={`parent-org-item-${parentOrg.id}`} value={parentOrg.id}>
                            {parentOrg.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControlComponent>
                  </Box>
                </Stack>
                <Divider
                  sx={{
                    margin: '32px -32px',
                  }}
                />
                <Stack>
                  <StackTitle variant="h6">{STEPS[activeStep].label}</StackTitle>
                  <Box
                    data-cy="avatar"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      bgcolor: 'background.paper',
                      width: '100%',
                      marginBottom: '30px',
                    }}
                  >
                    <AvatarFill
                      avatarUrl={values.image}
                      uploadButtonProps={{
                        size: 'small',
                        color: 'primary',
                        sx: {
                          padding: 0,
                          '&:hover': {
                            background: 'none',
                          },
                        },
                      }}
                      removeButtonProps={{
                        size: 'small',
                        color: 'black',
                        sx: {
                          padding: 0,
                          '&:hover': {
                            background: 'none',
                          },
                        },
                      }}
                      noneAvatarComponent={
                        <AccountCircleIcon
                          sx={{
                            marginRight: '5px',
                            width: 40,
                            height: 40,
                          }}
                        />
                      }
                      handleChange={img => setFieldValue('image', img)}
                      onRemove={() => setFieldValue('image', '')}
                    />
                  </Box>
                  <FormControlComponent fullWidth>
                    <InputLabel required>Display Name</InputLabel>
                    <OutlinedInput
                      label="Display Name"
                      id="name"
                      data-cy="input-display-name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={!!(touched.name && errors.name)}
                    />
                  </FormControlComponent>
                  <FormControlComponent fullWidth>
                    <InputLabel required id="company-name-field">
                      Company Name
                    </InputLabel>
                    <OutlinedInput
                      label="Company Name"
                      id="companyName"
                      data-cy="input-company-name"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={!!(touched.companyName && errors.companyName)}
                    />
                  </FormControlComponent>
                  <FormControlComponent fullWidth>
                    <InputLabel required id="registrationNo-field">
                      Company Registration No.
                    </InputLabel>
                    <OutlinedInput
                      label="Company Registration No."
                      id="companyRegNo"
                      data-cy="input-company-reg-no"
                      name="companyRegNo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={!!(touched.companyRegNo && errors.companyRegNo)}
                    />
                  </FormControlComponent>
                  <FormControlComponent fullWidth>
                    <TextField
                      data-cy="select-code"
                      required
                      select
                      label="Code"
                      {...getFieldProps('code')}
                      error={!!(touched.code && errors.code)}
                    >
                      {codesSelectData.map(oneCode => (
                        <MenuItem key={`code-item-${oneCode.id}`} value={oneCode.id}>
                          {oneCode.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControlComponent>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FormControlComponent fullWidth>
                        <InputLabel id="category-field">Category</InputLabel>
                        <OutlinedInput
                          label="Category"
                          id="category"
                          data-cy="input-category"
                          name="categoryId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.categoryId && errors.categoryId)}
                        />
                      </FormControlComponent>
                    </Grid>
                    <Grid item xs>
                      <FormControlComponent fullWidth>
                        <InputLabel id="subCategory-field">Sub Category</InputLabel>
                        <OutlinedInput
                          label="Sub Category"
                          id="subCategory"
                          data-cy="input-sub-category"
                          name="subCategoryId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.subCategoryId && errors.subCategoryId)}
                        />
                      </FormControlComponent>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FormControlComponent data-cy="input-license-from" fullWidth>
                        <DatePicker
                          label="License From"
                          renderInput={params => renderLicenseInput(params, handleBlur, touched, errors, 'licenseFrom')}
                          onChange={value => handleChangeLicense(value, setFieldValue, 'licenseFrom')}
                          value={values.licenseFrom}
                        />
                      </FormControlComponent>
                    </Grid>
                    <Grid item xs>
                      <FormControlComponent data-cy="input-license-to" fullWidth>
                        <DatePicker
                          label="License To"
                          renderInput={params => renderLicenseInput(params, handleBlur, touched, errors, 'licenseTo')}
                          onChange={value => handleChangeLicense(value, setFieldValue, 'licenseTo')}
                          minDate={new Date()}
                          value={values.licenseTo}
                        />
                      </FormControlComponent>
                    </Grid>
                  </Grid>
                  <FormControlComponent fullWidth>
                    <TextField
                      data-cy="select-status"
                      required
                      select
                      label="Status"
                      {...getFieldProps('status')}
                      error={!!(touched.status && errors.status)}
                    >
                      {statusSelectData.map(oneStatus => (
                        <MenuItem key={`status-item-${oneStatus.id}`} value={oneStatus.id}>
                          {oneStatus.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControlComponent>
                  <FormControlComponent fullWidth>
                    <InputLabel id="description-field">Description</InputLabel>
                    <OutlinedInput
                      label="Description"
                      id="description"
                      data-cy="description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!(touched.description && errors.description)}
                    />
                  </FormControlComponent>
                </Stack>
              </FormFieldsContainer>
              <FormFieldsContainer
                sx={{
                  display: STEPS[activeStep].value === 'CONTACT_INFORMATION' ? 'block' : 'none',
                  overflowY: 'scroll',
                  height: 'calc(100% - 100px)',
                }}
              >
                <Stack>
                  <StackTitle variant="h6">{STEPS[activeStep].label}</StackTitle>
                  <PhoneNumberFill
                    initData={[...values.phoneNumbers].map(phoneNo => ({
                      phoneValue: phoneNo.phoneValue,
                      countryCode: phoneNo.countryCode,
                      isPrimary: phoneNo.isPrimary,
                    }))}
                    onChange={phoneNumbers => {
                      setFieldValue('phoneNumbers', phoneNumbers);
                    }}
                  />
                  <Divider
                    sx={{
                      margin: '32px -32px',
                    }}
                  />
                  <EmailFill
                    initData={[...values.emails].map(email => ({
                      email: email.mail,
                      isPrimary: email.isPrimary,
                    }))}
                    onChange={emails => {
                      setFieldValue('emails', emails);
                    }}
                  />
                  <Divider
                    sx={{
                      margin: '32px -32px',
                    }}
                  />
                  <AddressFill
                    initData={values.addresses}
                    onChange={addresses => {
                      setFieldValue('addresses', addresses);
                    }}
                  />
                </Stack>
              </FormFieldsContainer>
              <FormFieldsContainer
                sx={{
                  display: STEPS[activeStep].value === 'FINANCE_INFORMATION' ? 'block' : 'none',
                  padding: 0,
                }}
              >
                <FinanceInformation
                  label={STEPS[activeStep].label}
                  amountInputProps={{
                    error: !!(touched.taxRate && errors.taxRate),
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                  taxInputProps={{
                    error: !!(touched.taxRate && errors.taxRate),
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                  currencySelectProps={{
                    currencyData: currencySelectData,
                    value: values.currency,
                    onChange: handleChange,
                  }}
                />
              </FormFieldsContainer>
              <FormFieldsContainer
                sx={{
                  display: STEPS[activeStep].value === 'TIMEZONE' ? 'block' : 'none',
                }}
              >
                <Stack>
                  <StackTitle variant="h6">{STEPS[activeStep].label}</StackTitle>
                  <AvixoTimeZone
                    timeZone={values.timezone?.id}
                    onChange={timeZone => setFieldValue('timeZone', timeZone?.id)}
                  />
                </Stack>
              </FormFieldsContainer>
              <FormFieldsContainer
                sx={{
                  display: STEPS[activeStep].value === 'QUALIFICATION' ? 'block' : 'none',
                  overflowY: 'scroll',
                  height: 'calc(100% - 100px)',
                }}
              >
                <Stack>
                  <StackTitle variant="h6">{STEPS[activeStep].label}</StackTitle>
                  <QualificationSection
                    initData={values.qualifications}
                    onChange={qualifications => {
                      setFieldValue('qualifications', qualifications);
                    }}
                  />
                </Stack>
              </FormFieldsContainer>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: '24px 47px 32px 32px',
                  bgcolor: 'background.paper',
                  borderTop: '1px solid #E6E8F0',
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}
              >
                <Box>
                  {!isLastStep && (
                    <GreyTypography sx={{ lineHeight: '40px' }} variant="body2">
                      {STEPS[activeStep + 1].label}
                    </GreyTypography>
                  )}
                </Box>
                <Box>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      variant="text"
                      size="medium"
                      sx={{ mr: 1 }}
                    >
                      {btnCancelText}
                    </Button>
                  )}
                  <Button data-cy="submit-btn" variant="contained" type="submit" size="medium">
                    {btnSubmitText}
                  </Button>
                </Box>
              </Box>
            </MainForm>
          )}
        </Formik>
      </LocalizationProvider>
    </AvixoFixedContainer>
  );
};

export default OrganisationForm;
