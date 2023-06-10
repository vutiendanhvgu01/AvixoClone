import { Typography } from '@mui/material';
import { ORGANISATION_ACTION } from 'modules/organisation/constants';
import PractitionerForm from 'modules/practitioner/components/PractitionerForm/practitioner-form';
import { Practitioner } from 'modules/practitioner/types/practitioner';
import PremiseForm from 'modules/premise/components/premise-form';
import Premise from 'modules/premise/components/premise-types';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm } from 'share-components';
import OrganisationForm from '../organisation-form';
import { Organisation } from '../organisation-types';

interface OrganisationActionProps {
  practitioner?: Practitioner;
  organisation?: Organisation;
  premise?: Premise;
}

const OrganisationAction: React.FC<OrganisationActionProps> = ({ practitioner, organisation, premise }) => {
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
    case ORGANISATION_ACTION.ADD_ORGANISATION:
      return <OrganisationForm open onCancel={goToMainPage} />;

    case ORGANISATION_ACTION.ADD_PREMISE:
      return <PremiseForm open onCancel={goToMainPage} />;

    case ORGANISATION_ACTION.ADD_PRACTITIONER:
      return <PractitionerForm open onCancel={goToMainPage} />;

    case ORGANISATION_ACTION.DELETE_ORGANISATION:
      if (organisation) {
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToMainPage}
            title={organisation?.isParent ? 'Delete Parent Organisation' : 'Delete Organisation'}
            confirmContent={
              <Typography variant="body2">
                This action cannot be undone. Are you sure you want to delete <br />
                <strong>{organisation?.name}</strong>?
              </Typography>
            }
            inputProps={{
              name: 'invoice-item-delete-reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Inactive organisations',
            }}
            id={organisation?.id}
            action="delete-organisation"
            footerProps={{
              confirmText: 'Yes, delete',
              confirmRestProps: {
                variant: 'contained',
              },
            }}
          />
        );
      }
      goToMainPage();

      return null;

    case ORGANISATION_ACTION.DELETE_PRACTITIONER:
      if (practitioner) {
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToMainPage}
            id={practitioner?.id}
            title="Delete practitioner"
            confirmContent={
              <Typography variant="body2">
                This action cannot be undone. Are you sure you want to delete <br />
                <strong>{practitioner?.name}</strong>?
              </Typography>
            }
            inputProps={{
              name: 'invoice-item-delete-reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Inactive premise',
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

    case ORGANISATION_ACTION.DELETE_PREMISE:
      if (premise) {
        return (
          <AvixoDrawerConfirm
            open
            handleClose={goToMainPage}
            id={premise?.id}
            title="Delete Premise"
            confirmContent={
              <Typography variant="body2">
                This action cannot be undone. Are you sure you want to delete <br />
                <strong>{premise?.name}</strong>?
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
            action="delete-premise"
            moreActions={[
              {
                name: 'name',
                value: premise?.name,
              },
            ]}
          />
        );
      }
      goToMainPage();
      return null;
    default:
      return null;
  }
};

export default OrganisationAction;
