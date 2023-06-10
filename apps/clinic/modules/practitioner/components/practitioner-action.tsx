import { useCallback } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AvixoDrawerConfirm } from 'share-components';
import PractitionerForm from 'modules/practitioner/components/PractitionerForm/practitioner-form';
import { PRACTITIONER_LIST_ACTION } from '../constants';
import Practitioner from '../types/practitioner-types';

interface PractitionerActionProps {
  selectedPractitioner?: Practitioner;
}

const PractitionerAction: React.FC<PractitionerActionProps> = ({ selectedPractitioner }) => {
  const router = useRouter();
  const { action } = router.query;

  const goToMainPage = useCallback(() => {
    delete router.query.action;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
      },
    });
  }, [router]);
  switch (action) {
    case PRACTITIONER_LIST_ACTION.ADD_PRACTITIONER:
      return <PractitionerForm onCancel={goToMainPage} open />;

    case PRACTITIONER_LIST_ACTION.DELETE_PRACTITIONER:
      if (selectedPractitioner) {
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToMainPage}
            id={selectedPractitioner?.id}
            title="Delete practitioner"
            confirmContent={
              <Typography variant="body2">
                This action cannot be undone. Are you sure you want to delete <br />
                <strong>{selectedPractitioner?.name}</strong>?
              </Typography>
            }
            inputProps={{
              name: 'invoice-item-delete-reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Inactive account',
            }}
            footerProps={{
              confirmText: 'Yes, delete',
              confirmRestProps: {
                variant: 'contained',
              },
            }}
            action="delete-practitioner"
          />
        );
      }
      goToMainPage();
      return null;

    // eslint-disable-next-line no-fallthrough
    default:
      return null;
  }
};

export default PractitionerAction;
