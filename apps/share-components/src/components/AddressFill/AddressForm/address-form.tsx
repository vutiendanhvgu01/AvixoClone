import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CloseIcon from '../../AvixoIcons/close-icon';
import AddressFormSchema from './address-form-schema';
import { AddressFormProps, Errors } from './address-form-type';

const AddressWrap = styled(Box)(() => ({
  display: 'flex',
  borderRadius: 8,
  '&:last-child': {
    marginBottom: 15,
  },
}));

const AddressBlock = styled(Box)(({ theme }) => ({
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

const AddressForm = (props: AddressFormProps) => {
  const theme = useTheme();
  const { address, onChange, isShowValidationError, index, onRemove } = props;
  const [errors, setErrors] = useState<Errors>({});

  const onFieldChange = useCallback(
    ({ target: { name, value, checked } }: ChangeEvent<HTMLInputElement>) => {
      onChange(name, name === 'isPrimary' ? checked : value, index);
    },
    [index, onChange],
  );

  const onDeleteButtonClick = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  useEffect(() => {
    if (isShowValidationError) {
      AddressFormSchema.validate(address, { abortEarly: false })
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
  }, [isShowValidationError, address]);

  return (
    <>
      <AddressWrap>
        <AddressBlock>
          <TextField
            defaultValue={address?.line1}
            name="address"
            onChange={onFieldChange}
            label="Address Line 1"
            fullWidth
            className="address-field border-b"
          />
          <TextField
            defaultValue={address?.line2}
            name="secondAddress"
            onChange={onFieldChange}
            label="Address Line 2"
            fullWidth
            className="address-field border-b"
          />
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <TextField
                defaultValue={address?.unitLevel}
                name="floorNo"
                onChange={onFieldChange}
                label="Unit Level"
                fullWidth
                className="address-field border-b border-r"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                defaultValue={address?.unitNo}
                name="unitNo"
                onChange={onFieldChange}
                label="Unit Number"
                fullWidth
                className="address-field border-b"
              />
            </Grid>
          </Grid>
          <TextField
            required
            defaultValue={address?.postal}
            name="postal"
            onChange={onFieldChange}
            label="Postal Code"
            fullWidth
            error={!!errors.postal}
            className="address-field border-b"
          />
          <TextField
            defaultValue={address?.city}
            name="city"
            onChange={onFieldChange}
            label="City"
            fullWidth
            className="address-field border-b"
          />
          <TextField
            defaultValue={address?.country}
            name="country"
            onChange={onFieldChange}
            label="Country"
            fullWidth
            className="address-field group-noBorder"
          />
        </AddressBlock>
        <Action>
          <DeleteButton onClick={onDeleteButtonClick}>
            <CloseIcon
              sx={{
                color: theme?.palette.error.main,
              }}
            />
          </DeleteButton>
        </Action>
      </AddressWrap>
      <FormControl
        fullWidth
        sx={{
          marginBottom: '30px !important',
        }}
      >
        <FormControlLabel
          control={<Checkbox name="isPrimary" onChange={onFieldChange} checked={address?.isPrimary} />}
          label="Mark as Primary "
        />
      </FormControl>
    </>
  );
};

export default AddressForm;
