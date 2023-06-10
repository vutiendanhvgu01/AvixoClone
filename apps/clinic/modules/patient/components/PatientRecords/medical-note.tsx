import { Box, Checkbox, Chip, Divider, IconButton, Stack, styled, Typography, useTheme } from '@mui/material';
import { StarIcon, PrinterIcon, SMSIcon, TrashIcon } from 'share-components';
import { useEffect, useRef, useState, useCallback } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatHexToRGBA, formatDate } from 'share-components/src/utils/formatUtils';
import dynamic from 'next/dynamic';
import { Patient } from 'modules/patient/types/patient';
import type { MedicalNoteType } from 'modules/medical-record/types/medical-note';
import { useClinicContext } from 'contexts/clinic-context';

const AvixoDrawerConfirm = dynamic(
  () => import('share-components/src/components/AvixoDrawerComfirm/avixo-drawer-confirm'),
  { ssr: false },
);

interface MedicalNoteProps {
  medicalNote: MedicalNoteType;
  patient: Patient;
}

interface DetailType {
  height: number | string;
  show: boolean;
}

const MedicalNoteIconButton = styled(IconButton)(() => ({
  marginRight: '30px',
}));

const MedicalNoteChip = styled(Chip)(() => ({
  borderRadius: '6px',
  marginLeft: '16px',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}));

const DetailToggleButton = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));

const NoteContent = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[900],
  marginBottom: '24px',
  ':last-child': {
    marginBottom: 0,
  },
}));

const MAX_CONTENT_HEIGHT = 400;

const INITIAL_HEIGHT = 'initial';

const DATE_FORMAT = 'dd MMM yyyy hh:mm a';

const MedicalNote: React.FC<MedicalNoteProps> = ({
  medicalNote: { id, createdAt, type, isStarred, isDraft, generalNarrative },
  patient,
}) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLElement>(null);
  const { permissions } = useClinicContext();
  const [details, setDetails] = useState<DetailType>({ height: INITIAL_HEIGHT, show: false });
  const [isShowDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const currentContentHeight = contentRef.current;
    if (currentContentHeight && currentContentHeight.clientHeight > MAX_CONTENT_HEIGHT) {
      setDetails({ height: MAX_CONTENT_HEIGHT, show: true });
    }
  }, []);

  const handleDetailToggle = useCallback(() => {
    setDetails({ height: details.height === INITIAL_HEIGHT ? MAX_CONTENT_HEIGHT : INITIAL_HEIGHT, show: true });
  }, [details]);

  const toggleDeleteConfirmation = useCallback(() => {
    setShowDeleteConfirmation(!isShowDeleteConfirmation);
  }, [isShowDeleteConfirmation]);

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: '22px', pb: '22px' }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Checkbox />
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, textTransform: 'uppercase' }}>
              {formatDate(createdAt, DATE_FORMAT)}
            </Typography>
            <MedicalNoteChip
              size="medium"
              label={type || 'medical note'} // Type will be implement later
              sx={{
                color: 'primary.contrastText',
                background: theme.palette.chart?.purple3,
              }}
            />
            {isDraft && (
              <MedicalNoteChip
                size="medium"
                label="draft"
                sx={{ color: theme.palette.neutral?.[500], background: theme.palette.neutral?.[100] }}
              />
            )}
          </Stack>
        </Stack>
        <Box>
          <MedicalNoteIconButton>
            <StarIcon sx={{ color: isStarred ? theme.palette.chart?.yellow5 : '' }} />
          </MedicalNoteIconButton>
          <MedicalNoteIconButton>
            <PrinterIcon />
          </MedicalNoteIconButton>
          <MedicalNoteIconButton>
            <SMSIcon />
          </MedicalNoteIconButton>
          {permissions.includes('MEDICAL-RECORD_DELETE') && (
            <MedicalNoteIconButton onClick={toggleDeleteConfirmation}>
              <TrashIcon />
            </MedicalNoteIconButton>
          )}
        </Box>
      </Stack>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ ml: '42px', overflow: 'hidden', height: details.height }} ref={contentRef}>
          <Divider />
          <Box sx={{ pt: '16px', pb: '16px' }}>
            {/* Comment this code, because BE did not complete the logic between case note and consultation note */}
            {/* {!!consultNotes?.length &&
              consultNotes.map((consultNote: ConsultNoteType) => (
                <ConsultNote key={`patient-record-mc-consult-note-${consultNote.id}`} consultNote={consultNote} />
              ))} */}
            <NoteContent variant="body2" dangerouslySetInnerHTML={{ __html: generalNarrative ?? '' }} />
          </Box>
          <Typography variant="caption">
            Created 26/12/2023 at 3:29 PM by ryan.ee@speedoc.com &nbsp;&nbsp;·&nbsp;&nbsp; Updated 26/12/2023 at 3:29 PM
            by ryan.ee@speedoc.com
          </Typography>
        </Box>
        {details.show &&
          (details.height === INITIAL_HEIGHT ? (
            <DetailToggleButton onClick={handleDetailToggle} variant="subtitle2" sx={{ pt: '30px' }}>
              <KeyboardArrowUpIcon fontSize="small" sx={{ mr: '5px' }} />
              Hide Details
            </DetailToggleButton>
          ) : (
            <DetailToggleButton
              onClick={handleDetailToggle}
              variant="subtitle2"
              sx={{
                pt: '40px',
                height: 100,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                background: `linear-gradient(360deg, #FFFFFF 0%, ${formatHexToRGBA(
                  '#FFFFFF',
                  0.9,
                )} 51.09%,  ${formatHexToRGBA('#FFFFFF', 0.62)} 112.74%)`,
              }}
            >
              <KeyboardArrowDownIcon fontSize="small" sx={{ mr: '5px' }} />
              Show Details
            </DetailToggleButton>
          ))}
      </Box>
      <Divider sx={{ mt: '16px' }} />

      {isShowDeleteConfirmation && (
        <AvixoDrawerConfirm
          title="Delete Medical Note"
          action="delete-medical-note"
          id={id}
          confirmContent={
            <Typography variant="body2">
              This action cannot be undone. The records will be removed from <strong>{patient.fullName}’s</strong>{' '}
              patient record.
            </Typography>
          }
          inputProps={{
            name: 'reason',
            label: 'Reason of deletion',
            required: true,
            defaultValues: '',
          }}
          open={isShowDeleteConfirmation}
          handleClose={toggleDeleteConfirmation}
        />
      )}
    </Box>
  );
};

export default MedicalNote;
