export const DEFAULT_PAGE_TITLE = 'Avixo CMS';
export const HWARD_DEFAULT_PAGE_TITLE = 'H-Ward Portal';
export const REPORT_PORTAL_DEFAULT_PAGE_TITLE = 'Report Portal';

export const DEFAULT_GRID_COLUMNS = 12;

export const ROUTES = {
  LOGIN: '/login',
  PATIENT_MANAGEMENT: '/patient',
  PATIENT_MANAGEMENT_ADD: {
    pathname: '/patient',
    query: { action: 'add-patient' },
  },
  PATIENT_DASHBOARD: '/patient/[patientUUID]/dashboard',
  PATIENT_DETAILS: '/patient/[patientUUID]',
  PATIENT_IMMUNISATION: '/patient/[patientUUID]/immunisation',
  PATIENT_ALLERGY: '/patient/[patientUUID]/allergy',
  PATIENT_DISPENSE: '/patient/[patientUUID]/dispense/[dispenseUUID]',
  PATIENT_PRESCRIPTION: '/patient/[patientUUID]/prescription',
  PATIENT_MEDICAL_RECORD: '/patient/[patientUUID]/medical-record',
  PATIENT_MEDICAL_RECORD_REFERRAL_DETAILS: '/patient/[patientUUID]/medical-record/referral/[referralId]',
  PATIENT_MEDICAL_RECORD_REFERRAL_ADD: '/patient/[patientUUID]/medical-record/referral/add',
  PRESCRIPTION: '/prescription',
  PRESCRIPTION_ADD: '/prescription/add',
  DISPENSE: '/dispense',
  DISPENSE_ADD: '/dispense/add',
  PATIENT_LIST: '/patient/list',
  PATIENT_LIST_DETAILS: '/patient/list/[listId]',
  INVOICE: '/invoice',
  ORGANISATION_PRACTITIONER: '/organisation?tab=Practitioner',
  PRACTITIONER: '/practitioner',
  ROLE: '/role',
  ORGANISATION: '/organisation',
  ORGANISATION_DETAILS: '/organisation/[organisationId]',
  ADD_NOTICE: '/appointment?action=add-notice',

  ORGANISATION_PREMISE: '/organisation/[organisationId]/premise/[premiseId]',
  ORGANISATION_PRACTITIONER_DETAIL: '/organisation/[organisationId]/practitioner/[practitionerId]',
  HWARD_PATIENT_LIST: `/patients`,
  HWARD_PATIENT_DETAILS: `/patients/[patientId]`,
  HWARD_CASES: '/cases',
  HWARD_CASE_DETAILS: `/cases/[caseRef]`,
  HWARD_APPOINTMENTS: '/appointments',
  REPORT_VITAL: '/vital',
  REPORT_VITAL_SUCCESS: '/vital/success',
};

