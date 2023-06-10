import { AvixoCard, PlusOutlined } from 'share-components';
import { Divider, Button, Box, Typography, Stack, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Patient } from 'modules/patient/types/patient';
import MedicalNote from 'modules/patient/components/PatientRecords/medical-note';
import React from 'react';
import type { MedicalNoteType } from 'modules/medical-record/types/medical-note';
import { useClinicContext } from 'contexts/clinic-context';
import CategoryFilterBar from './category-filter-bar';
import AddMedicalNote from './add-medical-note';
import UploadFile from './upload-file';
import Annotate from './annotate';

const PatientButton = styled(Button)(({ theme }) => ({
  border: 'none',
  '&:hover': {
    border: 'none',
    backgroundColor: theme.palette.neutral?.[200],
  },
  backgroundColor: theme.palette.neutral?.[100],
  marginLeft: '16px',
  padding: '8px 12px',
}));

const SelectedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral?.[700],
  opacity: 0.5,
  whiteSpace: 'nowrap',
  marginLeft: 16,
}));

const PatientRecordButton: React.FC<{ title: string; onClick?: () => void }> = ({ title, onClick }) => (
  <PatientButton variant="outlined" startIcon={<PlusOutlined />} onClick={onClick}>
    {title}
  </PatientButton>
);

interface PatientRecordHeaderProps {
  onClickMedicalNote: () => void;
  onClickUpload: () => void;
  onClickAnnotate: () => void;
}

const PatientRecordHeader: React.FC<PatientRecordHeaderProps> = ({
  onClickMedicalNote,
  onClickUpload,
  onClickAnnotate,
}) => {
  const { permissions } = useClinicContext();
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: '36px' }}>
      <Typography variant="h6">Patient Records</Typography>
      <Box>
        {permissions.includes('MEDICAL-RECORD_CREATE') && (
          <>
            <PatientRecordButton title="Medical Note" onClick={onClickMedicalNote} />
            <PatientRecordButton title="Annotate" onClick={onClickAnnotate} />
          </>
        )}
        <PatientRecordButton title="Consent" />
        <PatientRecordButton title="Upload" onClick={onClickUpload} />
        <PatientRecordButton title="Annotation Sum." />
        <PatientRecordButton title="All Files" />
      </Box>
    </Stack>
  );
};

interface PatientRecordsProps {
  patient: Patient;
  medicalNotes: MedicalNoteType[];
}

const PatientRecords: React.FC<PatientRecordsProps> = ({ patient, medicalNotes }) => {
  const [isOpenMedicalNote, setIsOpenMedicalNote] = React.useState<boolean>(false);
  const [isOpenUpload, setIsOpenUpload] = React.useState<boolean>(false);
  const [isOpenAnnotate, setIsOpenAnnotate] = React.useState<boolean>(false);

  const handleClickMedicalNote = () => {
    setIsOpenMedicalNote(!isOpenMedicalNote);
    setIsOpenUpload(false);
    setIsOpenAnnotate(false);
  };

  const handleClickUpload = () => {
    setIsOpenUpload(!isOpenUpload);
    setIsOpenMedicalNote(false);
    setIsOpenAnnotate(false);
  };

  const handleClickAnnotate = () => {
    setIsOpenAnnotate(!isOpenAnnotate);
    setIsOpenMedicalNote(false);
    setIsOpenUpload(false);
  };

  return (
    <AvixoCard
      icon={false}
      sx={{ p: '36px 32px 32px 32px' }}
      headerComponent={
        <PatientRecordHeader
          onClickMedicalNote={handleClickMedicalNote}
          onClickUpload={handleClickUpload}
          onClickAnnotate={handleClickAnnotate}
        />
      }
    >
      <Divider sx={{ mb: 4, ml: -4, mr: -4 }} />
      <Collapse in={isOpenMedicalNote} mountOnEnter unmountOnExit>
        <AddMedicalNote patient={patient} onCancel={handleClickMedicalNote} />
        <Divider sx={{ my: 4, ml: -4, mr: -4 }} />
      </Collapse>
      <Collapse in={isOpenUpload} mountOnEnter unmountOnExit>
        <UploadFile onCancel={handleClickUpload} />
      </Collapse>
      <Collapse in={isOpenAnnotate} mountOnEnter>
        <Annotate />
      </Collapse>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CategoryFilterBar />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <SelectedButton variant="text">Email Selected</SelectedButton>
          <SelectedButton variant="text">Print Selected</SelectedButton>
        </Box>
      </Box>
      <Box>
        {!!medicalNotes?.length &&
          medicalNotes.map((medicalNote: MedicalNoteType) => (
            <MedicalNote key={`patient-medical-note-${medicalNote.id}`} patient={patient} medicalNote={medicalNote} />
          ))}
      </Box>
    </AvixoCard>
  );
};

export default PatientRecords;
