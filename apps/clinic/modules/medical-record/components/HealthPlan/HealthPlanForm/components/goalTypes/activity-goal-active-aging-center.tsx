import { Stack, Typography, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ActivityGoalActiveAgingCenterType } from '../health-goal-types';

interface ActivityGoalActiveAgingCenterProps {
  isCheckPhysicalActivitiesSignUp: boolean;
  isCheckMindAndSocial: boolean;
  isCheckVitalSignsMonitoring: boolean;
  isCheckOthers: boolean;
  specifyDesc: string;
  onChange: (value: ActivityGoalActiveAgingCenterType) => void;
}

const ActivityGoalActiveAgingCenter: React.FC<ActivityGoalActiveAgingCenterProps> = ({
  isCheckVitalSignsMonitoring,
  isCheckOthers,
  isCheckMindAndSocial,
  isCheckPhysicalActivitiesSignUp,
  specifyDesc,
  onChange,
}) => {
  const [currentPhysicalActivitiesSignUp, setCurrentPhysicalActivitiesSignUp] = useState(
    isCheckPhysicalActivitiesSignUp ?? false,
  );
  const [currentMindAndSocial, setCurrentMindAndSocial] = useState(isCheckMindAndSocial ?? false);
  const [currentVitalSignsMonitoring, setCurrentVitalSignsMonitoring] = useState(isCheckVitalSignsMonitoring ?? false);
  const [currentOthers, setCurrentOthers] = useState(isCheckOthers ?? false);
  const [currentSpecifyDesc, setCurrentSpecifyDesc] = useState(specifyDesc ?? '');
  const [isDirty, setIsDirty] = useState(false);
  const handleChangeValue = (updateFieldFunc: (value: boolean) => void, value: boolean) => {
    if (updateFieldFunc) {
      updateFieldFunc(value);
    }
    setIsDirty(true);
  };
  const handleChangePhysicalActivitiesSignUp = useCallback((e: any) => {
    handleChangeValue(setCurrentPhysicalActivitiesSignUp, e.target.checked);
  }, []);
  const handleChangeMindAndSocial = useCallback((e: any) => {
    handleChangeValue(setCurrentMindAndSocial, e.target.checked);
  }, []);
  const handleChangeVitalSignsMonitoring = useCallback((e: any) => {
    handleChangeValue(setCurrentVitalSignsMonitoring, e.target.checked);
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
        isCheckPhysicalActivitiesSignUp: currentPhysicalActivitiesSignUp,
        isCheckMindAndSocial: currentMindAndSocial,
        isCheckVitalSignsMonitoring: currentVitalSignsMonitoring,
        isCheckOthers: currentOthers,
        specifyDesc: currentSpecifyDesc,
      });
      setIsDirty(false);
    }
  }, [
    currentVitalSignsMonitoring,
    currentOthers,
    currentMindAndSocial,
    currentSpecifyDesc,
    currentPhysicalActivitiesSignUp,
    onChange,
    isDirty,
  ]);

  return (
    <Stack spacing={2} sx={{ marginTop: '17px' }}>
      <Typography variant="body2" color="neutral.900">
        Participate in the below programme(s) referred for you.
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={currentPhysicalActivitiesSignUp} onChange={handleChangePhysicalActivitiesSignUp} />}
        label="Physical Activities Sign-up"
      />
      <FormControlLabel
        control={<Checkbox checked={currentMindAndSocial} onChange={handleChangeMindAndSocial} />}
        label="Mind-stimulating and Social Activities Sign-up"
      />
      <FormControlLabel
        control={<Checkbox checked={currentVitalSignsMonitoring} onChange={handleChangeVitalSignsMonitoring} />}
        label="Vital Signs Monitoring"
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
      <Typography variant="body2" color="neutral.900">
        Note: This goal is applicable for residents ≥t 60 years old.
      </Typography>
    </Stack>
  );
};

export default ActivityGoalActiveAgingCenter;
