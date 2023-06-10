import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const CheckboxOption = styled(FormControlLabel)({
  fontWeight: 400,
});

interface ChronicDiseaseOption {
  label: string;
  value: string;
}

const chronicDiseaseOptions: ChronicDiseaseOption[] = [
  {
    label: 'Diabetes Mellitus',
    value: '0',
  },
  {
    label: 'Hypertension',
    value: '1',
  },
  {
    label: 'Hyperlipidemia (Lipid Disorders)',
    value: '2',
  },
];

const ChronicDisease: React.FC = () => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6">Chronic Disease Management</Typography>
    <Divider sx={{ mr: -3, ml: -3, mt: 4, mb: 3 }} />
    <Box sx={{ mb: 1 }}>
      <Typography variant="overline">conditions(s):</Typography>
    </Box>
    <FormGroup sx={{ pl: 1, justifyContent: 'space-between', height: '142px' }}>
      {chronicDiseaseOptions.map((option: ChronicDiseaseOption) => (
        <CheckboxOption
          key={option?.value}
          componentsProps={{
            typography: { variant: 'subtitle1', sx: { fontWeight: 400 } },
          }}
          control={<Checkbox />}
          label={option?.label}
        />
      ))}
    </FormGroup>
  </Box>
);

export default ChronicDisease;
