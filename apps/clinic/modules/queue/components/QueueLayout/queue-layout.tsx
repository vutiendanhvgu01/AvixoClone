import React, { ReactNode } from 'react';
import { Box, Button, Paper, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { PAGE_URLS, ROUTES } from 'share-components/src/constants';
import {
  AvixoMenuButton,
  EditSquareIcon,
  OutlinedPrintIcon,
  PastQueueIcon,
  SettleQueueIcon,
  TrashOutlineIcon,
} from 'share-components';
import dynamic from 'next/dynamic';
import { QUEUE_ACTION } from 'modules/queue/constants';

const QueueAction = dynamic(() => import('./queue-action'), { ssr: false });

interface QueueLayoutProps {
  title: string;
  children?: ReactNode;
  expand?: boolean;
}

const Actions = styled(Box)(() => ({
  marginLeft: 'auto',
  '> a, > button': {
    marginLeft: 16,
  },
}));

const PRINT_MENU = [
  {
    label: 'Short Label',
    value: 'short-label',
  },
  {
    label: 'Record Label',
    value: 'record-label',
  },
  {
    label: 'Case Note Label',
    value: 'case-note-label',
  },
];

const QueueLayout: React.FC<QueueLayoutProps> = ({ title, children, expand }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3, mt: 5 }}>
      <Typography variant="h4" sx={{ color: 'white' }}>
        {title}
      </Typography>
      <Actions>
        <AvixoMenuButton
          ButtonProps={{
            startIcon: <OutlinedPrintIcon />,
            color: 'whiteLight',
          }}
          AvixoMenuBaseProps={{
            menuData: PRINT_MENU,
          }}
          label="Print"
        />
        {!expand && (
          <>
            <Link href={PAGE_URLS.DELETED_QUEUE()}>
              <Button color="whiteLight" startIcon={<TrashOutlineIcon />}>
                Deleted Queue
              </Button>
            </Link>
            <Link href={PAGE_URLS.PAST_QUEUE()}>
              <Button color="whiteLight" startIcon={<PastQueueIcon />}>
                Past Queue
              </Button>
            </Link>
            <Button color="whiteLight" startIcon={<SettleQueueIcon />}>
              Settle Queue
            </Button>
            <Link href={`${PAGE_URLS.QUEUE()}?action=${QUEUE_ACTION.ADD_PATIENT_TO_QUEUE}`} scroll={false}>
              <Button startIcon={<EditSquareIcon />}>Add Patient to Queue</Button>
            </Link>
          </>
        )}
        {expand && (
          <Link href={ROUTES.PATIENT_LIST}>
            <Button startIcon={<EditSquareIcon />}>Go to Patient List</Button>
          </Link>
        )}
      </Actions>
    </Box>
    <Paper sx={{ py: 1, bgcolor: 'transparent' }}>{children}</Paper>
    <QueueAction />
  </Box>
);

export default QueueLayout;
