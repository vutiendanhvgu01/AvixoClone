import type { SnackbarProps } from '@mui/material/Snackbar';

interface AvixoSnackbarProps extends SnackbarProps {
  /**
   * Callback fired when the component requests to be closed.
   * Typically `handleClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   */
  handleClose?: (...args: any[]) => void;
  /**
   * Callback fired when click the action button
   */
  handleAction?: (...args: any[]) => void;
  /**
   * If `true`, the action button is shown.
   * @default false
   */
  showActionButton?: boolean;
  /**
   * The title of the action
   * @default 'Action'
   */
  actionText?: string;
  /**
   * If `true`, the close icon button is shown.
   * @default true
   */
  showIconButton?: boolean;
}

export default AvixoSnackbarProps;
