import { Typography } from '@mui/material';
import { MEDICAL_NOTE_TEMPLATE_ACTION } from 'modules/setting/constants/medical-note-template';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm } from 'share-components';

const MedicalNoteTemplateAction: React.FC = () => {
  const router = useRouter();
  const { action } = router.query;

  const goToMainPage = useCallback(() => {
    router.push({ pathname: router.pathname, query: null });
  }, [router]);

  switch (action) {
    case MEDICAL_NOTE_TEMPLATE_ACTION.DELETE_TEMPLATE:
      return (
        <AvixoDrawerConfirm
          open
          handleClose={goToMainPage}
          inputProps={{
            name: 'reason',
            label: 'Reason of deletion',
            required: true,
            defaultValues: 'Old template',
          }}
          title="Delete Medical Note Template"
          confirmContent={
            <Typography>
              This action cannot be undone. Are you sure you want to delete <strong>Medical Certificate</strong>?
            </Typography>
          }
        />
      );

    default:
      return null;
  }
};

export default MedicalNoteTemplateAction;
