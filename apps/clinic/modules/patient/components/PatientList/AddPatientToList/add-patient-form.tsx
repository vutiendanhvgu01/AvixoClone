import { styled } from '@mui/material/styles';
import CheckBox from '@mui/material/Checkbox';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormEvent, useCallback } from 'react';
import { AddPatientToListFormProps } from './add-patient-to-list-types';

const AddPatientToListForm: React.FC<AddPatientToListFormProps> = props => {
  const PatientAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }));
  const { initialValues, patientsList } = props;

  const stringAvatar = (text: string) => ({
    children: `${text
      .split(' ')
      .map(name => name[0])
      .join('')}`,
  });

  const handleSubmitWithFormik = useCallback(
    (values: typeof initialValues, errors: any, handleSubmit: any) =>
      (e: FormEvent<HTMLFormElement>): void => {
        const haveErrors = Object.keys(errors).length > 0;
        if (haveErrors) {
          e.preventDefault();
          handleSubmit();
        }
      },
    [],
  );

  const onSubmit = useCallback((values: typeof initialValues, { setValues }: any) => {
    setValues(values);
  }, []);
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, handleSubmit, values }) => (
        <Form
          style={{ height: '100%' }}
          method="POST"
          data-cy="form"
          onSubmit={() => handleSubmitWithFormik(values, errors, handleSubmit)}
        >
          {patientsList.map(patient => (
            <Box key={patient.uuid} sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
              <CheckBox name="patients" value={patient.uuid} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PatientAvatar {...stringAvatar(patient.fullName)} sx={{ width: 30, height: 30, fontSize: 12 }} />
                <Typography variant="body1">{patient.fullName}</Typography>
              </Box>
            </Box>
          ))}
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
            <Button type="reset" variant="text">
              Clear
            </Button>
            <Button type="submit" variant="contained">
              Add Patient
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddPatientToListForm;
