import { Circle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Form, Formik } from 'formik';
import { useCallback, useRef } from 'react';
import { AvixoFixedContainer, DefaultFormProps } from 'share-components';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import router from 'next/router';
import { PAGE_URLS } from 'share-components/src/constants';
import { NoticeFormValues } from './notice-types';

interface NoticeFormProps extends DefaultFormProps {
  initData?: NoticeFormValues;
}

const noticeTypes = [
  { type: 'Tasks', color: 'warning.main' },
  { type: 'Staff', color: 'primary.main' },
  { type: 'Inventory', color: 'success.main' },
];

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '32px !important',
}));

const initialValues = {
  title: '',
  category: '',
  startDate: '',
  endDate: '',
  comments: '',
};

const NoticeForm: React.FC<NoticeFormProps> = ({ initData = {} as NoticeFormValues, open, onCancel }) => {
  const formTitle = initData?.id ? 'Edit Notice' : 'Add Notice';
  const form = useRef<HTMLFormElement | null>(null);

  const onSubmit = () => {
    form.current?.submit();
  };

  const renderStartDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField required name="wrappedStartDate" {...params} />,
    [],
  );

  const handleChangeGivenDate = useCallback(
    (value: Date | null, field: string, setFieldValue: (field: string, value: string) => void) => {
      setFieldValue(field, value?.toISOString() || '');
    },
    [],
  );

  const goToDeleteNotice = useCallback(() => {
    router.push(PAGE_URLS.DELETE_NOTICE('noticeID'));
  }, []);

  return (
    <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, setFieldValue, values }) => (
          <Form method="POST" ref={form} onSubmit={handleSubmit} noValidate style={{ height: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack sx={{ px: 3, height: '100%' }}>
                <Box sx={{ flex: 1 }}>
                  <TextField fullWidth label="Title" name="Title" required />
                  <TextField fullWidth select name="Category" label="Category" required>
                    {noticeTypes.map(item => (
                      <MenuItem key={item.type} value={item.type}>
                        <ListItemIcon sx={{ minWidth: 26, height: 20 }}>
                          <Circle sx={{ color: item.color, fontSize: 16, mt: '2px' }} />
                        </ListItemIcon>
                        <Typography display="inline-block">{item.type}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                  <Grid container spacing={2} columns={12}>
                    <Grid item sm={12} md={6}>
                      <FormControlComponent fullWidth>
                        <DatePicker
                          label="Date"
                          renderInput={renderStartDateInput}
                          onChange={() => handleChangeGivenDate(null, 'startDate', setFieldValue)}
                          value={values.startDate}
                        />
                      </FormControlComponent>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <FormControlComponent fullWidth>
                        <DatePicker
                          label="Date"
                          renderInput={renderStartDateInput}
                          onChange={() => handleChangeGivenDate(null, 'endDate', setFieldValue)}
                          value={values.endDate}
                        />
                      </FormControlComponent>
                    </Grid>
                  </Grid>
                  <TextField label="Comments" name="comments" multiline rows={5} fullWidth />
                </Box>
                <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between', my: 3 }}>
                  {initData?.id ? (
                    <Button variant="text" color="error" onClick={goToDeleteNotice}>
                      Delete
                    </Button>
                  ) : (
                    <Box />
                  )}
                  <Stack direction="row" spacing={2}>
                    <Button variant="text">Cancel</Button>
                    <Button>{initData?.id ? 'Save Update' : 'Add Notice'}</Button>
                  </Stack>
                </Stack>
              </Stack>
            </LocalizationProvider>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default NoticeForm;
