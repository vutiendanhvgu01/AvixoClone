import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import DiagnosisProxyService from 'modules/diagnosis/services/proxy';
import { Diagnosis } from 'modules/diagnosis/types/diagnosis';
import { Patient } from 'modules/patient/types/patient';
import * as React from 'react';
import { useCallback } from 'react';
import { AvixoHTMLEditor } from 'share-components';
import Yup from 'share-components/src/services/yup';

interface AddMedicalNoteProps {
  patient: Patient;
  onCancel: () => void;
}

const DEFAULT_NO_OPTIONS_TEXT = 'Please type 2 characters';

const FORM_INITIAL_VALUES = {
  visitDiagnosisSnomed: [],
  visitDiagnosisICD10: [],
  visitSymptom: '',
  description: '',
};

const ValidationSchema = Yup.object().shape({
  visitDiagnosisSnomed: Yup.array().of(Yup.string()).min(1).required('visitDiagnosisSnomed Empty'),
  visitDiagnosisICD10: Yup.array().of(Yup.string()).min(1).required('visitDiagnosisICD10 Empty'),
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddMedicalNote: React.FC<AddMedicalNoteProps> = ({ patient, onCancel }) => {
  const form = React.useRef<HTMLFormElement | null>(null);
  const [inputValueSnomed, setInputValueSnomed] = React.useState<string>('');
  const [inputValueICD10, setInputValueICD10] = React.useState<string>('');
  const inputValueICD10Ref = React.useRef('');
  const inputValueSnomedRef = React.useRef('');

  const [diagnoses, setDiagnoses] = React.useState<{
    snomed: Diagnosis[];
    icd10: Diagnosis[];
  }>({
    snomed: [],
    icd10: [],
  });

  const [isLoadingSnomed, setIsLoadingSnomed] = React.useState<boolean>(false);
  const [isLoadingICD10, setIsLoadingICD10] = React.useState<boolean>(false);
  const [noOptionsText, setNoOptionsText] = React.useState<string>(DEFAULT_NO_OPTIONS_TEXT);
  const getDiagnosesSnomedList = useCallback(
    async (key: string) => {
      try {
        setIsLoadingSnomed(true);
        await DiagnosisProxyService.getDiagnosesSnomedList({ search: key }).then(({ data }) => {
          setDiagnoses({
            ...diagnoses,
            snomed: data,
          });
          setIsLoadingSnomed(false);
        });
      } catch (error) {
        // TODO handle error
        console.log({ error });
      }
    },
    [inputValueSnomed],
  );
  const getDiagnosesICD10List = useCallback(
    async (key: string) => {
      try {
        setIsLoadingICD10(true);
        await DiagnosisProxyService.getDiagnosesICD10List({ search: key }).then(({ data }) => {
          setDiagnoses({
            ...diagnoses,
            icd10: data,
          });
          setIsLoadingICD10(false);
        });
      } catch (error) {
        // TODO handle error
        console.log({ error });
      }
    },
    [inputValueICD10],
  );

  const debouncedSearchSnomedFunction = useCallback(
    debounce(key => getDiagnosesSnomedList(key), 500),
    [],
  );
  const debouncedSearchICD10Function = useCallback(
    debounce(key => getDiagnosesICD10List(key), 500),
    [],
  );

  React.useEffect(() => {
    if (inputValueSnomed.length >= 2) {
      debouncedSearchSnomedFunction(inputValueSnomed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueSnomed]);
  React.useEffect(() => {
    if (inputValueICD10.length >= 2) {
      debouncedSearchICD10Function(inputValueICD10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueICD10]);
  const handleSaveToDraft = (formikProps: FormikProps<any>) => async () => {
    await formikProps.setFieldValue('isDraft', true);
    const errors = await formikProps.validateForm();
    if (isEmpty(errors)) {
      form.current?.submit();
      return;
    }
    await formikProps.setFieldValue('isDraft', false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            textTransform: 'uppercase',
          }}
        >
          Add New Medical Note
        </Typography>
        <IconButton>
          <CloseIcon sx={{ color: 'neutral.500', fontSize: 16 }} />
        </IconButton>
      </Box>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        onSubmit={(values: any, { setSubmitting }) => {
          setSubmitting(true);
          form.current?.submit();
        }}
        validationSchema={ValidationSchema}
      >
        {({ ...formikProps }) => (
          <Form ref={form} method="POST" data-cy="form" onSubmit={formikProps.handleSubmit} noValidate>
            <input hidden name="action" value="create-medical-note" />
            <input hidden name="patientId" value={patient.id} />
            <input hidden name="isDraft" type="checkbox" checked={formikProps.values.isDraft} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="template-select">Select Template</InputLabel>
                  <Select label="Select Template" name="template" id="template-select" defaultValue="default">
                    <MenuItem value="default">Default</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  inputValue={inputValueSnomed}
                  disableCloseOnSelect
                  multiple
                  id="visit-diagnosis-select"
                  fullWidth
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={option => `${option.code} ${option.definition}`}
                  options={sortBy(diagnoses.snomed, d => d.definition?.toLocaleUpperCase())}
                  loading={isLoadingSnomed}
                  openOnFocus
                  filterOptions={options => {
                    if (inputValueSnomedRef.current?.length < 2) {
                      setNoOptionsText(DEFAULT_NO_OPTIONS_TEXT);
                      return [];
                    }
                    return options.filter(option =>
                      option.definition?.toLowerCase().includes(inputValueSnomedRef.current?.toLowerCase()),
                    );
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                      {`${option.code} ${option.definition}`}
                    </li>
                  )}
                  onClose={() => {
                    setInputValueSnomed('');
                    inputValueSnomedRef.current = '';
                  }}
                  noOptionsText={noOptionsText}
                  onChange={(_, value) => {
                    setInputValueSnomed('');
                    formikProps.setFieldValue('visitDiagnosisSnomed', [...value.map(v => `${v.code} ${v.definition}`)]);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Visit Diagnosis (SNOMED)"
                      required
                      onChange={e => {
                        setInputValueSnomed(e.target.value);
                        inputValueSnomedRef.current = e.target.value;
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingSnomed ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      error={!!formikProps.errors.visitDiagnosisSnomed}
                    />
                  )}
                  ChipProps={{
                    sx: {
                      background: '#EEEDFC',
                      color: 'neutral.900',
                      '	.MuiChip-deleteIcon': {
                        color: 'neutral.500',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  inputValue={inputValueICD10}
                  id="visit-diagnosis-select"
                  fullWidth
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={option => `${option.code} ${option.definition}`}
                  options={sortBy(diagnoses.icd10, d => d.definition?.toLocaleUpperCase())}
                  disableCloseOnSelect
                  includeInputInList
                  loading={isLoadingICD10}
                  filterOptions={options => {
                    if (inputValueICD10Ref.current.length < 2) {
                      setNoOptionsText(DEFAULT_NO_OPTIONS_TEXT);
                      return [];
                    }
                    setNoOptionsText('No options');
                    return options.filter(option =>
                      option.definition?.toLowerCase().includes(inputValueICD10Ref.current.toLowerCase()),
                    );
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                      {`${option.code} ${option.definition}`}
                    </li>
                  )}
                  noOptionsText={noOptionsText}
                  onClose={() => {
                    setInputValueICD10('');
                    inputValueICD10Ref.current = '';
                  }}
                  onChange={(_, value) => {
                    setInputValueICD10('');
                    formikProps.setFieldValue('visitDiagnosisICD10', [...value.map(v => `${v.code} ${v.definition}`)]);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Visit Diagnosis (ICD-10)"
                      required
                      onChange={e => {
                        setInputValueICD10(e.target.value);
                        inputValueICD10Ref.current = e.target.value;
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingICD10 ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      error={!!formikProps.errors.visitDiagnosisICD10}
                    />
                  )}
                  ChipProps={{
                    sx: {
                      background: '#EEEDFC',
                      color: 'neutral.900',
                      '	.MuiChip-deleteIcon': {
                        color: 'neutral.500',
                      },
                    },
                  }}
                />
              </Grid>
              {formikProps.values.visitDiagnosisICD10
                .concat(formikProps.values.visitDiagnosisSnomed)
                .map((diagnosisName: string) => (
                  <input key={diagnosisName} hidden type="text" name="visitDiagnosis" value={diagnosisName} />
                ))}

              <Grid
                item
                xs={12}
                sx={{
                  '& > div': {
                    maxWidth: '100%',
                  },
                }}
              >
                <AvixoHTMLEditor onChangeValue={value => formikProps.setFieldValue('description', value)} />
                <input hidden name="description" value={formikProps?.values?.description} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    textAlign: 'right',
                  }}
                >
                  <Button
                    size="medium"
                    color="primary"
                    variant="text"
                    sx={{
                      ml: 2,
                      color: 'neutral.500',
                      '&:hover': {
                        backgroundColor: 'neutral.100',
                      },
                    }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="medium"
                    sx={{
                      ml: 2,
                      color: 'neutral.500',
                      boxShadow: 'none',
                      backgroundColor: 'neutral.100',
                      '&:hover': {
                        backgroundColor: 'neutral.200',
                      },
                    }}
                    onClick={handleSaveToDraft(formikProps)}
                  >
                    Save to draft
                  </Button>
                  <Button size="medium" color="primary" type="submit" sx={{ ml: 2 }}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMedicalNote;
