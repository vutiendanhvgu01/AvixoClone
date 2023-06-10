import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { MEDICAL_CERTIFICATE_MS_URL } from '../constants';
import { EmailTemplate, EmailTemplateFormValues } from '../components/email-template-types';

class EmailTemplateApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_CERTIFICATE_MS_URL }, context);
  }

  create(body: EmailTemplateFormValues): Promise<ApiResponse<{ message: string }>> {
    return this.post('/email-templates', body);
  }

  getEmailTemplateList(): Promise<ApiResponse<EmailTemplate[]>> {
    return this.get('/email-templates');
  }

  deleteById(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.delete(`/email-templates/${id}`);
  }
}

export default EmailTemplateApiService;
