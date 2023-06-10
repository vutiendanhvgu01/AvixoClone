import { Button } from '@mui/material';
import { handle, redirect } from 'next-runtime';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import ExportIcon from '@AvixoIcons/export-icon';
import PlusOutlined from '@AvixoIcons/plus-outlined-icon';
import { AvixoListLayout, AvixoTabData, AvixoTabs, PageProps } from 'share-components';
import emailTemplatePageApiServer from 'modules/email-template/services/email-template-page-api';
import { EMAIL_TEMPLATE_TYPES } from 'modules/email-template/constants';
import EmailTemplateListTab from 'modules/email-template/components/EmailTemplateList/email-template-list-tab';
import { EmailTemplate } from 'modules/email-template/components/email-template-types';
import EmailTemplateApiService from 'modules/email-template/services';
import EmailTemplateAction from 'modules/setting/components/EmailTemplate/email-template-action';
import { useRouter } from 'next/router';
import { EMAIL_TEMPLATE_ACTION } from 'modules/setting/constants/email-template';

interface EmailTemplatePageProps extends PageProps {
  emailTemplateList: EmailTemplate[];
}

const Tabs = (emailTemplateList: EmailTemplate[]): AvixoTabData[] =>
  Object.keys(EMAIL_TEMPLATE_TYPES).map(type => ({
    label: EMAIL_TEMPLATE_TYPES[type],
    url: PAGE_URLS.SETTING_EMAIL_TEMPLATE(type),
    component: <EmailTemplateListTab emailTemplates={emailTemplateList} />,
  }));

const EmailTemplatePage: React.FC<EmailTemplatePageProps> = ({ emailTemplateList }) => {
  const router = useRouter();
  const { id } = router.query;
  const emailTemplateName = emailTemplateList.find(emailTemplate => String(emailTemplate.id) === (id as string))?.name;

  return (
    <AvixoListLayout
      title="Email Template"
      actionButtons={
        <>
          <Button color="whiteLight" startIcon={<ExportIcon />}>
            Export Non Template Data
          </Button>
          <Link href={PAGE_URLS.SETTING_EMAIL_TEMPLATE_ADD()}>
            <Button startIcon={<PlusOutlined />}>New Email Template</Button>
          </Link>
        </>
      }
    >
      {/* Email Template List */}
      <AvixoTabs tabsData={Tabs(emailTemplateList)} />
      <EmailTemplateAction name={emailTemplateName} />
    </AvixoListLayout>
  );
};

export const getServerSideProps = handle({
  async get(ctx) {
    try {
      const { titleMessage, message } = ctx.query;
      const pageProps = {} as EmailTemplatePageProps;
      const emailTemplateService = new EmailTemplateApiService({}, ctx);
      const emailTemplateList = (await emailTemplateService.getEmailTemplateList()).data;

      pageProps.emailTemplateList = emailTemplateList;
      pageProps.message = (message as string) ?? null;
      pageProps.titleMessage = (titleMessage as string) ?? null;

      return {
        props: pageProps,
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  },
  async post(ctx) {
    const response = await emailTemplatePageApiServer(ctx);
    const action = ctx.query.action || ctx.req.body.action;
    let basePath = PAGE_URLS.SETTING_EMAIL_TEMPLATE();

    switch (action) {
      case EMAIL_TEMPLATE_ACTION.CREATE_EMAIL_TEMPLATE: {
        if ([400, 500].includes(response.status)) basePath = PAGE_URLS.SETTING_EMAIL_TEMPLATE_ADD();

        return redirect(`${basePath}?message=${response.message}&titleMessage=${response.titleMessage}`);
      }
      case EMAIL_TEMPLATE_ACTION.DELETE_TEMPLATE: {
        return redirect(`${basePath}?message=${response.message}&titleMessage=${response.titleMessage}`);
      }
      default:
        return redirect(ctx.resolvedUrl);
    }
  },
});

export default EmailTemplatePage;
