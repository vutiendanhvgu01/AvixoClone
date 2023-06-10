import { Box } from '@mui/material';
import React from 'react';
import AddPackageFilter from './add-package-filter';
import AddPackageFormAction from './add-package-form-action';
import { AddPackageFormProps } from './add-package-form-type';
import AddPackageInputs from './add-package-inputs';
import AddPackageList from './add-package-list';

const AddPackageForm: React.FC<AddPackageFormProps> = ({ listPackage }) => {
  const onChangeFilterHandler = (packageName?: string, quantity?: number) => {
    console.log(packageName, quantity);
  };

  return (
    <Box mt={2} mb={4}>
      <AddPackageFilter
        onChangeFilter={onChangeFilterHandler}
        packageNames={['name1', 'name2']}
        quantities={[1, 2, 3, 4]}
      />
      <AddPackageList listPackage={listPackage} />
      <Box mx={4}>
        <AddPackageInputs />
      </Box>
      <Box mx={4} mt={3}>
        <AddPackageFormAction
          onConfirm={function (): void {
            console.log('Confirmed');
          }}
          onCancel={function (): void {
            console.log('Canceled');
          }}
        />
      </Box>
    </Box>
  );
};

export default AddPackageForm;
