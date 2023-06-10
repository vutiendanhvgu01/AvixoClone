/*
  This is a page template for:
  - /patient/${patientId}
*/
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import patientPageApiServer from 'common/service/patient-page-api';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import AllergyApiService from 'modules/allergy/services';
import AppointmentForm from 'modules/appointment/components/appointment-form';
import type { Immunisation } from 'modules/immunisation/components/immunisation-types';
import ImmunisationApiService from 'modules/immunisation/services';
import AddInvoiceForm from 'modules/invoice/components/AddInvoiceForm/add-invoice-form';
import PatientContactInfoCard from 'modules/patient/components/PatientDetails/patient-contact-info-card';
import PatientEnrolCard from 'modules/patient/components/PatientDetails/patient-enrol-card';
import PatientInfoCard from 'modules/patient/components/PatientDetails/patient-info-card';
import PatientOtherInfoCard from 'modules/patient/components/PatientDetails/patient-other-info-card';
import PatientDetailsLayout from 'modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-layout';
import PatientApiService from 'modules/patient/services';
import type { Patient } from 'modules/patient/types/patient';
import PrescriptionApiService from 'modules/prescription/service';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getAlertMessage } from 'share-components';
import { PAGE_URLS, SUCCESS_STATUSES } from 'share-components/src/constants';
import { useCallback } from 'react';
import PatientOtherContactCard from 'modules/patient/components/PatientDetails/patient-other-contact-card';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { Catalog } from 'modules/catalog/types';
import CatalogApiService from 'modules/catalog/service';

const PatientDetailsAction = dynamic(
  () => import('modules/patient/components/PatientDetails/PatientDetailsLayout/patient-details-action'),
  { ssr: false },
);

interface ViewEditDeletePatientPageProps {
  patient: Patient;
  immunisations: Immunisation[];
  allergies: Allergy[];
  params: {
    patientUUID: string;
    action: string;
  };
  practitioners: Practitioner[];
  listItems: Catalog[];
  products: Catalog[];
}

const ViewEditDeletePatientPage: React.FC<ViewEditDeletePatientPageProps> = ({
  patient,
  allergies,
  immunisations,
  params: { action },
  products,
}) => {
  const router = useRouter();
  const goToPatientDetail = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_DETAILS(patient.uuid));
  }, [patient.uuid, router]);

  return (
    <PatientDetailsLayout activeTab={0} patient={patient} allergies={allergies} immunisations={immunisations}>
      <Box sx={{ px: 4, pt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <PatientInfoCard patient={patient} />
          </Grid>
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <PatientContactInfoCard patient={patient} />
          </Grid>
          {/* TODO: API Integration */}
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <PatientEnrolCard
              patient={patient}
              data={{
                isEnrolled: true,
                enrollmentStatus: 'Enrolled',
                firstVisitClaimable: true,
                followUpStatus: 'Contacted',
                email: 'arminvan@gmail.com',
                contactNumber: '900000000',
                cardType: 'string',
              }}
            />
          </Grid>
          {/* Enrol Card */}
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <PatientOtherInfoCard patient={patient} />
          </Grid>
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <PatientOtherContactCard patient={patient} />
          </Grid>
        </Grid>
      </Box>
      <PatientDetailsAction products={products} patient={patient} />
      {action === 'add-invoice' && <AddInvoiceForm open onCancel={goToPatientDetail} />}
      {action === 'add-appointment' && <AppointmentForm open onCancel={goToPatientDetail} />}
    </PatientDetailsLayout>
  );
};
export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { patientUUID, action, nric, message, titleMessage } = ctx.query;
    const dataTypes = ['immunisations', 'allergies'];
    let pageProps = {} as ViewEditDeletePatientPageProps;
    if (patientUUID) {
      try {
        const patientService = new PatientApiService({}, ctx);
        const allergyApiService = new AllergyApiService({}, ctx);
        const immunisationApiService = new ImmunisationApiService({}, ctx);
        const prescriptionService = new PrescriptionApiService({}, ctx);
        const catalogApiService = new CatalogApiService({}, ctx);

        const items = await catalogApiService.getItems();
        pageProps.listItems = items.data;

        const products = await catalogApiService.getListProducts();
        pageProps.products = products.data;

        const { data } = await patientService.getPatientDetails(patientUUID.toString());
        pageProps.patient = data;

        await Promise.allSettled([
          immunisationApiService.getPatientImmunisation({ patientId: data.id }),
          allergyApiService.getPatientAllergies(data.id),
        ]).then(values => {
          values.forEach(({ value }: any, index) => {
            pageProps = {
              ...pageProps,
              [dataTypes[index]]: value?.data || [],
            };
          });
        });
        if (action === 'add-prescription') {
          try {
            const { data: newPrescription } = await prescriptionService.createPrescription({ patientId: data.id });
            return {
              redirect: {
                permanent: false,
                destination: PAGE_URLS.PATIENT_PRESCRIPTION_DETAIL(
                  patientUUID.toString(),
                  newPrescription.uuid.toString(),
                ),
              },
            };
          } catch (error) {
            return {
              redirect: {
                permanent: false,
                destination: PAGE_URLS.PATIENT_DASHBOARD(patientUUID.toString()),
              },
            };
          }
        }
        // Enroll HSG
        if (action === 'enrol-hsg' && nric) {
          /*
                                                                        Call API to get the patient data from nric
                                                                      */
        }
        // Edit HSG
        if (action === 'edit-hsg') {
          /*
                                                                        Call API to get the enrol data
                                                                      */
        }
        return {
          props: {
            ...pageProps,
            ...getAlertMessage(message as string, titleMessage as string),
            params: {
              action: action || '',
              patientUUID,
            },
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
  },
  async post(ctx) {
    /*
                                  Handle all actions of this page here
                                  Add Medicine
                                  Add Invoice
                                  Add MC
                                  Add Appointment
                                  Add Queue
                                  Add Immunisation
                                  Add Allergy
                                  Enrol HSG
                                  Edit HSG
                            */
    const { patientUUID, action } = ctx.query;
    const patientService = new PatientApiService({}, ctx);
    if (patientUUID) {
      if (action === 'edit' && ctx.req.method === 'POST') {
        try {
          const { data } = await patientService.getPatientDetails(patientUUID.toString());
          const { body } = ctx.req;
          const payload = {
            ...body,
            id: data.id,
            birthDate: new Date(body.birthDate as string).toISOString(),
            identities: JSON.parse(body.identities as string),
            contact: JSON.parse(body.contact as string),
            phones: JSON.parse(body.phones as string),
            emails: JSON.parse(body.emails as string),
            addresses: JSON.parse(body.addresses as string),
          };
          await patientService.updatePatientByUuid(patientUUID.toString(), payload);
          const nehrService = new NEHRConnectorApiService({}, ctx);
          await nehrService.submitUpdatedPatientToNEHR(data.id);
          return {
            redirect: {
              permanent: false,
              destination: PAGE_URLS.PATIENT_DETAILS(patientUUID.toString()),
            },
          };
        } catch {
          return {
            redirect: {
              permanent: false,
              destination: PAGE_URLS.PATIENT_DETAILS(patientUUID.toString()),
            },
          };
        }
      }
      const response = await patientPageApiServer(ctx);
      if (SUCCESS_STATUSES.includes(response?.status)) {
        return redirect(
          `${PAGE_URLS.PATIENT_ALLERGY(patientUUID.toString())}?message=${response?.message}&titleMessage=${
            response?.title
          }`,
        );
      }
    }
    return redirect(ctx.resolvedUrl);
  },
});

export default ViewEditDeletePatientPage;
