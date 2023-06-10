import { Patient } from 'modules/patient/types/patient';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { AvixoFixedContainer } from 'share-components';
import AvixoFixedContainerProps from 'share-components/src/components/AvixoFixedContainer/avixo-fixed-container-types';
import { PrescriptionFormAction } from './types';

const PrescriptionFormFields = dynamic(() => import('./components'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

interface PrescriptionForm extends Omit<AvixoFixedContainerProps, 'children'> {
  action: PrescriptionFormAction;
  initialData?: unknown;
  patient?: Patient;
  type?: string;
  typeId?: string;
  onDelete?: () => void;
}

const PrescriptionForm: FC<PrescriptionForm> = props => {
  const { action, initialData, onClose, patient, type, typeId, onDelete, ...restProps } = props;

  return (
    <AvixoFixedContainer
      closeOnOutside
      onClose={onClose}
      containerSx={{
        overflow: 'hidden',
      }}
      {...restProps}
    >
      <PrescriptionFormFields
        patient={patient}
        handleClose={onClose}
        onDelete={onDelete}
        initialData={initialData}
        action={action}
        type={type}
        typeId={typeId}
      />
    </AvixoFixedContainer>
  );
};

export default PrescriptionForm;
