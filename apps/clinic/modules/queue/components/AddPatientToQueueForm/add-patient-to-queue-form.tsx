/*
  Add Patient to Queue form
*/
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import { AvixoFixedContainer, DefaultFormProps } from 'share-components';

const AddPatientToQueueForm: React.FC<DefaultFormProps> = ({ open, onCancel }) => {
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit = () => {
    form.current?.submit();
  };

  return (
    <AvixoFixedContainer title="Add Patient to Queue" display={open} onClose={onCancel}>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Form method="POST" ref={form} onSubmit={handleSubmit}>
            {/* Form Fields Here */}
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default AddPatientToQueueForm;
