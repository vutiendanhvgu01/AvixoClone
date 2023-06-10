import * as Yup from 'yup';

const AddressFormSchema = Yup.object().shape({
  postal: Yup.string().required('Required'),
});

export default AddressFormSchema;
