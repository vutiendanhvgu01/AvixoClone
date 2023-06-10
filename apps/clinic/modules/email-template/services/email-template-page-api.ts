import { responseSuccess } from '@AvixoUtils/apiUtils';
import { EMAIL_TEMPLATE_ACTION } from 'modules/setting/constants/email-template';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import EmailTemplateApiService from '.';
import { formatRecipient } from '../common/utils';
import { EmailTemplateFormValues } from '../components/email-template-types';

const emailTemplatePageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const {
    req: { body },
  } = ctx;
  const { action: bodyAction, ...restBody } = body;
  const action = ctx.query?.action || bodyAction;
  const emailTemplateApiService = new EmailTemplateApiService({}, ctx);

  try {
    switch (action) {
      case EMAIL_TEMPLATE_ACTION.CREATE_EMAIL_TEMPLATE: {
        const data = {
          ...restBody,
          to: formatRecipient(restBody.to),
          cc: formatRecipient(restBody.cc),
          bcc: formatRecipient(restBody.bcc),
          status: 'active',
        } as unknown as EmailTemplateFormValues;
        const createEmailTemplate = await emailTemplateApiService.create(data);
        return responseSuccess(createEmailTemplate, `has been successfully created.`, `New Email Template`);
      }
      case EMAIL_TEMPLATE_ACTION.EDIT_EMAIL_TEMPLATE: {
        break;
      }
      case EMAIL_TEMPLATE_ACTION.DELETE_TEMPLATE: {
        const { id } = ctx.query as { id: string };
        const deleteEmailTemplate = await emailTemplateApiService.deleteById(parseInt(id, 10));
        return responseSuccess(deleteEmailTemplate, `has been successfully deleted.`, `Email Template`);
      }
      default:
        break;
    }
  } catch (error: any) {
    return {
      message: error?.message,
      titleMessage: 'Failed',
      status: error?.originError?.response?.status,
    };
  }

  return {
    message: '',
    status: '',
    data: null,
  };
};

export default emailTemplatePageApiServer;
