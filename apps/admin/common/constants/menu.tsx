import PatientIcon from 'share-components/src/components/AvixoIcons/patient-icon';

const ADMIN_SIDEBAR_SECTIONS = [
  {
    title: 'General',
    items: [
      {
        title: 'Organisation',
        path: '/organisation',
        icon: <PatientIcon />,
      },
    ],
  },
];

export default ADMIN_SIDEBAR_SECTIONS;
