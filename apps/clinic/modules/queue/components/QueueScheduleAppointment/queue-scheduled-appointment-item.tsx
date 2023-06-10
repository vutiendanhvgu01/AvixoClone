import React, { FC, useCallback, useMemo } from 'react';
import { Alert, Box, IconButton, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QueueScheduledAppointmentItemProps } from 'modules/queue/components/QueueScheduleAppointment/queue-scheduled-appointment-types';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowRight from 'share-components/src/components/AvixoIcons/arrow-right';

//= ===================== SOURCES ===============================
const visitReasonOptions = [
  { id: 'GENERAL', name: 'General', color: '#B35BCA' },
  { id: 'CT_SCAN', name: 'CT Scan', color: '#9FD5A1' },
  { id: 'FU_CONSULT', name: 'FU Consult', color: '#DA6868' },
  { id: 'REVIEW', name: 'Review', color: '#51ADF6' },
  { id: 'GENERAL_X_RAY', name: 'General X-Ray', color: '#1A405F' },
  { id: 'TREATMENT', name: 'Treatment', color: '#AD51F6' },
];

//= ===================== END SOURCES ===============================

const ContainerBoxItem = styled(Box)(() => ({
  padding: '32px 0',
  borderBottom: '1px solid #E6E8F0',
  ':last-child': {
    border: 'none',
  },
}));

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ActionIcon = styled(IconButton)(() => ({
  padding: 0,
  '&:hover': {
    opacity: 0.7,
  },
}));

const LabelBox = styled(Box)(() => ({
  width: '42px',
  height: '22px',
  borderRadius: '100px',
  padding: '2px 8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const QueueScheduledAppointmentItem: FC<QueueScheduledAppointmentItemProps> = ({ appointment }) => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let bgInfoAlert = theme.palette.info.alert.background;
  let colorWarning = theme.palette.warning.main;
  const visitReason = useMemo(() => {
    const indexReason = visitReasonOptions.findIndex(reason => reason.id === appointment?.reason);
    if (indexReason !== -1) {
      return visitReasonOptions[indexReason];
    } else {
      return null;
    }
  }, [appointment?.reason]);

  // integrate api add queue
  const onAddQueue = useCallback(() => {}, []);

  return (
    <>
      <ContainerBoxItem>
        <FlexBox sx={{ paddingBottom: '9px' }}>
          <Typography variant={'subtitle2'}>
            {new Date(appointment?.startDate).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}{' '}
            -{' '}
            {new Date(appointment?.endDate).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </Typography>
          <ActionIcon onClick={onAddQueue}>
            <ArrowRight />
          </ActionIcon>
        </FlexBox>
        <FlexBox>
          <Typography variant={'subtitle2'}>{appointment?.patientName}</Typography>
          {appointment?.patientType === 'new' && (
            <LabelBox sx={{ background: bgInfoAlert }}>
              <Typography variant={'caption'} color={'#64B6F7'}>
                New
              </Typography>
            </LabelBox>
          )}
        </FlexBox>
        <Box>
          <Typography variant={'caption'} color={'#6B7280'}>
            Patient ID: {appointment?.patientId}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant={'subtitle2'}
            color={'#64B6F7'}
            sx={{ textUnderlineOffset: '3px', textDecoration: 'underline' }}
          >
            {appointment?.phoneNumber}
          </Typography>
        </Box>
        <Alert
          severity={'warning'}
          icon={false}
          sx={{
            borderRadius: '100px',
            display: 'inline-flex',
            alignItems: 'center',
            margin: '16px 0',
          }}
        >
          <Typography variant={'caption'} color={colorWarning} sx={{ lineHeight: 0, padding: 0 }}>
            {appointment?.doctor}
          </Typography>
        </Alert>
        {visitReason && (
          <Box sx={{ display: 'flex' }}>
            <CircleIcon sx={{ color: visitReason?.color, marginRight: '10px' }} />
            <Typography variant={'body2'} color={'#64B6F7'}>
              {visitReason?.name}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant={'body2'} color={'#6B7280'}>
            Line reserved for comment
          </Typography>
        </Box>
      </ContainerBoxItem>
    </>
  );
};

export default QueueScheduledAppointmentItem;
