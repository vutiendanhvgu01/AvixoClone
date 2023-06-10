import * as Yup from 'yup';

const TimeZoneSchema = Yup.object().shape({
  name: Yup.string().required('Time zone is required'),
});

export default TimeZoneSchema;
