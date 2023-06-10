// TODO : fix types once we receive the correct specialty from the API
interface IAppointmentType {
  specialty: string;
  service?: string;
}

const mapAppointmentType = ({ specialty, service = 'Delivery' }: IAppointmentType) => {
  if (service === 'Visit') return specialty === 'Nurse' ? 'Nurse House Call' : 'Doctor House Call';
  return specialty === 'Ambulance' ? 'Ambulance' : 'Medication Delivery';
};

export default mapAppointmentType;
