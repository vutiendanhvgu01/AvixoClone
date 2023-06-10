/* not-eligible
 - Patient has opted-out from NEHR.
 - Patient has already been enroled in Healthier SG Programme.
 - Patient does not meet the requirement for Healthier SG enrollment.
*/

/* unable-to-retrieve
  - Unable to retrieve records from HSAR (Healthier SG Administrative Repository), please try again later.
  - Unable to update patient profile, please try again later.
*/

import { Alert, Box, Button, Typography } from '@mui/material';
import { FormActions, FormBody } from './enroll-hsg-form-style';
import { EnrollSectionProps } from './enroll-hsg-form-types';

export type EnrollTypeError = 'not-eligible' | 'unable-to-retrieve';

export interface EnrollErrorMessageProps extends EnrollSectionProps {
  typeError: EnrollTypeError;
  errorMessage?: string;
}

const EnrollErrorMessage: React.FC<EnrollErrorMessageProps> = ({
  typeError,
  errorMessage,
  onCancelBtnClick,
  onSubmitBtnClick,
}) => {
  if (typeError === 'not-eligible') {
    return (
      <>
        <FormBody>
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }} color="black.dark">
              Patient is not eligible for HSG enrolment.
            </Typography>
            <Alert severity="error" icon={false}>
              Patient has opted-out from NEHR.
            </Alert>
          </Box>
        </FormBody>
        <FormActions>
          <Button onClick={onCancelBtnClick} variant="text">
            Back
          </Button>
          <Button type="submit" onClick={onSubmitBtnClick}>
            Okay
          </Button>
        </FormActions>
      </>
    );
  }

  return <Typography variant="body1">{errorMessage}</Typography>;
};

export default EnrollErrorMessage;
