import * as Yup from 'yup';

const TimeSlotSchema = Yup.object().shape({
  dayOfWeek: Yup.string().required('Day of week is required'),
  slotType: Yup.string().required('Slot type is required'),
  fromTime: Yup.string().required('From is required'),
  toTime: Yup.string().required('To is required'),
});

export default TimeSlotSchema;
