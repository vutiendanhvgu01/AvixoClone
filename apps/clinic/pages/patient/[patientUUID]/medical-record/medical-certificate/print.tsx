import React from 'react';
import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import type { Patient } from 'modules/patient/types/patient';
import { MedicalCertificate } from 'modules/medical-record/types/medical-certificate';
import { Typography } from '@mui/material';

interface PrintMCPageProps {
  patient: Patient;
  medicalCertificate: MedicalCertificate;
}

const PrintMCPage: React.FC<PrintMCPageProps> = () => (
  <Typography variant="h4" color="white">
    Print MC Page
  </Typography>
);

export const getServerSideProps: GetServerSideProps = async ctx => {
  const patientUUID = ctx.query.patientUUID as string;
  const mcId = ctx.query.mcId as string;
  const pageProps = {} as PrintMCPageProps;

  if (patientUUID && mcId) {
    try {
      const patientService = new PatientApiService({}, ctx);

      const { data } = await patientService.getPatientDetails(patientUUID);
      pageProps.patient = data;

      return {
        props: {
          ...pageProps,
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};

export default PrintMCPage;
