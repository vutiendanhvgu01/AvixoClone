import { MenuItem, Select, Stack, useTheme, TextField, FormControl } from '@mui/material';
import { FC } from 'react';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { GroupInput as GroupInputTypeProps } from '../PractitionerForm/practitioner-form-types';

const GroupInput: FC<GroupInputTypeProps> = ({
  textFieldBaseProps,
  selectBaseProps,
  menuData,
  onRemove,
  hasDropDown = true,
}) => {
  const theme = useTheme();
  return (
    <TextField
      fullWidth
      sx={{
        '.MuiInputBase-root': {
          paddingRight: 0,
        },
      }}
      {...textFieldBaseProps}
      InputProps={{
        sx: {
          input: {
            borderRight: `1px solid ${theme.palette.divider}`,
            borderRadius: '0 8px 8px 0',
          },
        },
        startAdornment: hasDropDown && (
          <FormControl
            sx={{
              width: '35%',
            }}
          >
            <Select
              {...selectBaseProps}
              variant="standard"
              sx={{
                height: '100%',
                marginRight: 1,
                borderRight: '1px solid  #E6E6E6',
                '	.MuiSelect-select': {
                  background: 'none',
                },
                '&::before': {
                  border: 'none !important',
                },
                '&::after': {
                  border: 'none',
                },
              }}
              error
            >
              {Array.isArray(menuData) &&
                menuData.map(item => (
                  <MenuItem key={item.value} value={item.value} {...item.menuItemProps}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ),
        endAdornment: (
          <Stack
            sx={{ height: '100%', cursor: 'pointer', paddingX: '8px' }}
            flexDirection="row"
            alignItems="center"
            onClick={onRemove}
          >
            <CloseIcon
              sx={{
                color: theme.palette.error.main,
              }}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default GroupInput;
