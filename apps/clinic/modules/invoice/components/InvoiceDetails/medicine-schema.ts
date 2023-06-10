import * as Yup from 'yup';

const MedicineSchema = Yup.object().shape({
  administeredProduct: Yup.string().required('Required'),
  doseQuantity: Yup.number().required('Required').min(0),
  site: Yup.string().required('Required'),
  route: Yup.string().required('Required'),
  batchNo: Yup.string().required('Required'),
  manufacturer: Yup.string().required('Required'),
  expiryDate: Yup.date().required('Required'),
  administeredBy: Yup.string().required('Required'),
  dateOfAdministration: Yup.date().required('Required'),
  orderedBy: Yup.string().required('Required'),
});

export default MedicineSchema;
