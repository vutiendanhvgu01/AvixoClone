import { Box, Typography } from '@mui/material';
import { AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { displayDays, formattedDate } from 'share-components/src/components/CaseCard/case-card';
import PatientStatus from 'share-components/src/components/PatientStatus/patient-status';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { CasesTableProps, FormattedCase } from './cases-types';

const columns = () =>
  [
    {
      id: 'uuid',
      field: 'uuid',
      label: 'CASE ID',
      alignLabel: 'left',
      customRender: patient => <Typography variant="subtitle2">{patient.uuid}</Typography>,
    },
    {
      id: 'name',
      field: 'name',
      label: 'PATIENT NAME',
      alignLabel: 'left',
      customRender: patient => (
        <Box>
          <Typography variant="subtitle2">{patient.name}</Typography>
          <Typography variant="caption" component="span">{`${patient.age} years old, ${patient.gender}`}</Typography>
        </Box>
      ),
    },
    {
      id: 'nric',
      field: 'nric',
      label: 'NRIC',
      alignLabel: 'left',
      customRender: patient => <Typography variant="subtitle2">{patient.nric}</Typography>,
    },
    {
      id: 'enrolmentDate',
      field: 'enrolmentDate',
      label: 'ENROLMENT DATE',
      alignLabel: 'left',
      customRender: patient => <Typography variant="subtitle2">{formattedDate(patient.enrolmentDate)}</Typography>,
    },
    {
      id: 'lengthOfStay',
      field: 'lengthOfStay',
      label: 'LENGTH OF STAY',
      alignLabel: 'left',
      customRender: patient => <Typography variant="subtitle2">{displayDays(patient.lengthOfStay)}</Typography>,
    },
    {
      id: 'caseStatus',
      field: 'status',
      label: 'CASE STATUS',
      alignLabel: 'left',
      customRender: patient => <PatientStatus label={patient.status} />,
    },
  ] as AvixoTableColumnProps<FormattedCase>[];

const CasesTable: React.FC<CasesTableProps> = ({
  isFetching,
  casesList,
  paginationOptions,
  onPageChange,
  onPageSizeChange,
}) => {
  const activePage = paginationOptions.page;
  const cases = casesList?.pages?.[activePage]?.cases;
  const router = useRouter();

  const onRowClick = useCallback(
    (ref: string) => {
      router.push(`/cases/${ref}`);
    },
    [router],
  );

  return (
    <AvixoTable
      loading={isFetching}
      columns={columns()}
      data={{ records: cases ?? [] }}
      primaryKey="id"
      hasCheckBoxHeader={false}
      emptyText="No records to show."
      mode="remote"
      onRowClick={e => onRowClick(e.ref)}
      pagination={{
        total: casesList?.pages?.[0]?.total ?? -1,
        pageSize: paginationOptions.perPage,
        currentPage: paginationOptions.page,
        pageSizeOptions: [10, 20, 50],
        onPageChange,
        onPageSizeChange,
      }}
      tableContainerStyle={{ maxHeight: '63vh' }}
      titleToolTip="View case details"
      orderByField="enrolmentDate"
      initOrder="desc"
      tableBaseProps={{
        sx: {
          // This is to prevent the table from showing a gigantic whitespace
          'tr:has(> td:only-child)': {
            display: (paginationOptions.page === 1 && isFetching) || cases?.length === 0 ? 'table-row' : 'none',
          },
        },
      }}
      ssr={false}
    />
  );
};

export default CasesTable;
