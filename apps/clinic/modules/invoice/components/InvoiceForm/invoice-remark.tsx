import { Container, TextField, Button, FormControl, LinearProgress, FormControlLabel, Checkbox } from '@mui/material';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { AvixoFixedContainer } from 'share-components';
import { Form, FormActions, FormBody } from './form-style';

interface InvoiceRemarkFormProps {
  initData?: {
    remark: string;
    isPrint: boolean;
  };
  open: boolean;
  onCancel?: () => void;
}

const InvoiceRemarkForm: React.FC<InvoiceRemarkFormProps> = props => {
  const { initData, open = false, onCancel } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      ...{
        remarks: '',
      },
      ...initData,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { getFieldProps, touched, errors, isSubmitting, handleChange } = formik;

  return (
    <AvixoFixedContainer title="Invoice Remarks" display={open} onClose={onCancel} progress={100}>
      <Form ref={form} method="POST" onSubmit={formik.handleSubmit} noValidate>
        <FormBody>
          <Container sx={{ padding: '0 0 20px 0' }}>
            <FormControl fullWidth>
              <TextField
                multiline
                rows={18}
                type="tex"
                label="Invoice Remarks"
                {...getFieldProps('remark')}
                error={!!(touched.remark && errors.remark)}
                helperText={touched.remark && errors.remark}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox name="isPrint" defaultChecked onChange={handleChange} />}
                label="Print on Invoice"
              />
            </FormControl>
          </Container>
        </FormBody>

        <FormActions>
          <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting} sx={{ ml: 2 }}>
            Add Comment
          </Button>
        </FormActions>
      </Form>
    </AvixoFixedContainer>
  );
};
export default InvoiceRemarkForm;
