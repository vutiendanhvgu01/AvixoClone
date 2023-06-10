import { Box, Chip } from '@mui/material';
import { format } from 'date-fns';
import { AvixoSearchBar, AvixoTable } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import React, { useCallback, useState } from 'react';
import FollowUpStatus from 'modules/hsg/components/follow-up-status';
import { DefaultRecordEnrollType } from 'modules/hsg/components/EnrollList/default-record-enroll-type';
import EnrollFilterForm from './enroll-filter-form';

export interface EnrollItem extends DefaultRecordEnrollType {
  followUpStatus: 'First Visit Completed' | 'New' | 'Contacted' | 'Cancelled';
  firstVisitClaimable: boolean;
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
    id: 'followUpStatus',
    field: 'followUpStatus',
    label: 'FOLLOW UP STATUS',
    alignLabel: 'left',
    customRender: value => (
      <div>
        <FollowUpStatus label={value.followUpStatus} />
      </div>
    ),
  },
  {
    id: 'firstVisitClaimable',
    field: 'firstVisitClaimable',
    label: 'FIRST VISIT CLAIMABLE',
    alignLabel: 'left',
    customRender: value => (
      <div>
        {value.firstVisitClaimable ? (
          <Chip label="Yes" size="small" color="success" sx={{ color: 'white', ml: 1.5 }} />
        ) : (
          <Chip label="No" size="small" color="error" sx={{ color: 'white', ml: 1.5 }} />
        )}
      </div>
    ),
  },
] as AvixoTableColumnProps<EnrollItem>[];

interface EnrolledListProps {
  patients: EnrollItem[];
}

const EnrolledList: React.FC<EnrolledListProps> = ({ patients }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleFilter = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Box>
      <EnrollFilterForm open={open} onCancel={toggleFilter} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 3, px: 3, pb: 4 }}>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search Patient..." onFilterClick={toggleFilter} />
      </Box>
      <AvixoTable hasCheckBoxHeader={false} columns={columns} data={{ records: patients }} mode="remote" />
    </Box>
  );
};

export default EnrolledList;
