import {
  Box,
  Grid,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CloseIcon from '../../AvixoIcons/close-icon';
import PhoneNumberFormSchema from './phone-form-schema';
import { PhoneNumberFormProps, Errors } from './phone-form-type';

const PhoneNumberWrap = styled(Box)(() => ({
  display: 'flex',
  borderRadius: 8,
  '&:last-child': {
    marginBottom: 15,
  },
}));

const PhoneNumberBlock = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  flex: 1,
  marginRight: '-5px',
  position: 'relative',
  zIndex: 9,
  background: 'white',

  '.MuiFormControl-root': {
    marginBottom: 0,
    border: 'none',
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
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

const SelectOptions = styled(Select)(() => ({
  borderRadius: '8px 0 0 8px',
}));

const PhoneNumberForm = (props: PhoneNumberFormProps) => {
  const { phoneNumber, onChange, isShowValidationError, index, onRemove, phoneNumbers } = props;
  const [errors, setErrors] = useState<Errors>({});

  const onFieldChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = target || {};
      onChange(name, name === 'isPrimary' ? checked : value, index);
    },
    [index, onChange],
  );

  const onDeleteButtonClick = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  useEffect(() => {
    if (isShowValidationError) {
      PhoneNumberFormSchema.validate(phoneNumber, { abortEarly: false })
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

  const handleChange = useCallback(
    (event: any) => {
      onFieldChange(event);
    },
    [onFieldChange],
  );
  return (
    <>
      <PhoneNumberWrap>
        <PhoneNumberBlock>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: '0px !important',
                }}
              >
                <InputLabel id="product-options">Mobile Number</InputLabel>
                <SelectOptions
                  labelId="countryCode-options"
                  id="countryCode-options-select"
                  name="countryCode"
                  label="Mobile Number"
                  onChange={handleChange}
                  defaultValue={phoneNumber?.countryCode || 1}
                >
                  {[
                    {
                      id: 65,
                      name: 'SG +65',
                    },
                    {
                      id: 84,
                      name: 'VN +84',
                    },
                  ].map((record: any) => (
                    <MenuItem key={`phoneNumber-item-${record.id}`} value={record.id}>
                      {record.name}
                    </MenuItem>
                  ))}
                </SelectOptions>
              </FormControl>
            </Grid>
            <Grid item xs={7}>
              <TextField
                defaultValue={phoneNumber?.phoneValue}
                name="phoneValue"
                onChange={onFieldChange}
                placeholder="8-digit number"
                error={!!errors.phoneValue}
                fullWidth
                className="phoneNumber-field"
                sx={{
                  input: { color: 'neutral.500' },
                }}
              />
            </Grid>
          </Grid>
        </PhoneNumberBlock>
        <Action>
          <DeleteButton onClick={onDeleteButtonClick}>
            <CloseIcon />
          </DeleteButton>
        </Action>
      </PhoneNumberWrap>
      <FormControl
        fullWidth
        sx={{
          marginBottom: '30px !important',
        }}
      >
        {phoneNumbers && phoneNumbers.length > 1 && (
          <FormControlLabel
            control={<Checkbox name="isPrimary" onChange={handleChange} checked={phoneNumber?.isPrimary} />}
            label="Mark as Primary "
          />
        )}
      </FormControl>
    </>
  );
};

export default PhoneNumberForm;
