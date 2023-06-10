import { Container, Typography, TextField, Button, FormControl, LinearProgress } from '@mui/material';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { AvixoFixedContainer, Form, FormActions, FormBody } from 'share-components';

export interface RemarkFormProps {
  initData?: {
    remark: string;
  };
  open: boolean;
  onCancel?: () => void;
}

const RemarkForm = (props: RemarkFormProps) => {
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

  const { getFieldProps, touched, errors, isSubmitting } = formik;

  return (
    <AvixoFixedContainer title="Remarks" display={open} onClose={onCancel}>
      <LinearProgress variant="determinate" value={0} />
      <Form ref={form} method="POST" onSubmit={formik.handleSubmit} noValidate>
        <FormBody>
          <Container sx={{ padding: '0 0 20px 0' }}>
            <Typography sx={{ color: 'black.main', marginBottom: 5 }} variant="subtitle1" component="div">
              Provide a description of the reason for the credit note
            </Typography>
            <FormControl fullWidth>
              <TextField
                multiline
                rows={18}
                type="tex"
                label="Remarks"
                {...getFieldProps('remark')}
                error={!!(touched.remark && errors.remark)}
                helperText={touched.remark && errors.remark}
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
export default RemarkForm;
