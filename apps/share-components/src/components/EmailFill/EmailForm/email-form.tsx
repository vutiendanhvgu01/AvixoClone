import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CloseIcon from '../../AvixoIcons/close-icon';
import EmailFormSchema from './email-form-schema';
import { EmailFormProps, Errors } from './email-form-type';

const EmailWrap = styled(Box)(() => ({
  display: 'flex',
  borderRadius: 8,
  '&:last-child': {
    marginBottom: 15,
  },
}));

const EmailBlock = styled(Box)(({ theme }) => ({
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

const EmailForm = (props: EmailFormProps) => {
  const {
    email,
    onChange,
    isShowValidationError,
    index,
    onRemove,
    deleteButtonProps,
    allowCheckMarkAsPrimary = false,
  } = props;
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
      EmailFormSchema.validate(email, { abortEarly: false })
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
  }, [isShowValidationError, email]);

  return (
    <>
      <EmailWrap>
        <EmailBlock>
          <Grid container spacing={0}>
            <TextField
              defaultValue={email?.email}
              name="email"
              onChange={onFieldChange}
              placeholder="Email Address"
              label="Email Address"
              fullWidth
              error={!!errors.email}
              className="email-field border-b"
            />
          </Grid>
        </EmailBlock>
        <Action>
          <DeleteButton onClick={onDeleteButtonClick} {...deleteButtonProps}>
            <CloseIcon />
          </DeleteButton>
        </Action>
      </EmailWrap>
      <FormControl
        fullWidth
        sx={{
          marginBottom: '30px !important',
        }}
      >
        {allowCheckMarkAsPrimary && (
          <FormControlLabel
            control={<Checkbox name="isPrimary" onChange={onFieldChange} checked={email?.isPrimary} />}
            label="Mark as Primary "
          />
        )}
      </FormControl>
    </>
  );
};

export default EmailForm;
