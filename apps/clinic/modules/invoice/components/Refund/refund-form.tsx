import {
  Container,
  TextField,
  Button,
  FormControl,
  LinearProgress,
  Select,
  MenuItem,
  TextFieldProps,
} from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import { AvixoFixedContainer } from 'share-components';
import yup from 'share-components/src/services/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form, FormActions, FormBody } from './form-style';

type RefundFormValues = {
  refundType: 'Medicine' | 'Service';
  item?: string;
  service?: string;
  clinicPrice: number;
  quantity: number;
  expiryDate?: string;
  remark?: string;
};

const RefundFormSchema = yup.object().shape({
  refundType: yup.string(),
  remark: yup.string(),
  quantity: yup.number(),
  clinicPrice: yup.number(),
  item: yup.string(),
  service: yup.string(),
  expiryDate: yup.date(),
});

export interface MedicineRefundFormProps {
  initData?: RefundFormValues;
  errorMessage?: string;
  open: boolean;
  onCancel: () => void;
}
const refundTypes = [
  { id: 0, name: 'Medicine' },
  { id: 1, name: 'Service' },
];
const items = [{ id: 0, name: 'Paracetemol 10mg' }];
const services = [{ id: 0, name: 'Doctor Consultant' }];

const RefundForm: React.FC<MedicineRefundFormProps> = (props: MedicineRefundFormProps) => {
  const { initData, onCancel } = props;
  const form = useRef<HTMLFormElement | null>(null);
  const backToMainPage = useCallback(() => {
    if (onCancel) onCancel?.();
  }, [onCancel]);

  const formik = useFormik({
    initialValues: {
      ...{
        refundType: 'Medicine',
        item: 'Paracetemol 10mg',
        clinicPrice: 0,
        quantity: 0,
        expiryDate: '',
        remark: '',
      },
      ...initData,
    },
    validationSchema: RefundFormSchema,
    onSubmit: (values: RefundFormValues, { setSubmitting }) => {
      setSubmitting(true);
    },
  });

  const { getFieldProps, touched, values, errors, isSubmitting, setFieldValue, handleBlur } = formik;
  const isCheckEnrolmentBtnDisabled = isSubmitting || Object.keys(errors).length > 0;
  const renderExpireDateInput = useCallback(
    (params: JSX.IntrinsicAttributes & TextFieldProps) => (
      <TextField {...params} name="expiryDate" required error={!!(touched.expiryDate && errors.expiryDate)} />
    ),
    [errors.expiryDate, handleBlur, touched.expiryDate],
  );
  const handleChangeExpireDate = useCallback(
    (value: Date | null) => {
      setFieldValue('expiryDate', value);
    },
    [setFieldValue],
  );

  return (
    <AvixoFixedContainer title="Patient Profile" display onClose={backToMainPage}>
      <LinearProgress variant="determinate" value={0} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form ref={form} onSubmit={formik.handleSubmit} noValidate>
          <FormBody>
            <Container sx={{ padding: '0 0 20px 0' }}>
              <FormControl fullWidth>
                <Select id="refund-type" required label="Refund Type" {...getFieldProps('refundType')}>
                  {refundTypes.map((type: any) => (
                    <MenuItem key={`type-${type.id}`} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {values.refundType === 'Medicine' && (
                <FormControl fullWidth>
                  <Select id="item-type" required label="Item" {...getFieldProps('item')}>
                    {items.map((item: any) => (
                      <MenuItem key={`item-${item.id}`} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {values.refundType === 'Service' && (
                <FormControl fullWidth>
                  <Select id="service" required label="Service" {...getFieldProps('item')}>
                    {services.map((service: any) => (
                      <MenuItem key={`item-${service.id}`} value={service.name}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl fullWidth>
                <TextField
                  required
                  type="number"
                  label="Clinic Price"
                  {...getFieldProps('clinicPrice')}
                  error={!!(touched.clinicPrice && errors.clinicPrice)}
                  helperText={touched.clinicPrice && errors.clinicPrice}
                />
              </FormControl>
              {values.refundType === 'Medicine' && (
                <>
                  <FormControl>
                    <TextField
                      required
                      type="number"
                      label="Quantity"
                      {...getFieldProps('quantity')}
                      error={!!(touched.quantity && errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                    <DatePicker
                      label="Expiry date"
                      renderInput={renderExpireDateInput}
                      onChange={handleChangeExpireDate}
                      minDate={new Date()}
                      value={values.expiryDate}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Remark"
                      {...getFieldProps('remark')}
                      error={!!(touched.remark && errors.remark)}
                      helperText={touched.remark && errors.remark}
                    />
                  </FormControl>
                </>
              )}
              {values.refundType === 'Service' && (
                <FormControl>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Quantity"
                    {...getFieldProps('quantity')}
                    error={!!(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </FormControl>
              )}
            </Container>
          </FormBody>
          <FormActions>
            <Button onClick={backToMainPage} variant="text" disabled={isSubmitting}>
              Back
            </Button>
            <Button type="submit" disabled={isCheckEnrolmentBtnDisabled}>
              Save
            </Button>
          </FormActions>
        </Form>
      </LocalizationProvider>
    </AvixoFixedContainer>
  );
};

export default RefundForm;
