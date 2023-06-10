import { GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import CaseApiService from 'modules/cases/services';
import { AvixoSnackbar, getCookieValue } from 'share-components';
import Layout from 'common/components/ColumnsLayout';
import DashboardHeader from 'modules/Dashboard/components/dashboard-header';
import useIsMobile from 'common/hooks/useIsMobile';
import AddButton from 'common/components/AddButton';
import AppointmentsPanel from 'common/components/AppointmentsPanel/AppointmentsPanel';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikConfig } from 'formik';
import dynamic from 'next/dynamic';
import PatientInformationPanel from 'common/components/PatientInformationPanel/PatientInformationPanel';
import mapCaseData from 'modules/cases/utils/mapCaseData';
import { AppointmentFormValues, initialAppointmentFormData } from 'modules/appointment/components/appointment-types';
import { FormattedCase } from 'modules/cases/components/cases-types';
import snackbarMessages from 'modules/appointment/utils/snackbarMessages';
import InvoicesPanel from 'common/components/InvoicesPanel/InvoicesPanel';
import PatientApiService from 'modules/patient/api/patient-api';
import mapPatientData from 'modules/patient/utils/mapPatientData';
import { Patient } from 'common/components/PatientInformationPanel/types';
import PatientStatus from 'share-components/src/components/PatientStatus/patient-status';
import DischargeButton from 'common/components/DischargeButton/discharge-button';
import ConfirmationModal from 'common/components/Confirmation Modal/confirmation-modal';
import mappedDischargeError, { dischargeErrorMessage } from 'modules/cases/utils/mapDischargeErrors';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { GetCaseParams } from 'modules/cases/services/shared';
import useCase from 'modules/cases/hooks/useCase';
import { GetPatientParams } from 'modules/patient/api/patient-api-type';
import useCreateAppointment from 'modules/appointment/hooks/useCreateAppointment';

const AppointmentForm = dynamic(() => import('modules/appointment/components/appointment-form'), { ssr: false });

