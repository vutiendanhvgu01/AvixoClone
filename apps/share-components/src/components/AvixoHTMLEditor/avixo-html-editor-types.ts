import { SxProps } from '@mui/material/styles';

export default interface AvixoHTMLEditorProps {
  initialValue?: string;
  onChangeValue?: (html: string, text: string) => void;
  ctnSxProps?: SxProps;
}
