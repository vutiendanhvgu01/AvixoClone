import { TextField, Button, FormControl, Stack } from '@mui/material';
import { Formik } from 'formik';
import Yup from 'share-components/src/services/yup';
import { AvixoFixedContainer, DefaultFormProps, FormActions, FormBody, Form } from 'share-components';
import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { PatientListFormValues } from '../patient-list-types';

const PatientListSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

interface PatientListFormProps extends DefaultFormProps {
  initData?: PatientListFormValues;
}

const PatientListForm: React.FC<PatientListFormProps> = props => {
  const { initData, onCancel, open } = props;
  const form = useRef<HTMLFormElement | null>(null);
  const formTitle = initData ? 'Edit List' : 'Create List';

  const onSubmit = useCallback(() => {
    form.current?.submit();
  }, []);

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel}>
      <Formik
        initialValues={{ name: '', description: '', ...initData }}
        onSubmit={onSubmit}
        validationSchema={PatientListSchema}
      >
        {({ getFieldProps, handleSubmit, errors, touched }) => (
          <Form method="POST" data-cy="form" onSubmit={handleSubmit} noValidate>
            <FormBody>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  required
                  {...getFieldProps('name')}
                  error={!!(errors.name && touched.name)}
                  helperText={touched.description && errors.name}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Description"
                  required
                  {...getFieldProps('description')}
                  error={!!(errors.description && touched.description)}
                  helperText={touched.description && errors.description}
                />
              </FormControl>
            </FormBody>
            <FormActions>
              {initData?.id && (
                <Link href={PAGE_URLS.PATIENT_LIST_DETAILS_DELETE(initData.id)} passHref scroll={false}>
                  <Button type="button" color="error" variant="text" sx={{ mr: 'auto', ml: '0 !important' }}>
                    Delete List
                  </Button>
                </Link>
              )}
              <Stack direction="row" gap={2}>
                <Button type="button" variant="text" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">{initData ? 'Save Changes' : 'Create List'}</Button>
              </Stack>
            </FormActions>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default PatientListForm;
