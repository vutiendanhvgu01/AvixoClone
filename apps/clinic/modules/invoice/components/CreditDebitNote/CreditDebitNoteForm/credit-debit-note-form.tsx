import { Button } from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useRef, useState } from 'react';
import { AvixoFixedContainer, DefaultFormProps, Form, FormActions } from 'share-components';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import Yup from 'share-components/src/services/yup';
import { CreditDebitNoteFormValues, CustomerType } from './credit-debit-note-form-types';
import CreditNoteCustomerInformation from './Steps/customer-information';
import CreditNoteLinkToInvoice from './Steps/link-to-invoice';
import CreditNoteSelectItem from './Steps/select-item';

export interface CreditDebitNoteFormProps extends DefaultFormProps {
  initData?: CreditDebitNoteFormValues;
  type?: 'credit' | 'debit';
}

const CreditDebitNoteFormSchema = Yup.object({
  customerType: Yup.object().required('Required'),
  patient: Yup.object().when(['customerType'], {
    is: (customerType: CustomerType) => customerType && customerType.value === 1,
    then: Yup.object().required('Required'),
    otherwise: Yup.object().nullable(),
  }),
  insurance: Yup.object().when(['customerType'], {
    is: (customerType: CustomerType) => customerType && customerType.value === 2,
    then: Yup.object().required('Required'),
    otherwise: Yup.object().nullable(),
  }),
});

const CreditDebitNoteForm: React.FC<CreditDebitNoteFormProps> = ({ initData, open, onCancel, type = 'credit' }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState<number>(1);
  const formType = toTitleCase(type);
  const formTitle = initData ? `Edit ${formType} Note` : `Add ${formType} Note`;

  const onSubmit = () => {
    switch (step) {
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3);
        break;
      case 3:
        form.current?.submit();
        break;
      default:
    }
  };

  const onBackButtonClick = useCallback(() => {
    switch (step) {
      case 1:
        if (onCancel) onCancel();
        break;
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(2);
        break;
      default:
    }
  }, [onCancel, step]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <CreditNoteCustomerInformation />;
      case 2:
        return <CreditNoteLinkToInvoice />;
      case 3:
        return <CreditNoteSelectItem />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={{
        ...{
          patientId: null,
        },
        ...initData,
      }}
      validationSchema={CreditDebitNoteFormSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel} progress={0}>
          <Form ref={form} method="POST" noValidate onSubmit={handleSubmit}>
            {renderSteps()}
            <FormActions>
              <Button onClick={onBackButtonClick} variant="text">
                Back
              </Button>
              <Button type="submit">{step === 3 ? `Add ${formType}` : 'Next'}</Button>
            </FormActions>
          </Form>
        </AvixoFixedContainer>
      )}
    </Formik>
  );
};
export default CreditDebitNoteForm;
