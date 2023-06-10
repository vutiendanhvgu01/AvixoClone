import { Patient } from 'modules/patient/types/patient';
import React from 'react';
import { AvixoDrawerConfirm } from 'share-components';
import AvixoDrawerConfirmProps from 'share-components/src/components/AvixoDrawerComfirm/avixo-drawer-confirm-types';
import { InventoryValues } from '../PrescriptionForm/types';

interface PrescriptionDeleteFormProps extends AvixoDrawerConfirmProps {
  patient: Patient;
  handleClose: () => void;
  item?: Partial<InventoryValues>;
  id: string | number;
  title?: string;
  action?: string;
  description?: string;
}

const PrescriptionDeleteForm: React.FC<PrescriptionDeleteFormProps> = ({
  patient,
  item,
  handleClose,
  id,
  title,
  action,
  description,
  ...restProps
}: PrescriptionDeleteFormProps) => (
  <AvixoDrawerConfirm
    open
    handleClose={handleClose}
    inputProps={{
      name: 'reason',
      label: 'Reason of deletion',
      required: true,
      defaultValues: '',
    }}
    id={id}
    title={title || 'Delete Item?'}
    confirmContentTitle={item?.name ?? ''}
    confirmContent={
      description || `will be deleted from ${patient.fullName} prescription history list. This action cannot be undone.`
    }
    action={action || 'delete-item-prescription'}
    footerProps={{
      confirmRestProps: {
        variant: 'text',
      },
    }}
    {...restProps}
  />
);

export default PrescriptionDeleteForm;
