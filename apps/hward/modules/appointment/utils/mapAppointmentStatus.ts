import { HwardAppointmentStatus, JarvisAppointmentStatus } from '../components/appointment-types';

function mapAppointmentStatus(status: JarvisAppointmentStatus): HwardAppointmentStatus {
  const statusMap: Record<JarvisAppointmentStatus, HwardAppointmentStatus> = {
    draft: 'Received',
    accepted: 'Received',
    assigned: 'Assigned',
    inTransit: 'Ongoing',
    inProgress: 'Ongoing',
    visitStart: 'Ongoing',
    discharged: 'Completed',
    visitEnd: 'Completed',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return statusMap[status] || status;
}

export default mapAppointmentStatus;
