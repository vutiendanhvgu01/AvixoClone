import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { useCallback, useRef } from 'react';
import AvixoFixedContainer, { Form, FormActions, FormBody } from '../../AvixoFixedContainer/avixo-fixed-container';
import { DefaultFormProps } from '../../AvixoFixedContainer/avixo-fixed-container-types';
import { ACCESS_GIVEN_OPTIONS, ROLE_LIST_ACTION, ROLE_SETTING_FORM_FIELDS } from '../constants';
import { Role, RoleFormValues, SettingField } from '../types/role';

interface RoleFormProps extends DefaultFormProps {
  initData?: Role;
  toggleAction?: (btnAction: string, role?: Role) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ initData, open, onCancel, toggleAction }) => {
  const form = useRef<HTMLFormElement | null>(null);

  const formTitle = initData ? 'Edit Role' : 'Add Role';
  const btnSubmitText = initData ? 'Save Changes' : 'Add role';

  const initialValues: RoleFormValues = {
    name: '',
    setting: {
      allPatients: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      patientList: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      prescription: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      dispense: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      invoice: {
        isEnabled: false,
        view: false,
        add: false,
        add_access_given: [],
        update: false,
        delete: false,
        delete_access_given: [],
      },
      payment: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      appointment: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      queue: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      medicalRecord: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      users: {
        isEnabled: false,
        view: false,
        add: false,
        update: false,
        delete: false,
      },
      '2fa': {
        '2fa': '',
      },
    },
  };

  const handleSelectAll = useCallback(
    (
      fieldGroup: string,
      fields: SettingField[],
      checked: boolean,
      setFieldValue: (field: string, value: any) => void,
    ) => {
      setFieldValue(`${fieldGroup}.isEnabled`, checked);
      fields.forEach(field => {
        if (field.name.indexOf('access_given') === -1) {
          setFieldValue(`${fieldGroup}.${field.name}`, checked);
        }
      });
    },
    [],
  );

  const onSubmit = async (values: any, { setFieldValue }: any) => {
    setFieldValue('body', JSON.stringify(values));
    await Promise.resolve();
    form.current?.submit();
  };

  return (
    <Formik initialValues={{ ...initialValues, ...initData }} onSubmit={onSubmit} enableReinitialize>
      {({ handleSubmit, handleChange, setFieldValue, getFieldProps, values }) => (
        <AvixoFixedContainer title={formTitle} display={open} onClose={onCancel} width={996}>
          <Form ref={form} method="POST" noValidate onSubmit={handleSubmit}>
            <FormBody>
              <FormControl fullWidth>
                <InputLabel id="roleName-field">Role Name</InputLabel>
                <OutlinedInput label="Role Name" id="subType" {...getFieldProps('name')} />
              </FormControl>
              <input hidden name="action" value={`${initData ? 'edit-role' : 'add-role'}`} />
              <input hidden {...getFieldProps('body')} />
              {initData?.id && <input hidden name="id" value={initData?.id} />}
              <Box display="flex" mt="12px">
                <Grid container columnSpacing={8}>
                  {ROLE_SETTING_FORM_FIELDS.map((setting, itemPosition: number) => {
                    const isLeftItem = (itemPosition + 1) % 2 !== 0;
                    const { group, fields, label } = setting;
                    return (
                      <Grid
                        item
                        mb={0}
                        pb={5}
                        md={6}
                        key={`role-form-${group}`}
                        id={`role-form-${group}`}
                        sx={
                          isLeftItem
                            ? {
                                position: 'relative',
                                '&:after': {
                                  position: 'absolute',
                                  right: '-32px',
                                  top: 0,
                                  borderRight: '1px solid',
                                  borderRightColor: 'divider',
                                  height: '100%',
                                  content: '""',
                                },
                              }
                            : undefined
                        }
                      >
                        {values.setting[group]?.id && (
                          <input hidden name={`setting.${group}.id`} value={values.setting[group].id} />
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h6">{label}</Typography>
                          <FormControlLabel
                            key={`role-form-${group}-selectAll`}
                            sx={{ ml: 'auto' }}
                            control={<Switch />}
                            label={values.setting[group]?.isEnabled ? 'Allow' : 'Deny'}
                            labelPlacement="start"
                            checked={Boolean(values.setting[group]?.isEnabled)}
                            onChange={(e, checked: boolean) =>
                              handleSelectAll(`setting.${group}`, fields, checked, setFieldValue)
                            }
                          />
                        </Box>
                        {values.setting[group]?.isEnabled && (
                          <FormGroup sx={{ pl: 1.5 }}>
                            {fields?.map((field: any) => {
                              const fieldType = field?.type || 'checkbox';
                              const fieldName = `setting.${group}.${field.name}`;

                              const checked =
                                fieldType === 'checkbox'
                                  ? values.setting[group][field.name]
                                  : values.setting[group][field.name] === field.value;

                              const otherProps = {
                                value: fieldType === 'checkbox' ? undefined : field.value,
                              };

                              // eslint-disable-next-line no-nested-ternary
                              return fieldType === 'select' ? (
                                values.setting[group][field.name?.split('_access_given')[0]] === true ? (
                                  <FormControl fullWidth required sx={{ mt: 1.5 }}>
                                    <InputLabel id={fieldName} sx={{ bgcolor: 'white' }}>
                                      {field.label}
                                    </InputLabel>
                                    <Select
                                      labelId={fieldName}
                                      multiple
                                      value={values.setting[group][field.name]}
                                      input={<OutlinedInput label="Chip" />}
                                      onChange={(event: SelectChangeEvent<any>) => {
                                        const {
                                          target: { value },
                                        } = event;
                                        setFieldValue(fieldName, typeof value === 'string' ? value.split(',') : value);
                                      }}
                                      renderValue={selected => (
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                          }}
                                        >
                                          {selected?.map((value: string) => (
                                            <Chip
                                              key={value}
                                              label={value}
                                              sx={{
                                                px: 1.5,
                                                py: 0.5,
                                                fontWeight: 500,
                                                lineHeight: '24px',
                                                height: 32,
                                                backgroundColor: '#EEEDFC',
                                                color: 'neutral.900',
                                              }}
                                            />
                                          ))}
                                        </Box>
                                      )}
                                    >
                                      {ACCESS_GIVEN_OPTIONS.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                          <Checkbox
                                            checked={
                                              values.setting[group][field.name]
                                                ? values.setting[group][field.name].indexOf(option.value) > -1
                                                : false
                                            }
                                          />
                                          <ListItemText primary={option.label} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : null
                              ) : (
                                <FormControlLabel
                                  key={`role-form-${setting}-${field.name}`}
                                  sx={{ marginTop: '14px' }}
                                  control={fieldType === 'radio' ? <Radio /> : <Checkbox />}
                                  label={field?.label}
                                  checked={checked}
                                  name={fieldName}
                                  {...otherProps}
                                  onChange={handleChange}
                                />
                              );
                            })}
                          </FormGroup>
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </FormBody>
            <FormActions>
              {initData && (
                <Button
                  onClick={() => {
                    if (toggleAction) {
                      if (initData.id) {
                        toggleAction(ROLE_LIST_ACTION.DELETE_ROLE, initData as Role);
                      }
                    }
                  }}
                  variant="text"
                  color="error"
                  sx={{
                    position: 'absolute',
                    left: '2%',
                  }}
                >
                  Remove
                </Button>
              )}
              <Button onClick={onCancel} variant="text">
                Back
              </Button>
              <Button type="submit">{btnSubmitText}</Button>
            </FormActions>
          </Form>
        </AvixoFixedContainer>
      )}
    </Formik>
  );
};

export default RoleForm;
