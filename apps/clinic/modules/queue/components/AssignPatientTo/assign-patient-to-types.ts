import { AssignedTo, BasedOnType } from 'modules/queue/types';

interface AssignPatientToProps {
  onClose: () => void;
  open: boolean;
  practitioners: [];
  handleBasedOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  basedOn: BasedOnType;
  assignedTo: AssignedTo;
}

export default AssignPatientToProps;
