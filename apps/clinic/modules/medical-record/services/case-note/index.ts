import ApiService from 'common/api';
import { MEDICAL_RECORD_MS_URL } from 'modules/medical-record/constants';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { MedicalNoteFormValue } from '../../types/medical-note';

class CaseNoteApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_RECORD_MS_URL }, context);
  }

  create(values: MedicalNoteFormValue): Promise<ApiResponse<null>> {
    return this.post('/case-note/consultation-note', values);
  }

  delete(id: string | number): Promise<ApiResponse> {
    return this.delete(`/case-note/${id}`);
  }

  getCaseNotesByPatientId(id: string | number): Promise<ApiResponse> {
    return this.get(`/case-note/list?patientId=${id}`);
  }

  getCaseNoteList(): Promise<ApiResponse> {
    return this.get(`/case-note/list`);
  }

  getConsultNotesByPatientId(id: string | number): Promise<ApiResponse> {
    return this.get(`/case-note/consultation-note?patientId=${id}`);
  }
}

export default CaseNoteApiService;
