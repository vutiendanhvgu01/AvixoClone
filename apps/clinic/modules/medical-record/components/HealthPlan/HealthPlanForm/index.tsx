import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { AvixoDrawerConfirm, yup } from 'share-components';
import { CarePlan } from 'modules/medical-record/types/care-plan';
import AvixoDrawerConfirmProps from 'share-components/src/components/AvixoDrawerComfirm/avixo-drawer-confirm-types';
import { VaccinationHistory as VaccinationHistoryProps } from 'modules/medical-record/types/vaccination-history';
import ChronicDisease from './chronic-disease-management';
import HealthyGoalSection from './components/health-goal-section';
import { GoalItem } from './components/health-goal-types';
import RecommendedNextVisit from './recommended-next-visit';
import ScreeningEligibility from './screening-eligibility';
import VaccinationHistory from './vaccination-history';

const CONFIRMATION_ACTION: { [key: string]: AvixoDrawerConfirmProps } = {
  delete: {
    title: 'Delete Health Plan',
    inputProps: {
      name: 'Reason',
      required: true,
      label: 'Reason of deletion',
      defaultValues: 'This data is not needed anymore',
    },
    footerProps: {
      confirmText: 'Yes, Delete',
      confirmRestProps: {
        variant: 'contained',
      },
    },
    confirmContent: 'Are you sure want to delete this health plan?',
  },
  confirm: {
    title: 'Confirmation',
    footerProps: {
      confirmText: 'Proceed',
      confirmRestProps: {
        variant: 'contained',
      },
    },
    confirmContent: (
      <Box>
        <Typography color="neutral.900" sx={{ mb: 2 }}>
          By clicking submit, I declare that the above information is true to the best of my knowledge and I declare
          that I have completed the Health Plan discussion in accordance with the Care Protocol for the Health Plan.
          After submitting the completed Health Plan, the details will be viewable by the resident on HealthHub.
        </Typography>
        <Typography color="neutral.900">Click ‘Proceed’ to confirm your submission</Typography>
      </Box>
    ),
  },
};

interface AddEditHealthPlanFormProps {
  initData?: CarePlan;
  vaccinationHistory?: VaccinationHistoryProps[];
}

type ConfirmationAction = 'delete' | 'confirm';

const AddEditHealthPlanForm: React.FC<AddEditHealthPlanFormProps> = ({ initData, vaccinationHistory }) => {
  const [confirmation, setConfirmation] = React.useState<{
    show: boolean;
    action: ConfirmationAction;
  }>({
    show: false,
    action: 'confirm',
  });
  const form = useRef<HTMLFormElement | null>(null);

  const toggleConfirmation = React.useCallback(
    (action: ConfirmationAction) => {
      setConfirmation({ action, show: true });
    },
    [confirmation],
  );

  const formik = useFormik({
    initialValues: {
      generalNotes:
        'Patient has good control of asthma with regular preventive inhaler. She cited her wish to attend her grandchildren’s wedding as the main motivation to make lifestyle changes.',
      ...initData,
    },
    validationSchema: yup.object().shape({
      month: yup.number().required('month name Empty'),
      generalNotes: yup.string().required('General Notes name Empty'),
      year: yup
        .number()
        .test('len', 'Must more than 3 characters', val => !!(val && val.toString().length > 3))
        .required('Year name Empty'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      toggleConfirmation('confirm');
    },
  });

  return (
    <Card
      sx={{
        padding: '0 32px',
      }}
    >
      <form method="post" ref={form} noValidate onSubmit={formik.handleSubmit}>
        <input type="text" name="action" value={initData ? 'update-care-plan' : 'create-care-plan'} hidden />
        <ScreeningEligibility />
        <VaccinationHistory vaccinationHistory={vaccinationHistory} />
        <ChronicDisease />
        {initData && (
          <HealthyGoalSection
            carePlan={initData}
            onChange={(healthyGoals: GoalItem[]) => {
              console.log(healthyGoals);
            }}
          />
        )}

        <RecommendedNextVisit {...formik} />
        <input hidden {...formik.getFieldProps('uuid')} />
        <input hidden {...formik.getFieldProps('id')} />
        <input hidden {...formik.getFieldProps('intent')} />
        <Divider sx={{ mr: -3, ml: -3, mt: 4, mb: 3 }} />
        <Box sx={{ textAlign: 'right', justifyContent: 'space-between', display: 'flex' }}>
          <Button variant="text" color="error" onClick={() => toggleConfirmation('delete')}>
            Delete
          </Button>
          <Box>
            <Button
              variant="text"
              onClick={() => {
                form.current?.submit();
              }}
            >
              Cancel
            </Button>
            <Button sx={{ ml: 2 }} type="submit">
              Submit
            </Button>
          </Box>
        </Box>

        {confirmation.show && CONFIRMATION_ACTION[confirmation.action] && (
          <>
            <input hidden name="confirmation" value="true" />
            <AvixoDrawerConfirm
              open={confirmation.show}
              {...CONFIRMATION_ACTION[confirmation.action]}
              footerProps={{
                ...CONFIRMATION_ACTION[confirmation.action].footerProps,
                onConfirmClick: () => {
                  form.current?.submit();
                },
              }}
              handleClose={toggleConfirmation}
            />
          </>
        )}
      </form>
    </Card>
  );
};

export default AddEditHealthPlanForm;
