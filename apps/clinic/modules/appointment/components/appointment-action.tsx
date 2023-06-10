import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { AvixoFixedContainer } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import JumpToForm from './AppointmentActions/jump-to';

interface AppointmentActionProps {
  onJump: (type: string, value: number) => void;
}

const AppointmentAction: React.FC<AppointmentActionProps> = ({ onJump }) => {
  const router = useRouter();
  const action = router.query?.action;

  const handleCloseContainer = useCallback(() => {
    router.push(PAGE_URLS.APPOINTMENT());
  }, [router]);

  switch (action) {
    case 'jump-to':
      return (
        <AvixoFixedContainer title="Jump to ..." display onClose={handleCloseContainer}>
          <JumpToForm onCancel={handleCloseContainer} onJump={onJump} />
        </AvixoFixedContainer>
      );
    default:
      return null;
  }
};

export default AppointmentAction;
