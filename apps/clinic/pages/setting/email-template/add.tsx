import { Button } from '@mui/material';
import { handle } from 'next-runtime';
import EyeIcon from '@AvixoIcons/eye-icon';
import { AvixoListLayout } from 'share-components';
import EmailTemplateForm from 'modules/email-template/components/email-template-form';

const AddEmailTemplatePage: React.FC = () => (
  <AvixoListLayout
    title="New Email Template"
    actionButtons={
      <Button color="whiteLight" startIcon={<EyeIcon />}>
        Preview Template
      </Button>
    }
  >
    <EmailTemplateForm open />
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get() {
    return {
      props: {},
    };
  },
});

export default AddEmailTemplatePage;
