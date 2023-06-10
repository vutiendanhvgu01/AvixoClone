import DashboardIcon from '@AvixoIcons/dashboard-icon';
import InventoryIcon from '@AvixoIcons/inventory-icon';
import PatientIcon from '@AvixoIcons/patient-icon';
import PaymentIcon from '@AvixoIcons/payment-icon';
import PrescriptionsIcon from '@AvixoIcons/prescriptions-icon';
import QueueIcon from '@AvixoIcons/queue-icon';
import AppointmentIcon from '@AvixoIcons/appointment-icon';
import DispenseIcon from '@AvixoIcons/dispense-icon';
import PatientListIcon from '@AvixoIcons/patient-list-icon';
import UserMenuIcon from '@AvixoIcons/user-menu-icon';
import TemplateIcon from '@AvixoIcons/template-icon';

const CLINIC_SIDEBAR_SECTIONS = [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        path: '/',
        icon: <DashboardIcon />,
      },
      {
        title: 'Appointment',
        module: 'appointment',
        path: '/appointment',
        icon: <AppointmentIcon />,
      },
      {
        title: 'Queue',
        module: 'queue',
        path: '/queue',
        icon: <QueueIcon width={20} height={20} />,
      },
    ],
  },
  {
    title: 'Patient',
    items: [
      {
        title: 'All Patients',
        module: 'patient-management',
        path: '/patient',
        icon: <PatientIcon />,
      },
      {
        title: 'Patient List',
        module: 'patient-list',
        path: '/patient/list',
        icon: <PatientListIcon />,
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Prescriptions',
        module: 'prescription',
        path: '/prescription',
        icon: <PrescriptionsIcon />,
      },
      {
        title: 'Dispenses',
        module: 'dispense',
        path: '/dispense',
        icon: <DispenseIcon />,
      },
      {
        title: 'Invoices',
        module: 'invoice',
        path: '/invoice',
        icon: <PaymentIcon width={20} height={20} />,
      },
      {
        title: 'Practitioners & Roles',
        icon: <UserMenuIcon />,
        children: [
          {
            title: 'Practitioner',
            module: 'users',
            path: '/practitioner',
          },
          {
            title: 'Roles',
            module: 'role',
            path: '/role',
          },
        ],
      },
    ],
  },
  {
    title: 'Logistic',
    items: [
      {
        title: 'Inventory',
        path: '/inventory',
        icon: <InventoryIcon />,
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Template',
        icon: <TemplateIcon />,
        children: [
          {
            title: 'Medical Note',
            module: 'medical-record',
            path: '/setting/medical-note',
          },
          {
            title: 'Email',
            path: '/setting/email-template',
          },
        ],
      },
    ],
  },
];

export default CLINIC_SIDEBAR_SECTIONS;