interface CasePageProps {
  patient: Patient;
  params: GetCaseParams & { id: string };
}
const CaseDetailsPage: React.FC<CasePageProps> = ({ patient, params }) => {
  const isMobile = useIsMobile();
  const { data: initialCaseData, refetch } = useCase(params, { services: true });
  const { userRef, ref, uuid, name, status, enrolmentDate } = (initialCaseData ?? {}) as FormattedCase;
  const services = useMemo(() => initialCaseData?.services ?? [], [initialCaseData?.services]);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dischargeError, setDischargeError] = useState<null | dischargeErrorMessage>(null);
  const close = useCallback(() => setOpen(false), []);
  const closeSnackbar = useCallback(() => setShowNotification(false), []);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const createAppointmentMutation = useCreateAppointment(ref, {
    onSuccess: () => {
      queryClient.invalidateQueries(['case', params]);
    },
  });

  const onSubmit: FormikConfig<AppointmentFormValues>['onSubmit'] = async values => {
    try {
      const body = {
        ...values,
        patientRef: userRef,
      };
      const response = await createAppointmentMutation.mutateAsync(body);
      setShowNotification(true);
      if (response.data.status === 200) {
        close();
        setSnackbarMessage(snackbarMessages.success);
      } else {
        setSnackbarMessage(snackbarMessages.error);
      }
    } catch (error) {
      setShowNotification(true);
      setSnackbarMessage(snackbarMessages.error);
    }
  };

  const handleDischarge = async () => {
    try {
      const response = await fetch(`/api/cases/${params.id}/appointments`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        await refetch();
        setShowNotification(true);
        setSnackbarMessage(`Case ID: ${uuid} successfully discharged.`);
      } else {
        const data = await response.json();
        setDischargeError(data.message);
        setOpenModal(true);
      }
    } catch (error) {
      setShowNotification(true);
      setSnackbarMessage(snackbarMessages.error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setDischargeError(null);
  };

  useEffect(() => {
    if (services.length > 0) {
      const activeServices = services.filter(service =>
        ['draft', 'accepted', 'assigned', 'inTransit', 'inProgress'].includes(service.status),
      );
      if (activeServices.length > 0) setDischargeError('Active services');
    } else {
      setDischargeError(null);
    }
  }, [services, initialCaseData]);

  return (
    <Box paddingBottom={isMobile ? 0 : 3}>
      <DashboardHeader
        renderLeft={() => (
          <>
            <Typography variant={isMobile ? 'subtitle1' : 'h6'}>{name}</Typography>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant={isMobile ? 'h5' : 'h4'} mr={2}>
                  {uuid}
                </Typography>
                <PatientStatus label={status} />
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 'light' }} variant="subtitle2">
              {enrolmentDate}
            </Typography>
          </>
        )}
        renderRight={() => (
          <>
            <DischargeButton
              name={name}
              handleClick={() => handleDischarge()}
              status={status}
              cannotDischarged={dischargeError}
            />
            <AddButton title="New Appointment" handleClick={() => setOpen(true)} testid="add-appointment" />
          </>
        )}
        renderBottom={() => (
          <>
            <DischargeButton
              name={name}
              handleClick={() => handleDischarge()}
              status={status}
              sx={{ flexGrow: 1 }}
              cannotDischarged={dischargeError}
            />
            <AddButton
              title="New Appointment"
              handleClick={() => setOpen(true)}
              testid="add-appointment"
              sx={{ flexGrow: 1 }}
            />
          </>
        )}
      >
        <ConfirmationModal
          openModal={openModal}
          closeModal={closeModal}
          title="Unable to discharge patient"
          description={dischargeError && mappedDischargeError(dischargeError)}
        />
        <AppointmentForm
          formTitle="Add Appointment"
          initData={initialAppointmentFormData}
          onSubmit={onSubmit}
          open={open}
          onCancel={close}
        />
        <AvixoSnackbar
          open={showNotification}
          onClose={closeSnackbar}
          actionText="Dismiss"
          autoHideDuration={2000}
          showActionButton={!isMobile}
          showIconButton={false}
          handleAction={closeSnackbar}
          sx={{ bottom: '42px !important' }}
          ContentProps={{
            message: (
              <Box sx={{ maxWidth: 265 }}>
                <Typography variant="caption" color="#fff">
                  {/* eslint-disable-next-line react/no-danger */}
                  <div dangerouslySetInnerHTML={{ __html: snackbarMessage }} />
                </Typography>
              </Box>
            ),
          }}
        />
      </DashboardHeader>
      <Layout
        renderLeft={() => <PatientInformationPanel patient={patient} />}
        renderCenter={() => <AppointmentsPanel appointments={services} refetchAppointments={refetch} />}
        renderRight={() => <InvoicesPanel />}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { caseRef } = ctx.query;
  const pageProps = {} as CasePageProps;
  const caseService = new CaseApiService();
  const patientApiService = new PatientApiService();
  const queryClient = new QueryClient();
  const businessRef = getCookieValue('businessRef', ctx) as string;
  const organizationRef = getCookieValue('organizationRef', ctx) as string;

  if (caseRef) {
    try {
      const params: GetCaseParams & { id: string } = {
        id: caseRef as string,
        businessRef,
        country: 'SG',
      };
      const patientParams: GetPatientParams = {
        organizationRef,
        patientJarvisRef: '',
      };

      // Grab case data
      queryClient.fetchQuery(['case', params], async () => {
        const { data } = await caseService.getCaseDetails(caseRef as string, { country: 'SG', businessRef });
        return mapCaseData(data, { services: true });
      });

      const caseData = await queryClient.ensureQueryData<FormattedCase>(['case', params]);
      patientParams.patientJarvisRef = caseData.userRef;

      queryClient.fetchQuery(['patient', patientParams], async () => {
        const {
          data: { patient },
        } = await patientApiService.getPatient(patientParams);
        return mapPatientData(patient);
      });

      const patientData = await queryClient.ensureQueryData<Patient>(['patient', patientParams]);

      pageProps.patient = patientData;
      pageProps.params = params;

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
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

export default CaseDetailsPage;
