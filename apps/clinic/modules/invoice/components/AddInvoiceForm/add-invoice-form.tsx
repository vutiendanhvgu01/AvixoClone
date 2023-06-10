import { Button } from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useRef, useState } from 'react';
import { AvixoFixedContainer, DefaultFormProps, Form, FormActions } from 'share-components';
import { Patient } from 'modules/patient/types/patient';
import dynamic from 'next/dynamic';

const SelectCustomer = dynamic(() => import('./Steps/select-customer-category'), { ssr: false });

interface AddInvoiceFormProps extends DefaultFormProps {
  initData?: {
    category: {
      value: number;
    };
    patient: Patient;
  };
  currentStep?: number;
}

const AddInvoiceForm: React.FC<AddInvoiceFormProps> = ({ open, onCancel, currentStep, initData }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState<number>(currentStep || 1);

  const onBackButtonClick = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  return (
    <Formik
      initialValues={{
        category: null,
        ...initData,
      }}
      onSubmit={(values: any, { setSubmitting }) => {
        setSubmitting(true);
        if (form.current) {
          form.current.submit();
        }
      }}
    >
      {({ handleSubmit }) => (
        <AvixoFixedContainer title="Add New Invoice" display={open} onClose={onCancel} progress={0}>
          <Form ref={form} method="POST" noValidate onSubmit={handleSubmit}>
            <SelectCustomer setStep={setStep} />;
            <input type="text" hidden name="action" value="add-invoice" />
            <FormActions>
              <Button onClick={onBackButtonClick} variant="text">
                Back
              </Button>
              <Button disabled={step !== 3} type="submit">
                Add New Invoice
              </Button>
            </FormActions>
          </Form>
        </AvixoFixedContainer>
      )}
    </Formik>
  );
};

export default AddInvoiceForm;
