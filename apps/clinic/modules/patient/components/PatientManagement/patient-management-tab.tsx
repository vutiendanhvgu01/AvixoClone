import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import type { Patient } from 'modules/patient/types/patient';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { AvixoSearchBar } from 'share-components';
import { ROUTES } from 'share-components/src/constants';
import { PatientListItem } from '../PatientList/patient-list-types';
import PatientManagementTable from './patient-management-table';

export interface PatientManagementTabProps {
  patientList: PatientListItem[];
  patients: Patient[];
  selectedList: string;
}

const PatientManagementTab: React.FC<PatientManagementTabProps> = ({ patientList, patients, selectedList }) => {
  const router = useRouter();

  const onListChange = useCallback((e: SelectChangeEvent) => {
    router.push({
      pathname: ROUTES.PATIENT_MANAGEMENT,
      query: {
        listId: e.target.value,
      },
    });
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1, pb: 4 }}>
        <FormControl sx={{ width: '100%', maxWidth: 200, mr: 2 }}>
          <InputLabel id="patient-list-select">Patient List</InputLabel>
          <Select label="Patient List" name="patient-list-select" defaultValue={selectedList} onChange={onListChange}>
            {patientList?.map(it => (
              <MenuItem value={it.id} key={it.uuid}>
                {it.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search here..." />
      </Box>
      <Box sx={{ mx: -3 }}>
        <PatientManagementTable patients={patients} />
      </Box>
    </Box>
  );
};

export default PatientManagementTab;
