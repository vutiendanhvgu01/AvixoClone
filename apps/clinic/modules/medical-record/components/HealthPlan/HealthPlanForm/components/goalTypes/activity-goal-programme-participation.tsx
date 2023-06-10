import { Stack, Typography, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ActivityGoalProgrammeParticipationType } from '../health-goal-types';

interface ActivityGoalProgrammeParticipationProps {
  isCheckWeightManagement: boolean;
  isCheckSmokingCessation: boolean;
  isCheckChronicDiseaseSpecific: boolean;
  isCheckOthers: boolean;
  specifyDesc: string;
  onChange: (value: ActivityGoalProgrammeParticipationType) => void;
}

const ActivityGoalProgrammeParticipation: React.FC<ActivityGoalProgrammeParticipationProps> = ({
  isCheckChronicDiseaseSpecific,
  isCheckOthers,
  isCheckSmokingCessation,
  isCheckWeightManagement,
  specifyDesc,
  onChange,
}) => {
  const [currentWeightManagement, setCurrentWeightManagement] = useState(isCheckWeightManagement ?? false);
  const [currentSmokingCessation, setCurrentSmokingCessation] = useState(isCheckSmokingCessation ?? false);
  const [currentChronicDiseaseSpecific, setCurrentChronicDiseaseSpecific] = useState(
    isCheckChronicDiseaseSpecific ?? false,
  );
  const [currentOthers, setCurrentOthers] = useState(isCheckOthers ?? false);
  const [currentSpecifyDesc, setCurrentSpecifyDesc] = useState(specifyDesc ?? '');
  const [isDirty, setIsDirty] = useState(false);
  const handleChangeValue = (updateFieldFunc: (value: boolean) => void, value: boolean) => {
    if (updateFieldFunc) {
      updateFieldFunc(value);
    }
    setIsDirty(true);
  };
  const handleChangeWeightManagement = useCallback((e: any) => {
    handleChangeValue(setCurrentWeightManagement, e.target.checked);
  }, []);
  const handleChangeSmokingCessation = useCallback((e: any) => {
    handleChangeValue(setCurrentSmokingCessation, e.target.checked);
  }, []);
  const handleChangeChronicDiseaseSpecific = useCallback((e: any) => {
    handleChangeValue(setCurrentChronicDiseaseSpecific, e.target.checked);
  }, []);
  const handleChangeOthers = useCallback((e: any) => {
    handleChangeValue(setCurrentOthers, e.target.checked);
    if (!e.target.checked) {
      setCurrentSpecifyDesc('');
    }
  }, []);
  const handleChangeSpecifySesc = useCallback((e: any) => {
    setCurrentSpecifyDesc(e.target.value);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (onChange && isDirty) {
      onChange({
        isCheckWeightManagement: currentWeightManagement,
        isCheckSmokingCessation: currentSmokingCessation,
        isCheckChronicDiseaseSpecific: currentChronicDiseaseSpecific,
        isCheckOthers: currentOthers,
        specifyDesc: currentSpecifyDesc,
      });
      setIsDirty(false);
    }
  }, [
    currentChronicDiseaseSpecific,
    currentOthers,
    currentSmokingCessation,
    currentSpecifyDesc,
    currentWeightManagement,
    isDirty,
    onChange,
  ]);

  return (
    <Stack spacing={2} sx={{ marginTop: '17px' }}>
      <Typography variant="body2" color="neutral.900">
        Participate in the below programme(s) referred for you.
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={currentWeightManagement} onChange={handleChangeWeightManagement} />}
        label="Weight Management"
      />
      <FormControlLabel
        control={<Checkbox checked={currentSmokingCessation} onChange={handleChangeSmokingCessation} />}
        label="Smoking Cessation"
      />
      <FormControlLabel
        control={<Checkbox checked={currentChronicDiseaseSpecific} onChange={handleChangeChronicDiseaseSpecific} />}
        label="Chronic Disease-specific"
      />
      <FormControlLabel control={<Checkbox checked={currentOthers} onChange={handleChangeOthers} />} label="Others" />
      <TextField
        disabled={!currentOthers}
        id="specify"
        value={currentSpecifyDesc}
        onChange={handleChangeSpecifySesc}
        label="Please specify"
        variant="outlined"
        sx={{ width: '434px' }}
      />
    </Stack>
  );
};

export default ActivityGoalProgrammeParticipation;
