import { Typography, Box, Divider } from '@mui/material';
import { VaccinationHistory as VaccinationHistoryProps } from 'modules/medical-record/types/vaccination-history';
import React from 'react';
import { AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';

const columns = [
  {
    id: 'dateGiven',
    field: 'dateGiven',
    label: 'Date Given',
    alignLabel: 'left',
  },
  {
    id: 'vaccination',
    field: 'vaccination',
    label: 'Vaccination',
    alignLabel: 'left',
  },
  {
    id: 'sequence',
    field: 'sequence',
    label: 'Sequence',
    alignLabel: 'left',
  },
  {
    id: 'productName',
    field: 'productName',
    label: 'Product Name',
    alignLabel: 'left',
  },
  {
    id: 'lotBatchNo',
    field: 'lotBatchNo',
    label: 'Lot/batch no.',
    alignLabel: 'left',
  },
  {
    id: 'location',
    field: 'location',
    label: 'Location',
    alignLabel: 'left',
  },
] as AvixoTableColumnProps[];

const mocksData = [
  {
    dateGiven: '15 Feb 2015',
    vaccination: 'INLUVAC TETRA VACCINE',
    sequence: 'D2',
    productName: 'INFLUVAC TETRA Vaccine (Influenza Virus inactivated, quadrivalent)',
    lotBatchNo: 'B201505053A',
    location: 'Chin Leong Clinic',
  },
  {
    dateGiven: '15 Feb 2015',
    vaccination: 'Measis, Mumps, Rubella',
    sequence: 'D2',
    productName: 'Measles, Mumps, Rubella',
    lotBatchNo: 'M201504234C',
    location: 'Chin Leong Clinic',
  },
  {
    dateGiven: '15 Feb 2015',
    vaccination: 'INLUVAC TETRA VACCINE',
    sequence: 'D2',
    productName: 'INFLUVAC TETRA Vaccine (Influenza Virus inactivated, quadrivalent)',
    lotBatchNo: 'B201505053A',
    location: 'Chin Leong Clinic',
  },
  {
    dateGiven: '15 Feb 2015',
    vaccination: 'Measis, Mumps, Rubella',
    sequence: 'D2',
    productName: 'Measles, Mumps, Rubella',
    lotBatchNo: 'M201504234C',
    location: 'Chin Leong Clinic',
  },
];

const VaccinationHistory: React.FC<{
  vaccinationHistory?: VaccinationHistoryProps[];
}> = ({ vaccinationHistory }) => (
  <Box>
    <Typography variant="h6" sx={{ py: 4 }}>
      National Adult Immunisation Schedule (NAIS) only
    </Typography>
    <Divider sx={{ mx: -4 }} />
    <Box sx={{ pt: 3.75, pb: 4.275, display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2">Screen for Life (SFL) only</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="caption">Last retrieved on 21 Aug 2022 at 11:27AM</Typography>
        <Typography color="chart.blue5" fontWeight="600" sx={{ ml: 3, cursor: 'pointer' }}>
          Retrieve again
        </Typography>
      </Box>
    </Box>
    <Box sx={{ mx: -4 }}>
      <AvixoTable
        columns={columns}
        hasCheckBoxHeader={false}
        data={{ records: vaccinationHistory?.length ? vaccinationHistory : mocksData }}
        mode="offline"
        hasPagination={false}
        emptyText="No Record Found"
      />
    </Box>
  </Box>
);

export default VaccinationHistory;
