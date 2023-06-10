import { Box, Button, styled, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRef } from 'react';
import { AvixoHTMLEditor } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

interface HeaderFooterFormValues {
  header: string;
  footer: string;
}

interface HeaderFooterFormProps {
  initData?: HeaderFooterFormValues;
}

const FormActions = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  margin: '0 -32px',
  textAlign: 'right',
  padding: '24px 32px 0',
  button: {
    marginLeft: '12px',
  },
}));

const HeaderFooterForm: React.FC<HeaderFooterFormProps> = ({ initData }) => {
  const form = useRef<HTMLFormElement | null>(null);

  const formik = useFormik({
    initialValues: {
      header: '',
      footer: '',
      ...initData,
    },
    onSubmit: (values: HeaderFooterFormValues, { setSubmitting }) => {
      setSubmitting(true);
      form.current?.submit();
    },
  });

  const { isSubmitting, setFieldValue, handleSubmit } = formik;

  return (
    <Box pt={3} px={4} pb={2}>
      <form ref={form} method="POST" onSubmit={handleSubmit} noValidate>
        <Box sx={{ mb: 10 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Header
          </Typography>
          <AvixoHTMLEditor
            ctnSxProps={{ height: 350 }}
            initialValue={initData?.header}
            onChangeValue={value => setFieldValue('header', value)}
          />
        </Box>
        <Box sx={{ mb: 10 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Footer
          </Typography>
          <AvixoHTMLEditor
            ctnSxProps={{ height: 350 }}
            initialValue={initData?.footer}
            onChangeValue={value => setFieldValue('footer', value)}
          />
        </Box>

        <FormActions>
          <Link href={PAGE_URLS.SETTING_HEADER_FOOTER()}>
            <Button variant="text" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </FormActions>
      </form>
    </Box>
  );
};

export default HeaderFooterForm;