export const PAGE_URLS = {
  // Clinic
  // PATIENT
  PATIENT_DASHBOARD: (patientUUID: string) => `/patient/${patientUUID}/dashboard`,
  PATIENT_EDIT: (patientUUID: string, step?: number) => `/patient/${patientUUID}?action=edit&step=${step || ''}`,
  PATIENT_DETAILS: (patientUUID: string) => `/patient/${patientUUID}`,

  // PATIENT_LIST
  PATIENT_LIST_ADD: () => `/patient/list?action=add`,
  PATIENT_LIST_DETAILS: (listId: string | number) => `/patient/list/${listId}`,
  PATIENT_LIST_DETAILS_EDIT: (listId: string | number) => `/patient/list/${listId}?action=edit`,
  PATIENT_LIST_DETAILS_DELETE: (listId: string | number) => `/patient/list/${listId}?action=delete`,
  PATIENT_LIST_DETAILS_ADD_PATIENT_TO_LIST: (listId: string | number) =>
    `/patient/list/${listId}?action=add-patient-to-list`,
  DELETE_PATIENT_FROM_LIST: (listId: string, patientUUID: string) =>
    `/patient/list/${listId}?action=delete-patient&patientId=${patientUUID}`,

  // ENROL HSG
  PATIENT_ENROL_HSG: (patientUUID: string) => `/patient/${patientUUID}?action=enrol-hsg`,
  PATIENT_ENROL_HSG_EDIT: (patientUUID: string) => `/patient/${patientUUID}?action=edit-hsg`,

  // IMMUNISATION
  PATIENT_IMMUNISATION: (patientUUID: string, message?: string) =>
    message ? `/patient/${patientUUID}/immunisation?message=${message}` : `/patient/${patientUUID}/immunisation`,
  PATIENT_IMMUNISATION_DELETE: (patientUUID: string | undefined, immunisationId: number | undefined, confirm = false) =>
    `/patient/${patientUUID}/immunisation/?action=delete-immunisation&immunisationId=${immunisationId}${
      confirm ? '&confirm=true' : ''
    }`,
  PATIENT_IMMUNISATION_EDIT: (patientUUID: string, immunisationId: number) =>
    `/patient/${patientUUID}/immunisation/?action=edit-immunisation&immunisationId=${immunisationId}`,

  // ALLERGY
  PATIENT_ALLERGY: (patientUUID: string) => `/patient/${patientUUID}/allergy`,
  PATIENT_ALLERGY_ADD: (patientUUID: string) => `/patient/${patientUUID}/allergy?action=add-allergy`,
  PATIENT_ALLERGY_EDIT: (patientUUID: string, allergyId: number) =>
    `/patient/${patientUUID}/allergy?action=edit-allergy&allergyId=${allergyId}`,
  PATIENT_CONFIRM_UPDATE: (patientUUID: string, allergyId: number, confirm = false) =>
    `/patient/${patientUUID}/allergy?action=update-allergy&allergyId=${allergyId}${confirm ? '&confirm=true' : ''}`,
  PATIENT_ALLERGY_DELETE: (patientUUID: string, allergyId: number, confirm = false) =>
    `/patient/${patientUUID}/allergy?action=delete-allergy&allergyId=${allergyId}${confirm ? '&confirm=true' : ''}`,

  // MEDICAL_RECORD
  PATIENT_MEDICAL_RECORD: (patientUUID: string) => `/patient/${patientUUID}/medical-record`,

  // MEDICAL_CARTIFICATE
  PATIENT_MEDICAL_RECORD_MEDICAL_CERTIFICATE: (
    patientUUID: string,
    action: 'add' | 'edit' | 'delete' | 'print' | 'email',
    mcId?: string | number,
  ) => {
    switch (action) {
      case 'edit':
        return `/patient/${patientUUID}/medical-record?action=edit-medical-certificate&mcId=${mcId}`;
      case 'print':
        return `/patient/${patientUUID}/medical-record/medical-certificate/print?mcId=${mcId}`;
      case 'email':
        return `/patient/${patientUUID}/medical-record?action=email-medical-certificate&mcId=${mcId}`;
      case 'delete':
        return `/patient/${patientUUID}/medical-record?action=delete-medical-certificate&mcId=${mcId}`;
      default:
        return `/patient/${patientUUID}/medical-record?action=add-medical-certificate`;
    }
  },

  // IVOICE
  INVOICE: (tab?: string) => (tab ? `/invoice?tab=${tab || ''}` : '/invoice'),
  PATIENT_INVOICE_DETAILS: (patientUUID: string, invoiceUUID: string) =>
    `/patient/${patientUUID}/invoice/${invoiceUUID}`,

  // REFERRAL
  PATIENT_MEDICAL_RECORD_REFERRAL: (
    patientUUID: string,
    action: 'view' | 'add' | 'edit' | 'print',
    type: 'template' | 'hsg' | null,
    referralId?: string | number,
  ) => {
    switch (action) {
      case 'add':
        return `/patient/${patientUUID}/medical-record/referral/add?type=${type}`;
      case 'edit':
        return `/patient/${patientUUID}/medical-record/referral/${referralId}?action=edit`;
      case 'print':
        return `/patient/${patientUUID}/medical-record/referral/${referralId}/print`;
      default:
        return `/patient/${patientUUID}/medical-record/referral/${referralId}`;
    }
  },

  // HEALTH_PLAN
  PATIENT_MEDICAL_RECORD_HEALTH_PLAN: (
    patientUUID: string,
    type: 'view' | 'add' | 'edit',
    healthPlanUUID?: string | number,
  ) => {
    switch (type) {
      case 'add':
        return `/patient/${patientUUID}/medical-record/care-plan/add`;
      case 'edit':
        return `/patient/${patientUUID}/medical-record/care-plan/${healthPlanUUID}/edit`;
      default:
        return `/patient/${patientUUID}/medical-record/care-plan/${healthPlanUUID}`;
    }
  },

  // CARE_REPORT
  PATIENT_MEDICAL_RECORD_CARE_REPORT: (
    patientUUID: string,
    type: 'view' | 'add' | 'edit',
    careReportId?: string | number,
  ) => {
    switch (type) {
      case 'add':
        return `/patient/${patientUUID}/medical-record/care-report/add`;
      case 'edit':
        return `/patient/${patientUUID}/medical-record/care-report/${careReportId}/edit`;
      default:
        return `/patient/${patientUUID}/medical-record/care-report/${careReportId}`;
    }
  },

  // PRESCRIPTION
  PRESCRIPTION: () => '/prescription',
  PATIENT_PRESCRIPTION: (patientUUID: string) => `/patient/${patientUUID}/prescription`,
  PATIENT_PRESCRIPTION_DETAIL: (patientUUID: string, prescriptionUUID: string | number, action?: string) => {
    if (action) {
      return `/patient/${patientUUID}/prescription/${prescriptionUUID}?action=${action}`;
    }

    return `/patient/${patientUUID}/prescription/${prescriptionUUID}`;
  },
  PATIENT_PRESCRIPTION_DETAIL_ADD_ITEM: (patientUUID: string, prescriptionUUID: string) =>
    `/patient/${patientUUID}/prescription/${prescriptionUUID}/item/add`,
  PATIENT_PRESCRIPTION_DETAIL_ITEM: (
    patientUUID: string,
    prescriptionUUID: string,
    itemId: number,
    action: 'edit' | 'delete',
  ) => `/patient/${patientUUID}/prescription/${prescriptionUUID}/item/${itemId}/${action}`,

  // DISPENSING
  PATIENT_DISPENSING_DETAIL: (patientUUID: string, dispenseUUID: string | number, action?: string) => {
    if (action) {
      return `/patient/${patientUUID}/dispense/${dispenseUUID}?action=${action}`;
    }
    return `/patient/${patientUUID}/dispense/${dispenseUUID}`;
  },
  PATIENT_DISPENSING_DETAIL_ITEM: (
    patientUUID: string,
    dispenseUUID: string | number,
    itemID: number | string,
    action: 'edit-item' | 'delete-item',
  ) => `/patient/${patientUUID}/dispense/${dispenseUUID}?itemId=${itemID}&action=${action}`,

  // CREDIT_NOTE
  PATIENT_INVOICE_CREDIT_NOTE: (
    patientUUID: string,
    invoiceUUID: string,
    creditNoteID: string | number,
    action?: 'edit-remark' | 'delete-refund' | 'edit-gst-amount' | 'print' | 'add-edit-refund',
  ) => {
    switch (action) {
      case 'edit-remark':
      case 'delete-refund':
      case 'edit-gst-amount':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/credit-note/${creditNoteID}?action=${action}`;
      case 'add-edit-refund':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/credit-note/${creditNoteID}/${action}`;
      case 'print':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/credit-note/${creditNoteID}/print`;
      default:
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/credit-note/${creditNoteID}`;
    }
  },

  // DEBIT_NOTE
  PATIENT_INVOICE_DEBIT_NOTE: (
    patientUUID: string,
    invoiceUUID: string,
    debitNoteID: string | number,
    action?: 'edit-remark' | 'delete-refund' | 'edit-gst-amount' | 'print' | 'add-edit-refund',
  ) => {
    switch (action) {
      case 'edit-remark':
      case 'delete-refund':
      case 'edit-gst-amount':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/debit-note/${debitNoteID}?action=${action}`;
      case 'add-edit-refund':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/debit-note/${debitNoteID}/${action}`;
      case 'print':
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/debit-note/${debitNoteID}/print`;
      default:
        return `/patient/${patientUUID}/invoice/${invoiceUUID}/debit-note/${debitNoteID}`;
    }
  },

  // APPOINTMENT
  APPOINTMENT: () => '/appointment',
  APPOINTMENT_ADD: () => '/appointment?action=add-appointment',
  APPOINTMENT_JUMP: () => '/appointment?action=jump-to',
  APPOINTMENT_EDIT: (appointmentId: string | number) =>
    `/appointment?action=edit-appointment&appointmentId=${appointmentId}`,
  APPOINTMENT_EDIT_CALENDAR: (appointmentId: string | number) =>
    `/appointment?action=edit-appointment-calendar&appointmentId=${appointmentId}`,
  APPOINTMENT_DELETE: (appointmentId: string | number) =>
    `/appointment?action=delete-appointment&appointmentId=${appointmentId}`,
  APPOINTMENT_LIST: () => '/appointment/list',
  APPOINTMENT_LIST_ADD: () => '/appointment/list?action=add-appointment',
  APPOINTMENT_LIST_EDIT: (appointmentId: string | number) =>
    `/appointment/list?action=edit-appointment&appointmentId=${appointmentId}`,
  APPOINTMENT_LIST_DELETE: (appointmentId: string | number) =>
    `/appointment/list?action=delete-appointment&appointmentId=${appointmentId}`,
  APPOINTMENT_LIST_PRINT: () => '/appointment/list/print',
  APPOINTMENT_ADVANCED_SEARCH: () => '/appointment/list?action=advanced-search',
  EDIT_NOTICE: (noticeId: string) => `/appointment?action=edit-notice&noticeId=${noticeId}`,
  DELETE_NOTICE: (noticeId: string) => `/appointment?action=delete-notice&noticeId=${noticeId}`,

  // QUEUE
  QUEUE: () => '/queue',
  DELETED_QUEUE: () => '/queue/deleted-queue',
  PAST_QUEUE: () => '/queue/past-queue',

  // Admin
  // ORGANISATION
  ORGANISATION: (tab?: 'Organisation' | 'Practitioner' | 'Premise' | string) => {
    switch (tab) {
      case 'Organisation':
        return `/organisation?tab=Organisation`;
      case 'Premise':
        return `/organisation?tab=Premise`;
      case 'Practitioner':
        return `/organisation?tab=Practitioner`;
      default:
        return `/organisation?`;
    }
  },
  ORGANISATION_DETAILS: (organisationId: string | number) => `/organisation/${organisationId}`,
  PREMISE_DETAILS: (
    organisationId: string | number,
    premiseId: string | number,
    action?: 'edit' | 'delete',
    tab?: number,
  ) => {
    switch (action) {
      case 'edit':
        return `/organisation/${organisationId}/premise/${premiseId}?action=${action}${tab ? `&tab=${tab}` : ''}`;
      default:
        return `/organisation/${organisationId}/premise/${premiseId}`;
    }
  },
  ORGANISATION_PRACTITIONER_DETAILS: (
    organisationId: string | number,
    practitionerId: string | number,
    action?: 'edit' | 'delete',
    tab?: string,
  ) => {
    switch (action) {
      case 'edit':
        return `/organisation/${organisationId}/practitioner/${practitionerId}?action=${action}${
          tab ? `&tab=${tab}` : ''
        }`;
      default:
        return `/organisation/${organisationId}/practitioner/${practitionerId}`;
    }
  },

  // Role
  ROLE: (action?: string, roleId?: number) => {
    if (action) {
      if (roleId) {
        return `/role?action=${action}&roleId=${roleId}`;
      }
      return `/role?action=${action}`;
    }
    return '/role';
  },
  // Practitioner
  PRACTITIONER: (action?: string, practitionerId?: number) => {
    if (action) {
      if (practitionerId) {
        return `/practitioner?action=${action}&practitionerId=${practitionerId}`;
      }
      return `/practitioner?action=${action}`;
    }
    return '/practitioner';
  },

  PRACTITIONER_DETAIL: (practitionerId: string | number) => `/practitioner/${practitionerId}`,

  // Setting
  SETTING_MEDICAL_NOTE_TEMPLATE: () => '/setting/medical-note',
  SETTING_MEDICAL_NOTE_TEMPLATE_ADD: () => '/setting/medical-note/add',
  SETTING_MEDICAL_NOTE_TEMPLATE_EDIT: (id: string | number) => `/setting/medical-note/${id}`,
  SETTING_MEDICAL_NOTE_TEMPLATE_DELETE: (id: string | number) => `/setting/medical-note/${id}?action=delete-template`,
  SETTING_EMAIL_TEMPLATE: (tab?: string) =>
    tab ? `/setting/email-template?tab=${tab || ''}` : '/setting/email-template',
  SETTING_EMAIL_TEMPLATE_ADD: () => '/setting/email-template/add',
  SETTING_HEADER_FOOTER: () => '/setting/header-footer',

  // HWARD
  HWARD_CASES: () => '/cases',
  HWARD_CASE_DETAILS: (ref: string) => `/cases/${ref}`,
  HWARD_PATIENT_LIST: () => `/patients`,
  HWARD_PATIENT_DETAILS: (uuid: string) => `/patients/${uuid}`,
  HWARD_APPOINTMENTS: () => '/appointments',
};

export const BREADCRUMBS = {
  PATIENT_MANAGEMENT: {
    label: 'Patient Management',
    url: '/patient',
  },
  PATIENT_OVERVIEW: (patientUUID: string) => ({
    label: 'Patient Overview',
    url: PAGE_URLS.PATIENT_DASHBOARD(patientUUID),
  }),
  PATIENT_DETAILS: (patientUUID: string) => ({
    label: 'Patient Details',
    url: PAGE_URLS.PATIENT_DETAILS(patientUUID),
  }),
  PATIENT_IMMUNISATION: (patientUUID: string) => ({
    label: 'Immunisation',
    url: PAGE_URLS.PATIENT_IMMUNISATION(patientUUID),
  }),
  PATIENT_ALLERGY: (patientUUID: string) => ({
    label: 'Allergy',
    url: PAGE_URLS.PATIENT_ALLERGY(patientUUID),
  }),
  PATIENT_PRESCRIPTION: (patientUUID: string) => ({
    label: 'Prescription',
    url: PAGE_URLS.PATIENT_PRESCRIPTION(patientUUID),
  }),
  PATIENT_MEDICAL_RECORD: (patientUUID: string) => ({
    label: 'Medical Record',
    url: PAGE_URLS.PATIENT_MEDICAL_RECORD(patientUUID),
  }),
  PATIENT_MEDICAL_RECORD_REFERRAL: () => ({
    label: 'Referral',
    url: '#',
  }),
  ORGANISATION: (isParentOrganisation?: boolean) => ({
    label: 'Organisation',
    url: PAGE_URLS.ORGANISATION(isParentOrganisation ? '' : 'Organisation'),
  }),
  ORGANISATION_DETAILS: () => ({
    label: 'Organisation Details',
    url: '#',
  }),
  PREMISE: () => ({
    label: 'Premise',
    url: PAGE_URLS.ORGANISATION('Premise'),
  }),
  PREMISE_DETAILS: () => ({
    label: 'Premise Details',
    url: '#',
  }),
  ORGANISATION_PRACTITIONER: () => ({
    label: 'Practitioner',
    url: PAGE_URLS.ORGANISATION('Practitioner'),
  }),
  ORGANISATION_PRACTITIONER_DETAILS: () => ({
    label: 'Practitioner Details',
    url: '#',
  }),
  HWARD_DASHBOARD: () => ({
    label: 'Dashboard',
    url: '/cases',
  }),
  HWARD_PATIENT_LIST: () => ({
    label: 'Patients',
    url: PAGE_URLS.HWARD_PATIENT_LIST(),
  }),
  HWARD_PATIENT_DETAILS: (patientID: string) => ({
    label: 'Patient Details',
    url: PAGE_URLS.HWARD_PATIENT_DETAILS(patientID),
  }),
  HWARD_CASE_DETAILS: (caseRef: string) => ({
    label: 'Case Detail',
    url: PAGE_URLS.HWARD_CASE_DETAILS(caseRef),
  }),
  HWARD_APPOINTMENTS: () => ({
    label: 'Appointments',
    url: PAGE_URLS.HWARD_APPOINTMENTS(),
  }),
};

export const SUCCESS_STATUSES = [200, 201, 204];
