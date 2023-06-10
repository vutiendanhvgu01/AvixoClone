import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { GetServerSidePropsContext } from 'next';
import { MEDICAL_CERTIFICATE_URL } from '../../constants/medical-certificate';
import { MedicalCertificate, MedicalCertificateValues } from '../../types/medical-certificate';

class MedicalCertificateApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_CERTIFICATE_URL }, context);
  }

  getMedicalCertificates(): Promise<ApiResponse<MedicalCertificate[]>> {
    return this.get(`/medicalcert`);
  }

  addMedicalCertificate(data: MedicalCertificateValues): Promise<ApiResponse> {
    return this.post(`/medicalcert`, data);
  }

  updateMedicalCertificate(uuid: string, data: MedicalCertificateValues): Promise<ApiResponse> {
    return this.put(`/medicalcert/uuid/${uuid}`, data);
  }

  deleteMedicalCertificate(uuid: string): Promise<ApiResponse> {
    return this.delete(`/medicalcert/uuid/${uuid}`);
  }
}

export default MedicalCertificateApiService;
