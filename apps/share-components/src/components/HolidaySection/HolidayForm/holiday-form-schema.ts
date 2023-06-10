import * as Yup from 'yup';

const HolidayFormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  dayOfWeek: Yup.string().required('Required'),
  slotType: Yup.string().required('Required'),
  slotFrom: Yup.date().required('Required'),
  slotTo: Yup.date().required('Required'),
  description: Yup.string().required('Required'),
});

export default HolidayFormSchema;
