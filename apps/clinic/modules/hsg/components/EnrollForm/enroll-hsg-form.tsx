import { LinearProgress, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { Formik } from 'formik';
import { AvixoDrawerConfirm, AvixoFixedContainer } from 'share-components';
import yup from 'share-components/src/services/yup';
import { useRouter } from 'next/router';
import { Patient } from 'modules/patient/types/patient';
import { Form } from './enroll-hsg-form-style';
import EnrollErrorMessage from './enroll-errors-msg';
import PatientProfileSection from './patient-profile-section';
import EnrollTermAndCondition from './term-and-condition-section';
import NricSearchSection from './nric-search-section';
import ConfirmCancelSection from './confirm-cancel-section';
import { EnrollFormValues } from './enroll-hsg-form-types';

type SectionType = 'nric-search' | 'patient-info' | 'error' | 'term-and-condition' | 'cancel-changes' | 'de-enrol';
const SECTION_TYPE: { [key: string]: SectionType } = {
  NRIC_SEARCH: 'nric-search',
  PATIENT_INFO: 'patient-info',
  ERROR: 'error',
  TERM_AND_CONDITION: 'term-and-condition',
  CANCEL_CHANGES: 'cancel-changes',
  DE_ENROL: 'de-enrol',
};

const EnrollFormSchema = yup.object().shape({
  nric: yup.string()?.isValidNRIC().required(),
});

const getFormTitle = (sectionType: SectionType) => {
  switch (sectionType) {
    case SECTION_TYPE.NRIC_SEARCH:
      return 'Patient Enrolment';
    case SECTION_TYPE.CANCEL_CHANGES:
      return 'Proceed without saving?';
    case SECTION_TYPE.DE_ENROL:
      return 'De-Enrol Patient?';
    default:
      return 'Patient Profile';
  }
};
export interface EnrollFormProps {
  initData?: EnrollFormValues;
  typeError?: 'not-eligible' | 'unable-to-retrieve';
  errorMessage?: string;
  open: boolean;
  patient: Patient;
}

const EnrollForm = (props: EnrollFormProps) => {
  const router = useRouter();
  const { typeError = 'not-eligible', errorMessage, initData, patient } = props;
  const [sectionType, setSectionType] = useState<SectionType>(
    initData?.enrolled ? SECTION_TYPE.PATIENT_INFO : SECTION_TYPE.NRIC_SEARCH,
  );
  const form = useRef<HTMLFormElement | null>(null);

  const backToMainPage = useCallback(() => {
    router.push({ pathname: router.pathname, query: { patientUUID: patient.uuid } });
  }, [router, patient]);

  const showConfirmDeEnrol = useCallback(() => {
    setSectionType(SECTION_TYPE.DE_ENROL);
  }, []);

  const onSubmit = (values: EnrollFormValues) => {
    switch (sectionType) {
      case SECTION_TYPE.NRIC_SEARCH:
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            nric: values.nric,
          },
        });
        setSectionType(SECTION_TYPE.PATIENT_INFO); // Will remove after API Integration
        break;
      case SECTION_TYPE.PATIENT_INFO:
        setSectionType(SECTION_TYPE.TERM_AND_CONDITION);
        break;
      case SECTION_TYPE.TERM_AND_CONDITION:
      case SECTION_TYPE.DE_ENROL:
        form.current?.submit();
        break;
      default:
    }
  };

  const renderSection = () => {
    switch (sectionType) {
      case SECTION_TYPE.ERROR:
        return (
          <EnrollErrorMessage
            typeError={typeError}
            errorMessage={errorMessage}
            onSubmitBtnClick={backToMainPage}
            onCancelBtnClick={backToMainPage}
          />
        );
      case SECTION_TYPE.TERM_AND_CONDITION:
        return <EnrollTermAndCondition onCancelBtnClick={() => setSectionType(SECTION_TYPE.PATIENT_INFO)} />;
      case SECTION_TYPE.PATIENT_INFO:
        return (
          <PatientProfileSection
            onCancelBtnClick={() => {
              if (initData?.enrolled) {
                setSectionType(SECTION_TYPE.CANCEL_CHANGES);
              } else {
                backToMainPage();
              }
            }}
            onDeEnrolBtnClick={showConfirmDeEnrol}
          />
        );
      case SECTION_TYPE.NRIC_SEARCH:
        return <NricSearchSection onCancelBtnClick={backToMainPage} />;
      case SECTION_TYPE.CANCEL_CHANGES:
        return (
          <ConfirmCancelSection
            onCancelBtnClick={() => {
              setSectionType(SECTION_TYPE.PATIENT_INFO);
            }}
            onSubmitBtnClick={backToMainPage}
          />
        );
      default:
        return null;
    }
  };

  if (sectionType === SECTION_TYPE.DE_ENROL) {
    return (
      <AvixoDrawerConfirm
        open
        title="De-Enrol Patient?"
        confirmContent={
          <Typography>
            You are about to De-Enrol Armin van Buuren from HSG Enrolment. This action cannot be undone.
          </Typography>
        }
        inputProps={{
          name: 'reason',
          label: 'Reason for de-enrolment',
          required: true,
          defaultValues: 'Patient wants to move to another clinic',
        }}
        footerProps={{
          confirmText: 'Yes, de-enrol',
        }}
        handleClose={backToMainPage}
      />
    );
  }

  return (
    <AvixoFixedContainer title={getFormTitle(sectionType)} display onClose={backToMainPage}>
      <LinearProgress variant="determinate" value={0} />
      <Formik
        initialValues={{
          ...{
            nric: '',
          },
          ...initData,
        }}
        onSubmit={onSubmit}
        validationSchema={EnrollFormSchema}
      >
        {({ handleSubmit }) => (
          <Form ref={form} method="GET" noValidate onSubmit={handleSubmit}>
            {renderSection()}
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default EnrollForm;
