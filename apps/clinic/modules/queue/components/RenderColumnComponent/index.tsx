import CircleIcon from '@mui/icons-material/Circle';
import { Alert, Typography, useTheme } from '@mui/material';
import { BASED_ON, QUEUE_STATUS, QUEUE_STATUS_COLOR } from 'modules/queue/constants';
import { ShowAssignedToContext } from 'modules/queue/context/assign-to-context';
import Queue, { AssignedTo } from 'modules/queue/types';
import React, { useContext, useEffect, useState } from 'react';
import { AvixoMenuButton } from 'share-components';

export const RenderPatientColumn: React.FC<{ value: Queue }> = ({ value }) => {
  const [status, setStatus] = useState<Queue['status']>(value.status);
  return (
    <AvixoMenuButton
      onChange={(newValue: string) => setStatus(newValue as Queue['status'])}
      label={status}
      ButtonProps={{
        sx: {
          minWidth: 180,
        },
        startIcon: (
          <CircleIcon
            sx={{
              color: QUEUE_STATUS_COLOR[status] ?? 'white',
            }}
          />
        ),
      }}
      AvixoMenuBaseProps={{
        menuData: QUEUE_STATUS,
      }}
    />
  );
};

export const RenderInvoiceColumn: React.FC<{ value: Queue }> = ({ value }) => {
  const theme = useTheme();
  return (
    <>
      <Alert
        icon={false}
        sx={{
          borderRadius: 100,
          color: 'white',
          background: value.invoice?.status === 'paid' ? theme.palette.success.main : theme.palette.error.main,
          '.MuiAlert-message ': {
            lineHeight: '20px',
            padding: '4px 0',
            maxWidth: 200,
          },
        }}
      >
        {value.invoice?.status} {value?.invoice?.content}
      </Alert>
      <Typography mt={1}>Billed {value?.invoice?.content}</Typography>
    </>
  );
};
export const RenderAssignToColumn: React.FC<{ value: Queue; iRecord: number }> = ({ value, iRecord }) => {
  const { assignTo, handleSetAssignedTo, handleOpenAssignedToSheet, basedOn } = useContext(ShowAssignedToContext);

  const [assign, setAssign] = useState<Partial<AssignedTo>>({
    base: 'Practitioner' ?? '',
    name: value?.practitioner?.name ?? '',
    practitioner: value?.practitioner,
    basedOn,
  });
  useEffect(() => {
    if (iRecord === assignTo.iRecord) {
      setAssign(assignTo);
    }
  }, [assignTo, iRecord]);
  return (
    <>
      <Typography
        sx={{
          color: 'primary.main',
          fontWeight: 600,
        }}
      >
        {assign.base}
      </Typography>
      <Typography
        sx={{
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
            color: 'chart.blue4',
          },
        }}
        onClick={() => {
          let base = BASED_ON.practitioner;
          if (assign.base === 'Room') {
            base = BASED_ON.room;
          } else if (assign.base !== 'Practitioner') {
            base = BASED_ON.speciality;
          }
          handleOpenAssignedToSheet();
          handleSetAssignedTo({ ...assign, iRecord, basedOn: base });
        }}
      >
        {assign.name}
      </Typography>
    </>
  );
};
