import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { FormControlAuth, TextError } from '.';

interface TextFieldPasswordProps extends Partial<OutlinedInputProps> {
  errorText?: string;
}
const TextFieldPassword: FC<TextFieldPasswordProps> = props => {
  const { label = 'Password', error, errorText } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  return (
    <FormControlAuth error={error} fullWidth>
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <OutlinedInput
        name="password"
        type={showPassword ? 'text' : 'password'}
        inputProps={{
          'data-cy': 'password',
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label ?? 'Password'}
        {...props}
      />
      {error && errorText && <TextError error>{errorText}</TextError>}
    </FormControlAuth>
  );
};
export default React.memo(TextFieldPassword);
