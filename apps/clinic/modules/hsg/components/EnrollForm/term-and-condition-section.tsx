import { Box, Button, Checkbox, FormControlLabel, styled, Typography } from '@mui/material';
import { FormActions, FormBody } from './enroll-hsg-form-style';
import { EnrollFormValues, EnrollSectionProps } from './enroll-hsg-form-types';
import { useFormikContext } from 'formik';

const TermAndCondition = styled(Box)(() => ({
  paddingBottom: 50,

  p: {
    marginBottom: 24,
  },
}));

const CheckboxWrap = styled(Box)(({ theme }) => ({
  padding: '16px 32px',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'absolute',
  bottom: 96,
  backgroundColor: 'white',
}));

const EnrollTermAndCondition: React.FC<EnrollSectionProps> = ({ onCancelBtnClick }) => {
  const { values, setFieldValue } = useFormikContext<EnrollFormValues>();
  return (
    <>
      <FormBody>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            Please read the Healthier SG terms and conditions below:
          </Typography>
          <TermAndCondition>
            <Typography>
              These are the Terms and Conditions governing the use of this Service and the agreement that operates
              between You and the Company.
            </Typography>
            <Typography>
              These Terms and Conditions set out the rights and obligations of all users regarding the use of the
              Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with
              these Terms and Conditions.
            </Typography>
            <Typography>
              These Terms and Conditions apply to all visitors, users and others who access or use the Service. By
              accessing or using the Service You agree to be bound by these Terms and Conditions.
            </Typography>
            <Typography>
              If You disagree with any part of these Terms and Conditions then You may not access the Service. You
              represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
            </Typography>
            <Typography>
              Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the
              Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection,
              use and disclosure of Your personal information when You use the Application or the Website and tells You
              about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before
              using Our Service.
            </Typography>
          </TermAndCondition>
        </Box>
      </FormBody>

      <CheckboxWrap>
        <FormControlLabel
          control={
            <Checkbox
              name="term_and_condition"
              onChange={e => {
                setFieldValue('term_and_condition', e.target.checked);
              }}
            />
          }
          label="Patient has given consent and acknowledged the terms and conditions for Healthier SG enrolment."
        />
      </CheckboxWrap>
      <FormActions>
        <Button onClick={onCancelBtnClick} variant="text">
          Back
        </Button>
        <Button type="submit" disabled={!values.term_and_condition}>
          Confirm
        </Button>
      </FormActions>
    </>
  );
};

export default EnrollTermAndCondition;
