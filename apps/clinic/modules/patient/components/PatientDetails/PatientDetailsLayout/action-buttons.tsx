import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AvixoMenuButton,
  MedicalRecordIcon,
  MenuItemData,
  OutlinedPrintIcon,
  VuesaxClipboardIcon,
} from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import PatientStatus from '../../common/patient-status';

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button, > a': {
    marginLeft: 16,
  },
}));

const getPatientStatusMenuData = (onMenuItemClick: (action: string) => void): MenuItemData[] => [
  {
    label: <PatientStatus status="active" />,
    value: 'active',
  },
  {
    label: <PatientStatus status="inactive" />,
    value: 'inactive',
  },
  {
    label: 'Delete Patient',
    value: 'delete',
    onClick: () => {
      onMenuItemClick('delete');
    },
  },
];

const getPatientActionsMenuData = (onMenuItemClick: (action: string) => void): MenuItemData[] => [
  {
    label: 'add Prescription',
    value: 'add-medicine',
    onClick: () => {
      onMenuItemClick('add-prescription');
    },
  },
  {
    label: 'add invoice',
    value: 'add-invoice',
    onClick: () => {
      onMenuItemClick('add-invoice');
    },
  },
  {
    label: 'add MC',
    value: 'add-medical-certificate',
    onClick: () => {
      onMenuItemClick('add-medical-certificate');
    },
  },
  {
    label: 'add Appointment',
    value: 'add-appointment',
    onClick: () => {
      onMenuItemClick('add-appointment');
    },
  },
  {
    label: 'add to Queue',
    value: 'add-queue',
    onClick: () => {
      onMenuItemClick('add-queue');
    },
  },
  {
    label: 'add Immunisation',
    value: 'add-immunisation',
    onClick: () => {
      onMenuItemClick('add-immunisation');
    },
  },
  {
    label: 'add Allergy',
    value: 'add-allergy',
    onClick: () => {
      onMenuItemClick('add-allergy');
    },
  },
];

const PRINT_LABEL_MENU = [
  {
    label: 'Short Label',
    value: 'short-label',
  },
  {
    label: 'Record Label',
    value: 'record-label',
  },
  {
    label: 'Case Note Label',
    value: 'case-note-label',
  },
];

const PatientActionButtons: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const patientUrl = router.pathname.replace('[patientUUID]', query.patientUUID as string);

  const onButtonClick = (action: string) => {
    router.push({ pathname: router.pathname, query: { ...query, action } });
  };

  return (
    <Actions>
      <Link href={`${patientUrl}?action=government-subsidies`} data-cy="government-subsidies-button" scroll={false}>
        <Button color="whiteLight" startIcon={<VuesaxClipboardIcon />}>
          Government Subsidies
        </Button>
      </Link>
      <AvixoMenuButton
        ButtonProps={{
          startIcon: null,
          color: 'whiteLight',
        }}
        AvixoMenuBaseProps={{
          menuData: getPatientStatusMenuData(onButtonClick),
        }}
        label={<PatientStatus status="active" />}
      />
      <AvixoMenuButton
        ButtonProps={{
          startIcon: <OutlinedPrintIcon />,
          color: 'whiteLight',
        }}
        AvixoMenuBaseProps={{
          menuData: PRINT_LABEL_MENU,
        }}
        label="Print"
      />
      <Link
        href={PAGE_URLS.PATIENT_MEDICAL_RECORD(query.patientUUID?.toString() || '')}
        data-cy="medical-record-button"
      >
        <Button startIcon={<MedicalRecordIcon />}>Medical Record</Button>
      </Link>
      <AvixoMenuButton
        AvixoMenuBaseProps={{
          menuData: getPatientActionsMenuData(onButtonClick),
        }}
        label="Actions"
      />
    </Actions>
  );
};

export default PatientActionButtons;
