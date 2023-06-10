import { ShowAssignedToContext } from 'modules/queue/context/assign-to-context';
import { AssignedTo, BasedOnType } from 'modules/queue/types';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import AssignPatientTo from '../AssignPatientTo/assign-patient-to';

const AssignToContext: React.FC<{ children: ReactNode; practitioners: [] }> = ({ children, practitioners }) => {
  const [assignTo, setAssignedTo] = useState<AssignedTo>({
    base: '',
    name: '',
  });
  const [openOpenSheetAssign, setOpenSheetAssign] = useState<boolean>(false);
  const [basedOn, setBasedOn] = useState<BasedOnType>('practitioner');

  useEffect(() => {
    if (assignTo.basedOn) {
      if (basedOn !== assignTo.basedOn) {
        setBasedOn(assignTo.basedOn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignTo.basedOn]);
  const handleOpenAssignedToSheet = (open = true) => {
    setOpenSheetAssign(open);
  };
  const handleBasedOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasedOn(e.target.value as BasedOnType);
  };
  const handleSetAssignedTo = (newAssign: AssignedTo) => {
    setAssignedTo(newAssign);
  };
  return useMemo(
    () => (
      <ShowAssignedToContext.Provider value={{ handleSetAssignedTo, assignTo, handleOpenAssignedToSheet }}>
        {children}
        {openOpenSheetAssign && (
          <AssignPatientTo
            assignedTo={assignTo}
            open={openOpenSheetAssign}
            onClose={() => handleOpenAssignedToSheet(false)}
            practitioners={practitioners}
            handleBasedOnChange={handleBasedOnChange}
            basedOn={basedOn}
          />
        )}
      </ShowAssignedToContext.Provider>
    ),
    [assignTo, children, basedOn, openOpenSheetAssign, practitioners],
  );
};

export default AssignToContext;
