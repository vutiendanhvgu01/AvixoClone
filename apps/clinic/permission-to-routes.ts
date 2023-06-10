/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import { PermissionToRouteProps } from 'share-components';

const UUID_REGEX = '[a-zA-Z0-9\-]*';
const NO_ACTION = '((?!action).)*';

const PERMISSION_TO_ROUTES: PermissionToRouteProps = {
  'ALL-PATIENTS_READ': [
    {
      route: '/patient',
    },
    {
      route: '/patient?isNew=true',
    },
    {
      route: '/patient?isDeleted=true',
    },
    {
      regex: `/patient?${NO_ACTION}`,
    },
    {
      regex: `/patient\\?listId=${UUID_REGEX}$`,
    },
    {
      regex: `/patient/${UUID_REGEX}/dashboard\\?patientUUID=${UUID_REGEX}$`,
    },
    {
      regex: `/patient/${UUID_REGEX}((?!action|item|prescription|dispense|medical-record).)*$`,
    },
    {
      regex: `/patient/${UUID_REGEX}$`,
    },
    {
      regex: `/patient/${UUID_REGEX}/allergy`,
    },
    {
      regex: `/patient/${UUID_REGEX}/immunisation`,
    },
  ],
  'ALL-PATIENTS_CREATE': [
    {
      route: '/patient?action=add-patient',
    },
    {
      regex: `/patient/${UUID_REGEX}\\?patientUUID=${UUID_REGEX}&action=(?:add-allergy|add-immunisation)+`,
    },
    {
      regex: `/patient/${UUID_REGEX}(?:/dashboard)*\\?patientUUID=${UUID_REGEX}&action=(?:add-allergy|add-immunisation)+`,
    }
  ],
  'ALL-PATIENTS_UPDATE': [
    {
      regex: `/patient/${UUID_REGEX}\\?action=edit&*`,
    }
  ],
  'ALL-PATIENTS_DELETE': [
    {
      regex: `/patient/${UUID_REGEX}\\?action=delete$`,
    }
  ],
  'PATIENT-LIST_READ': [
    {
      route: '/patient/list',
    },
    {
      regex: `/patient/list/${UUID_REGEX}${NO_ACTION}$`,
    },
  ],
  'PATIENT-LIST_CREATE': [
    {
      route: '/patient/list?action=add',
    },
    {
      regex: `/patient/list/${UUID_REGEX}\\?action=add$`,
    },
    {
      regex: `/patient/list/${UUID_REGEX}\\?action=add-patient-to-list`,
    },
  ],
  'PATIENT-LIST_UPDATE': [
    {
      regex: `/patient/list/${UUID_REGEX}\\?action=edit`,
    },
  ],
  'PATIENT-LIST_DELETE': [
    {
      regex: `/patient/list/${UUID_REGEX}\\?action=delete`,
    },
    {
      regex: `/patient/list/${UUID_REGEX}\\?action=delete-patient&patientUUID=${UUID_REGEX}`,
    },
  ],
  'PRESCRIPTION_READ': [
    {
      regex: '^/prescription',
    },
    {
      regex: `/patient/${UUID_REGEX}/prescription/${UUID_REGEX}`,
    },
    {
      regex: `/patient/${UUID_REGEX}/prescription/${UUID_REGEX}\\?(?!(?:action))`,
    },
    {
      regex: `/patient/${UUID_REGEX}/prescription/${UUID_REGEX}\\?action=finalise`,
    }
  ],
  'PRESCRIPTION_CREATE': [
    {
      regex:`/patient/${UUID_REGEX}/dashboard\\?patientUUID=${UUID_REGEX}&action=add-prescription$`,
    },
    {
      regex:`/patient/${UUID_REGEX}/prescription/${UUID_REGEX}/item/add`,
    }
  ],
  'PRESCRIPTION_UPDATE': [
    {
      regex:`/patient/${UUID_REGEX}/prescription/${UUID_REGEX}/item/${UUID_REGEX}/edit`,
    }
  ],
  'PRESCRIPTION_DELETE': [
    {
      regex:`/patient/${UUID_REGEX}/prescription/${UUID_REGEX}/item/${UUID_REGEX}/delete`,
    },
    {
      regex:`/patient/${UUID_REGEX}/prescription/${UUID_REGEX}\\?action=delete-prescription`,
    },
  ],
  'DISPENSE_READ': [
    {
      regex: '^/dispense',
    },
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?(?!(?:action))`,
    },
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}`,
    },
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?action=(?:finalise-dispense|view-history)`,
    }
  ],
  'DISPENSE_CREATE': [
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?action=add-item`,
    }
  ],
  'DISPENSE_UPDATE': [
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?action=edit-item`,
    }
  ],
  'DISPENSE_DELETE': [
    {
      regex: `/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?action=delete-item`,
    },
    {
      regex:`/patient/${UUID_REGEX}/dispense/${UUID_REGEX}\\?action=delete-dispense`,
    },
  ],
  'INVOICE_READ': [
    {
      route: '/invoice',
    },
  ],
  'PAYMENT_READ': [
  ],
  'APPOINTMENT_READ': [
    {
      regex: '/appointment(?:(/list)*)$'
    },
    {
      regex: '/appointment(?:(/list)*)(\\?message)+'
    },
    {
      regex: `/appointment/list?${NO_ACTION}`,
    },
    {
      regex: '/appointment\\?action=(?:jump-to)$'
    },
    {
      route: '/appointment/list/print'
    },
  ],
  'APPOINTMENT_CREATE': [
    {
      regex: '/appointment(?:(/list)*)\\?action=(?:add-appointment|add-blackout|add-notice)$'
    },
  ],
  'APPOINTMENT_UPDATE': [
    {
      regex: '/appointment(?:(/list)*)\\?action=(?:edit-appointment|edit-notice)+'
    },
  ],
  'APPOINTMENT_DELETE': [
    {
      regex: '/appointment(?:(/list)*)\\?action=(?:delete-appointment|delete-notice)+'
    },
  ],
  'QUEUE_READ': [
    {
      route: '/queue',
    },
  ],
  'MEDICAL-RECORD_READ': [
    {
      regex: `/patient/${UUID_REGEX}/medical-record(?!\\?action)`,
    }
  ],
  'MEDICAL-RECORD_CREATE': [
    {
      regex: `/patient/${UUID_REGEX}/medical-record\\?action=(?:add-immunisation|add-allergy|add-cdlens|add-medical-certificate)+`,
    },
    {
      regex: `/patient/${UUID_REGEX}/medical-record/(?:care-report|care-plan)+/add`,
    },
  ],
  'MEDICAL-RECORD_UPDATE': [
    {
      regex: `/patient/${UUID_REGEX}/medical-record\\?action=edit-medical-certificate`,
    }
  ],
  'MEDICAL-RECORD_DELETE': [
    {
      regex: `/patient/${UUID_REGEX}/medical-record\\?action=delete-medical-certificate`,
    }
  ],
  'USERS_READ': [
    {
      route: '/practitioner',
    },
    {
      regex: `/practitioner?${NO_ACTION}`,
    },
    {
      regex: `/practitioner\\?practitionerId=${UUID_REGEX}`,
    },
    {
      regex: `/practitioner/${UUID_REGEX}\\?practitionerId=${UUID_REGEX}$`,
    }
  ],
  'USERS_CREATE': [
    {
      route: '/practitioner?action=add-practitioner',
    },
  ],
  'USERS_UPDATE': [
    {
      regex: `/practitioner/${UUID_REGEX}$`,
    },
  ],
  'USERS_DELETE': [
    {
      regex: `/practitioner\\?action=delete-practitioner`,
    },
  ],
  'ROLE_READ': [
    {
      regex: `/role`,
    },
  ],
};

export default PERMISSION_TO_ROUTES;