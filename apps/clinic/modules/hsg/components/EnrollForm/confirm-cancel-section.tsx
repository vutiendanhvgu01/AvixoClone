import { Button, Typography } from '@mui/material';
import { FormActions, FormBody } from './enroll-hsg-form-style';

export interface ConfirmCancelSectionProps {
  onCancelBtnClick?: () => void;
  onSubmitBtnClick?: () => void;
}

const ConfirmCancelSection: React.FC<ConfirmCancelSectionProps> = ({ onSubmitBtnClick, onCancelBtnClick }) => (
  <>
    <FormBody>
      <Typography color="black.main" variant="body2" component="div">
        Your are about to leave this page but you have made an edit, proceed without saving?
      </Typography>
    </FormBody>
    <FormActions>
      <Button variant="text" onClick={onCancelBtnClick}>
        Cancel
      </Button>
      <Button type="submit" onClick={onSubmitBtnClick}>
        Proceed without Saving
      </Button>
    </FormActions>
  </>
);
export default ConfirmCancelSection;
