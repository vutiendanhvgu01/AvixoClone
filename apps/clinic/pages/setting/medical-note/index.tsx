import { Button } from '@mui/material';
import MedicalNoteTemplateApiService from 'modules/medical-record/services/medical-note-template';
import { MedicalNoteTemplate } from 'modules/medical-record/types/medical-note-template';
import MedicalNoteTab from 'modules/setting/components/MedicalNote/MedicalNoteTab/medical-note-tab';
import MedicalNoteTemplateAction from 'modules/setting/components/MedicalNote/medical-note-template-action';
import { handle } from 'next-runtime';
import Link from 'next/link';
import { AvixoListLayout, AvixoTabData, AvixoTabs, ExportIcon, PageProps, PlusOutlined } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

interface MedicalNoteSettingPageProps extends PageProps {
  medicalNoteTemplates: MedicalNoteTemplate[];
}

const Tabs = (medicalNotes: MedicalNoteTemplate[]): AvixoTabData[] => [
  {
    label: 'Active Template',
    component: <MedicalNoteTab medicalNotes={medicalNotes} />,
  },
  {
    label: 'Deleted Template',
    component: <MedicalNoteTab medicalNotes={medicalNotes} />,
  },
];

const MedicalNoteSettingPage: React.FC<MedicalNoteSettingPageProps> = ({ medicalNoteTemplates }) => (
  <AvixoListLayout
    title="Medical Note Template"
    actionButtons={
      <>
        <Button color="whiteLight" startIcon={<ExportIcon />}>
          Export Non Template Data
        </Button>
        <Link href={PAGE_URLS.SETTING_MEDICAL_NOTE_TEMPLATE_ADD()}>
          <Button startIcon={<PlusOutlined />}>New Medical Note Template</Button>
        </Link>
      </>
    }
  >
    {/* Medical Note Template List */}
    <AvixoTabs tabsData={Tabs(medicalNoteTemplates)} />
    <MedicalNoteTemplateAction />
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get(ctx) {
    const pageProps = {} as MedicalNoteSettingPageProps;
    const medicalNoteTemplateApiService = new MedicalNoteTemplateApiService({}, ctx);
    const templates = await medicalNoteTemplateApiService.getAllMedicalNoteTemplates();
    pageProps.medicalNoteTemplates = templates.data;

    return {
      props: {
        ...pageProps,
      },
    };
  },
});

export default MedicalNoteSettingPage;
