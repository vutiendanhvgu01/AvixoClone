import { Typography, Box, Divider, Chip } from '@mui/material';
import React from 'react';
import { AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';

const columns = [
  {
    id: 'screeningType',
    field: 'screeningType',
    label: 'Screening type',
    alignLabel: 'left',
  },
  {
    id: 'eligible',
    field: 'eligible',
    label: 'Eligible?',
    alignLabel: 'left',
  },
  {
    id: 'lastDone',
    field: 'lastDone',
    label: 'Last Done',
    alignLabel: 'left',
  },
  {
    id: 'nextDue',
    field: 'nextDue',
    label: 'Next Due',
    alignLabel: 'left',
    customRender: ({ nextDue }, index) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {nextDue} {index === 0 && <Chip size="small" label="Due" color="warningLight" sx={{ ml: 1 }} />}
      </Box>
    ),
  },
] as AvixoTableColumnProps[];

const mocksData = [
  {
    screeningType: 'Cardiovascular Disease Risk Screening',
    eligible: 'No',
    lastDone: '08 Jan 2022',
    nextDue: '16 Jan 2024',
  },
  {
    screeningType: 'Cervical Cancer Screening - HPV DNA',
    eligible: 'Not Applicable (Out of Program)',
    lastDone: '12 Jan 2022',
    nextDue: '-',
  },
  {
    screeningType: 'Colorectal Cancer Screening',
    eligible: 'No (FIT kits collected but not submitted; claims approved)',
    lastDone: '16 Feb 2022',
    nextDue: '16 Feb 2023',
  },
  {
    screeningType: 'Breast Cancer Screening',
    eligible: 'Yes',
    lastDone: '08 Jan 2022',
    nextDue: '16 Feb 2023',
  },
];

const ScreeningEligibility: React.FC = () => (
  <Box>
    <Typography variant="h6" sx={{ py: 4 }}>
      Screening Eligibility
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
        data={{ records: mocksData }}
        hasPagination={false}
        mode="offline"
        emptyText="No Record Found"
      />
    </Box>
  </Box>
);

export default ScreeningEligibility;
