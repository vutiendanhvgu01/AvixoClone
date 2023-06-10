import { Box } from '@mui/material';
import { format } from 'date-fns';
import { AvixoSearchBar, AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import React, { useCallback, useState } from 'react';
import { DefaultRecordEnrollType } from 'modules/hsg/components/EnrollList/default-record-enroll-type';
import EnrollFilterForm from './enroll-filter-form';

export interface DeEnrollItem extends DefaultRecordEnrollType {
  deEnrolmentDate: Date;
}

const columns = [
  {
    id: 'name',
    field: 'name',
    label: 'NAME',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <b>{value.name}</b>
        <br />
        <span>Active</span>
      </div>
    ),
  },
  {
    id: 'nric',
    field: 'nric',
    label: 'NRIC',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>{value.nric}</span>
      </div>
    ),
  },
  {
    id: 'age',
    field: 'age',
    label: 'AGE',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>{value.age}</span>
      </div>
    ),
  },
  {
    id: 'contactNo',
    field: 'contactNo',
    label: 'CONTACT NO',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <span>{value.contactNo}</span>
      </div>
    ),
  },
  {
    id: 'enrolmentDate',
    field: 'enrolmentDate',
    label: 'Enrolment Date',
    alignLabel: 'left',
    customRender: value => <b>{format(new Date(value.enrolmentDate), 'dd MMM yyyy')}</b>,
  },
  {
    id: 'deEnrolmentDate',
    field: 'deEnrolmentDate',
    label: 'De-Enrolment Date',
    alignLabel: 'left',
    customRender: value => <b>{format(new Date(value.deEnrolmentDate), 'dd MMM yyyy')}</b>,
  },
] as AvixoTableColumnProps<DeEnrollItem>[];

interface DeEnrolledListProps {
  dataList: DeEnrollItem[];
}

const DeEnrolledList: React.FC<DeEnrolledListProps> = ({ dataList }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleFilter = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Box sx={{ px: 1 }}>
      <EnrollFilterForm onCancel={toggleFilter} open={open} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search here..." />
      </Box>
      <AvixoTable hasCheckBoxHeader={false} columns={columns} data={{ records: dataList }} mode="remote" />
    </Box>
  );
};

export default DeEnrolledList;
