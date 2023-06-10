import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { useCallback, useRef } from 'react';
import { FormControl, TextField } from '@mui/material';
import { AvixoFixedContainer, FormActions, FormBody, Form } from 'share-components';

interface DeleteListProps {
  title: string;
  onClose: () => void;
}

const DeleteList: React.FC<DeleteListProps> = props => {
  const { onClose, title } = props;
  const initialValues = { reason: '' };
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(() => {
    form.current?.submit();
  }, []);

  return (
    <AvixoFixedContainer title={title} display onClose={onClose}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, handleSubmit, getFieldProps, touched }) => (
          <Form ref={form} method="POST" data-cy="form" onSubmit={handleSubmit} noValidate>
            <FormBody>
              <Typography variant="body2" sx={{ mb: 2 }}>
                This action cannot be undone. All patients inside this list will be removed (if any).
              </Typography>
              <FormControl fullWidth>
                <TextField
                  label="Reason"
                  required
                  multiline
                  rows={4}
                  {...getFieldProps('reason')}
                  error={!!(touched.reason && errors.reason)}
                  helperText={touched.reason && errors.reason}
                />
              </FormControl>
            </FormBody>
            <FormActions>
              <Button variant="text" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Yes, remove</Button>
            </FormActions>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};
export default DeleteList;
