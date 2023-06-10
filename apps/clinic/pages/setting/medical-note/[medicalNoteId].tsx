/*
  This is a page template for:
  - /setting/medical-note/${medicalNoteId}
  - /setting/medical-note/${medicalNoteId}?action=delete
*/
import MedicalNoteTemplateAction from 'modules/setting/components/MedicalNote/medical-note-template-action';
import MedicalNoteTemplateActionButtons from 'modules/setting/components/MedicalNote/MedicalNoteTemplate/medical-note-template-action-buttons';
import { handle } from 'next-runtime';
import { AvixoListLayout } from 'share-components';

interface EditMedicalNoteTemplatePageProps {
  medicalNoteTemplate: unknown;
}

const EditMedicalNoteTemplatePage: React.FC<EditMedicalNoteTemplatePageProps> = () => (
  <AvixoListLayout title="Edit Medical Note Template" actionButtons={<MedicalNoteTemplateActionButtons />}>
    {/* Medial Note Template Form */}
    <MedicalNoteTemplateAction />
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get() {
    return {
      props: {},
    };
  },
});

export default EditMedicalNoteTemplatePage;
