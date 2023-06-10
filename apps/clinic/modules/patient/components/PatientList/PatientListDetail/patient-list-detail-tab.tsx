import { Box, useTheme } from '@mui/material';
import { AvixoSearchBar, AvixoCardNoResult } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import Link from 'next/link';
import { PatientListItem } from '../patient-list-types';
import PatientsTable from '../../common/patients-table';

interface PatientListDetailTabProps {
  listData?: PatientListItem;
}

const PatientListDetailTab: React.FC<PatientListDetailTabProps> = props => {
  const { listData } = props;
  const theme = useTheme();

  return (
    <Box sx={{ pointerEvents: 1, pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 4 }}>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search Patient..." />
      </Box>
      <Box sx={{ mx: -3 }}>
        <PatientsTable
          patients={listData?.patients || []}
          emptyText={
            <AvixoCardNoResult
              title="The list you are viewing is empty"
              message={
                listData?.id ? (
                  <>
                    Click to{' '}
                    <Link
                      href={PAGE_URLS.PATIENT_LIST_DETAILS_ADD_PATIENT_TO_LIST(listData?.id)}
                      passHref
                      scroll={false}
                    >
                      add new patient to List
                    </Link>{' '}
                    or{' '}
                    <Link
                      href={PAGE_URLS.PATIENT_LIST_DETAILS_DELETE(listData?.id)}
                      passHref
                      scroll={false}
                      style={{ color: theme.palette.error.main }}
                    >
                      delete this List
                    </Link>
                  </>
                ) : null
              }
            />
          }
        />
      </Box>
    </Box>
  );
};

export default PatientListDetailTab;
