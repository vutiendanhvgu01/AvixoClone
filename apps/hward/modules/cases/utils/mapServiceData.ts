import { formatDate } from 'share-components/src/utils/formatUtils';
import dayjs from 'dayjs';
import { Appointment } from 'modules/appointment/components/appointment-types';
import orderBy from 'lodash/orderBy';
import { CaseResponse } from '../api/case-type';
import { ServiceResponse } from '../api/service-type';

function transformService(service: ServiceResponse): Appointment {
  return {
    uuid: `S-${service.id}`,
    date: service.scheduleStart,
    startTime: formatDate(service.scheduleStart, 'HH:mm', true),
    endTime: formatDate(service.scheduleEnd, 'HH:mm', true),
    duration: dayjs(service.scheduleEnd).diff(service.scheduleStart, 'minutes'),
    type: service.type,
    specialty: service.specialty,
    providers: service.providers ?? [],
    status: service.status,
    orderRequest: service.clinicalNote ?? '',
    additionalComments: service.patientNote ?? '',
    notes: service.jarvisNote ?? '',
    patientCondition: service.patientCondition ?? '',
  };
}

function mapServiceData(thisCase: CaseResponse): Appointment[] | [] {
  const { drafts, services } = thisCase;
  if (!services && !drafts) return [];
  const result: Appointment[] = [];

  services?.forEach(thisService => result.push(transformService(thisService)));
  drafts?.forEach(draft => result.push(transformService(draft)));

  const sorted = orderBy(result, ['date', 'startTime'], ['desc', 'desc']);
  return sorted;
}

export default mapServiceData;
