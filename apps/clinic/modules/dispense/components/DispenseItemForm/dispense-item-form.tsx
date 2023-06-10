import { Dispense } from 'modules/dispense/types/dispense';
import { Patient } from 'modules/patient/types/patient';
import PrescriptionForm from 'modules/prescription/components/PrescriptionForm';
import { Item } from 'modules/prescription/types/item';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { AvixoDrawerConfirm } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

interface DispenseItemFormProps {
  initData: Item;
  dispense: Dispense;
  patient: Patient;
  onClose: () => void;
}

const DispenseItemForm: React.FC<DispenseItemFormProps> = ({ dispense, initData, patient, onClose }) => {
  const [isEditableFinalise, setIsEditableFinalise] = useState<boolean>(false);

  const router = useRouter();

  const handleConfirmEdit = useCallback((): void => {
    setIsEditableFinalise(true);
  }, []);

  if (!dispense.isDraft && !isEditableFinalise) {
    return (
      <AvixoDrawerConfirm
        open
        title="Edit Dispensing?"
        confirmContent="Once changes have been made, the finalisation process will have to be repeated as it was completed previously."
        footerProps={{
          confirmText: 'Yes, edit',
          onConfirmClick: handleConfirmEdit,
        }}
        handleClose={onClose}
      />
    );
  }

  return (
    <PrescriptionForm
      action="update-dispense-item"
      initialData={initData}
      type="dispenseId"
      typeId={`${dispense.id}`}
      title="Edit Item"
      display
      onClose={onClose}
      onDelete={() => {
        router.push(PAGE_URLS.PATIENT_DISPENSING_DETAIL_ITEM(patient.uuid, dispense.uuid, initData.id, 'delete-item'));
      }}
      patient={patient}
    />
  );
};

export default DispenseItemForm;
