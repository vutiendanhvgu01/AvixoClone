import { ButtonProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import AvixoMenuProps from '../AvixoMenu/menu-type';

interface MenuButtonProps {
  onOpen?: () => void;
  onClose?: () => void;
  ButtonProps?: ButtonProps;
  AvixoMenuBaseProps?: Partial<AvixoMenuProps>;
  children?: ReactNode;
  label?: ReactNode;
  customAction?: ReactElement;
  dataCy?: string;
  onChange?: (value: string) => void;
}

export default MenuButtonProps;
