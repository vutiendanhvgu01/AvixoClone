import { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AvixoFixedContainer } from 'share-components';
import type AddPatientFormTypes from './add-edit-patient-form-types';
import AddPatientSchema, { AddPatientInitialValues } from './add-edit-patient-form-validation';
import PatientDetailForm from './patient-detail-form';
import PatientOthersForm from './patient-others-form';
import PatientContactForm from './patient-contact-form';
import { AddPatientInitialValuesType } from './add-edit-patient-form-types';
import PatientAllergyForm from './patient-allergy-form';
import PatientOtherContactsForm from './patient-other-contacts-form';

const defaultStep = 1;

const AddPatientForm: React.FC<AddPatientFormTypes> = props => {
  const form = useRef<HTMLFormElement | null>(null);
  const { initData, type, onCancel, initStep } = props;
  const [step, setStep] = useState<number>(initStep || defaultStep);
  const title = type === 'edit' ? 'Edit Patient' : 'Add New Patient';
  const initialValues = {
    ...AddPatientInitialValues,
    ...(initData || {}),
  } as AddPatientInitialValuesType;

  const onSubmit = useCallback(
    (values: AddPatientInitialValuesType, actions: FormikHelpers<AddPatientInitialValuesType>) => {
      if ((step === 4 || type === 'edit') && form?.current) {
        form.current?.submit();
      } else {
        actions.setSubmitting(false);
        actions.setTouched({});
        setStep(prev => prev + 1);
      }
      actions.setValues(values);
    },
    [step, type],
  );

  return (
    <AvixoFixedContainer title={title} display onClose={onCancel}>
      <Box sx={{ height: '100%' }}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={AddPatientSchema[step - 1]}>
          {() => (
            <Form style={{ height: '100%' }} ref={form} noValidate method="post">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box height={step === 1 ? '100%' : 0} overflow="auto" px={3}>
                  <PatientDetailForm edit={type === 'edit'} />
                </Box>
                <Box height={step === 2 ? '100%' : 0} overflow="auto" px={3}>
                  <PatientContactForm back={() => setStep(1)} edit={type === 'edit'} />
                </Box>
                <Box height={step === 3 ? '100%' : 0} overflow="auto" px={3}>
                  <PatientOthersForm back={() => setStep(2)} edit={type === 'edit'} />
                </Box>
                <Box height={step === 4 ? '100%' : 0} overflow="auto" px={3}>
                  <PatientOtherContactsForm back={() => setStep(3)} edit={type === 'edit'} />
                </Box>
                <Box height={step === 5 ? '100%' : 0} overflow="auto" px={3}>
                  <PatientAllergyForm back={() => setStep(4)} />
                </Box>
              </LocalizationProvider>
            </Form>
          )}
        </Formik>
      </Box>
    </AvixoFixedContainer>
  );
};

export default AddPatientForm;
