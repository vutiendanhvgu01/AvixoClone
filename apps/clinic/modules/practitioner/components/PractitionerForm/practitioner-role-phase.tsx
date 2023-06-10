import { Grid, Typography, FormControl, InputLabel, Select } from '@mui/material';
import { FormikProps } from 'formik';
import { FC, useState, useEffect } from 'react';
import authProxyService from 'modules/auth/service/proxy';
import { PHASE_LABEL } from '../../constants';
import renderSelectMenuItem from '../common/select-menu-item';
import { SelectMenuItemType } from './practitioner-form-types';

const PractitionerRolePhase: FC<{ formikProps: FormikProps<any> }> = ({ formikProps }) => {
  const [roles, setRoles] = useState<SelectMenuItemType[]>([]);

  const fetchRoles = async () => {
    try {
      const { data } = await authProxyService.getRoles();
      setRoles(
        data.map((item: { name: any; id: any }) => ({
          label: item.name,
          value: item.id,
        })),
      );
    } catch (error) {
      // TODO handle error
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchRoles().catch(error => console.log({ error }));
  }, []);

  return (
    <Grid sx={{ p: 4 }} container direction="column">
      <Grid item>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {PHASE_LABEL.role}
        </Typography>
        <FormControl required fullWidth>
          <InputLabel required id="practitioner-role-configurations">
            Select Role
          </InputLabel>
          <Select
            labelId="practitioner-detail-language"
            label="Language"
            error={Boolean(formikProps.errors?.enrole)}
            {...formikProps.getFieldProps('enrole')}
          >
            {renderSelectMenuItem(roles, 'practitioner-role-')}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PractitionerRolePhase;
