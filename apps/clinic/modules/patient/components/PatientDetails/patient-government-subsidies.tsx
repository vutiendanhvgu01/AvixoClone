import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { AvixoFixedContainer } from 'share-components';

const programOptions = ['Healthier SG', 'Screen for Life', 'Vaccinations and Childhood Development Screening'];

interface GovernmentSubsidiesProps {
  onClose: () => void;
}

const GovernmentSubsidies: React.FC<GovernmentSubsidiesProps> = ({ onClose }) => {
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const router = useRouter();

  const checkEligibility = useCallback(() => {
    switch (selectedProgram) {
      case 'Healthier SG':
        router.push({ pathname: router.pathname, query: { ...router.query, action: 'enrol-hsg' } });
        break;

      default:
    }
  }, [selectedProgram, router]);

  return (
    <AvixoFixedContainer title="Government Subsidies" display onClose={onClose}>
      <Box p={3} height="100%" display="flex" flexDirection="column">
        <Stack flex={1}>
          <TextField select fullWidth label="Select Program" onChange={e => setSelectedProgram(e.target.value)}>
            {programOptions.map(program => (
              <MenuItem key={program} value={program}>
                {program}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Stack justifyContent="flex-end" direction="row" gap={2}>
          <Button variant="text">Back</Button>
          <Button onClick={checkEligibility} disabled={!selectedProgram}>
            Check Eligibility
          </Button>
        </Stack>
      </Box>
    </AvixoFixedContainer>
  );
};
export default GovernmentSubsidies;
