import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, Grid, IconButton, TextField, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import CloseIcon from '../../AvixoIcons/close-icon';
import PhoneFormSchema from './phone-number-form-schema';
import { PhoneNumberFormProps, Errors } from './phone-number-form-type';

const PhoneWrap = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 30,
  borderRadius: 8,
  '&:last-child': {
    marginBottom: 15,
  },
}));

const PhoneBlock = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  flex: 1,
  marginRight: '-5px',
  position: 'relative',
  zIndex: 9,
  background: 'white',
}));

const Action = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0 8px 8px 0',
  borderLeft: 'none',
  overflow: 'hidden',
}));

const DeleteButton = styled(IconButton)(() => ({
  borderRadius: 0,
  paddingRight: 0,
  paddingLeft: '5px',
}));

const PhoneForm = (props: PhoneNumberFormProps) => {
  const { phoneNumber, onChange, isShowValidationError, index, onRemove } = props;
  const [errors, setErrors] = useState<Errors>({});
  const countryCodes = [
    {
      id: 0,
      text: 'SG +65',
    },
    {
      id: 1,
      text: 'VN +84',
    },
  ];

  const onPhoneChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      onChange(name, value, index);
    },
    [onChange],
  );

  const onCountryCodeChange = useCallback(
    ({ target: { name, value } }: SelectChangeEvent<string>) => {
      onChange(name, value as string, index);
    },
    [onChange],
  );

  const onDelete = useCallback(() => {
    onRemove(index);
  }, [onRemove]);

  useEffect(() => {
    if (isShowValidationError) {
      PhoneFormSchema.validate(phoneNumber, { abortEarly: false })
        .then(() => {
          setErrors({});
        })
        .catch(err => {
          const errorsData: Errors = {};
          err.inner.forEach(({ path, message }: any) => {
            errorsData[path] = message;
          });
          setErrors({ ...errorsData });
        });
    }
  }, [isShowValidationError, phoneNumber]);

  return (
    <PhoneWrap>
      <PhoneBlock>
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <InputLabel id="country-code-label">Mobile Number</InputLabel>
              <Select
                labelId="country-code-label"
                id="country-code-options-select"
                name="countryCode"
                label="Country Code"
                sx={{
                  width: '100%',
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
                onChange={onCountryCodeChange}
                value={phoneNumber?.countryCode}
              >
                {countryCodes.map((code: any) => (
                  <MenuItem key={`type-item-${code.id}`} value={code.id}>
                    {code.text}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={7}>
              <TextField
                defaultValue={phoneNumber?.number}
                name="number"
                onChange={onPhoneChange}
                label=""
                fullWidth
                className="phone-field border-b"
                placeholder="8-digit number"
              />
            </Grid>
          </Grid>
        </FormControl>
      </PhoneBlock>
      <Action>
        <DeleteButton onClick={onDelete}>
          <CloseIcon />
        </DeleteButton>
      </Action>
    </PhoneWrap>
  );
};

export default PhoneForm;
