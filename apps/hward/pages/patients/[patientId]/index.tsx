import DashboardHeader from 'modules/Dashboard/components/dashboard-header';
import { Box, Typography } from '@mui/material';
import Layout from 'common/components/ColumnsLayout';
import ContentPanel from 'common/components/ContentPanel/content-panel';
import { getCookieValue, VitalIcon } from 'share-components';
import { GetServerSideProps } from 'next';
import PatientApiService from 'modules/patient/api/patient-api';
import mapPatientData from 'modules/patient/utils/mapPatientData';
import { Patient } from 'common/components/PatientInformationPanel/types';
import { formatDate } from 'share-components/src/utils/formatUtils';
import PatientInformationPanel from 'common/components/PatientInformationPanel/PatientInformationPanel';
import CaseApiService from 'modules/cases/services';
import { GetPatientParams } from 'modules/patient/api/patient-api-type';
import { PatientCasesResponse } from 'modules/cases/api/case-type';
import CasePanel from 'common/components/CasePanel/CasePanel';
import useIsMobile from 'common/hooks/useIsMobile';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import usePatient from 'modules/patient/hooks/usePatient';
import { GetPatientCasesParams } from 'modules/cases/services/shared';
import usePatientCases from 'modules/cases/hooks/usePatientCases';

interface PatientDetailProps {
  params: GetPatientParams;
  casesParams: GetPatientCasesParams;
}

const PatientDetailPage = ({ params, casesParams }: PatientDetailProps) => {
  const { data: patient } = usePatient(params);
  const { data: cases } = usePatientCases(casesParams);
  const isMobile = useIsMobile();

  return (
    <Box paddingBottom={isMobile ? 0 : 3}>
      <DashboardHeader
        renderLeft={() => (
          <>
            <Typography variant="h4">{patient?.fullName}</Typography>
            <Typography>{formatDate(patient?.enrolmentDate, "dd/MM/yyyy '-' hh:mm a")}</Typography>
          </>
        )}
      />
      <Layout
        renderLeft={() => <PatientInformationPanel patient={patient as Patient} />}
        renderCenter={() => <ContentPanel title="Vital Signs" Icon={VitalIcon} />}
        renderRight={() => <CasePanel cases={cases as PatientCasesResponse[]} />}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pageProps = {} as PatientDetailProps;
  const patientId = ctx.query?.patientId as string;
  const organizationRef = getCookieValue('organizationRef', ctx) as string;
  const businessRef = getCookieValue('businessRef', ctx) as string;
  const patientApiService = new PatientApiService();
  const caseApiService = new CaseApiService();

  const params = { organizationRef, patientUsmsRef: patientId } as GetPatientParams;
  pageProps.params = params;

  const queryClient = new QueryClient();
  // Get patient data
  await queryClient.fetchQuery(['patient', params], async () => {
    const {
      data: { patient },
    } = await patientApiService.getPatient(params);
    return mapPatientData(patient);
  });

  type PatientInfo = ReturnType<Awaited<typeof mapPatientData>>;
  const patientInfo = queryClient.getQueryData<PatientInfo>(['patient', params]);
  const patientRef = patientInfo?.speedocPatientRef as string;

  const casesParams: GetPatientCasesParams = {
    country: 'SG',
    businessRef,
    patientRef,
  };
  pageProps.casesParams = casesParams;

  // Get patient cases data
  await queryClient.fetchQuery(['patientCases', casesParams], async () => {
    const { data: cases } = await caseApiService.getPatientCases(casesParams);
    return cases;
  });

  const cases = queryClient.getQueryData<PatientCasesResponse[]>(['patientCases', casesParams]);
  // Handle special logic of creating empty case if no case exists
  if (Array.isArray(cases) && cases.length === 0) {
    await caseApiService.createEmptyCase({
      country: 'SG',
      businessRef,
      patientRef,
    });
    await queryClient.invalidateQueries(['patientCases', casesParams]);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...pageProps,
    },
  };
};

export default PatientDetailPage;
