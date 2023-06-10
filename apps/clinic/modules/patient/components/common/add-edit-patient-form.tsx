import type { Patient } from 'modules/patient/types/patient';
import { AvixoFixedContainer } from 'share-components';

interface AddEditPaitientFormProps {
  initData?: Patient;
  onCancel?: () => void;
}

const AddEditPaitientForm: React.FC<AddEditPaitientFormProps> = ({ onCancel }) => (
  <AvixoFixedContainer title="Edit Patient" display onClose={onCancel}>
    {/* Add/Edit Patient Form */}
  </AvixoFixedContainer>
);

export default AddEditPaitientForm;
