import { Typography, TextField, Box } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import { PHASE_LABEL, PRACTITIONER_ROLE_VALUE } from '../../constants';
import renderSelectMenuItem from '../common/select-menu-item';
import { PractitionerFormValues } from '../../types/practitioner-form';

const roleSelectItems = [
  {
    label: 'System Administrator',
    value: PRACTITIONER_ROLE_VALUE.sysAdmin,
  },
];

const PractitionerRolePhase: FC = () => {
  const { getFieldProps, errors, touched } = useFormikContext<PractitionerFormValues>();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {PHASE_LABEL.role}
      </Typography>
      <TextField
        select
        required
        fullWidth
        label="Role"
        {...getFieldProps('enrole')}
        error={Boolean(touched.enrole && errors.enrole)}
        helperText={touched.enrole && errors.enrole}
      >
        {renderSelectMenuItem(roleSelectItems, 'practitioner-role')}
      </TextField>
    </Box>
  );
};

export default PractitionerRolePhase;
