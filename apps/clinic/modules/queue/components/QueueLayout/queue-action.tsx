import AppointmentForm from 'modules/appointment/components/appointment-form';
import { QUEUE_ACTION } from 'modules/queue/constants';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import AddPatientToQueueForm from '../AddPatientToQueueForm/add-patient-to-queue-form';

const QueueAction: React.FC = () => {
  const router = useRouter();
  const { action } = router.query;

  const goToMainPage = useCallback(() => {
    router.push({ pathname: router.pathname, query: null });
  }, [router]);

  switch (action) {
    case QUEUE_ACTION.ADD_PATIENT_TO_QUEUE:
      return <AddPatientToQueueForm onCancel={goToMainPage} open />;

    case QUEUE_ACTION.ADD_APPOINTMENT:
      return <AppointmentForm onCancel={goToMainPage} open />;

    default:
      return null;
  }
};

export default QueueAction;
