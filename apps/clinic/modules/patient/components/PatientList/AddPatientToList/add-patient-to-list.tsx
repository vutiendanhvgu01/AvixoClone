import Box from '@mui/material/Box';
import React from 'react';
import { AvixoSearchBar } from 'share-components';
import AddPatientToListForm from './add-patient-form';
import AddPatientToListProps from './add-patient-to-list-types';

const AddPatientToList: React.FC<AddPatientToListProps> = props => {
  const { patients, allPatientsList } = props;
  const initialValues = {
    selectedPatients: patients.map(patient => patient.uuid) as string[],
  };
  return (
    <Box sx={{ px: 4 }}>
      <AvixoSearchBar placeholder="Search by name" />
      <Box sx={{ py: 3 }}>
        <AddPatientToListForm initialValues={initialValues} patientsList={allPatientsList} />
      </Box>
    </Box>
  );
};
export default AddPatientToList;
