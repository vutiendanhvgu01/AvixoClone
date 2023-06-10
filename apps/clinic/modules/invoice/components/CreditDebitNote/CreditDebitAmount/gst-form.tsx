import { Container, Typography, TextField, Button, FormControl, LinearProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { AvixoFixedContainer, Form, FormActions, FormBody } from 'share-components';

interface GSTFormValues {
  remark: string;
  gst: number;
  gst_amount: number;
  subTotal: number;
}

export interface GSTFormProps {
  initData?: GSTFormValues;
  open: boolean;
  onCancel?: () => void;
}

const GSTForm = (props: GSTFormProps) => {
  const theme = useTheme();
  const { initData, open = false, onCancel } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      ...{
        remarks: '',
        gst: '',
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
    <AvixoFixedContainer title="Edit Credit Amount" display={open} onClose={onCancel}>
      <LinearProgress variant="determinate" value={0} />
      <Form ref={form} method="POST" onSubmit={formik.handleSubmit} noValidate>
        <FormBody>
          <Container sx={{ padding: '0 0 20px 0' }}>
            <Typography sx={{ color: 'black.main', marginBottom: 3 }} variant="h6" component="div">
              GST &amp; Discount
            </Typography>
            <FormControl fullWidth>
              <TextField label="Sub Total" aria-readonly {...getFieldProps('subTotal')} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                label="Add GST"
                {...getFieldProps('gst')}
                error={!!(touched.gst && errors.gst)}
                helperText={touched.gst && errors.gst}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="GST Amount"
                {...getFieldProps('gst_amount')}
                error={!!(touched.gst_amount && errors.gst_amount)}
                helperText={touched.gst_amount && errors.gst_amount}
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: 3,
              }}
            >
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="h6">S$220.00</Typography>
            </Box>
          </Container>
        </FormBody>

        <FormActions>
          <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
            Back
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting} sx={{ ml: 2 }}>
            Save Changes
          </Button>
        </FormActions>
      </Form>
    </AvixoFixedContainer>
  );
};
export default GSTForm;
