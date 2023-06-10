import React from 'react';
import { Box } from '@mui/system';
import { MedicalNoteType } from 'modules/medical-record/types/medical-note';
import MedicalNoteItem from './medical-note';

interface PatientRecordHistoryProps {
  medicalNotes?: MedicalNoteType[];
}

const PatientRecordHistory: React.FC<PatientRecordHistoryProps> = ({ medicalNotes = [] }) => (
  <Box>
    {medicalNotes.map(medicalNote => (
      <MedicalNoteItem key={`patient-record-history-${medicalNote.id}`} medicalNote={medicalNote} />
    ))}
  </Box>
);

export default PatientRecordHistory;
