import MedicalNoteTemplateActionButtons from 'modules/setting/components/MedicalNote/MedicalNoteTemplate/medical-note-template-action-buttons';
import { handle } from 'next-runtime';
import { AvixoListLayout } from 'share-components';

const AddMedicalNoteTemplatePage: React.FC = () => (
  <AvixoListLayout title="New Medical Note Template" actionButtons={<MedicalNoteTemplateActionButtons />}>
    {/* Nedical Note Template Form */}
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get() {
    return {
      props: {},
    };
  },
});

export default AddMedicalNoteTemplatePage;
