import { TextField, FormControl } from '@mui/material';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Form } from 'share-components';

interface SummaryFormValues {
  history: string;
  current_medication: string;
  remark: string;
}

export interface SummaryFormProps {
  initData?: SummaryFormValues;
}

const SummaryForm = (props: SummaryFormProps) => {
  const { initData } = props;
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      ...{
        remarks: '',
        history: '',
        current_medication: '',
      },
      ...initData,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { getFieldProps, touched, errors } = formik;

  return (
    <Form ref={form} method="POST" onSubmit={formik.handleSubmit} noValidate>
      <FormControl fullWidth>
        <TextField label="History" aria-readonly {...getFieldProps('history')} />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Current Medication"
          {...getFieldProps('current_medication')}
          error={!!(touched.current_medication && errors.current_medication)}
          helperText={touched.current_medication && errors.current_medication}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Remark"
          {...getFieldProps('remark')}
          error={!!(touched.remark && errors.remark)}
          helperText={touched.remark && errors.remark}
        />
      </FormControl>

      {/* <FormActions>
          <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
            Back
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting} sx={{ ml: 2 }}>
            Save Changes
          </Button>
        </FormActions> */}
    </Form>
  );
};
export default SummaryForm;
