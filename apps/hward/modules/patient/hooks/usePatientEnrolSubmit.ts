import { FormikConfig } from 'formik';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';
import { PAGE_URLS } from 'share-components/src/constants';
import { CreatePatientErrorResponse, CreatePatientResponse } from '../api/patient-api-type';
import { PatientFormValues } from '../components/patient-types';
import snackbarMessages from '../utils/snackbarMesages';

interface UsePatientEnrolSubmitOptions {
  close: () => void;
  setShowNotification: (value: SetStateAction<boolean>) => void;
  setSnackbarMessage: (value: SetStateAction<string>) => void;
}

function usePatientEnrolSubmit(
  onSuccessCallback: (...args: any) => any,
  { close, setShowNotification, setSnackbarMessage }: UsePatientEnrolSubmitOptions,
) {
  const router = useRouter();

  const onSubmit: FormikConfig<PatientFormValues>['onSubmit'] = async values => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = (await response.json()) as CreatePatientResponse | CreatePatientErrorResponse;
      if (data.status === 200) {
        onSuccessCallback();
        close();
        setShowNotification(true);
        setSnackbarMessage(snackbarMessages.success(data.fullName, data.caseId));
      } else if (data.status === 400 && data.message === 'Error: Email or nric already used') {
        setShowNotification(true);
        setSnackbarMessage(snackbarMessages.duplicate(values.fullName));
      } else if ([400, 500].includes(response.status) && data.cause === 'case' && !!data.patientId) {
        setShowNotification(false);
        router.push(PAGE_URLS.HWARD_PATIENT_DETAILS(data.patientId));
      } else {
        setShowNotification(true);
        setSnackbarMessage(snackbarMessages.error);
      }
    } catch (error) {
      setShowNotification(true);
      setSnackbarMessage(snackbarMessages.error);
    }
  };

  return { onSubmit };
}

export default usePatientEnrolSubmit;
