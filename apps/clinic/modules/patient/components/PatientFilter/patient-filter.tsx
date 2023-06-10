import * as React from 'react';
import { AvixoFixedContainer } from 'share-components';
import PatientFilterForm from './patient-filter-form';

export interface PatientFilterProps {
  onClose: () => void;
}

const PatientFilter: React.FC<PatientFilterProps> = ({ onClose }) => (
  <AvixoFixedContainer title="Advanced Search" display onClose={onClose}>
    <PatientFilterForm onCancel={onClose} />
  </AvixoFixedContainer>
);

export default PatientFilter;
