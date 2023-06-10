import { Avatar, AvatarProps, Box, Button, ButtonProps, styled } from '@mui/material';
import React, { ChangeEvent, ElementType } from 'react';
import Logo from 'share-components/assets/administrator/organisation/speedoc.png';

interface AvatarFillProps {
  avatarUrl: string | null;
  handleChange: (img: string) => void;
  onRemove: () => void;
  uploadButtonProps?: Partial<ButtonProps> & { component?: ElementType };
  removeButtonProps?: Partial<ButtonProps>;
  avatarProps?: Partial<AvatarProps>;
  uploadLabel?: string;
  removeLabel?: string;
  noneAvatarComponent?: React.ReactNode;
}

export const VariantButton = styled(Button)(() => ({
  marginLeft: 'auto',
  '&.MuiButtonBase-root:hover': {
    backgroundColor: 'transparent',
  },
}));

export const AvatarFillContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const AvatarFill: React.FC<AvatarFillProps> = ({
  avatarUrl,
  handleChange,
  onRemove,
  uploadButtonProps,
  removeButtonProps,
  avatarProps,
  uploadLabel = 'Change',
  removeLabel = 'Remove',
  noneAvatarComponent,
}) => {
  const handleChangeImage = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement & EventTarget;
    const newImage = target?.files && target?.files[0];

    if (newImage && handleChange) {
      handleChange(URL.createObjectURL(newImage));
    }
  };

  return (
    <AvatarFillContainer>
      {noneAvatarComponent && !avatarUrl ? (
        noneAvatarComponent
      ) : (
        <Avatar {...avatarProps} src={avatarUrl ?? Logo.src} />
      )}
      <Button
        variant="text"
        disableRipple
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
        component="label"
        {...uploadButtonProps}
      >
        {uploadLabel}
        <input hidden accept="image/*" type="file" onChange={handleChangeImage} />
      </Button>
      <VariantButton disableRipple variant="text" onClick={onRemove} {...removeButtonProps}>
        {removeLabel}
      </VariantButton>
    </AvatarFillContainer>
  );
};

export default AvatarFill;
