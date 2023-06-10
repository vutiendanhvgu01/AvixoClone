import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AvixoCard, Edit2Icon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

const RemarkCard = () => {
  const router = useRouter();
  const { patientUUID, invoiceUUID, creditNoteId } = router.query;

  return (
    <AvixoCard
      title="Remarks"
      action={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ mr: 3.5, cursor: 'default' }}>
            Created by ryan.ee@speedoc.com on 12 January 2023 at 03.05 PM
          </Typography>
          <Link
            href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE(
              patientUUID as string,
              invoiceUUID as string,
              creditNoteId as string,
              'edit-remark',
            )}
            scroll={false}
          >
            <Edit2Icon />
          </Link>
        </Box>
      }
    >
      <Typography variant="body2">There is no invoice remarks.</Typography>
    </AvixoCard>
  );
};

export default RemarkCard;
