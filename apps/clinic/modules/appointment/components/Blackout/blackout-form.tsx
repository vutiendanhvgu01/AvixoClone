/*
  Add/Edit Blackout form
*/
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import { AvixoFixedContainer, DefaultFormProps } from 'share-components';
import { BlackoutFormValues } from './blackout-types';

interface BlackoutFormProps extends DefaultFormProps {
  initData?: BlackoutFormValues;
}

const BlackoutForm: React.FC<BlackoutFormProps> = ({ initData = {} as BlackoutFormValues, open, onCancel }) => {
  const formTitle = initData?.id ? 'Add Blackout' : 'Edit Blackout';
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit = (values: BlackoutFormValues) => {
    form.current?.submit();
  };

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel}>
      <Formik initialValues={{ ...initData }} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Form method="POST" ref={form} onSubmit={handleSubmit}>
            {/* Form Fields Here */}
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default BlackoutForm;
