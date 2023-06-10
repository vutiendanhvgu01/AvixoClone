import Link from 'next/link';
import { useRouter } from 'next/router';
import { AvixoCard, Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import AmountTable from './amount-table';

const AmountCard = () => {
  const router = useRouter();
  const { patientUUID, invoiceUUID, creditNoteId } = router.query;

  return (
    <AvixoCard
      title="Credit Amount"
      action={
        <Link
          href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE(
            patientUUID as string,
            invoiceUUID as string,
            creditNoteId as string,
            'edit-gst-amount',
          )}
          scroll={false}
        >
          <Edit2Icon />
        </Link>
      }
    >
      <AmountTable />
    </AvixoCard>
  );
};

export default AmountCard;
