import { MenuItem, TextField, Box, InputBase, Stack, Button, Divider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { useFormikContext } from 'formik';
import { PlusIcon } from 'share-components';
import CONSTANTS from './form-options';
import { AddPatientIdentitiesType, AddPatientInitialValuesType } from './add-edit-patient-form-types';
import ErrorText from './error-text';
import SubTypeOptions from './form-options/sub-type-options';

const InputBox = styled(Box)(() => ({
  borderColor: '#ccc',
  display: 'flex',
}));

const CloseBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderLeftWidth: 0,
  borderStartEndRadius: 10,
  borderEndEndRadius: 10,
  color: theme.palette.error.main,
}));

interface PatientIdentityProps {
  identityArray: AddPatientIdentitiesType[];
}
type SubTypeItem = { label: string; value: string };
const PatientIdentity: React.FC<PatientIdentityProps> = ({ identityArray }) => {
  const {
    values: { identities },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<AddPatientInitialValuesType>();

  const addNewIdentity = () => {
    const prevIdentites = identities;
    prevIdentites.push({ idType: 'national-id', idNumber: '', issuingCountry: '', idSubType: '' });
    setFieldValue('identities', prevIdentites);
  };

  const [subTypes, setsubTypes] = useState<SubTypeItem[]>([]);

  type RemoveIdentityType = (index: number) => void;

  const removeIdentity: RemoveIdentityType = index => {
    if (identities.length === 1) return;
    const prevIdentites = identities;
    prevIdentites.splice(index, 1);
    setFieldValue('identities', [...prevIdentites]);
  };
  type IdentityKeys = 'idType' | 'idNumber' | 'issuingCountry' | 'idSubType';
  type HandleChangeType = (name: IdentityKeys, value: string, index: number) => void;

  const handleChange: HandleChangeType = useCallback(
    (name, value, index) => {
      identities[index][name] = value;
      setFieldValue('identities', [...identities]);
    },
    [identities, setFieldValue],
  );
  type IdentityTypes = 'national-id' | 'other' | 'passport' | 'driver-license';
  type CountryTypes = 'SG' | 'MY' | 'any-country';

  const getSubTypeOptions = ({ type, country }: { type: IdentityTypes; country: CountryTypes }) => {
    const subTypeData = SubTypeOptions[type][country] || SubTypeOptions[type]['any-country'] || [];
    setsubTypes(subTypeData);
  };

  return (
    <Stack gap={2}>
      <InputBase value={JSON.stringify(identities)} name="identities" type="hidden" />
      {identityArray.map((identity, index) => (
        <>
          <InputBox key={`patient-identities-${index.toString()}`} height={subTypes.length > 0 ? 159 : 106}>
            <Box>
              <Box>
                <TextField
                  select
                  label="ID"
                  sx={{ width: 150, height: 53 }}
                  required
                  InputProps={{ style: { borderRadius: 0, borderStartStartRadius: 10 } }}
                  onChange={e => {
                    handleChange('idType', e.target.value, index);
                    getSubTypeOptions({
                      type: identities[index].idType as IdentityTypes,
                      country: identities[index].issuingCountry as CountryTypes,
                    });
                  }}
                  value={identities[index].idType}
                >
                  {CONSTANTS.idTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <InputBase
                  sx={{
                    width: 'calc(100% - 150px)',
                    minWidth: 250,
                    height: 53,
                    px: 2,
                    border: 1,
                    borderLeft: 0,
                    borderBottom: 0,
                    borderColor: '#ccc',
                  }}
                  placeholder="Enter ID Number"
                  required
                  onChange={e => handleChange('idNumber', e.target.value, index)}
                  value={identities[index].idNumber}
                />
              </Box>
              <TextField
                select
                fullWidth={subTypes.length === 0}
                InputProps={{
                  style: { borderRadius: 0, borderEndStartRadius: subTypes.length > 1 ? 0 : 10, height: 53 },
                }}
                sx={{ width: '100%', minWidth: 400 }}
                label="Issuing Country"
                onChange={e => {
                  handleChange('issuingCountry', e.target.value.toUpperCase(), index);
                  getSubTypeOptions({
                    type: identities[index].idType as IdentityTypes,
                    country: identities[index].issuingCountry as CountryTypes,
                  });
                }}
                value={identities[index].issuingCountry}
              >
                {CONSTANTS.issuingCountries.map(country =>
                  country.isSeparator ? (
                    <Divider key="separator" />
                  ) : (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ),
                )}
              </TextField>
              {Array.isArray(subTypes) && subTypes.length > 0 && (
                <TextField
                  select
                  InputProps={{ style: { borderRadius: 0, borderEndStartRadius: 10, height: 53 } }}
                  sx={{ width: '100%', minWidth: 400 }}
                  fullWidth
                  label="Sub Type"
                  onChange={e => handleChange('idSubType', e.target.value, index)}
                  value={identities[index].idSubType}
                >
                  {subTypes.map(subType => (
                    <MenuItem key={subType.label} value={subType.value}>
                      {subType.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
            <CloseBox>
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => removeIdentity(index)} />
            </CloseBox>
          </InputBox>
          <ErrorText>
            {errors.identities && errors.identities[index] && touched.identities && (
              <>
                {touched.identities[index]?.idNumber && (errors.identities[index] as AddPatientIdentitiesType).idNumber}
                {', '}
                {touched.identities[index]?.issuingCountry &&
                  (errors.identities[index] as AddPatientIdentitiesType).issuingCountry}
                {', '}
                {touched.identities[index]?.idSubType &&
                  (errors.identities[index] as AddPatientIdentitiesType).idSubType}
              </>
            )}
          </ErrorText>
        </>
      ))}
      <Box sx={{ display: 'flex' }}>
        <Button startIcon={<PlusIcon />} variant="text" onClick={addNewIdentity} color="info">
          Another ID
        </Button>
      </Box>
    </Stack>
  );
};
export default PatientIdentity;
