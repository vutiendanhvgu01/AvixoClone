import { Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import PractitionerByStepSchema from 'modules/practitioner/components/PractitionerForm/practitioner-form-schema';
import dynamic from 'next/dynamic';
import { FC, useEffect, useRef, useState, useMemo } from 'react';
import { getProgressBarPractitioner } from 'share-components/src/utils/progressBarUtils';
import { AvixoFixedContainer, FormActions, FormBody, Form } from 'share-components';
import { DefaultFormProps } from 'share-components/src/components/AvixoFixedContainer/avixo-fixed-container-types';
import { Practitioner } from 'modules/practitioner/types/practitioner';
import { PHASE_LABEL } from '../../constants';
import { PhaseAction, PhaseType, StepsType } from '../../types/practitioner-form';
import PractitionerContactPhase from './practitioner-contact-phase';
import PractitionerProfessionPhase from './practitioner-profession-phase';
import PractitionerQualificationPhase from './practitioner-qualification-phase';
import PractitionerRolePhase from './practitioner-role-phase';
import { formatPractitionerFormData } from './helpers';

const PractitionerDetailPhase = dynamic(() => import('./practitioner-detail-phase'), { ssr: false });

const renderStep = (step: PhaseType) => {
  switch (step) {
    case 'detail':
      return <PractitionerDetailPhase />;

    case 'contact':
      return <PractitionerContactPhase />;

    case 'profession':
      return <PractitionerProfessionPhase />;

    case 'qualification':
      return <PractitionerQualificationPhase />;

    case 'role':
      return <PractitionerRolePhase />;

    default:
      return '';
  }
};

const FORM_INITIAL_VALUES = {
  avatar: '',
  name: '',
  gender: '',
  birthDate: null,
  description: '',
  organisation: '',
  premise: '',
  status: '',
  qualificationPrimaryPosition: -1,
  phoneNumbers: [
    {
      number: '',
      isoNumber: '65',
      isPrimary: false,
    },
  ],
  emails: [''],
  addresses: [
    {
      postal: '',
      blockNo: '',
      address: '',
      label: '',
      floorNo: '',
      unitNo: '',
      isPrimary: false,
    },
  ],
  profession: {
    name: '',
    category: '',
    type: '',
    code: '',
    validFrom: '',
    validTo: '',
    isPrimary: true,
  },
  qualifications: [
    {
      id: '',
      type: '',
      code: '',
      issuerName: '',
      issuerType: '',
      issuingCountry: '',
      validFrom: '',
      validTo: '',
    },
  ],
  enrole: 'sys-admin',
  nric: '',
};

const PHASES = Object.keys(PHASE_LABEL);

interface PractitionerFormProps extends DefaultFormProps {
  initData?: Practitioner;
  tab?: PhaseType;
}

const PractitionerForm: FC<PractitionerFormProps> = ({ initData, open, onCancel, tab }) => {
  const form = useRef<HTMLFormElement | null>(null);

  const [steps, setSteps] = useState<StepsType>({
    currentStep: 'detail',
    nextStep: 'contact',
    historySteps: ['detail'],
  });

  const isEdit = !!initData;

  const initialValues = useMemo(
    () => ({
      ...FORM_INITIAL_VALUES,
      ...initData,
      language: initData?.languages?.[0]?.id,
      organisation: initData?.practitionerOrganisations?.[0]?.organisationId,
      premise: initData?.practitionerPremises?.[0]?.premiseId,
      emails: initData?.emails?.map(email => email?.email) || FORM_INITIAL_VALUES.emails,
      phoneNumbers:
        initData?.phones?.map(phone => ({
          phoneValue: phone?.number,
          countryCode: phone?.countryCode,
          isPrimary: phone?.preferred,
        })) || FORM_INITIAL_VALUES.phoneNumbers,
      addresses:
        initData?.addresses?.map(address => ({
          ...address,
          isPrimary: address?.preferred,
        })) || FORM_INITIAL_VALUES.addresses,
      body: null,
    }),
    [initData],
  );

  const handleUpdatePhase = (type: PhaseAction) => {
    let positionStep = PHASES.findIndex(phase => phase === steps.currentStep);

    if (type === PhaseAction.NEXT) {
      positionStep += 1;
    }
    if (type === PhaseAction.BACK) {
      positionStep -= 1;
    }
    const currentStep = PHASES[positionStep] as PhaseType;
    const nextStep = PHASES[positionStep + 1] as PhaseType;
    const nextHistorySteps = [...steps.historySteps, currentStep];
    if (!currentStep) {
      return;
    }
    setSteps({
      currentStep,
      nextStep,
      historySteps: nextHistorySteps,
    });
  };

  useEffect(() => {
    if (tab) {
      setSteps({ currentStep: tab as PhaseType, nextStep: undefined, historySteps: [] });
    }
  }, [tab]);

  return (
    <AvixoFixedContainer
      title={initData ? 'Edit Practitioner' : 'Add New Practitioner'}
      display={open}
      progress={getProgressBarPractitioner(steps.currentStep, PHASES)}
      onClose={onCancel}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any, { setSubmitting, setFieldValue }) => {
          setSubmitting(true);
          if (isEdit || steps.currentStep === 'role') {
            const body = formatPractitionerFormData(values, isEdit, steps.currentStep);
            setFieldValue('body', JSON.stringify(body));
            setTimeout(() => {
              form.current?.submit();
            });
          } else {
            handleUpdatePhase(PhaseAction.NEXT);
          }
        }}
        validationSchema={PractitionerByStepSchema[steps.currentStep]}
      >
        {({ ...formikProps }) => (
          <Form ref={form} method="POST" data-cy="form" onSubmit={formikProps.handleSubmit} noValidate>
            <input type="hidden" value={isEdit ? 'update-practitioner' : 'add-practitioner'} name="action" />
            <input type="hidden" name="body" value={formikProps.values.body} />
            <FormBody>{renderStep(steps.currentStep)}</FormBody>
            <FormActions>
              <Typography variant="subtitle2" sx={{ flex: '3' }} color="GrayText">
                {steps.nextStep && PHASE_LABEL?.[steps.nextStep]}
              </Typography>
              {steps.currentStep !== 'detail' && !isEdit && (
                <Button
                  variant="text"
                  sx={{ marginRight: 2 }}
                  onClick={() => {
                    handleUpdatePhase(PhaseAction.BACK);
                  }}
                >
                  Back
                </Button>
              )}
              {isEdit && (
                <Button variant="text" sx={{ marginRight: 2 }} onClick={() => onCancel?.()}>
                  Cancel
                </Button>
              )}
              <Button type="submit">{isEdit ? 'Save Changes' : 'Next'}</Button>
            </FormActions>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default PractitionerForm;
