import { Box, Button, FormControl, Grid, styled, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FieldArray, Form, Formik } from 'formik';
import { useRef } from 'react';
import { AvixoCard, CalendarIcon, PlusIcon } from 'share-components';
import Yup from 'share-components/src/services/yup';

const InfoList = styled(Box)(() => ({
  textAlign: 'right',
}));

const Info = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: 24,
  justifyContent: 'flex-end',

  h6: {
    width: 130,
    textAlign: 'left',
  },
}));

const Action = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: 16,
  marginTop: 8,

  button: {
    color: theme.palette.neutral?.[700],
    opacity: 0.48,
    padding: 0,
    '&:hover': {
      background: 'none',
      opacity: 1,
    },
  },
}));

interface RefundFormValues {
  refunds: {
    payment_method: string;
    reference_number: number | null;
    date: string;
    amount: number;
  }[];
}

interface RefundFormProps {
  initData: RefundFormValues;
}

const RefundFormSchema = Yup.object().shape({
  refunds: Yup.array().of(
    Yup.object().shape({
      payment_method: Yup.string().required('Required'),
      amount: Yup.number().required('Required'),
      date: Yup.string().required('Required'),
    }),
  ),
});

const RefundForm: React.FC<RefundFormProps> = ({ initData }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const handleSubmit = (_values: RefundFormValues) => {
    form.current?.submit();
  };

  return (
    <AvixoCard
      title="Credit Amount"
      action={
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography color="neutral.500" variant="subtitle2" sx={{ mr: 6 }}>
            Total
          </Typography>
          <Typography variant="h5">
            <Typography variant="subtitle1" component="span">
              S$
            </Typography>
            324.00
          </Typography>
        </Box>
      }
    >
      <Formik
        initialValues={{ refunds: initData?.refunds || [] }}
        onSubmit={handleSubmit}
        validationSchema={RefundFormSchema}
      >
        {({ getFieldProps, values, submitForm, setFieldValue, getFieldMeta }) => (
          <Form ref={form} onSubmit={submitForm} noValidate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FieldArray
                name="refunds"
                render={arrayHelpers => (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2.25 }}>
                      Refund type
                    </Typography>
                    {values.refunds && values.refunds.length > 0
                      ? values.refunds.map((refund, index) => {
                          const fieldProps = (field: string) => {
                            const errorMsg = getFieldMeta(field).touched && getFieldMeta(field).error;
                            return {
                              ...getFieldProps(field),
                              error: !!errorMsg,
                              helperText: errorMsg,
                            };
                          };
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Grid container key={index} spacing={3}>
                              <Grid item xs={3}>
                                <FormControl fullWidth>
                                  <TextField
                                    required
                                    label="Payment Method"
                                    {...fieldProps(`refunds.${index}.payment_method`)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={3}>
                                <FormControl fullWidth>
                                  <TextField
                                    label="Reference Number"
                                    {...fieldProps(`refunds.${index}.reference_number`)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={3}>
                                <FormControl fullWidth>
                                  <DatePicker
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={refund.date || null}
                                    onChange={date => setFieldValue(`refunds.${index}.date`, date)}
                                    components={{ OpenPickerIcon: CalendarIcon }}
                                    renderInput={params => (
                                      <TextField required {...params} {...fieldProps(`refunds.${index}.date`)} />
                                    )}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={3}>
                                <FormControl fullWidth>
                                  <TextField required label="Amount" {...fieldProps(`refunds.${index}.amount`)} />
                                </FormControl>
                              </Grid>
                            </Grid>
                          );
                        })
                      : null}
                    <Action>
                      <Button
                        disableRipple
                        variant="text"
                        startIcon={<PlusIcon />}
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Refund Method
                      </Button>
                    </Action>
                  </Box>
                )}
              />
              <InfoList>
                <Info>
                  <Typography color="neutral.500" variant="subtitle2" sx={{ mr: 6 }}>
                    Amount Refunded
                  </Typography>
                  <Typography variant="h5">
                    <Typography variant="subtitle1" component="span">
                      S$
                    </Typography>
                    324.00
                  </Typography>
                </Info>
                <Info>
                  <Typography color="neutral.500" variant="subtitle2" sx={{ mr: 6 }}>
                    Credit Balance
                  </Typography>
                  <Typography variant="h5">
                    <Typography variant="subtitle1" component="span">
                      S$
                    </Typography>
                    0.00
                  </Typography>
                </Info>
              </InfoList>
            </LocalizationProvider>
          </Form>
        )}
      </Formik>
    </AvixoCard>
  );
};

export default RefundForm;
