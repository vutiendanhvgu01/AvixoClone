export interface AvixoDrawerProps {
  content: any;
  show: boolean;
  header: string;
  description?: string;
  setShow: (value: boolean) => void;
}
