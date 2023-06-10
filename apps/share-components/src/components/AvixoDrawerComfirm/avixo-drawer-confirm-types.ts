import type { ButtonProps, DrawerProps } from '@mui/material';
import React, { ReactNode } from 'react';

interface AvixoDrawerConfirmFooterProps {
  /**
   * Text of the cancel button
   * @default 'Cancel'
   */
  cancelText?: string;
  /**
   * Text of the confirm button
   * @default 'Yes, remove'
   */
  confirmText?: string;
  /**
   * Callback fired when the confirm button is clicked.
   */
  onConfirmClick?: (...args: any[]) => void;

  confirmRestProps?: ButtonProps & { 'data-cy'?: string };
}

interface AvixoDrawerConfirmProps {
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean;
  handleClose?: (...args: any[]) => void;
  /**
   * Title of this confirmation drawer
   */
  title?: ReactNode;
  /**
   * Title of this confirmation content
   */
  confirmContentTitle?: string;
  /**
   * Content of this confirmation
   */
  confirmContent?: string | ReactNode;
  /**
   * The Addition content of this confirmation shows below the input
   */
  additionContent?: string | ReactNode;
  /**
   * The label of the action message input
   */
  inputLabel?: string;
  onInputChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * @default {}
   */
  footerProps?: AvixoDrawerConfirmFooterProps;
  drawerProps?: DrawerProps;
  /**
   * Custom Header
   */
  headerComponent?: ReactNode;
  /**
   * action of request
   */
  action?: string;
  inputProps?: {
    name?: string;
    required?: boolean;
    defaultValues?: string;
    label?: string;
    autoFocus?: boolean;
  };
  id?: string | number;
  moreActions?: Array<{ name: string; value: number | string }> | [];
  /**
   * If true this component can submit
   * * */
  disabled?: boolean;
}

export default AvixoDrawerConfirmProps;
