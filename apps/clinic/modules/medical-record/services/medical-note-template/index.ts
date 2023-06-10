import ApiService from 'common/api';
import { MedicalNoteTemplate } from 'modules/medical-record/types/medical-note-template';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { MEDICAL_RECORD_MS_URL } from '../../constants';

class MedicalNoteTemplateApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_RECORD_MS_URL }, context);
  }

  getAllMedicalNoteTemplates(): Promise<ApiResponse<MedicalNoteTemplate[]>> {
    return this.get('/medical-note');
  }
}

export default MedicalNoteTemplateApiService;
