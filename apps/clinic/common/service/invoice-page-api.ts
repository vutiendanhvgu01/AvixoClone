import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import InvoiceApiService from 'modules/invoice/services';

const InvoicePageApi = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const invoiceService = new InvoiceApiService({}, ctx);

  try {
    switch (action) {
      case 'add-invoice': {
        const { patientId, premiseId } = restBody;
        let data;
        if (patientId) {
          data = { category: 'patient', patientId };
        } else {
          data = { category: 'insurance', premiseId };
        }

        const createInvoice = await invoiceService.createNewPatientInvoice({ data });
        return responseSuccess(createInvoice);
      }
      // add more action here
      case 'add-credit-note':
        break;
      case 'add-debit-note':
        break;
      case 'delete-invoice':
        break;
      default:
        break;
    }
  } catch (error: any) {
    return {
      message: error?.message,
      status: error?.originError?.response?.status,
    };
  }
  return {
    message: '',
    status: '',
    data: null,
  };
};

export default InvoicePageApi;
