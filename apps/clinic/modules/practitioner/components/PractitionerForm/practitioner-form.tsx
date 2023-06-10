import { Box, Button, Divider, LinearProgress, styled, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import PractitionerByStepSchema from 'modules/practitioner/components/PractitionerForm/practitioner-form-schema';
import dynamic from 'next/dynamic';
import { FC, useEffect, useRef, useState, useMemo } from 'react';
import { getProgressBarPractitioner } from 'share-components/src/utils/progressBarUtils';
import { AvixoFixedContainer } from 'share-components';
import { DefaultFormProps } from 'share-components/src/components/AvixoFixedContainer/avixo-fixed-container-types';
import Practitioner from 'modules/practitioner/types//practitioner-types';
import { PHASE_LABEL } from '../../constants';
import { PhaseAction, PhaseType, StepsType } from './practitioner-form-types';
import PractitionerContactPhase from './practitioner-contact-phase';
import PractitionerProfessionPhase from './practitioner-profession-phase';
import PractitionerQualificationPhase from './practitioner-qualification-phase';
import PractitionerRolePhase from './practitioner-role-phase';

const PractitionerDetailPhase = dynamic(() => import('./practitioner-detail-phase'), { ssr: false });

const FORM_INITIAL_VALUES = {
  avatar: '',
  name: '',
  gender: '',
  birthDay: null,
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
      id: 1,
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

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

interface PractitionerFormProps extends DefaultFormProps {
  initData?: Practitioner;
  tab?: PhaseType;
}

const PractitionerForm: FC<PractitionerFormProps> = ({ initData, open, onCancel, tab }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [steps, setSteps] = useState<StepsType>({
    currentStep: 'detail',
    nextStep: 'contact',
    historySteps: ['detail'],
  });

  const theme = useTheme();

  const isEdit = !!initData;

  const initialValues = useMemo(
    () => ({
      ...FORM_INITIAL_VALUES,
      ...initData,
      enrole: initData?.roleId,
      language: initData?.languages?.[0]?.id,
      organisation: initData?.practitionerOrganisations?.[0]?.organisationId,
      premise: initData?.practitionerPremises?.[0]?.premiseId,
      emails: initData?.emails?.map(email => email?.email) || FORM_INITIAL_VALUES.emails,
      phoneNumbers:
        initData?.phones?.map(phone => ({
          phoneValue: phone?.number,
          countryCode: phone?.isoNumber,
          isPrimary: phone?.preferred,
        })) || FORM_INITIAL_VALUES.phoneNumbers,
      addresses:
        initData?.addresses?.map(address => ({
          label: address?.name,
          address: address?.line1,
          secondAddress: address?.line2,
          postal: address?.postal,
          city: address?.city,
          country: address?.country,
          unitNo: address?.unitNo,
        })) || FORM_INITIAL_VALUES.addresses,
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
  }, [tab, steps]);

  return (
    <AvixoFixedContainer
      title={initData ? 'Edit Practitioner' : 'Add New Practitioner'}
      display={open}
      onClose={onCancel}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any, { setSubmitting }) => {
          setSubmitting(true);
          if (isEdit || steps.currentStep === 'role') {
            if (inputRef?.current) {
              inputRef.current.value = JSON.stringify(values);
            }
            form.current?.submit();
          } else {
            handleUpdatePhase(PhaseAction.NEXT);
          }
        }}
        validationSchema={PractitionerByStepSchema[steps.currentStep]}
      >
        {({ ...formikProps }) => (
          <Form ref={form} method="POST" data-cy="form" onSubmit={formikProps.handleSubmit} noValidate>
            <input type="text" hidden value={isEdit ? 'update-practitioner' : 'add-practitioner'} name="action" />
            <input ref={inputRef} hidden name="practitionerBody" />
            <LinearProgress
              variant="determinate"
              value={getProgressBarPractitioner(steps.currentStep, PHASES)}
              sx={{ color: theme.palette.primary.light }}
            />
            <Box
              sx={{
                flex: '6',
                overflowY: 'scroll',
                paddingBottom: '4px',
                overflow: 'auto',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'white',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#E0E0E0',
                },
              }}
            >
              <Box sx={{ display: steps.currentStep !== 'detail' ? 'none' : 'block' }}>
                <PractitionerDetailPhase formikProps={formikProps} />
              </Box>
              <Box sx={{ display: steps.currentStep !== 'contact' ? 'none' : 'block' }}>
                <PractitionerContactPhase formikProps={formikProps} />
              </Box>
              <Box sx={{ display: steps.currentStep !== 'profession' ? 'none' : 'block' }}>
                <PractitionerProfessionPhase formikProps={formikProps} />
              </Box>
              <Box sx={{ display: steps.currentStep !== 'qualification' ? 'none' : 'block' }}>
                <PractitionerQualificationPhase formikProps={formikProps} />
              </Box>
              <Box sx={{ display: steps.currentStep !== 'role' ? 'none' : 'block' }}>
                <PractitionerRolePhase formikProps={formikProps} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ padding: '28px 26px', display: 'flex', alignItems: 'center' }}>
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
            </Box>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default PractitionerForm;
