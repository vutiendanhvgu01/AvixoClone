import { Button, Container, FormControl, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormActions, FormBody } from './enroll-hsg-form-style';
import { EnrollFormValues, EnrollSectionProps } from './enroll-hsg-form-types';

const NricSearchSection: React.FC<EnrollSectionProps> = ({ onCancelBtnClick, onSubmitBtnClick }) => {
  const { touched, errors, values, getFieldProps } = useFormikContext<EnrollFormValues>();

  return (
    <>
      <FormBody>
        <Container sx={{ padding: '0 0 20px 0' }}>
          <FormControl fullWidth>
            <TextField
              required
              label="NRIC"
              {...getFieldProps('nric')}
              error={!!(touched.nric && errors.nric)}
              helperText={touched.nric && errors.nric}
            />
          </FormControl>
        </Container>
      </FormBody>
      <FormActions>
        <Button onClick={onCancelBtnClick} variant="text">
          Back
        </Button>
        <Button type="submit" disabled={!values.nric}>
          Check Enrolment
        </Button>
      </FormActions>
    </>
  );
};
export default NricSearchSection;
