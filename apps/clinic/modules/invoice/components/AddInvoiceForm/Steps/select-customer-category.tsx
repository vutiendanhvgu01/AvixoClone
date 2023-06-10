import { Autocomplete, FormControl, TextField, MenuItem, Stack, Avatar, Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { Patient } from 'modules/patient/types/patient';
import { FormBody } from 'share-components';
import { AddInvoiceFormValues } from '../add-invoice-from-types';

const PatientMockData: Partial<Patient>[] = [
  { fullName: 'Patient 1', id: 1, nric: '159753456' },
  { fullName: 'Patient 2', id: 2, nric: '159753457' },
];

const InsuranceMockData = [
  { name: 'AIA', premiseId: 1 },
  { name: 'AXA', premiseId: 2 },
];

interface SelectCustomerCategoryProps {
  setStep: (step: number) => void;
}

const SelectCustomerCategory: React.FC<SelectCustomerCategoryProps> = ({ setStep }) => {
  const { getFieldProps, setFieldValue, values } = useFormikContext<AddInvoiceFormValues>();

  const onChangeValue = (name: string, value: any) => {
    setFieldValue(name, value);
    if (name === 'patient' || name === 'insurance') {
      setStep(3);
    }
  };

  const onChangeCategory = (value: number) => {
    const categoryName = ['category', 'Patient', 'Insurance'];
    setFieldValue('category', { name: categoryName[value], value });
    setFieldValue('patient', null);
    setFieldValue('insurance', null);
    setStep(2);
  };

  //= ===================== SOURCES ===============================
  const categoryOptions = [
    { name: 'Patient', id: 1 },
    { name: 'Insurance', id: 2 },
  ];

  return (
    <FormBody>
      <FormControl fullWidth>
        <TextField
          required
          select
          label="Select Customer Category"
          onChange={value => onChangeCategory(Number(value.target.value))}
          value={values.category.value}
        >
          {categoryOptions.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      {values.category &&
        (values.category?.value === 1 ? (
          <FormControl fullWidth>
            <Autocomplete
              disableClearable
              options={PatientMockData as Patient[]}
              value={values.patient}
              onChange={(_, value) => {
                onChangeValue('patient', value.fullName);
                if (value) {
                  onChangeValue('patientId', value.id);
                  onChangeValue('patientName', value.fullName);
                }
              }}
              getOptionLabel={(patient?: Patient) => (patient ? `ID: ${patient.id} - ${patient.fullName}` : '')}
              renderInput={params => (
                <>
                  <TextField {...params} {...getFieldProps('patientName')} required label="Select Patients" />
                  <input type="text" hidden {...getFieldProps('patientId')} />
                </>
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Stack flexDirection="row" justifyContent="space-around">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                      }}
                    >
                      H
                    </Avatar>
                    <Box ml={2}>
                      <Typography variant="body1">{option?.fullName}</Typography>
                      <Typography variant="body2">{`ID: ${option?.id} - ${option?.nric}`}</Typography>
                    </Box>
                  </Stack>
                </li>
              )}
            />
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <Autocomplete
              disableClearable
              options={InsuranceMockData}
              value={values.insurance}
              // Update type once do the API integration
              getOptionLabel={(insurance?: any) => (insurance ? insurance.name : '')}
              onChange={(_, value) => {
                onChangeValue('insurance', value.name);
                if (value) {
                  onChangeValue('premiseId', value.premiseId || null);
                  onChangeValue('premiseName', value.name || null);
                }
              }}
              renderInput={params => (
                <>
                  <TextField {...params} {...getFieldProps('premiseName')} required label="Select Insurance" />
                  <input type="text" hidden {...getFieldProps('premiseId')} />
                </>
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography variant="body1">{option?.name}</Typography>
                </li>
              )}
            />
          </FormControl>
        ))}
    </FormBody>
  );
};

export default SelectCustomerCategory;
