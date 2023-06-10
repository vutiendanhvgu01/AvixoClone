import React, { useCallback, useState } from 'react';
import PatientApiService from 'modules/patient/services';
import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node';
import type { Patient } from 'modules/patient/types/patient';
import type { InvoiceActionType } from 'modules/invoice/components/InvoiceDetails/invoice-action-types';
import InvoiceDetailsLayout from 'modules/invoice/components/InvoiceDetails/invoice-details-layout';
import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';
import MedicalInfoCard from 'modules/invoice/components/InvoiceDetails/medical-info-card';
import PatientInfoCard from 'modules/invoice/components/InvoiceDetails/patient-info-card';
import PaymentInfoCard from 'modules/invoice/components/InvoiceDetails/payment-info-card';
import InvoiceItemsList from 'modules/invoice/components/InvoiceDetails/InvoiceItemsList/items-list';
import TierCard from 'modules/invoice/components/tier-card';
import TierSelectBox from 'modules/invoice/components/tier-select-box';
import { TierOptionProps } from 'modules/invoice/components/tier-select-types';
import InvoiceApiService from 'modules/invoice/services';
import InvoiceTotalCard from 'modules/invoice/components/InvoiceDetails/invoice-total-card';
import { ROUTES } from 'share-components/src/constants';
import { Invoice } from 'modules/invoice/types/invoice';
import SignatureCard from 'modules/invoice/components/signature-card';
import InvoiceRemarkCard from 'modules/invoice/components/invoice-remark-card';

const InvoiceAction = dynamic(() => import('modules/invoice/components/InvoiceDetails/invoice-action'), { ssr: false });

interface InvoiceDetailsPageProps {
  patient: Patient;
  invoice: Invoice;
  params: {
    action: InvoiceActionType;
    patientUUID: string;
    invoiceUUID: string;
  };
}

const options: TierOptionProps[] = [
  {
    id: 1,
    details: [
      {
        label: 'CHAS',
        value: 'S$125.00',
      },
      {
        label: 'HSG Drug Subsidies',
        value: 'S$80.00',
        moreDesc: 'Inclusive of GST absorbed by Government',
      },
      {
        label: 'Total Government Subsidies',
        value: 'S$205.00',
      },
    ],
    summary: {
      label: 'Total Payable by Patient',
      value: 'S$25.00',
    },
    title: 'HSG Chronic Tier',
    tooltip: (
      <span>
        Armin van Buuren CHAS Chronic Annual Balance: <b>S$150.00</b>
      </span>
    ),
  },
  {
    id: 2,
    title: 'CHAS Chronic Tier',
    tooltip: (
      <span>
        Armin van Buuren CHAS Chronic Annual Balance: <b>S$150.00</b>
      </span>
    ),

    details: [
      {
        label: 'CHAS',
        value: 'S$120.00',
        moreDesc: 'Inclusive of GST',
      },
      {
        label: 'Total Government Subsidies',
        value: 'S$120.00',
      },
    ],
    summary: {
      label: 'Total Payable by Patient',
      value: 'S$110.00',
    },
  },
];

const InvoiceDetailsPage: React.FC<InvoiceDetailsPageProps> = ({ patient, invoice, params: { action } }) => {
  const [isOpenSelectTier, setIsOpenSelectTier] = useState(false);
  const [tier, setTier] = useState(options[0]);

  const tierDetails = tier.details[tier.details.length - 1]; // Demo only
  return (
    <InvoiceDetailsLayout patient={patient} invoice={invoice}>
      <Grid spacing={3} container>
        <Grid item md={12}>
          <Grid spacing={4} container>
            <Grid item md={3}>
              <MedicalInfoCard
                latestDiagnosis="Dyspepsia"
                mc="Unfit for Duty for 1 day from 12/01/2023 to 12/01/2023"
              />
            </Grid>
            <Grid item md={6}>
              <PaymentInfoCard billTo={patient.fullName} address="6001 Beach Road 02-63 Golden Mile Tower" />
            </Grid>
            <Grid item md={3}>
              <PatientInfoCard patient={patient} />
            </Grid>
            <Grid item md={12}>
              <InvoiceItemsList dataList={[]} />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              {/* Signature component */}
              <SignatureCard />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              {/* Tier component */}
              <TierSelectBox
                options={options}
                value={{ id: tier.id }}
                open={isOpenSelectTier}
                onClose={useCallback(() => setIsOpenSelectTier(false), [])}
                onSelect={useCallback((value: TierOptionProps) => {
                  setTier(value);
                  setIsOpenSelectTier(false);
                }, [])}
              />
              <TierCard
                label={`${tier.title} Applied`}
                detail={`${tierDetails.label} ${tierDetails.value}`}
                onEdit={useCallback(() => setIsOpenSelectTier(true), [])}
              />
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={3}>
              {/* Invoice Comment component */}
              <InvoiceRemarkCard />
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={3}>
              {/* Total component */}
              <InvoiceTotalCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {action && <InvoiceAction action={action} />}
    </InvoiceDetailsLayout>
  );
};

const convertToMedicineItems = (jsonText: string) => {
  const items = JSON.parse(jsonText);
  return items.map((item: any) => ({
    code: 'codeValue',
    group: 'groupValue',
    category: 'categoryValue',
    type: 'typeValue',
    unitAmount: 2,
    discountType: item?.discountType,
    discountRate: item?.discount,
    quantity: 2,
    premiseId: 2,
  }));
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { patientUUID, invoiceUUID, action } = ctx.query;
  const pageProps = {} as InvoiceDetailsPageProps;
  let keepAction = true;

  if (patientUUID && invoiceUUID) {
    try {
      const invoiceService = new InvoiceApiService({}, ctx);
      if (ctx.req.method === 'POST') {
        const body = await parseBody(ctx.req, '1mb');
        switch (action) {
          case 'add-medicine':
            {
              const { data: invoice } = await invoiceService.getPatientInvoiceByUUID(invoiceUUID);
              const items = convertToMedicineItems(body?.allValues);
              if (items) {
                await Promise.all(
                  items?.map((item: any) => invoiceService.createPatientInvoiceItem(invoice?.id, item)),
                );
              }
              keepAction = false;
            }
            break;
          default:
            break;
        }
        if (body && body.action && body.action === 'delete-invoice') {
          await invoiceService.deletePatientInvoiceByUuid(invoiceUUID.toString());
          return {
            redirect: {
              permanent: false,
              destination: ROUTES.INVOICE,
            },
          };
        }
      }

      const patientService = new PatientApiService({}, ctx);
      const { data } = await patientService.getPatientDetails(patientUUID.toString());
      pageProps.patient = data;
      const { data: dataDetailInvoice } = await invoiceService.getPatientInvoiceByUUID(invoiceUUID.toString());
      pageProps.invoice = dataDetailInvoice;

      return {
        props: {
          ...pageProps,
          params: {
            action: action && keepAction ? action.toString() : '',
            patientUUID,
            invoiceUUID,
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
};

export default InvoiceDetailsPage;
