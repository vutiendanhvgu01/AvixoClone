import { Alert, Button, Container, FormControl, Grid, TextField, Typography, Box, Chip } from '@mui/material';
import { useFormikContext } from 'formik';
import Image from 'next/image';
import { ReactNode } from 'react';
import { FormActions, FormBody } from './enroll-hsg-form-style';
import { EnrollFormValues, EnrollSectionProps } from './enroll-hsg-form-types';

interface EnrollInfoProps {
  label: string;
  children?: ReactNode;
}

const EnrollInfo: React.FC<EnrollInfoProps> = ({ label, children }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    <Typography variant="caption" color="black.main">
      {label}
    </Typography>
    <Box sx={{ ml: 'auto', img: { ml: 1, borderRadius: 0.5 } }}>{children}</Box>
  </Box>
);

const PatientProfileSection: React.FC<EnrollSectionProps> = ({ onCancelBtnClick, onDeEnrolBtnClick }) => {
  const { getFieldProps, values } = useFormikContext<EnrollFormValues>();

  return (
    <>
      <FormBody>
        <Container sx={{ padding: '0 0 20px 0' }}>
          {!values?.enrolled && (
            <Alert color="info" icon={false} sx={{ mb: 4 }}>
              Please verify the following information before saving.
            </Alert>
          )}
          <Typography variant="overline" sx={{ pb: 3 }} component="div">
            Patient Information
          </Typography>
          <FormControl fullWidth>
            <TextField {...getFieldProps('nric')} label="NRIC" disabled />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('fullName')} label="Full Name" disabled />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('race')} label="Race" disabled />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('gender')} label="Gender" disabled />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('birthdate')} label="Date Of Birth" disabled />
          </FormControl>
          <FormControl fullWidth>
            <TextField required {...getFieldProps('contactNumber')} label="Contact Number" />
          </FormControl>
          <FormControl fullWidth>
            <TextField required {...getFieldProps('email')} label="Email" />
          </FormControl>
          <FormControl fullWidth>
            <TextField required {...getFieldProps('status')} label="Follow Up Status" />
          </FormControl>

          {/* Demo */}
          {values?.enrolled && (
            <Box sx={{ pb: 4.5 }}>
              <EnrollInfo label="Enrollment Status">
                <Chip size="small" color="successLight" label="Enrolled" />
              </EnrollInfo>
              <EnrollInfo label="First Visit Claimable">
                <Chip size="small" color="success" label="Yes" />
              </EnrollInfo>
              <EnrollInfo label="Card Type">
                <Image src="/imgs/chas.jpg" width={62} height={40} alt="" />
                <Image src="/imgs/pioneer.jpg" width={62} height={40} alt="" />
              </EnrollInfo>
            </Box>
          )}

          <Typography variant="overline" sx={{ pb: 3 }} component="div">
            Address
          </Typography>
          <FormControl fullWidth>
            <TextField {...getFieldProps('postal')} label="Postal Code" />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('block')} label="Block" />
          </FormControl>
          <FormControl fullWidth>
            <TextField {...getFieldProps('street')} label="Street Name" />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('level')} label="Level" />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('unitNo')} name="unitNo" label="Unit No." />
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </FormBody>
      <FormActions>
        {values?.enrolled && (
          <Button onClick={onDeEnrolBtnClick} variant="text" color="error">
            De-Enrol
          </Button>
        )}
        <Box sx={{ ml: 'auto', button: { ml: 2 } }}>
          <Button onClick={onCancelBtnClick} variant="text">
            Back
          </Button>
          <Button type="submit">{values?.enrolled ? 'Update' : 'Enrol Patient'}</Button>
        </Box>
      </FormActions>
    </>
  );
};
export default PatientProfileSection;
