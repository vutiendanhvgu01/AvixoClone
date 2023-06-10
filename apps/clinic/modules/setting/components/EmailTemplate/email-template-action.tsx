import { Typography } from '@mui/material';
import { EMAIL_TEMPLATE_ACTION } from 'modules/setting/constants/email-template';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm } from 'share-components';

interface EmailTemplateActionProps {
  name?: string;
}

const EmailTemplateAction: React.FC<EmailTemplateActionProps> = ({ name }) => {
  const router = useRouter();
  const { action, id } = router.query;

  const goToMainPage = useCallback(async () => {
    await router.push({ pathname: router.pathname, query: { tab: router.query.tab } });
  }, [router]);

  switch (action) {
    case EMAIL_TEMPLATE_ACTION.DELETE_TEMPLATE:
      return (
        <AvixoDrawerConfirm
          open
          id={id as string}
          handleClose={goToMainPage}
          title="Delete Template"
          confirmContent={
            <Typography>
              This action cannot be undone. Are you sure you want to delete <strong>{name}</strong>?
            </Typography>
          }
        />
      );

    case EMAIL_TEMPLATE_ACTION.SET_DEFAULT_TEMPLATE:
      return (
        <AvixoDrawerConfirm
          open
          handleClose={goToMainPage}
          title="Change Default Template"
          confirmContent={
            <>
              <Typography>
                Current default template for <strong>CurrentTab</strong> is set to{' '}
                <strong>CurrentDefaultTemplate</strong>.
              </Typography>
              <Typography>
                Do you wish to change this to <strong>NewDefaultTemplate</strong>?
              </Typography>
            </>
          }
        />
      );

    default:
      return null;
  }
};

export default EmailTemplateAction;
