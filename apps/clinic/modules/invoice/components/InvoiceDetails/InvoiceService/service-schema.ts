import { yup } from 'share-components';

const ServiceSchema = yup.object().shape({
  type: yup.string().required('Required'),
  item: yup.string().required('Required'),
  clinicPrice: yup.string().required('Required'),
  costPrice: yup.number().min(0).required('Required'),
  description: yup.string(),
  discount: yup.number().moreThan(0).required('Required'),
  discountType: yup.string(),
  discountRemark: yup.string(),
  quantity: yup.number().integer().required('Required'),
  isRedeem: yup.boolean(),
});

export default ServiceSchema;
