import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '../../AvixoIcons/close-icon';
import EmailFormSchema from './email-form-schema';
import { EmailFormProps, Errors } from './email-form-type';

const EmailWrap = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 30,
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
  const { email, onChange, isShowValidationError, index, onRemove } = props;
  const [errors, setErrors] = useState<Errors>({});

  const onFieldChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      onChange(name, value, index);
    },
    [onChange],
  );

  const onDelete = useCallback(() => {
    onRemove(index);
  }, [onRemove]);

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
    <EmailWrap>
      <EmailBlock>
        <TextField
          required
          defaultValue={email?.email}
          name="email"
          onChange={onFieldChange}
          label="Email Address"
          fullWidth
          className="email-field border-b"
          placeholder=""
        />
      </EmailBlock>
      <Action>
        <DeleteButton onClick={onDelete}>
          <CloseIcon />
        </DeleteButton>
      </Action>
    </EmailWrap>
  );
};

export default EmailForm;
