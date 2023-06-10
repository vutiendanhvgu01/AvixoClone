import { useState } from 'react';
import { Appointment } from 'modules/appointment/components/appointment-types';
import { FormikValues } from 'formik';
import formatEditAppointmentReq from 'modules/appointment/utils/formatEditAppointmentReq';
import AppointmentProxy from 'modules/appointment/api/appointment-proxy';

interface UseAppointmentDetailProps {
  onSubmitSuccess?: () => void;
}

const useAppointmentDetail = ({ onSubmitSuccess }: UseAppointmentDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<Appointment>();
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const open = (appointment: Appointment) => {
    setService(appointment);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const closeSnackbar = () => setSnackbarMessage('');

  const onSubmit = async (values: FormikValues) => {
    const params = formatEditAppointmentReq(values, service);
    const response = await AppointmentProxy.editAppointment(params);
    if (response.originResponse.status === 200) {
      onSubmitSuccess?.();

      close();
      setSnackbarMessage(`<b>Appointment ${service?.uuid}</b> has been succesfully updated`);
    }
  };

  return {
    isOpen,
    open,
    close,
    service,
    onSubmit,
    snackbarMessage,
    closeSnackbar,
  };
};

export default useAppointmentDetail;
