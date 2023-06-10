import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { FormEvent, useCallback } from 'react';
import { AvixoFixedContainer } from 'share-components';

interface DeletePatientFromListProps {
  title: string;
  onClose: () => void;
}

const DeletePatientFromList: React.FC<DeletePatientFromListProps> = props => {
  const { onClose, title } = props;

  const onSubmit = useCallback((values: object, { setValues }: any) => {
    setValues(values);
  }, []);

  const handleSubmitWithFormik = useCallback(
    (errors: any, handleSubmit: any) =>
      (e: FormEvent<HTMLFormElement>): void => {
        const haveErrors = Object.keys(errors).length > 0;
        if (haveErrors) {
          e.preventDefault();
          handleSubmit();
        }
      },
    [],
  );

  return (
    <AvixoFixedContainer title={title} display onClose={onClose}>
      <Box sx={{ px: 5, height: 'inherit' }}>
        <Box sx={{ height: 'fill-available' }}>
          <Typography variant="body2">
            This action cannot be undone. After removing, this patient will no longer be on the list.
          </Typography>
        </Box>
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ errors, handleSubmit }) => (
            <Form method="POST" data-cy="form" onSubmit={() => handleSubmitWithFormik(errors, handleSubmit)}>
              <Box sx={{ float: 'right' }}>
                <Button variant="text" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button variant="text" type="submit">
                  Yes, remove
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </AvixoFixedContainer>
  );
};
export default DeletePatientFromList;
