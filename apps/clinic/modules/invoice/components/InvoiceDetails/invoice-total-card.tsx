import { AvixoCard, Edit2Icon, PrintIcon, TrashIcon } from 'share-components';
import { Box, Chip, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import Image from 'next/image';

const LineItem = ({
  label,
  value,
  labelVariant = 'caption',
  valueVariant = 'subtitle2',
  flexDirection = 'row',
}: {
  label: ReactNode;
  value?: ReactNode;
  flexDirection?: 'row' | 'column';
  labelVariant?: 'caption' | 'body1' | 'body2';
  valueVariant?: 'caption' | 'subtitle2';
}) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.25, flexDirection }}>
    <Typography variant={labelVariant} color="neutral.500" sx={{ pr: 1 }} component="div">
      {label}
    </Typography>
    <Typography
      variant={valueVariant}
      color="black.main"
      component="div"
      sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}
    >
      {value}
    </Typography>
  </Box>
);

const Divider = styled(Box)<{ type?: 'dashed' | 'solid' }>(({ theme, type = 'solid' }) => ({
  borderBottom: `1px ${type} ${theme.palette.divider}`,
  marginBottom: 18,
}));

const Actions = styled(Box)(({ theme }) => ({
  color: theme.palette.neutral?.[500],
  display: 'flex',
  svg: {
    cursor: 'pointer',
    width: 16,
    '&:last-child': {
      marginLeft: 25,
    },
  },
}));

const InvoiceTotalCard: React.FC = () => (
  <AvixoCard title="Total" fullHeight action={<Edit2Icon />}>
    <LineItem label="Medicine" value="S$0" />
    <LineItem label="Service" value="S$0" />
    <LineItem label="Others" value="S$0" />
    <Divider />
    <LineItem label="SST" value="%" />
    <LineItem label="Sub Total" value="S$0" />
    <LineItem label="Discount" value="S$0" />
    <LineItem label="Overall Discount" value="S$0" />
    <LineItem label="Amount after discount" value="S$0" />
    <LineItem label="Add GST (8%)" value="S$0" />
    <LineItem label="Adjust" value="S$0.00" />
    <Divider type="dashed" sx={{ mx: -3 }} />
    <LineItem label="Grand Total" labelVariant="body1" value="S$100.00" />

    {/* Start Co-Payment */}
    <LineItem label="Patient pay (70%)" labelVariant="body1" value="S$270.65" />
    <LineItem label="Insurance/Panel pay (30%)" labelVariant="body1" value="S$115.99" />
    <Divider />
    <LineItem
      label={
        <Box>
          <Typography variant="body2" color="black.main" component="div" sx={{ display: 'flex' }}>
            RC2301-00044
            <Chip color="successLight" label="Patient" sx={{ ml: 1 }} />
          </Typography>
          <Link href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE('patientUUID', 'invoiceUUID', 'creditNoteId')}>
            <Typography color="chart.blue5" sx={{ textDecoration: 'underline', fontWeight: 500 }} component="span">
              30/12/2022
            </Typography>
          </Link>
        </Box>
      }
      value={
        <Actions>
          <PrintIcon />
          <TrashIcon />
        </Actions>
      }
    />
    <LineItem valueVariant="caption" flexDirection="column" label="Reference No." value="pi_3MKXmCDUc8HCDfuR08ougYYT" />
    <LineItem valueVariant="caption" flexDirection="column" label="Remarks" value="The invoice needs remark" />
    <LineItem
      label={
        <Box>
          <Image src="/imgs/credit-card.png" alt="" width={18} height={11} />
          <Typography variant="body2" color="black.main" component="span" sx={{ ml: 0.5 }}>
            Credit Card
          </Typography>
        </Box>
      }
      labelVariant="body2"
      value="S$75.00"
    />
    <Divider />

    <LineItem
      label={
        <Box>
          <Typography variant="body2" color="black.main" component="div" sx={{ display: 'flex' }}>
            RC2301-00044
            <Chip color="primaryLight" label="Insurance" sx={{ ml: 1 }} />
          </Typography>
          <Link href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE('patientUUID', 'invoiceUUID', 'creditNoteId')}>
            <Typography color="chart.blue5" sx={{ textDecoration: 'underline', fontWeight: 500 }} component="span">
              30/12/2022
            </Typography>
          </Link>
        </Box>
      }
      value={
        <Actions>
          <PrintIcon />
          <TrashIcon />
        </Actions>
      }
    />
    <LineItem valueVariant="caption" flexDirection="column" label="Reference No." value="pi_3MKXmCDUc8HCDfuR08ougYYT" />
    <LineItem valueVariant="caption" flexDirection="column" label="Remarks" value="The invoice needs remark" />

    <LineItem
      label=""
      value={
        <Typography color="secondary.main" sx={{ mb: -2 }}>
          Claim received
        </Typography>
      }
    />
    <LineItem
      label={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/imgs/money.png" alt="" width={24} height={24} />
          <Typography variant="body2" color="black.main" component="span" sx={{ ml: 0.5 }}>
            Cash
          </Typography>
        </Box>
      }
      labelVariant="body2"
      value="S$115.99"
    />
    <Divider />
    {/* End Co-Payment */}

    {/* Start Credit note */}
    <LineItem
      label={
        <Box>
          <Typography variant="body2" color="black.main">
            CR-187-41321
          </Typography>
          <Link href={PAGE_URLS.PATIENT_INVOICE_CREDIT_NOTE('patientUUID', 'invoiceUUID', 'creditNoteId')}>
            <Typography color="chart.blue5" sx={{ textDecoration: 'underline', fontWeight: 500 }} component="span">
              30/12/2022
            </Typography>
          </Link>
        </Box>
      }
      value={
        <Actions>
          <PrintIcon />
          <TrashIcon />
        </Actions>
      }
    />
    <LineItem label="Credit note amount used" labelVariant="body2" value="S$25.00" />
    {/* End Credit note */}

    {/* Start CHAS */}
    <Divider />
    <LineItem label="CHAS Chronic Tier" value="S$100.00" />
    <LineItem label="CHAS" value="S$75.00" />
    {/* End CHAS */}

    <Divider />
    <LineItem label="Balance" value="S$0.00" />
  </AvixoCard>
);

export default InvoiceTotalCard;
