import { Box, MenuItem, FormControl, Button, TextField, styled, Divider, Typography } from '@mui/material';
import { AvixoCard, AvixoDrawerConfirm, AvixoHTMLEditor, yup } from 'share-components';
import { useRef, useState } from 'react';
import { PAGE_URLS } from 'share-components/src/constants';
import type { Patient } from 'modules/patient/types/patient';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { Referral, ReferralAction } from 'modules/medical-record/types/referral';
import { REFERRAL_ACTION } from 'modules/medical-record/constants/referral';

const FormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  padding: '24px 32px 32px 32px',
  margin: '24px -32px 0 -32px',
  borderTop: `1px solid ${theme.palette.divider}`,
  button: {
    marginLeft: '16px',

    '&:first-child': {
      marginLeft: '0',
    },
  },
}));

const ReferralFormSchema = yup.object().shape({
  title: yup.string().trim().required('Required'),
  referralTypeId: yup.number().required('Required'),
});

export interface ReferralFormProps {
  patient: Patient;
  initData?: Referral;
  action?: ReferralAction;
}

// Will replace to dynamic options
interface ReferralTemplate {
  documentCategory: string;
  referralTypeId: number;
}
const TEMPLATES = [
  {
    label: 'Default',
    value: {
      documentCategory: 'generic-referral',
      referralTypeId: 1,
    },
  },
];

const TemplateReferralForm: React.FC<ReferralFormProps> = ({ patient, initData, action = REFERRAL_ACTION.VIEW }) => {
  const cartTitle = action === REFERRAL_ACTION.VIEW ? initData?.title : 'Referral Information';
  const form = useRef<HTMLFormElement | null>(null);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const toggleConfirmDelete = () => {
    setShowConfirmDelete(!isShowConfirmDelete);
  };

  const onSubmit = () => {
    form.current?.submit();
  };

  return (
    <>
      <AvixoCard title={cartTitle} withCardHeadingBorder={action !== REFERRAL_ACTION.VIEW}>
        {/* View Mode */}
        {action === REFERRAL_ACTION.VIEW ? (
          <Typography
            variant="body2"
            component="div"
            dangerouslySetInnerHTML={{ __html: initData?.description || '' }}
          />
        ) : (
          /* Add/Edit Mode */
          <Formik
            initialValues={{
              title: '',
              description: '',
              referralTypeId: 1, // Hardcode now. Will replace with the dynamic data from API later
              template: '',
              patientId: patient.id,
              ...initData,
            }}
            validationSchema={ReferralFormSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, getFieldProps, errors, values, touched, handleChange, setFieldValue }) => (
              <Form ref={form} method="POST" noValidate onSubmit={handleSubmit}>
                <input type="hidden" name="action" value={initData?.id ? 'update-referral' : 'create-referral'} />
                <input type="hidden" {...getFieldProps('documentCategory')} />
                <input type="hidden" {...getFieldProps('referralTypeId')} />
                <input type="hidden" {...getFieldProps('description')} />
                <input type="hidden" {...getFieldProps('patientId')} />
                <input type="hidden" {...getFieldProps('id')} />
                <Box sx={{ pt: 3 }}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      label="Select Template"
                      required
                      name="template"
                      onChange={e => {
                        const { documentCategory, referralTypeId } = e.target.value as unknown as ReferralTemplate;
                        handleChange(e);
                        setFieldValue('documentCategory', documentCategory);
                        setFieldValue('referralTypeId', referralTypeId);
                      }}
                      value={values.template || TEMPLATES[0].value}
                      error={!!(errors.template && touched.template)}
                      helperText={touched.template && errors.template}
                    >
                      {/* Hardcode now. Will replace with the dynamic data from API later */}
                      {TEMPLATES.map(({ label, value }) => (
                        <MenuItem value={`${value}`} key={value.referralTypeId}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Box>
                <Divider sx={{ mx: -3, mb: 3 }} />

                <FormControl fullWidth>
                  <TextField
                    label="Title"
                    required
                    {...getFieldProps('title')}
                    error={!!(errors.template && touched.template)}
                    helperText={touched.template && errors.template}
                  />
                </FormControl>
                <AvixoHTMLEditor
                  ctnSxProps={{ height: 350 }}
                  initialValue={initData?.description}
                  onChangeValue={value => setFieldValue('description', value)}
                />
                <FormActions>
                  {initData?.id && (
                    <Button variant="text" color="error" sx={{ mr: 'auto' }} onClick={toggleConfirmDelete}>
                      Delete
                    </Button>
                  )}
                  <Box>
                    <Link href={PAGE_URLS.PATIENT_MEDICAL_RECORD(patient.uuid)}>
                      <Button variant="text">Back</Button>
                    </Link>
                    <Button type="submit">Submit</Button>
                  </Box>
                </FormActions>
              </Form>
            )}
          </Formik>
        )}
      </AvixoCard>
      <AvixoDrawerConfirm
        open={isShowConfirmDelete}
        handleClose={toggleConfirmDelete}
        title="Delete Referral"
        action="delete-referral"
        id={initData?.id}
        confirmContent={
          <Typography variant="body2">This action cannot be undone. Are you sure you want to delete?</Typography>
        }
        inputProps={{
          name: 'reason',
          label: 'Reason of deletion',
          required: true,
          defaultValues: '',
        }}
      />
    </>
  );
};

export default TemplateReferralForm;
