import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';
import { EMAIL_TEMPLATE_ACTION } from 'modules/setting/constants/email-template';
import Link from 'next/link';
import { useRef } from 'react';
import { AvixoHTMLEditor, DefaultFormProps, yup } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { EMAIL_TEMPLATE_TYPES } from '../constants';
import { EMAIL_TEMPLATE_PARAMS, EmailTemplateFormValues } from './email-template-types';

interface EmailTemplateFormProps extends DefaultFormProps {
  initData?: EmailTemplateFormValues;
}

const Form = styled('form')(() => ({
  height: '100%',
}));
const chipSxProps: Parameters<typeof Autocomplete>[0]['ChipProps'] = {
  sx: { color: 'black.main', backgroundColor: '#eeedfc', fontSize: '13px' },
};

const EmailTemplateFormSchema = yup.object().shape({
  type: yup.string().required(),
  name: yup.string().required(),
  to: yup.array().of(yup.string().email()),
  cc: yup.array().of(yup.string().email()),
  bcc: yup.array().of(yup.string().email()),
  subject: yup.string().required(),
  content: yup.string().required(),
  htmlContent: yup.string().optional(),
});

const EmailTemplateForm: React.FC<EmailTemplateFormProps> = ({ initData }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      ...{
        type: '',
        name: '',
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        content: '',
      },
      ...initData,
    },
    validationSchema: EmailTemplateFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      formRef.current?.submit();
    },
  });

  const action = initData?.id ? EMAIL_TEMPLATE_ACTION.EDIT_EMAIL_TEMPLATE : EMAIL_TEMPLATE_ACTION.CREATE_EMAIL_TEMPLATE;

  return (
    <Form
      ref={formRef}
      onSubmit={formik.handleSubmit}
      action={PAGE_URLS.SETTING_EMAIL_TEMPLATE()}
      method={initData?.id ? 'PUT' : 'POST'}
      noValidate
    >
      <input hidden name="action" value={action} />
      <textarea hidden value={formik.values.content} name="content" />
      <textarea hidden value={formik.values.htmlContent} name="htmlContent" />
      <input hidden name="to[]" value={formik.values.to.join(' ')} />
      <input hidden name="cc[]" value={formik.values.cc.join(' ')} />
      <input hidden name="bcc[]" value={formik.values.bcc.join(' ')} />
      <Box sx={{ p: 3 }}>
        <FormControl fullWidth>
          <TextField
            required
            select
            label="Template Type"
            {...formik.getFieldProps('type')}
            error={!!(formik.touched.type && formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            {Object.keys(EMAIL_TEMPLATE_TYPES).map(key => (
              <MenuItem key={key} value={key}>
                {EMAIL_TEMPLATE_TYPES[key]}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            label="Template Name"
            {...formik.getFieldProps('name')}
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>
        <FormControl fullWidth>
          <Autocomplete
            freeSolo
            multiple
            options={[]}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField {...params} label="To" InputProps={{ ...params.InputProps }} sx={{ mb: '0 !important' }} />
            )}
            ChipProps={chipSxProps}
            {...formik.getFieldProps('to')}
            onChange={(_, value) => formik.setFieldValue('to', value)}
          />
        </FormControl>
        <Stack direction="row" gap={3}>
          <FormControl fullWidth>
            <Autocomplete
              freeSolo
              multiple
              options={[]}
              renderInput={params => (
                <TextField {...params} label="Cc" InputProps={{ ...params.InputProps }} sx={{ mb: '0 !important' }} />
              )}
              ChipProps={chipSxProps}
              {...formik.getFieldProps('cc')}
              onChange={(_, value) => formik.setFieldValue('cc', value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              freeSolo
              multiple
              options={[]}
              renderInput={params => (
                <TextField {...params} label="Bcc" InputProps={{ ...params.InputProps }} sx={{ mb: '0 !important' }} />
              )}
              ChipProps={chipSxProps}
              {...formik.getFieldProps('bcc')}
              onChange={(_, value) => formik.setFieldValue('bcc', value)}
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <TextField
            required
            label="Subject"
            {...formik.getFieldProps('subject')}
            error={!!(formik.touched.subject && formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
        </FormControl>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">Params</Typography>
            <Typography variant="body2" color="neutral.500">
              {EMAIL_TEMPLATE_PARAMS.join(', ')}
            </Typography>
          </Box>
          <AvixoHTMLEditor
            initialValue={formik.initialValues.content}
            onChangeValue={(html, text) => {
              formik.setFieldValue('htmlContent', html);
              formik.setFieldValue('content', text);
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ py: 3, px: 4, display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
        <Link href={PAGE_URLS.SETTING_EMAIL_TEMPLATE()}>
          <Button variant="text">Cancel</Button>
        </Link>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Form>
  );
};

export default EmailTemplateForm;
